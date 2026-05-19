import type { ContentJson } from '@/lib/types'

type Props = { tvPackages: ContentJson['tvPackages']; hero: ContentJson['hero']; theme: ContentJson['theme'] }

export default function TvPackages({ tvPackages, hero }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: 'rgb(142, 123, 107)' }}
    >
      <div className="containerInner" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="row" style={{ padding: '0 20px' }}>
          <h2
            className="ne elHeadline"
            style={{ textAlign: 'center', fontSize: 42, fontWeight: 700, color: 'rgb(255, 255, 255)', marginBottom: 40 }}
          >
            {tvPackages.heading}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {tvPackages.features.map((feature, i) => (
              <div
                key={i}
                style={{ backgroundColor: 'rgb(255, 253, 246)', borderRadius: 6, overflow: 'hidden', border: '1px solid rgb(216, 200, 178)' }}
              >
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  style={{ width: '100%', height: 180, objectFit: 'cover' }}
                />
                <div style={{ padding: 20 }}>
                  <h3 style={{ color: 'rgb(102, 69, 46)', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: 'rgb(0, 0, 0)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href={hero.ctaUrl} target="_blank" rel="noopener noreferrer">
              <button
                className="cta-btn"
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 700,
                  padding: '16px 44px',
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
      </div>
    </div>
  )
}
