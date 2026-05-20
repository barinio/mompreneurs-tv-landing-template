import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { otherShows: ContentJson['otherShows'] }

export default function OtherShows({ otherShows }: Props) {
  return (
    <div style={{ backgroundColor: '#fff', paddingTop: 50, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1100, width: '95%', margin: '0 auto' }}>
        {show(otherShows.headline) && (
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(26px, 5vw, 46px)',
            fontFamily: 'Montserrat, sans-serif',
            color: 'rgb(47, 47, 47)',
            margin: 0,
            lineHeight: 1.2,
            fontWeight: 700,
          }}>
            {otherShows.headline}
          </h2>
        )}

        <div style={{
          marginTop: 40,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {otherShows.posters.map((p, i) => (
            <img
              key={i}
              src={p.url}
              alt={p.alt}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                aspectRatio: '2 / 3',
                objectFit: 'cover',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
