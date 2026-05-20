import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { howItWorks: ContentJson['howItWorks'] }

export default function HowItWorks({ howItWorks }: Props) {
  return (
    <div style={{ paddingTop: 40, paddingBottom: 25 }}>
      <div
        style={{
          maxWidth: 866,
          width: '95%',
          margin: '0 auto',
          backgroundColor: '#fff',
          padding: 'clamp(24px, 5vw, 40px) clamp(18px, 4vw, 35px) 25px',
          boxSizing: 'border-box',
        }}
      >
        {show(howItWorks.eyebrow) && (
          <h2
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontFamily: '"PT Sans Narrow", sans-serif',
              color: '#000',
              margin: 0,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {howItWorks.eyebrow}
          </h2>
        )}
        {show(howItWorks.headline) && (
          <h1
            style={{
              textAlign: 'center',
              fontSize: 'clamp(40px, 8vw, 72px)',
              color: 'rgb(102, 69, 46)',
              margin: '10px 0 0',
              fontFamily: 'Imbue, sans-serif',
              fontWeight: 500,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
            }}
          >
            {howItWorks.headline}
          </h1>
        )}

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '25px 0 0',
            color: '#000',
          }}
        >
          {howItWorks.items.map((item, i) => (
            <li
              key={i}
              style={{
                fontSize: 22,
                fontFamily: '"PT Sans Narrow", sans-serif',
                lineHeight: 1.5,
                margin: '0 0 18px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
              }}
            >
              <i
                className="fa-fw fas fa-check-circle"
                style={{
                  color: 'rgba(209, 177, 95, 0.98)',
                  fontSize: 22,
                  flexShrink: 0,
                  lineHeight: '33px',
                }}
              />
              <span>
                <span style={{ color: 'rgb(102, 69, 46)', fontWeight: 700 }}>{item.title}</span>
                {' - '}
                <span style={{ fontWeight: 400 }}>{item.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
