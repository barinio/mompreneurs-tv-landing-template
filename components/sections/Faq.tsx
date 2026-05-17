'use client'
import { useState } from 'react'
import type { ContentJson } from '@/lib/types'

type Props = { faq: ContentJson['faq']; theme: ContentJson['theme'] }

export default function Faq({ faq, theme }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder cornersAll radius0 shadow0 emptySection"
      style={{ paddingTop: 60, paddingBottom: 60, backgroundColor: '#f5f0eb' }}
    >
      <div className="containerInner" style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>
        <h2
          className="ne elHeadline"
          style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, marginBottom: 40, color: '#1a1a1a' }}
        >
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {faq.map((item, i) => (
            <div
              key={i}
              style={{ backgroundColor: '#fff', borderRadius: 6, overflow: 'hidden', border: '1px solid #e5e0da' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '18px 20px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#1a1a1a',
                }}
              >
                {item.question}
                <span style={{ color: theme.primaryColor, fontSize: 20, lineHeight: 1 }}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <div style={{ padding: '0 20px 18px', fontSize: 15, color: '#555', lineHeight: 1.7 }}>
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
