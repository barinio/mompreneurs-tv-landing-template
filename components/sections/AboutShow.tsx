import type { ContentJson } from '@/lib/types'

type Props = { aboutShow: ContentJson['aboutShow']; theme: ContentJson['theme'] }

export default function AboutShow({ aboutShow, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: 'rgb(0, 0, 0)' }}
    >
      <div className="containerInner" style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div
          className="row"
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 40, padding: '0 20px' }}
        >
          <div style={{ flex: '0 1 320px', textAlign: 'center' }}>
            <img
              src={aboutShow.imageUrl}
              alt="About the Show"
              className="elIMG"
              style={{ maxWidth: '100%', borderRadius: 4 }}
            />
          </div>
          <div style={{ flex: '1 1 380px' }}>
            <h2
              className="ne elHeadline"
              style={{ fontSize: 30, fontWeight: 700, color: 'rgb(255, 255, 255)', marginBottom: 20, borderLeft: '4px solid rgba(209, 177, 95, 0.98)', paddingLeft: 16 }}
            >
              ABOUT THE SHOW
            </h2>
            {aboutShow.body.split('\n\n').map((p, i) => (
              <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255, 255, 255, 0.9)', marginBottom: 16 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
