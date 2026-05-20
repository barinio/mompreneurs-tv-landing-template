import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { legendsLineup: ContentJson['legendsLineup'] }

export default function LegendsLineup({ legendsLineup }: Props) {
  return (
    <div style={{ backgroundColor: '#fff', paddingTop: 50, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1100, width: '95%', margin: '0 auto' }}>
        {show(legendsLineup.headline) && (
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(26px, 5vw, 46px)',
            fontFamily: 'Montserrat, sans-serif',
            color: 'rgb(47, 47, 47)',
            margin: 0,
            lineHeight: 1.2,
            fontWeight: 700,
          }}>
            {legendsLineup.headline}
          </h2>
        )}

        {/* Featured banners */}
        <div style={{
          marginTop: 30,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {legendsLineup.featured.map((b, i) => (
            <img
              key={i}
              src={b.url}
              alt={b.alt}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                aspectRatio: '16 / 9',
                objectFit: 'cover',
              }}
            />
          ))}
        </div>

        {/* Lower grid */}
        <div style={{
          marginTop: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {legendsLineup.grid.map((b, i) => (
            <img
              key={i}
              src={b.url}
              alt={b.alt}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                aspectRatio: '16 / 9',
                objectFit: 'cover',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
