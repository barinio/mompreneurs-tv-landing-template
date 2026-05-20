import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { aboutShow: ContentJson['aboutShow'] }

export default function AboutShow({ aboutShow }: Props) {
  const paragraphs = (aboutShow.body ?? '').split('\n\n').filter(Boolean)

  return (
    <div style={{ paddingTop: 60, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 40,
            marginBottom: 70,
          }}
        >
          {show(aboutShow.imageUrl) && (
            <div style={{ flex: '0 1 420px', minWidth: 280 }}>
              <img
                src={aboutShow.imageUrl}
                alt="Mompreneurs Poster"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 4 }}
              />
            </div>
          )}
          <div style={{ flex: '1 1 480px', minWidth: 280 }}>
            {show(aboutShow.eyebrow) && (
              <h2
                style={{
                  fontSize: 'clamp(26px, 4vw, 34px)',
                  fontFamily: '"PT Sans Narrow", sans-serif',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  margin: 0,
                  padding: '0 0 4px',
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                }}
              >
                {aboutShow.eyebrow}
              </h2>
            )}
            {show(aboutShow.logoUrl) && (
              <img
                src={aboutShow.logoUrl}
                alt="MOMPRENEURS"
                style={{
                  width: '100%',
                  maxWidth: 580,
                  height: 'auto',
                  display: 'block',
                  marginTop: -20,
                  marginBottom: 8,
                }}
              />
            )}
            <div style={{ padding: '0 0 0 15px' }}>
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 21,
                    fontFamily: '"PT Sans Narrow", sans-serif',
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.92)',
                    margin: '0 0 16px',
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {(show(aboutShow.standAmongHeadlineTop) || show(aboutShow.standAmongHeadlineBottom)) && (
          <div style={{ marginTop: 0, textAlign: 'center', padding: '0 clamp(8px, 4vw, 40px)' }}>
            <h3
              style={{
                fontStyle: 'italic',
                fontSize: 'clamp(38px, 8vw, 70px)',
                fontFamily: 'Imbue, sans-serif',
                fontWeight: 500,
                lineHeight: 1.1,
                color: 'rgba(255, 255, 255, 0.88)',
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              {show(aboutShow.standAmongHeadlineTop) && <span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{aboutShow.standAmongHeadlineTop}</span>}
              {show(aboutShow.standAmongHeadlineTop) && show(aboutShow.standAmongHeadlineBottom) && <br />}
              {show(aboutShow.standAmongHeadlineBottom) && <span style={{ color: 'rgba(255, 234, 180, 0.98)' }}>{aboutShow.standAmongHeadlineBottom}</span>}
            </h3>
          </div>
        )}

        {aboutShow.body2.length > 0 && (
          <div
            style={{
              marginTop: 40,
              maxWidth: 1100,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: '0 20px',
            }}
          >
            {aboutShow.body2.map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: 22,
                  fontFamily: '"PT Sans Narrow", sans-serif',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.95)',
                  margin: '0 0 22px',
                  fontWeight: p.bold ? 700 : 500,
                }}
              >
                {p.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
