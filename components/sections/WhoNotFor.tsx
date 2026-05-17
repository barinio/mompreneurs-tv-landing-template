import type { ContentJson } from '@/lib/types'

type Props = { whoNotFor: ContentJson['whoNotFor'] }

export default function WhoNotFor({ whoNotFor }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 40, paddingBottom: 40, backgroundColor: '#f8f4f0' }}
    >
      <div className="containerInner" style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="row" style={{ padding: '0 20px' }}>
          <h2
            className="ne elHeadline"
            style={{ textAlign: 'center', fontSize: 30, fontWeight: 700, marginBottom: 30, color: '#1a1a1a' }}
          >
            WHO THIS IS <span style={{ color: '#D6002A' }}>NOT</span> FOR
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {whoNotFor.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', backgroundColor: '#fff', borderRadius: 4 }}>
                <img src="/images/red_cross_small.png" alt="✗" style={{ width: 20, marginTop: 3, flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: 15, color: '#444', lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
