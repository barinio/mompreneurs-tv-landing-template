import type { ContentJson } from '@/lib/types'

type Props = { howItWorks: ContentJson['howItWorks']; theme: ContentJson['theme'] }

export default function HowItWorks({ howItWorks, theme }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: 'rgb(142, 123, 107)' }}
    >
      <div className="containerInner" style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: 'rgb(255, 255, 255)', padding: 40, borderRadius: 4 }}>
          <h2
            className="ne elHeadline"
            style={{ textAlign: 'center', fontSize: 36, fontWeight: 700, marginBottom: 48, color: 'rgb(102, 69, 46)' }}
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
                    backgroundColor: 'rgba(209, 177, 95, 0.98)',
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
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgb(0, 0, 0)', marginBottom: 6 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'rgb(0, 0, 0)', lineHeight: 1.7, margin: 0 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
