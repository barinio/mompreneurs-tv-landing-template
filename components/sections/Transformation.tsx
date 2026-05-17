import type { ContentJson } from '@/lib/types'

type Props = { transformation: ContentJson['transformation']; hero: ContentJson['hero']; theme: ContentJson['theme'] }

export default function Transformation({ transformation, hero, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#1a1a1a' }}
    >
      <div className="containerInner" style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div
          className="row"
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 40, padding: '0 20px' }}
        >
          <div style={{ flex: '1 1 400px' }}>
            <h2
              className="ne elHeadline"
              style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 24, lineHeight: 1.3 }}
            >
              {transformation.headline}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {transformation.benefits.map((b, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                  <img src="/images/green_check_small.png" alt="✓" style={{ width: 18, marginTop: 3, flexShrink: 0 }} />
                  <span style={{ color: '#e8e0d5', fontSize: 15 }}>{b}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 30 }}>
              <a href={hero.ctaUrl} target="_blank" rel="noopener noreferrer">
                <button
                  style={{
                    backgroundColor: theme.primaryColor,
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 700,
                    padding: '14px 36px',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    letterSpacing: 2,
                  }}
                >
                  {hero.ctaText}
                </button>
              </a>
            </div>
          </div>
          <div style={{ flex: '0 1 320px', textAlign: 'center' }}>
            <img
              src={transformation.posterUrl}
              alt="Show Poster"
              className="elIMG"
              style={{ maxWidth: '100%', borderRadius: 4 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
