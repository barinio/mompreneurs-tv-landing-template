import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { trustedMedia: ContentJson['trustedMedia'] }

export default function TrustedMedia({ trustedMedia }: Props) {
  return (
    <div style={{
      backgroundColor: '#000',
      paddingTop: 60,
      paddingBottom: 60,
    }}>
      <div style={{ maxWidth: 1140, width: '95%', margin: '0 auto', textAlign: 'center' }}>
        {show(trustedMedia.headline) && (
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 62px)',
            color: '#fff',
            margin: 0,
            lineHeight: 1.1,
            textTransform: 'uppercase',
            fontFamily: 'Imbue, sans-serif',
            fontWeight: 500,
          }}>
            {trustedMedia.headline}
          </h2>
        )}

        <div style={{
          marginTop: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}>
          {trustedMedia.screenshots.map((url, i) => (
            <img
              key={i}
              src={url}
              alt=""
              style={{
                maxWidth: '100%',
                width: 900,
                height: 'auto',
                display: 'block',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
