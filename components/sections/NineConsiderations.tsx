import type { ContentJson } from '@/lib/types'

type Props = { nineConsiderations: ContentJson['nineConsiderations']; theme: ContentJson['theme'] }

export default function NineConsiderations({ nineConsiderations, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: 'rgb(255, 253, 246)' }}
    >
      <div className="containerInner" style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>
        <h2
          className="ne elHeadline"
          style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 40, color: 'rgb(102, 69, 46)' }}
        >
          THINGS TO CONSIDER
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {nineConsiderations.map((item, i) => (
            <div
              key={i}
              style={{ padding: '20px 24px', borderLeft: `4px solid ${theme.primaryColor}`, backgroundColor: '#faf7f4' }}
            >
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
