import type { ContentJson } from '@/lib/types'

type Props = {
  threePackages: ContentJson['threePackages']
  hero: ContentJson['hero']
  theme: ContentJson['theme']
}

export default function ThreePackageOptions({ threePackages, hero, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: 'rgb(142, 123, 107)' }}
    >
      <div className="containerInner" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
        <h2
          className="ne elHeadline"
          style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, color: 'rgb(255, 255, 255)', marginBottom: 40 }}
        >
          YOUR OPTIONS
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {threePackages.map((pkg, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'rgb(255, 253, 246)',
                borderRadius: 6,
                padding: 28,
                border: '1px solid rgb(216, 200, 178)',
                position: 'relative',
              }}
            >
              {i === 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: theme.primaryColor,
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '4px 14px',
                    borderRadius: 20,
                    letterSpacing: 1,
                  }}
                >
                  MOST POPULAR
                </div>
              )}
              <h3 style={{ color: 'rgb(255, 255, 255)', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                {pkg.title}
              </h3>
              <p style={{ color: 'rgb(0, 0, 0)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                {pkg.description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {pkg.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                    <span style={{ color: 'rgba(209, 177, 95, 0.98)', flexShrink: 0, marginTop: 2, fontSize: 16 }}>✓</span>
                    <span style={{ color: 'rgb(255, 255, 255)', fontSize: 14, fontWeight: 700 }}>{f}</span>
                  </li>
                ))}
              </ul>
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
  )
}
