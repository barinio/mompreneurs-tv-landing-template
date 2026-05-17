import type { ContentJson } from '@/lib/types'

type Props = { seriesInfo: ContentJson['seriesInfo']; hero: ContentJson['hero']; theme: ContentJson['theme'] }

export default function SeriesInfo({ seriesInfo, hero, theme }: Props) {
  const items = [
    { label: 'Series', value: seriesInfo.series },
    { label: 'Status', value: seriesInfo.status },
    { label: 'Location', value: seriesInfo.location },
    { label: 'Filming', value: seriesInfo.filmingDate },
  ]

  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 40, paddingBottom: 40, backgroundColor: '#1a1a1a' }}
    >
      <div className="containerInner">
        <div className="row" style={{ paddingTop: 10, paddingBottom: 10 }}>
          <div className="col-md-12 innerContent">
            <div
              className="col-inner"
              style={{
                padding: '0 20px',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 30,
              }}
            >
              {items.map((item) => (
                <div
                  key={item.label}
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    minWidth: 160,
                    border: `2px solid ${theme.primaryColor}`,
                    borderRadius: 4,
                    padding: '16px 24px',
                  }}
                >
                  <div style={{ fontSize: 12, color: theme.primaryColor, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 30 }}>
              <a href={hero.ctaUrl} target="_blank" rel="noopener noreferrer">
                <button
                  className="elButton elButtonSize1"
                  style={{
                    backgroundColor: theme.primaryColor,
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 700,
                    padding: '14px 40px',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    letterSpacing: 2,
                  }}
                >
                  {hero.ctaText}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
