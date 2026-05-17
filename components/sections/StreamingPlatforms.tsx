import type { ContentJson } from '@/lib/types'

type Props = { streamingPlatforms: ContentJson['streamingPlatforms'] }

export default function StreamingPlatforms({ streamingPlatforms }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 40, paddingBottom: 40, backgroundColor: '#000' }}
    >
      <div className="containerInner" style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2
          className="ne elHeadline"
          style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 24 }}
        >
          {streamingPlatforms.heading}
        </h2>
        <img
          src={streamingPlatforms.logosDesktopUrl}
          alt="Streaming platforms"
          style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
          className="hidden-xs"
        />
        <img
          src={streamingPlatforms.logosMobileUrl}
          alt="Streaming platforms"
          style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
          className="visible-xs"
        />
      </div>
    </div>
  )
}
