'use client'
import { useState } from 'react'
import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { faq: ContentJson['faq']; theme: ContentJson['theme'] }

export default function Faq({ faq }: Props) {
  const [open, setOpen] = useState<Set<number>>(new Set())
  const [hover, setHover] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div style={{ paddingTop: 30, paddingBottom: 30 }}>
      {show(faq.headline) && (
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'clamp(52px, 12vw, 90px)',
            color: '#fff',
            margin: '10px 0 30px',
            fontFamily: 'Imbue, sans-serif',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          {faq.headline}
        </h2>
      )}
      <div
        style={{
          width: 'min(92%, 780px)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {faq.items.map((item, i) => {
          const isOpen = open.has(i)
          const isHover = hover === i
          const buttonBg = isHover ? '#000' : 'rgb(102, 69, 46)'
          return (
            <div key={i}>
              <button
                onClick={() => toggle(i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '18px 24px',
                  background: buttonBg,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 20,
                  fontFamily: '"PT Sans Narrow", sans-serif',
                  fontWeight: 700,
                  color: '#fff',
                  transition: 'background-color 0.25s ease',
                }}
              >
                {item.question}
              </button>
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.35s ease',
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <div
                    style={{
                      padding: '22px 24px',
                      fontSize: 19,
                      fontFamily: '"PT Sans Narrow", sans-serif',
                      fontWeight: 400,
                      color: '#000',
                      backgroundColor: '#fff',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
