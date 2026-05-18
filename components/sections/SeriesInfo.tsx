import type { ContentJson } from '@/lib/types'

type Props = {
  seriesInfo: ContentJson['seriesInfo']
  hero: ContentJson['hero']
  theme: ContentJson['theme']
}

const BOXES = [
  { icon: 'fas fa-film', label: 'SERIES', key: 'series' as const },
  { icon: 'fas fa-users', label: 'STATUS', key: 'status' as const },
  { icon: 'fas fa-map-marker-alt', label: 'FILM LOCATION', key: 'location' as const },
  { icon: 'fas fa-calendar-alt', label: 'FILMING DATE', key: 'filmingDate' as const },
]

export default function SeriesInfo({ seriesInfo, hero, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 0, paddingBottom: 25, backgroundColor: 'rgb(0, 0, 0)', marginTop: -40 }}
    >
      <div className="containerInner">
        {/* 4-column info row */}
        <div
          className="row"
          style={{
            backgroundColor: 'rgb(255, 250, 239)',
            padding: 35,
            width: '85%',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            borderRadius: 4,
          }}
        >
          {BOXES.map((box, i) => (
            <div
              key={box.key}
              style={{
                flex: '1 1 180px',
                paddingRight: i < 3 ? 24 : 0,
                borderRight: i < 3 ? '1px solid rgb(216, 216, 216)' : 'none',
                marginRight: i < 3 ? 24 : 0,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
                <i className={box.icon} style={{ color: 'rgba(209, 177, 95, 0.98)', marginRight: 8, fontSize: 24 }} />
                <strong>{box.label}</strong>
              </div>
              <h2
                className="ne elHeadline"
                style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px 0', textTransform: 'uppercase' }}
              >
                {seriesInfo[box.key]}
              </h2>
              <div style={{ borderTop: '1px solid rgb(216, 216, 216)', marginTop: 8 }} />
            </div>
          ))}
        </div>

        {/* CTA below info row */}
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <a
            href={hero.ctaUrl}
            className="elButton elButtonSize1 elButtonFlat elButtonRounded elButtonPadding2"
            style={{
              display: 'inline-block',
              color: 'rgb(255, 255, 255)',
              backgroundColor: 'rgb(214, 8, 46)',
              fontSize: 20,
              fontWeight: 600,
              padding: '14px 36px',
              textDecoration: 'none',
              borderRadius: 4,
            }}
          >
            {hero.ctaText}
          </a>
        </div>
      </div>
    </div>
  )
}
