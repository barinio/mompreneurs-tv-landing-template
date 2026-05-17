import type { ContentJson } from '@/lib/types'

type Props = { cast: ContentJson['cast']; theme: ContentJson['theme'] }

export default function Cast({ cast, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 40, paddingBottom: 40, backgroundColor: theme.primaryColor }}
    >
      <div className="containerInner">
        <div className="row" style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
          <div className="col-md-12 innerContent">
            <div className="col-inner" style={{ padding: '0 10px' }}>
              <h2
                className="ne elHeadline hsSize3 elMargin0"
                style={{ color: '#fff', fontSize: 48, fontWeight: 700, marginBottom: 30, textAlign: 'center' }}
              >
                {cast.heading}
              </h2>
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 20 }}>
                {cast.images.map((img, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <img
                      src={img.url}
                      alt={img.label}
                      className="elIMG"
                      style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 4 }}
                    />
                    <p style={{ color: '#fff', marginTop: 8, fontWeight: 600 }}>{img.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
