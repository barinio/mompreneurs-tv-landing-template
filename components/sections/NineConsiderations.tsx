import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { nineConsiderations: ContentJson['nineConsiderations']; theme: ContentJson['theme'] }

export default function NineConsiderations({ nineConsiderations }: Props) {
  return (
    <div
      style={{
        backgroundColor: 'rgb(255, 253, 246)',
        padding: 'clamp(32px, 6vw, 60px) clamp(18px, 7vw, 80px)',
        margin: '45px auto 0',
        maxWidth: 1170,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {show(nineConsiderations.headline) && (
        <h1
          style={{
            textAlign: 'center',
            fontSize: 'clamp(34px, 7vw, 60px)',
            color: 'rgb(102, 69, 46)',
            margin: 0,
            fontFamily: 'Imbue, sans-serif',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0',
            lineHeight: 1,
          }}
        >
          {nineConsiderations.headline}
        </h1>
      )}
      <div style={{ marginTop: 30, maxWidth: 1100, margin: '30px auto 0' }}>
        {nineConsiderations.items.map((item, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <h3
              style={{
                fontSize: 20,
                fontFamily: '"PT Sans Narrow", sans-serif',
                fontWeight: 700,
                color: 'rgb(102, 69, 46)',
                margin: '0 0 14px',
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: 20,
                fontFamily: '"PT Sans Narrow", sans-serif',
                fontWeight: 400,
                color: '#000',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
