import type { ContentJson } from '@/lib/types'

type Props = { tvPackages: ContentJson['tvPackages']; hero: ContentJson['hero']; theme: ContentJson['theme'] }

export default function TvPackages({ tvPackages, hero, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#1a1a1a' }}
    >
      <div className="containerInner" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="row" style={{ padding: '0 20px' }}>
          <h2
            className="ne elHeadline"
            style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, color: theme.primaryColor, marginBottom: 40 }}
          >
            {tvPackages.heading}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {tvPackages.features.map((feature, i) => (
              <div
                key={i}
                style={{ backgroundColor: '#2a2a2a', borderRadius: 6, overflow: 'hidden', border: '1px solid #333' }}
              >
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  style={{ width: '100%', height: 180, objectFit: 'cover' }}
                />
                <div style={{ padding: 20 }}>
                  <h3 style={{ color: theme.primaryColor, fontSize: 17, fontWeight: 700, marginBottom: 8 }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#bbb', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href={hero.ctaUrl} target="_blank" rel="noopener noreferrer">
              <button
                style={{
                  backgroundColor: theme.accentColor,
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
