'use client'
import { useRef, useState } from 'react'
import { usePendingUpload } from './PreviewContext'

type Props = {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUpload({ value, onChange, label }: Props) {
  const addPendingUpload = usePendingUpload()
  const [error, setError] = useState('')
  const [pendingName, setPendingName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Selecting a file does NOT upload it. We read it as a data URL, store that
  // as the field value (so the Live Preview shows the real image) and hand the
  // File to the editor. The actual Vercel Blob upload happens only on
  // "Save & Deploy" — unsaved previews are never persisted.
  async function handleFile(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      setError('File must be under 5 MB')
      return
    }
    setError('')
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const r = new FileReader()
      r.onload = () => resolve(r.result as string)
      r.onerror = () => reject(r.error)
      r.readAsDataURL(file)
    }).catch(() => null)
    if (!dataUrl) {
      setError('Could not read file')
      return
    }
    setPendingName(file.name)
    onChange(dataUrl)
    addPendingUpload(dataUrl, file)
  }

  const isPending = value.startsWith('data:')

  return (
    <div>
      {label && <label className="block text-xs text-gray-500 uppercase mb-1">{label}</label>}
      <div className="flex items-center gap-2">
        {value && (
          <img
            src={value}
            alt=""
            className="w-12 h-12 object-cover rounded border border-gray-200"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden' }}
          />
        )}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            value={isPending ? `📎 ${pendingName} (unsaved)` : value}
            readOnly={isPending}
            onChange={(e) => { onChange(e.target.value); setPendingName('') }}
            placeholder="Image URL"
            className="border border-gray-300 rounded px-2 py-1 text-xs w-48"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-2 py-1"
          >
            📎 Upload file
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
      {isPending && (
        <p className="text-amber-600 text-xs mt-1">
          Image added to preview. It will be uploaded when you click &ldquo;Save &amp; Deploy&rdquo;.
        </p>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
