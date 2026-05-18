import type { ContentJson } from '@/lib/types'

type Props = { whoNotFor: ContentJson['whoNotFor'] }

export default function WhoNotFor({ whoNotFor }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 40, paddingBottom: 40, backgroundColor: 'rgb(255, 250, 239)' }}
    >
      <div className="containerInner" style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="row" style={{ padding: '0 20px' }}>
          <h2
            className="ne elHeadline"
            style={{ textAlign: 'center', fontSize: 52, fontWeight: 700, marginBottom: 30, color: 'rgb(102, 69, 46)' }}
          >
            WHO THIS IS NOT FOR:
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {whoNotFor.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '12px 16px',
                  backgroundColor: 'rgb(255, 250, 239)',
                  border: '2px solid rgb(102, 69, 46)',
                  borderRadius: 4,
                }}
              >
                <img src="/images/red_cross_small.png" alt="✗" style={{ width: 20, marginTop: 3, flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: 20, color: 'rgb(0, 0, 0)', lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
