import { show } from '@/lib/show'

type Props = {
  ctaUrl: string
  announcementText?: string
  ctaText?: string
}

export default function NavBar({ ctaUrl, announcementText, ctaText }: Props) {
  const lines = (announcementText ?? '').split('\n').filter(Boolean)

  return (
    <div
      style={{ paddingTop: 0, paddingBottom: 3, backgroundColor: 'rgba(22, 10, 1, 0.97)', position: 'sticky', top: 0, zIndex: 99 }}
    >
      <div className="navbar-row">
        {lines.length > 0 && (
          <div className="navbar-announcement">
            <div style={{ color: '#fff', fontSize: 'clamp(15px, 2.6vw, 22px)', fontWeight: 700, fontFamily: 'sans-serif', lineHeight: 1.4, textAlign: 'center' }}>
              {lines.map((line, i) => (
                <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
              ))}
            </div>
          </div>
        )}
        {show(ctaText) && (
          <div className="navbar-cta-wrap">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn navbar-cta"
              style={{ color: '#fff', fontSize: 'clamp(16px, 2.4vw, 22px)', fontWeight: 600, fontFamily: '"Roboto Condensed", sans-serif', width: 211, maxWidth: '100%', height: 54, padding: 0, textDecoration: 'none', borderRadius: 4, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
