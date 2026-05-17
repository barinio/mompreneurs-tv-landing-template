import type { ContentJson } from '@/lib/types'

type Props = { mediaCredibility: ContentJson['mediaCredibility']; theme: ContentJson['theme'] }

export default function MediaCredibility({ mediaCredibility, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#fff' }}
    >
      <div className="containerInner" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px' }}>
        <h2
          className="ne elHeadline"
          style={{ textAlign: 'center', fontSize: 30, fontWeight: 700, marginBottom: 36, color: '#1a1a1a' }}
        >
          AS SEEN ON
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginBottom: 40 }}>
          {mediaCredibility.screenshots.map((s, i) => (
            <img
              key={i}
              src={s.url}
              alt="Media feature"
              style={{ maxWidth: 280, width: '100%', borderRadius: 4, border: '1px solid #eee' }}
            />
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {mediaCredibility.stats.map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: 20,
                backgroundColor: '#f8f4f0',
                borderRadius: 6,
                borderTop: `3px solid ${theme.primaryColor}`,
              }}
            >
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: 0 }}>{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
