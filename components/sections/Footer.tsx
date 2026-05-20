import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { footer: ContentJson['footer'] }

export default function Footer({ footer }: Props) {
  return (
    <div
      style={{
        backgroundColor: '#000',
        paddingTop: 35,
        paddingBottom: 35,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          padding: '20px 10px',
          textAlign: 'center',
        }}
      >
        {show(footer.logoUrl) && (
          <img
            src={footer.logoUrl}
            alt="Inside Success"
            style={{
              width: 100,
              height: 'auto',
              display: 'inline-block',
            }}
          />
        )}

        <div style={{ marginTop: 15, color: '#fff', fontSize: 15, fontFamily: '"PT Sans Narrow", sans-serif' }}>
          {show(footer.privacyLabel) && (
            <div>
              <a
                href={footer.privacyUrl}
                style={{
                  color: '#fff',
                  fontFamily: '"PT Sans Narrow", sans-serif',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                {footer.privacyLabel}
              </a>
            </div>
          )}
          {show(footer.termsLabel) && (
            <div>
              <a
                href={footer.termsUrl}
                style={{
                  color: '#fff',
                  fontFamily: '"PT Sans Narrow", sans-serif',
                  fontWeight: 700,
                  textDecoration: 'none',
                  padding: '10px 0',
                  display: 'inline-block',
                }}
              >
                {footer.termsLabel}
              </a>
            </div>
          )}

          {show(footer.disclaimerHeadline) && (
            <div style={{ fontFamily: '"PT Sans Narrow", sans-serif', fontWeight: 700 }}>{footer.disclaimerHeadline}</div>
          )}

          {footer.disclaimerParagraphs.map((p, i) => (
            <div
              key={i}
              style={{
                fontFamily: '"PT Sans Narrow", sans-serif',
                fontWeight: 400,
                lineHeight: 1.7,
                marginTop: 16,
              }}
            >
              {p}
            </div>
          ))}

          {show(footer.address) && (
            <div
              style={{
                fontFamily: '"PT Sans Narrow", sans-serif',
                fontWeight: 700,
                marginTop: 16,
                textTransform: 'uppercase',
                whiteSpace: 'pre-line',
              }}
            >
              {footer.address}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
