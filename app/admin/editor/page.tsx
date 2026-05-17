'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { ContentJson, SectionKey } from '@/lib/types'
import SectionNav from '@/components/admin/SectionNav'
import FieldEditor from '@/components/admin/FieldEditor'
import LivePreview from '@/components/admin/LivePreview'

export default function EditorPage() {
  const router = useRouter()
  const [content, setContent] = useState<ContentJson | null>(null)
  const [sha, setSha] = useState('')
  const [activeSection, setActiveSection] = useState<SectionKey>('hero')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const isTemplate = process.env.NEXT_PUBLIC_IS_TEMPLATE === 'true'

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then(({ content: c, sha: s }) => {
        setContent(c)
        setSha(s)
      })
  }, [])

  function handleChange(key: SectionKey, value: unknown) {
    setContent((prev) => prev ? { ...prev, [key]: value } : prev)
  }

  async function handleSave() {
    if (!content) return
    setSaving(true)
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: activeSection, data: content[activeSection], sha }),
    })
    if (res.ok) {
      const { sha: newSha } = await fetch('/api/content').then((r) => r.json())
      setSha(newSha)
      setToast('Saved! Site will update in ~30 seconds.')
      setTimeout(() => setToast(''), 4000)
    } else {
      setToast('Save failed. Please try again.')
      setTimeout(() => setToast(''), 4000)
    }
    setSaving(false)
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
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
          {isTemplate && (
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
        <div className="w-72 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-700 capitalize">
              {activeSection.replace(/([A-Z])/g, ' $1')}
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3">
            <FieldEditor sectionKey={activeSection} content={content} onChange={handleChange} />
          </div>
          <div className="px-4 py-3 border-t border-gray-100">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold py-2 rounded transition"
            >
              {saving ? 'Saving...' : '💾 Save & Deploy'}
            </button>
            <p className="text-xs text-gray-400 text-center mt-1">~30 sec to publish</p>
          </div>
        </div>

        {/* Right: live preview */}
        <div className="flex-1 bg-gray-200 overflow-hidden relative">
          <div className="absolute top-2 left-2 text-xs text-gray-400 bg-white rounded px-2 py-0.5 shadow z-10">
            Live Preview
          </div>
          <div className="h-full overflow-y-auto">
            <LivePreview content={content} activeSection={activeSection} />
          </div>
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
