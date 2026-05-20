'use client'
import { createContext, useContext } from 'react'

// Files chosen in ImageUpload are NOT uploaded immediately. They live as data
// URLs in the editor state so the Live Preview can show them, and are only
// uploaded to Vercel Blob when the user clicks "Save & Deploy". This registry
// hands the editor the File backing each pending data URL so it can upload
// them at save time. If the user never saves, nothing is stored anywhere.
type PendingUploadContextValue = {
  addPendingUpload: (dataUrl: string, file: File) => void
}

export const PreviewContext = createContext<PendingUploadContextValue>({ addPendingUpload: () => {} })

export function usePendingUpload() {
  return useContext(PreviewContext).addPendingUpload
}
