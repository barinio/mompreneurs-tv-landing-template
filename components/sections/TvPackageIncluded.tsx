import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { tvPackageIncluded: ContentJson['tvPackageIncluded'] }

const GOLD = 'rgba(209, 177, 95, 0.98)'
const BROWN_TITLE = 'rgb(102, 69, 46)'
const CREAM_GOLD = 'rgba(255, 234, 180, 0.98)'

export default function TvPackageIncluded({ tvPackageIncluded }: Props) {
  return (
    <div className="parallax-bg" style={{
      backgroundImage: show(tvPackageIncluded.bgImageUrl) ? `url(${tvPackageIncluded.bgImageUrl})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#000',
      paddingTop: 60,
      paddingBottom: 60,
    }}>
      <div style={{ maxWidth: 1100, width: '95%', margin: '0 auto' }}>
        {/* Headline */}
        {show(tvPackageIncluded.headlineTop) && (
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(24px, 4vw, 38px)',
            color: '#fff',
            margin: 0,
            lineHeight: 1.1,
            textTransform: 'uppercase',
            fontFamily: 'Imbue, sans-serif',
            fontWeight: 500,
          }}>
            {tvPackageIncluded.headlineTop}
          </h2>
        )}
        {show(tvPackageIncluded.logoUrl) && (
          <div style={{ textAlign: 'center', marginTop: -5 }}>
            <img
              src={tvPackageIncluded.logoUrl}
              alt=""
              width={620}
              style={{ width: 620, maxWidth: '100%', height: 'auto', display: 'inline-block' }}
            />
          </div>
        )}
        {show(tvPackageIncluded.headlineBottom) && (
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(34px, 7vw, 60px)',
            color: CREAM_GOLD,
            margin: '-15px 0 0',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            fontFamily: 'Imbue, sans-serif',
            fontWeight: 500,
          }}>
            {tvPackageIncluded.headlineBottom}
          </h2>
        )}

        {/* Cards */}
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {tvPackageIncluded.items.map((item, i) => (
            <div key={i} style={{
              backgroundColor: '#fffdf6',
              padding: 24,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 24,
            }}>
              <div style={{ flex: '0 0 260px' }}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    width: '100%',
                    maxWidth: 260,
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </div>
              <div style={{ flex: '1 1 420px', minWidth: 280 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  fontSize: 'clamp(22px, 2.6vw, 28px)',
                  fontFamily: '"PT Sans Narrow", sans-serif',
                  fontWeight: 700,
                  color: BROWN_TITLE,
                  lineHeight: 1.3,
                }}>
                  <i className="fas fa-check-circle" style={{ color: GOLD, fontSize: '1em', marginTop: 4, flexShrink: 0 }} />
                  <span>{item.title}</span>
                </div>
                <div style={{ borderTop: '1px solid rgb(216, 200, 178)', margin: '14px 0' }} />
                <p style={{
                  fontSize: 21,
                  fontFamily: '"PT Sans Narrow", sans-serif',
                  fontWeight: 400,
                  color: '#000',
                  lineHeight: 1.55,
                  margin: 0,
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing paragraphs on dark bg */}
        <div style={{ marginTop: 40, color: '#fff', fontSize: 22, fontFamily: '"PT Sans Narrow", sans-serif', fontWeight: 500, lineHeight: 1.55 }}>
          {tvPackageIncluded.closingParagraphs.map((p, i) => (
            <p key={i} style={{ margin: i === 0 ? 0 : '18px 0 0' }}>
              {p.text}
              {p.boldSuffix && <b> {p.boldSuffix}</b>}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
