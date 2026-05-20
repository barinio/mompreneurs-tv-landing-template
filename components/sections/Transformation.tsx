import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { transformation: ContentJson['transformation']; hero: ContentJson['hero']; theme: ContentJson['theme'] }

const BROWN = 'rgb(102, 69, 46)'
const GOLD = 'rgba(255, 234, 180, 0.98)'

export default function Transformation({ transformation }: Props) {
  return (
    <div style={{ maxWidth: 1140, width: '95%', margin: '50px auto 0', padding: '20px 0 25px' }}>
      {/* Title */}
      {show(transformation.headline) && (
        <h1 style={{
          textAlign: 'center',
          fontSize: 'clamp(48px, 12vw, 110px)',
          color: '#fff',
          margin: 0,
          lineHeight: 1,
          textTransform: 'uppercase',
          letterSpacing: '-1px',
          fontFamily: 'Imbue, sans-serif',
          fontWeight: 500,
        }}>
          {transformation.headline}
        </h1>
      )}
      {show(transformation.subheadline) && (
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(20px, 3vw, 28px)',
          color: '#fff',
          margin: '10px 0 0',
          fontWeight: 'normal',
          lineHeight: 1.3,
        }}>
          {transformation.subheadline}
        </h2>
      )}

      {/* 2-column row: bullets + poster */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 30,
        marginTop: 40,
        padding: '0 20px',
      }}>
        {/* Bullets — left side */}
        <div style={{ flex: '1 1 500px' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, color: '#fff' }}>
            {transformation.benefits.map((b, i) => (
              <li key={i}>
                <div style={{ fontSize: 22, display: 'flex', alignItems: 'flex-start', gap: 12, padding: '8px 0' }}>
                  <i className="fas fa-check-circle" style={{ color: GOLD, fontSize: 24, marginTop: 4, flexShrink: 0 }} />
                  <span style={{ lineHeight: 1.4 }}>
                    <b style={{ color: GOLD }}>{b.title} – </b>
                    <span style={{ color: '#fff' }}>{b.description}</span>
                  </span>
                </div>
                {i < transformation.benefits.length - 1 && (
                  <div style={{ borderTop: `1px solid ${BROWN}`, margin: '4px 0' }} />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Poster — right side */}
        {show(transformation.posterUrl) && (
          <div style={{ flex: '0 1 420px', textAlign: 'center' }}>
            <img src={transformation.posterUrl} alt="" style={{ width: '100%', maxWidth: 420, height: 'auto' }} />
          </div>
        )}
      </div>
    </div>
  )
}
