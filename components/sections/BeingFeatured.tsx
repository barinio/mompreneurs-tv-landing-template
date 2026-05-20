import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { beingFeatured: ContentJson['beingFeatured'] }

const GOLD = 'rgba(255, 234, 180, 0.98)'
const BROWN_LINE = 'rgb(102, 69, 46)'

export default function BeingFeatured({ beingFeatured }: Props) {
  return (
    <div className="parallax-bg being-featured-bg" style={{
      backgroundImage: show(beingFeatured.backgroundUrl) ? `url(${beingFeatured.backgroundUrl})` : undefined,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#000',
      paddingTop: 60,
      paddingBottom: 60,
    }}>
      <div style={{
        maxWidth: 1240,
        width: '95%',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 30,
      }}>
        {/* Spacer for left photo (background sits behind) — desktop only */}
        <div className="being-featured-spacer" style={{ flex: '1 1 480px', minHeight: 'clamp(260px, 55vw, 600px)' }} />

        {/* Right column: content */}
        <div style={{ flex: '1 1 560px', color: '#fff' }}>
          {show(beingFeatured.headline) && (
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 54px)',
              color: '#fff',
              margin: 0,
              lineHeight: 1.1,
              textTransform: 'uppercase',
              fontFamily: 'Imbue, sans-serif',
              fontWeight: 500,
            }}>
              {beingFeatured.headline}
            </h2>
          )}

          {show(beingFeatured.intro) && (
            <p style={{
              fontSize: 24,
              fontFamily: '"PT Sans Narrow", sans-serif',
              fontWeight: 500,
              color: '#fff',
              margin: '20px 0 0',
              lineHeight: 1.5,
            }}>
              {beingFeatured.intro}
            </p>
          )}

          {show(beingFeatured.createsHeadline) && (
            <h3 style={{
              fontSize: 'clamp(26px, 4vw, 34px)',
              color: GOLD,
              margin: '30px 0 10px',
              fontStyle: 'italic',
              fontFamily: 'Imbue, sans-serif',
              fontWeight: 500,
            }}>
              {beingFeatured.createsHeadline}
            </h3>
          )}

          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {beingFeatured.bullets.map((b, i) => (
              <li key={i}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 0' }}>
                  <i className="fas fa-check-circle" style={{ color: GOLD, fontSize: 22, marginTop: 4, flexShrink: 0 }} />
                  <span style={{ fontSize: 22, fontFamily: '"PT Sans Narrow", sans-serif', lineHeight: 1.45 }}>
                    <span style={{ color: GOLD, fontWeight: 700 }}>{b.title}</span>
                    <span style={{ color: '#fff', fontWeight: 400 }}> - {b.description}</span>
                  </span>
                </div>
                {i < beingFeatured.bullets.length - 1 && (
                  <div style={{ borderTop: `1px solid ${BROWN_LINE}`, margin: 0 }} />
                )}
              </li>
            ))}
          </ul>

          {show(beingFeatured.closingTop) && (
            <p style={{ fontSize: 22, fontFamily: '"PT Sans Narrow", sans-serif', fontWeight: 500, color: '#fff', margin: '28px 0 0', lineHeight: 1.5 }}>
              {beingFeatured.closingTop}
            </p>
          )}
          {show(beingFeatured.closingBold) && (
            <p style={{ fontSize: 22, fontFamily: '"PT Sans Narrow", sans-serif', fontWeight: 700, color: '#fff', margin: '14px 0 0', lineHeight: 1.5 }}>
              {beingFeatured.closingBold}
            </p>
          )}
          {show(beingFeatured.closingBottom) && (
            <p style={{ fontSize: 22, fontFamily: '"PT Sans Narrow", sans-serif', fontWeight: 500, color: '#fff', margin: '14px 0 0', lineHeight: 1.5 }}>
              {beingFeatured.closingBottom}
            </p>
          )}
          {show(beingFeatured.closingExtra) && (
            <p style={{ fontSize: 22, fontFamily: '"PT Sans Narrow", sans-serif', fontWeight: 700, color: '#fff', margin: '14px 0 0', lineHeight: 1.5 }}>
              {beingFeatured.closingExtra}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
