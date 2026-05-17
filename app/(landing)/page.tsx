import content from '@/content.json'
import type { ContentJson } from '@/lib/types'

const c = content as ContentJson

export default function LandingPage() {
  return (
    <div className="containerWrapper" style={{ fontFamily: c.theme.fontFamily + ', Helvetica, sans-serif' }}>
      {/* Sections added in Tasks 5–7 */}
      <p style={{ padding: 40, textAlign: 'center' }}>Landing page — sections coming soon</p>
    </div>
  )
}
