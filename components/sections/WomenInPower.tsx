import type { ContentJson } from '@/lib/types'

type Props = { womenInPower: ContentJson['womenInPower']; theme: ContentJson['theme'] }

export default function WomenInPower({ womenInPower, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: 'rgb(243, 240, 234)' }}
    >
      <div className="containerInner" style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div
          className="row"
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 40, padding: '0 20px' }}
        >
          <div style={{ flex: '1 1 360px' }}>
            <h2
              className="ne elHeadline"
              style={{ color: 'rgb(142, 123, 107)', fontSize: 36, fontWeight: 700, marginBottom: 16 }}
            >
              {womenInPower.heading}
            </h2>
            <p style={{ color: 'rgb(47, 47, 47)', fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
              {womenInPower.description}
            </p>
            <a href={womenInPower.ctaUrl} target="_blank" rel="noopener noreferrer">
              <button
                className="cta-btn"
                style={{
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
                {womenInPower.ctaText}
              </button>
            </a>
          </div>
          <div style={{ flex: '0 1 300px', textAlign: 'center' }}>
            <img
              src={womenInPower.imageUrl}
              alt={womenInPower.heading}
              style={{ maxWidth: '100%', borderRadius: 4 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
