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
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      setError('File must be under 5 MB')
      return
    }
    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (res.ok) {
      const { url } = await res.json()
      onChange(url)
    } else {
      const { error: msg } = await res.json()
      setError(msg || 'Upload failed')
    }
    setUploading(false)
  }

  return (
    <div>
      {label && <label className="block text-xs text-gray-500 uppercase mb-1">{label}</label>}
      <div className="flex items-center gap-2">
        {value && (
          <img
            src={value}
            alt=""
            className="w-12 h-12 object-cover rounded border border-gray-200"
          />
        )}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
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
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
