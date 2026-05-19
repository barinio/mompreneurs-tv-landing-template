import type { ContentJson } from '@/lib/types'

type Props = { pressAwards: ContentJson['pressAwards'] }

const CREAM = 'rgb(243, 240, 234)'

export default function PressAwards({ pressAwards }: Props) {
  return (
    <div style={{
      backgroundImage: 'url(/images/lm.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'rgb(29, 29, 29)',
      paddingTop: 60,
      paddingBottom: 60,
    }}>
      <div style={{ maxWidth: 1100, width: '95%', margin: '0 auto', textAlign: 'center' }}>
        {/* AS SEEN ON */}
        <h2 style={{
          fontSize: 60,
          color: '#fff',
          margin: 0,
          lineHeight: 1,
          textTransform: 'uppercase',
          fontFamily: 'Imbue, sans-serif',
          fontWeight: 500,
        }}>
          {pressAwards.seenOnHeadline}
        </h2>
        <div style={{ marginTop: 30 }}>
          <img
            src={pressAwards.seenOnLogosUrl}
            alt=""
            style={{ maxWidth: 800, width: '100%', height: 'auto', display: 'inline-block' }}
          />
        </div>

        {/* REVIEWS */}
        <h2 style={{
          fontSize: 60,
          color: '#fff',
          margin: '60px 0 0',
          lineHeight: 1,
          textTransform: 'uppercase',
          fontFamily: 'Imbue, sans-serif',
          fontWeight: 500,
        }}>
          {pressAwards.reviewsHeadline}
        </h2>
        <div style={{ marginTop: 30 }}>
          <picture>
            <source media="(min-width: 768px)" srcSet={pressAwards.reviewsImageDesktopUrl} />
            <img
              src={pressAwards.reviewsImageMobileUrl}
              alt=""
              style={{ maxWidth: '100%', height: 'auto', display: 'inline-block' }}
            />
          </picture>
        </div>

        {/* AWARDS */}
        <h2 style={{
          fontSize: 60,
          color: CREAM,
          margin: '70px 0 0',
          lineHeight: 1.05,
          textTransform: 'uppercase',
          fontFamily: 'Imbue, sans-serif',
          fontWeight: 500,
        }}>
          <span style={{ display: 'block' }}>{pressAwards.awardsHeadlineTop}</span>
          <span style={{ display: 'block' }}>{pressAwards.awardsHeadlineBottom}</span>
        </h2>
        <div style={{ marginTop: 25 }}>
          <img
            src={pressAwards.awardsImageUrl}
            alt=""
            style={{ maxWidth: '100%', height: 'auto', display: 'inline-block' }}
          />
        </div>
      </div>
    </div>
  )
}
