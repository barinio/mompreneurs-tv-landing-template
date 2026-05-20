'use client'
import { useRef, useState } from 'react'

type Props = {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUpload({ value, onChange, label }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  // Once uploaded, the canonical path (e.g. /images/foo.png) won't load in
  // this browser tab — the file lives in GitHub but isn't in the currently-
  // running Vercel build yet. We keep the just-selected file as a data URL
  // so the preview shows the actual image until "Save & Deploy" rebuilds.
  const [localPreview, setLocalPreview] = useState<string | null>(null)
  const [justUploaded, setJustUploaded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      setError('File must be under 5 MB')
      return
    }
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const r = new FileReader()
      r.onload = () => resolve(r.result as string)
      r.onerror = () => reject(r.error)
      r.readAsDataURL(file)
    }).catch(() => null)
    if (dataUrl) setLocalPreview(dataUrl)

    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (res.ok) {
      const { url } = await res.json()
      onChange(url)
      setJustUploaded(true)
    } else {
      const { error: msg } = await res.json().catch(() => ({}))
      setError(msg || 'Upload failed')
      setLocalPreview(null)
    }
    setUploading(false)
  }

  const previewSrc = localPreview ?? value

  return (
    <div>
      {label && <label className="block text-xs text-gray-500 uppercase mb-1">{label}</label>}
      <div className="flex items-center gap-2">
        {previewSrc && (
          <img
            src={previewSrc}
            alt=""
            className="w-12 h-12 object-cover rounded border border-gray-200"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden' }}
          />
        )}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            value={value}
            onChange={(e) => { onChange(e.target.value); setLocalPreview(null); setJustUploaded(false) }}
            placeholder="Image URL"
            className="border border-gray-300 rounded px-2 py-1 text-xs w-48"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-2 py-1 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : '📎 Upload file'}
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>
      {justUploaded && (
        <p className="text-green-600 text-xs mt-1">
          ✓ Uploaded. Click &ldquo;Save &amp; Deploy&rdquo; — image will appear on the live site after the rebuild (~60 sec).
        </p>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
