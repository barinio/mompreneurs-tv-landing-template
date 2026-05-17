import type { ContentJson } from '@/lib/types'

type Props = { aboutNetwork: ContentJson['aboutNetwork']; theme: ContentJson['theme'] }

export default function AboutNetwork({ aboutNetwork }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#1d1d1d' }}
    >
      <div
        className="containerInner"
        style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}
      >
        <img
          src={aboutNetwork.logoUrl}
          alt="Inside Success Network"
          style={{ maxWidth: 240, marginBottom: 28 }}
        />
        <p style={{ fontSize: 16, color: '#ccc', lineHeight: 1.8 }}>{aboutNetwork.body}</p>
      </div>
    </div>
  )
}
