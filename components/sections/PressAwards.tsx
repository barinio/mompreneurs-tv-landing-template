import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { pressAwards: ContentJson['pressAwards'] }

const CREAM = 'rgb(243, 240, 234)'

export default function PressAwards({ pressAwards }: Props) {
  return (
    <div className="parallax-bg" style={{
      backgroundImage: show(pressAwards.bgImageUrl) ? `url(${pressAwards.bgImageUrl})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'rgb(29, 29, 29)',
      paddingTop: 60,
      paddingBottom: 60,
    }}>
      <div style={{ maxWidth: 1100, width: '95%', margin: '0 auto', textAlign: 'center' }}>
        {/* AS SEEN ON */}
        {show(pressAwards.seenOnHeadline) && (
          <h2 style={{
            fontSize: 'clamp(34px, 7vw, 60px)',
            color: '#fff',
            margin: 0,
            lineHeight: 1,
            textTransform: 'uppercase',
            fontFamily: 'Imbue, sans-serif',
            fontWeight: 500,
          }}>
            {pressAwards.seenOnHeadline}
          </h2>
        )}
        {show(pressAwards.seenOnLogosUrl) && (
          <div style={{ marginTop: 30 }}>
            <img
              src={pressAwards.seenOnLogosUrl}
              alt=""
              style={{ maxWidth: 800, width: '100%', height: 'auto', display: 'inline-block' }}
            />
          </div>
        )}

        {/* REVIEWS */}
        {show(pressAwards.reviewsHeadline) && (
          <h2 style={{
            fontSize: 'clamp(34px, 7vw, 60px)',
            color: '#fff',
            margin: '60px 0 0',
            lineHeight: 1,
            textTransform: 'uppercase',
            fontFamily: 'Imbue, sans-serif',
            fontWeight: 500,
          }}>
            {pressAwards.reviewsHeadline}
          </h2>
        )}
        {(show(pressAwards.reviewsImageDesktopUrl) || show(pressAwards.reviewsImageMobileUrl)) && (
          <div style={{ marginTop: 30 }}>
            <picture>
              {show(pressAwards.reviewsImageDesktopUrl) && (
                <source media="(min-width: 768px)" srcSet={pressAwards.reviewsImageDesktopUrl} />
              )}
              <img
                src={pressAwards.reviewsImageMobileUrl || pressAwards.reviewsImageDesktopUrl}
                alt=""
                style={{ maxWidth: '100%', height: 'auto', display: 'inline-block' }}
              />
            </picture>
          </div>
        )}

        {/* AWARDS */}
        {(show(pressAwards.awardsHeadlineTop) || show(pressAwards.awardsHeadlineBottom)) && (
          <h2 style={{
            fontSize: 'clamp(34px, 7vw, 60px)',
            color: CREAM,
            margin: '70px 0 0',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            fontFamily: 'Imbue, sans-serif',
            fontWeight: 500,
          }}>
            {show(pressAwards.awardsHeadlineTop) && <span style={{ display: 'block' }}>{pressAwards.awardsHeadlineTop}</span>}
            {show(pressAwards.awardsHeadlineBottom) && <span style={{ display: 'block' }}>{pressAwards.awardsHeadlineBottom}</span>}
          </h2>
        )}
        {show(pressAwards.awardsImageUrl) && (
          <div style={{ marginTop: 25 }}>
            <img
              src={pressAwards.awardsImageUrl}
              alt=""
              style={{ maxWidth: '100%', height: 'auto', display: 'inline-block' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
