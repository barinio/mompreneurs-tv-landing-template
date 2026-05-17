import type { ContentJson } from '@/lib/types'

type Props = { whyTvStats: ContentJson['whyTvStats']; theme: ContentJson['theme'] }

export default function WhyTvStats({ whyTvStats, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#f5f0eb' }}
    >
      <div className="containerInner" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px' }}>
        <h2
          className="ne elHeadline"
          style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 40, color: '#1a1a1a' }}
        >
          WHY TV WORKS
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {whyTvStats.map((item, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: 28,
                backgroundColor: '#fff',
                borderRadius: 6,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <div
                style={{ fontSize: 48, fontWeight: 700, color: theme.primaryColor, marginBottom: 8 }}
              >
                {item.stat}
              </div>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: 0 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
