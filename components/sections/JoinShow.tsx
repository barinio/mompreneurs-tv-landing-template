import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = {
  joinShow: ContentJson['joinShow']
  imageUrl: string
  headlineColor?: string
  subheadlineColor?: string
}

export default function JoinShow({
  joinShow,
  imageUrl,
  headlineColor = '#fff',
  subheadlineColor = 'rgba(255, 234, 180, 0.98)',
}: Props) {
  return (
    <div style={{ padding: '20px 0', textAlign: 'center' }}>
      {show(joinShow.headline) && (
        <h1 style={{
          textAlign: 'center',
          fontSize: 'clamp(38px, 8vw, 72px)',
          color: headlineColor,
          margin: 0,
          lineHeight: 1.1,
          fontFamily: 'Imbue, sans-serif',
          fontWeight: 500,
        }}>
          {joinShow.headline}
        </h1>
      )}
      {show(joinShow.subheadline) && (
        <h1 style={{
          textAlign: 'center',
          fontSize: 'clamp(38px, 8vw, 72px)',
          color: subheadlineColor,
          margin: '-6px 0 0',
          lineHeight: 1,
          fontFamily: 'Imbue, sans-serif',
          fontWeight: 500,
        }}>
          {joinShow.subheadline}
        </h1>
      )}

      <div style={{ marginTop: 30, textAlign: 'center' }}>
        <img
          src={imageUrl}
          alt=""
          className="elIMG ximg el_media_theme1"
          width={1100}
          height={665}
          style={{
            width: 1100,
            height: 'auto',
            maxWidth: '100%',
            border: '2px solid rgba(0,0,0,0.15)',
            padding: 5,
            background: '#fff',
            display: 'inline-block',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {show(joinShow.ctaText) && (
        <div style={{ marginTop: 25 }}>
          <a href={joinShow.ctaUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button className="cta-btn" style={{
              color: '#fff',
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontFamily: '"Roboto Condensed", sans-serif',
              fontWeight: 600,
              padding: '18px clamp(28px, 8vw, 70px)',
              maxWidth: '100%',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              whiteSpace: 'normal',
            }}>
              {joinShow.ctaText}
            </button>
          </a>
        </div>
      )}
    </div>
  )
}
