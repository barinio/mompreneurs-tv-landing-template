import type { ContentJson } from '@/lib/types'

type Props = { whoNotFor: ContentJson['whoNotFor'] }

const BROWN = 'rgb(102, 69, 46)'
const CREAM = 'rgb(255, 250, 239)'

export default function WhoNotFor({ whoNotFor }: Props) {
  return (
    <div style={{ maxWidth: 995, width: '100%', margin: '20px auto 0' }}>
      {/* Title strip */}
      <div style={{ backgroundColor: 'rgba(255, 250, 239, 0.98)', padding: '25px 0 20px' }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: 72,
          color: BROWN,
          margin: 0,
          lineHeight: 1.1,
          fontFamily: 'Imbue, sans-serif',
          fontWeight: 500,
        }}>
          WHO THIS IS NOT FOR:
        </h1>
      </div>

      {/* Cards grid */}
      <div style={{
        backgroundColor: CREAM,
        padding: '20px 50px 35px',
        marginTop: -20,
        display: 'grid',
        gridTemplateColumns: `repeat(${whoNotFor.length}, 1fr)`,
        gap: 20,
      }}>
        {whoNotFor.map((item, i) => (
          <div key={i} style={{
            border: `2px solid ${BROWN}`,
            padding: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <i className="fas fa-times-circle" style={{ color: 'rgb(168, 0, 0)', fontSize: 42, lineHeight: '1em' }} />
            <h2 style={{
              textAlign: 'center',
              fontSize: 24,
              fontFamily: '"PT Sans Narrow", sans-serif',
              color: '#000',
              margin: '15px 0 0',
              lineHeight: 1.2,
              fontWeight: 500,
            }}>
              {item.text}
            </h2>
          </div>
        ))}
      </div>
    </div>
  )
}
