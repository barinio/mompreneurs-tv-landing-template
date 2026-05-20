'use client'
import { createContext, useContext } from 'react'

// Lets a freshly-uploaded image render in the Live Preview before "Save &
// Deploy". ImageUpload registers a (canonicalPath -> dataUrl) pair; the editor
// swaps those paths for the data URL in the content it feeds to LivePreview,
// so the client sees the real image even though the file isn't in the running
// Vercel build yet.
type PreviewContextValue = {
  register: (canonicalPath: string, dataUrl: string) => void
}

export const PreviewContext = createContext<PreviewContextValue>({ register: () => {} })

export function usePreviewRegister() {
  return useContext(PreviewContext).register
}

// Deep-replace any string equal to a registered canonical path with its data
// URL. Works regardless of where the image path lives in the content tree.
export function applyPreviewOverrides<T>(value: T, overrides: Record<string, string>): T {
  if (typeof value === 'string') {
    return (overrides[value] ?? value) as T
  }
  if (Array.isArray(value)) {
    return value.map((v) => applyPreviewOverrides(v, overrides)) as T
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) {
      out[k] = applyPreviewOverrides(v, overrides)
    }
    return out as T
  }
  return value
}
