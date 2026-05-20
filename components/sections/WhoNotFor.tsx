import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { whoNotFor: ContentJson['whoNotFor'] }

const BROWN = 'rgb(102, 69, 46)'
const CREAM = 'rgb(255, 250, 239)'

export default function WhoNotFor({ whoNotFor }: Props) {
  return (
    <div style={{ maxWidth: 995, width: '100%', margin: '20px auto 0' }}>
      {/* Title strip */}
      {show(whoNotFor.headline) && (
        <div style={{ backgroundColor: 'rgba(255, 250, 239, 0.98)', padding: '25px 0 20px' }}>
          <h1 style={{
            textAlign: 'center',
            fontSize: 'clamp(36px, 8vw, 72px)',
            color: BROWN,
            margin: 0,
            lineHeight: 1.1,
            fontFamily: 'Imbue, sans-serif',
            fontWeight: 500,
          }}>
            {whoNotFor.headline}
          </h1>
        </div>
      )}

      {/* Cards — centered, wrap evenly at every width */}
      <div style={{
        backgroundColor: CREAM,
        padding: 'clamp(20px, 5vw, 50px)',
        marginTop: -20,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
      }}>
        {whoNotFor.items.map((item, i) => (
          <div key={i} style={{
            flex: '0 1 280px',
            boxSizing: 'border-box',
            border: `2px solid ${BROWN}`,
            padding: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <i className="fas fa-times-circle" style={{ color: 'rgb(168, 0, 0)', fontSize: 42, lineHeight: '1em' }} />
            <h2 style={{
              textAlign: 'center',
              fontSize: 'clamp(19px, 2.2vw, 24px)',
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
