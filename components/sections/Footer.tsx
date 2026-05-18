import type { ContentJson } from '@/lib/types'

type Props = { footer: ContentJson['footer'] }

export default function Footer({ footer }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 40, paddingBottom: 40, backgroundColor: 'rgb(0, 0, 0)' }}
    >
      <div className="containerInner" style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 12 }}>{footer.address}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
          <a href={footer.privacyUrl} style={{ color: '#888', fontSize: 12, textDecoration: 'underline' }}>
            Privacy Policy
          </a>
          <a href={footer.termsUrl} style={{ color: '#888', fontSize: 12, textDecoration: 'underline' }}>
            Terms of Service
          </a>
        </div>
        <p style={{ color: '#555', fontSize: 11, lineHeight: 1.7, maxWidth: 700, margin: '0 auto' }}>
          {footer.disclaimer}
        </p>
      </div>
    </div>
  )
}
