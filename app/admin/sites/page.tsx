'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { SiteEntry } from '@/lib/types'

const IS_TEMPLATE = process.env.NEXT_PUBLIC_IS_TEMPLATE === 'true'

export default function SitesPage() {
  const router = useRouter()

  useEffect(() => {
    if (!IS_TEMPLATE) router.replace('/admin/editor')
  }, [router])
  const [sites, setSites] = useState<SiteEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [newSite, setNewSite] = useState<{ url: string; adminUrl: string } | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<SiteEntry | null>(null)
  const [deleting, setDeleting] = useState<'list-only' | 'full' | null>(null)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/sites', { signal: controller.signal, cache: 'no-store' })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        const body = await r.json()
        setSites(body.sites ?? [])
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') { setLoadError(true); setLoading(false) }
      })
    return () => controller.abort()
  }, [])

  async function handleDelete(mode: 'list-only' | 'full') {
    if (!deleteTarget) return
    setDeleting(mode)
    setDeleteError('')
    try {
      const res = await fetch('/api/sites/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: deleteTarget.name, url: deleteTarget.url, mode }),
      })
      const data = await res.json()
      if (!res.ok) {
        setDeleteError(data.error ?? 'Failed to delete')
        return
      }
      setSites((prev) => prev.filter((s) => s.url !== deleteTarget.url))
      setDeleteTarget(null)
    } catch {
      setDeleteError('Network error. Please try again.')
    } finally {
      setDeleting(null)
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    setError('')
    try {
      const res = await fetch('/api/sites/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, adminPassword: password }),
      })
      const data = await res.json()
      if (res.ok) {
        setNewSite(data)
        setSites((prev) => [
          ...prev,
          { name, url: data.url, adminUrl: data.adminUrl, createdAt: new Date().toISOString(), status: 'deploying' as const },
        ])
        setShowForm(false)
        setName('')
        setPassword('')
      } else {
        setError(data.error ?? 'Unknown error')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Top bar */}
      <div className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-sm">Admin Panel</span>
          <a href="/admin/editor" className="text-gray-400 text-xs hover:text-gray-200">Editor</a>
          <a href="/admin/sites" className="text-blue-300 text-xs border-b border-blue-300 pb-0.5">My Sites</a>
        </div>
        <a href="/" target="_blank" className="text-xs text-gray-300 border border-gray-600 rounded px-2 py-1">View Site</a>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-800">My Sites ({sites.length})</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded"
          >
            + Create New Site
          </button>
        </div>

        {/* New site success banner */}
        {newSite && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-green-800 mb-2">Site created! Deploying now (~60 sec)...</h3>
            <p className="text-sm text-green-700 mb-1">
              Site URL: <a href={newSite.url} target="_blank" className="underline">{newSite.url}</a>
            </p>
            <p className="text-sm text-green-700">
              Admin URL: <a href={newSite.adminUrl} target="_blank" className="underline">{newSite.adminUrl}</a>
            </p>
          </div>
        )}

        {/* Create form modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
              <h2 className="text-lg font-bold mb-4">New Site</h2>
              <form onSubmit={handleCreate}>
                <div className="mb-4">
                  <label className="block text-xs text-gray-500 uppercase mb-1">Site Name (slug)</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                    placeholder="client-sarah-tv"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    required
                  />
                  {name && <p className="text-xs text-gray-400 mt-1">URL: {name}.vercel.app</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-xs text-gray-500 uppercase mb-1">Admin Password for this site</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose a password"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    required
                    minLength={6}
                  />
                </div>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 rounded text-sm"
                  >
                    {creating ? 'Creating (~60 sec)...' : 'Create Site'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    disabled={creating}
                    className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete confirmation modal */}
        {deleteTarget && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-lg font-bold mb-2">Delete site: {deleteTarget.name}</h2>
              <p className="text-sm text-gray-600 mb-4">
                Choose what to delete. This cannot be undone.
              </p>
              <div className="text-xs text-gray-500 mb-4 border border-gray-200 rounded p-3 bg-gray-50">
                <div className="mb-1">
                  <span className="font-medium">URL:</span> {deleteTarget.url.replace('https://', '')}
                </div>
                <div>
                  <span className="font-medium">Created:</span>{' '}
                  {new Date(deleteTarget.createdAt).toLocaleString()}
                </div>
              </div>
              {deleteError && <p className="text-red-500 text-sm mb-3">{deleteError}</p>}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleDelete('list-only')}
                  disabled={deleting !== null}
                  className="w-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-800 font-semibold py-2 rounded text-sm"
                >
                  {deleting === 'list-only' ? 'Removing...' : 'Remove from list only'}
                </button>
                <p className="text-xs text-gray-400 -mt-1 mb-1">
                  Keeps the Vercel project and GitHub repo. The site stays online; just hide it here.
                </p>
                <button
                  type="button"
                  onClick={() => handleDelete('full')}
                  disabled={deleting !== null}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-2 rounded text-sm"
                >
                  {deleting === 'full' ? 'Deleting...' : 'Delete everything (Vercel + GitHub + list)'}
                </button>
                <p className="text-xs text-gray-400 -mt-1 mb-1">
                  Permanently deletes the Vercel project and GitHub repo, and removes from this list.
                </p>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting !== null}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sites table */}
        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : loadError ? (
          <p className="text-red-500 text-sm">Failed to load sites. Please refresh.</p>
        ) : sites.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-2xl mb-3">No sites yet</p>
            <p>Create your first one!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">URL</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Created</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sites.map((site) => (
                  <tr key={site.url} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{site.name}</td>
                    <td className="px-4 py-3">
                      <a href={site.url} target="_blank" className="text-blue-500 hover:underline text-xs">
                        {site.url.replace('https://', '')}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        site.status === 'live'
                          ? 'bg-green-100 text-green-700'
                          : site.status === 'deploying'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {site.status === 'live' ? 'Live' : site.status === 'deploying' ? 'Deploying' : 'Error'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {new Date(site.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <a href={site.adminUrl} target="_blank" className="text-blue-500 hover:underline text-xs mr-3">
                        Edit
                      </a>
                      <a href={site.url} target="_blank" className="text-gray-400 hover:text-gray-600 text-xs mr-3">
                        Open
                      </a>
                      <button
                        onClick={() => { setDeleteTarget(site); setDeleteError('') }}
                        className="text-red-500 hover:text-red-700 text-xs"
                        aria-label={`Delete ${site.name}`}
                        title="Delete site"
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
