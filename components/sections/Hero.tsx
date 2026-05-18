import type { ContentJson } from '@/lib/types'

type Props = {
  hero: ContentJson['hero']
  theme: ContentJson['theme']
}

export default function Hero({ hero, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder borderSolid border3px cornersAll radius0 shadow0 emptySection bgCover100"
      style={{ paddingTop: 0, paddingBottom: 60, backgroundColor: '#000', outline: 'none', backgroundImage: "url('/images/mompreneurs1-mob-1-.png')", backgroundSize: 'cover', backgroundPosition: 'center top' }}
    >
      <div className="containerInner">
        <div className="row" style={{ paddingTop: 20, paddingBottom: 20, textAlign: 'center' }}>
          <div className="col-md-12 innerContent">
            <div className="col-inner" style={{ padding: '0 10px' }}>
              <div className="de elImageWrapper elAlign_center elMargin0" style={{ marginTop: 20 }}>
                <img src={hero.logoUrl} className="elIMG ximg" alt="Logo" style={{ maxWidth: 300 }} />
              </div>
              <div className="de elHeadlineWrapper" style={{ marginTop: 20 }}>
                <h1
                  className="ne elHeadline hsSize3 elMargin0"
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 42,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {hero.headline}
                </h1>
              </div>
              <div className="de elButtonWrapper elAlign_center" style={{ marginTop: 30, marginBottom: 20 }}>
                <a href={hero.ctaUrl} target="_blank" rel="noopener noreferrer">
                  <button
                    className="elButton elButtonSize1 elButtonFlat"
                    style={{
                      backgroundColor: theme.accentColor,
                      color: '#fff',
                      fontSize: 20,
                      fontWeight: 700,
                      padding: '16px 48px',
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
    </div>
  )
}
