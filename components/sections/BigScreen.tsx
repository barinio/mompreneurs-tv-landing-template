import type { ContentJson } from '@/lib/types'

type Props = { bigScreen: ContentJson['bigScreen'] }

const BROWN = 'rgb(102, 69, 46)'

export default function BigScreen({ bigScreen }: Props) {
  return (
    <div style={{ backgroundColor: '#fff', paddingTop: 60, paddingBottom: 60 }}>
      <div style={{
        maxWidth: 1200,
        width: '95%',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 40,
      }}>
        {/* Left column */}
        <div style={{ flex: '1 1 480px', minWidth: 300 }}>
          <p style={{
            fontSize: 30,
            color: '#000',
            margin: 0,
            lineHeight: 1.2,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontFamily: '"PT Sans Narrow", sans-serif',
            fontWeight: 500,
          }}>
            {bigScreen.eyebrow}
          </p>
          <h2 style={{
            fontSize: 64,
            color: BROWN,
            margin: '6px 0 0',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            fontFamily: 'Imbue, sans-serif',
            fontWeight: 700,
          }}>
            {bigScreen.headline}
          </h2>

          <div style={{ marginTop: 24 }}>
            <img
              src={bigScreen.logosUrl}
              alt=""
              style={{ maxWidth: 420, width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          <div style={{ marginTop: 28 }}>
            {bigScreen.body.map((p, i) => (
              <p key={i} style={{
                fontSize: 22,
                fontFamily: '"PT Sans Narrow", sans-serif',
                fontWeight: 400,
                color: '#000',
                lineHeight: 1.55,
                margin: i === 0 ? 0 : '18px 0 0',
              }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Right column - phone mockup */}
        <div style={{ flex: '1 1 360px', minWidth: 280, textAlign: 'center' }}>
          <img
            src={bigScreen.phoneUrl}
            alt=""
            style={{
              maxWidth: 420,
              width: '100%',
              height: 'auto',
              display: 'inline-block',
            }}
          />
        </div>
      </div>
    </div>
  )
}
