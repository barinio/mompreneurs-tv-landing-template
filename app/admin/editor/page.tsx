'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { ContentJson, SectionKey } from '@/lib/types'
import SectionNav from '@/components/admin/SectionNav'
import FieldEditor from '@/components/admin/FieldEditor'
import LivePreview from '@/components/admin/LivePreview'
import { PreviewContext } from '@/components/admin/PreviewContext'

const IS_TEMPLATE = process.env.NEXT_PUBLIC_IS_TEMPLATE === 'true'

// Upload a pending File to Vercel Blob; returns its public URL.
async function uploadFile(file: File): Promise<string> {
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch('/api/upload', { method: 'POST', body: fd })
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({}))
    throw new Error(error || 'Upload failed')
  }
  const { url } = await res.json()
  return url as string
}

// Walk a content value and replace every pending data-URL string with the URL
// of its uploaded Blob. Only data URLs backed by a pending File are uploaded;
// existing URLs pass through untouched.
async function uploadPendingImages<T>(value: T, pending: Map<string, File>): Promise<T> {
  if (typeof value === 'string') {
    if (value.startsWith('data:')) {
      const file = pending.get(value)
      if (file) {
        const url = await uploadFile(file)
        pending.delete(value)
        return url as T
      }
    }
    return value
  }
  if (Array.isArray(value)) {
    const out = []
    for (const v of value) out.push(await uploadPendingImages(v, pending))
    return out as T
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) out[k] = await uploadPendingImages(v, pending)
    return out as T
  }
  return value
}

export default function EditorPage() {
  const router = useRouter()
  const [content, setContent] = useState<ContentJson | null>(null)
  const [loadError, setLoadError] = useState(false)
  const [sha, setSha] = useState('')
  const [activeSection, setActiveSection] = useState<SectionKey>('hero')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  // data URL -> File for images chosen but not yet uploaded. Uploaded to Blob
  // only on Save & Deploy; cleared as each upload succeeds.
  const pendingUploads = useRef<Map<string, File>>(new Map())
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const addPendingUpload = useCallback((dataUrl: string, file: File) => {
    pendingUploads.current.set(dataUrl, file)
  }, [])

  function showToast(msg: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast(msg)
    toastTimer.current = setTimeout(() => setToast(''), 4000)
  }

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then(({ content: c, sha: s }) => {
        setContent(c)
        setSha(s)
      })
      .catch(() => setLoadError(true))
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
    }
  }, [])

  function handleChange(key: SectionKey, value: unknown) {
    setContent((prev) => prev ? { ...prev, [key]: value } : prev)
  }

  async function handleSave() {
    if (!content) return
    setSaving(true)
    try {
      // Upload any pending images across ALL sections before persisting. The
      // editor holds every section's edits in `content`, so we save the whole
      // object — saving only the active section silently dropped edits made in
      // other sections.
      let fullContent: ContentJson
      try {
        fullContent = await uploadPendingImages(content, pendingUploads.current)
      } catch (err) {
        showToast(err instanceof Error ? `Image upload failed: ${err.message}` : 'Image upload failed')
        return
      }
      // Reflect the uploaded Blob URLs in the editor state.
      setContent(fullContent)

      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: fullContent, sha }),
      })
      if (res.ok) {
        try {
          const { sha: newSha } = await fetch('/api/content').then((r) => r.json())
          setSha(newSha)
        } catch {
          // sha re-fetch failed — next save may conflict; non-fatal
        }
        showToast('Saved! Site will update in ~30 sec')
      } else {
        showToast('Save failed. Please try again.')
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-sm mb-3">Failed to load content.</p>
          <button
            onClick={() => { setLoadError(false); window.location.reload() }}
            className="text-xs text-gray-300 border border-gray-600 rounded px-3 py-1 hover:text-white"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-sm">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Top bar */}
      <div className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-sm">Admin Panel</span>
          <a href="/admin/editor" className="text-blue-300 text-xs border-b border-blue-300 pb-0.5">
            ✏️ Editor
          </a>
          {IS_TEMPLATE && (
            <a href="/admin/sites" className="text-gray-400 text-xs hover:text-gray-200">
              🌐 My Sites
            </a>
          )}
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-xs text-gray-300 hover:text-white border border-gray-600 rounded px-2 py-1">
            👁 View Site
          </a>
          <button onClick={handleLogout} className="text-xs text-gray-300 hover:text-white border border-gray-600 rounded px-2 py-1">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main 3-column layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: section nav */}
        <SectionNav active={activeSection} onChange={setActiveSection} />

        {/* Center: field editor */}
        <div className="w-[260px] bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-700 capitalize">
              {activeSection.replace(/([A-Z])/g, ' $1')}
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3">
            <PreviewContext.Provider value={{ addPendingUpload }}>
              <FieldEditor sectionKey={activeSection} content={content} onChange={handleChange} />
            </PreviewContext.Provider>
          </div>
          <div className="px-4 py-3 border-t border-gray-100">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded transition"
            >
              {saving ? 'Saving...' : 'Save & Deploy'}
            </button>
            <p className="text-xs text-gray-400 text-center mt-1">~30 sec to publish</p>
          </div>
        </div>

        {/* Right: live preview */}
        <div className="flex-1 bg-gray-200 overflow-hidden relative">
          <div className="absolute top-2 left-2 text-xs text-gray-400 bg-white rounded px-2 py-0.5 shadow z-10">
            Live Preview
          </div>
          <LivePreview content={content} activeSection={activeSection} />
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-5 py-3 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  )
}
