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
      <div style={{ display: 'flex', alignItems: 'center', padding: '20px 10px 15px' }}>
        <div style={{ flex: '0 0 66.66%', padding: '0 10px', boxSizing: 'border-box' }}>
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, fontFamily: 'sans-serif', lineHeight: 1.4, textAlign: 'center' }}>
            {lines.map((line, i) => (
              <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
            ))}
          </div>
        </div>
        <div style={{ flex: '0 0 33.33%', padding: '0 10px', boxSizing: 'border-box', textAlign: 'left' }}>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
            style={{ color: '#fff', fontSize: 22, fontWeight: 600, fontFamily: '"Roboto Condensed", sans-serif', width: 211, height: 54, padding: 0, textDecoration: 'none', borderRadius: 4, whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}
          >
            {ctaText ?? 'APPLY NOW'}
          </a>
        </div>
      </div>
    </div>
  )
}
