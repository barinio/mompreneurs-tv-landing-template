'use client'
import { useState, useEffect } from 'react'
import type { SiteEntry } from '@/lib/types'

export default function SitesPage() {
  const [sites, setSites] = useState<SiteEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [newSite, setNewSite] = useState<{ url: string; adminUrl: string } | null>(null)

  useEffect(() => {
    fetch('/api/sites')
      .then((r) => r.json())
      .then(({ sites: s }) => { setSites(s ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    setError('')
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
    setCreating(false)
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
                    className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Sites table */}
        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : sites.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">o</p>
            <p>No sites yet. Create your first one!</p>
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
                  <tr key={site.name} className="hover:bg-gray-50">
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
                      <a href={site.url} target="_blank" className="text-gray-400 hover:text-gray-600 text-xs">
                        Open
                      </a>
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
