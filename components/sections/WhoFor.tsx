import type { ContentJson } from '@/lib/types'

type Props = { whoFor: ContentJson['whoFor']; theme: ContentJson['theme'] }

export default function WhoFor({ whoFor, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#fff' }}
    >
      <div className="containerInner" style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="row" style={{ padding: '0 20px' }}>
          <h2
            className="ne elHeadline"
            style={{ textAlign: 'center', fontSize: 36, fontWeight: 700, marginBottom: 40, color: '#1a1a1a' }}
          >
            WHO THIS IS FOR
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {whoFor.map((item, i) => (
              <div key={i} style={{ padding: 20, borderLeft: `4px solid ${theme.primaryColor}`, backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <img src="/images/green_check_small.png" alt="✓" style={{ width: 20, marginTop: 3 }} />
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: '#1a1a1a' }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: 0 }}>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
