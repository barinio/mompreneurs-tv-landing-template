import type { ContentJson } from './types'
import content from '@/content.json'

// New clones start with the template's current content as a baseline.
// The client edits it via /admin to make it their own.
// TODO: replace with pristine placeholder defaults when productionizing.
export const contentDefault: ContentJson = content as ContentJson
