import type { ContentJson } from '@/lib/types'

type Props = { howItWorks: ContentJson['howItWorks']; theme: ContentJson['theme'] }

export default function HowItWorks({ howItWorks, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#fff' }}
    >
      <div className="containerInner" style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>
        <h2
          className="ne elHeadline"
          style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 48, color: '#1a1a1a' }}
        >
          HOW IT WORKS
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {howItWorks.map((step, i) => (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 32 }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: theme.primaryColor,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {step.step}
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, margin: 0 }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
