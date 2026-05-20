import type { ContentJson } from '@/lib/types'
import { show } from '@/lib/show'

type Props = { whoFor: ContentJson['whoFor']; theme: ContentJson['theme'] }

const ICON_STYLE = { color: 'rgba(255,234,180,0.98)', fontSize: 42, lineHeight: '1em', display: 'block', textAlign: 'center' as const }
const ITEM_TITLE_STYLE = { textAlign: 'center' as const, fontSize: 'clamp(19px, 2.2vw, 24px)', fontWeight: 700, color: '#fff', marginTop: 10, marginBottom: 0, lineHeight: 1.2 }
const ITEM_DESC_STYLE = { textAlign: 'center' as const, fontSize: 'clamp(17px, 2vw, 21px)', color: '#fff', marginTop: 8, marginBottom: 0, lineHeight: 1.3, fontWeight: 500 }
const BROWN_BG = 'rgb(102, 69, 46)'

function ItemCard({ item }: { item: ContentJson['whoFor']['items'][number] }) {
  return (
    <div style={{ flex: '0 1 230px', boxSizing: 'border-box', padding: '10px' }}>
      <i className="fas fa-check-circle" style={ICON_STYLE} />
      <h2 style={ITEM_TITLE_STYLE}>{item.title}</h2>
      <h2 style={ITEM_DESC_STYLE}>{item.description}</h2>
    </div>
  )
}

export default function WhoFor({ whoFor }: Props) {
  return (
    <div style={{ maxWidth: 995, width: '100%', margin: '0 auto' }}>
      {/* Title panel — overlaps slightly above */}
      {(show(whoFor.headline) || show(whoFor.subheadline)) && (
        <div style={{ backgroundColor: BROWN_BG, padding: '20px 10px', marginTop: -40 }}>
          {show(whoFor.headline) && (
            <h1 style={{ textAlign: 'center', fontSize: 'clamp(40px, 8vw, 72px)', color: '#fff', margin: 0, lineHeight: 1.1, fontFamily: 'Imbue, sans-serif', fontWeight: 500 }}>{whoFor.headline}</h1>
          )}
          {show(whoFor.subheadline) && (
            <h2 style={{ textAlign: 'center', fontSize: 'clamp(18px, 2.4vw, 23px)', fontFamily: '"PT Sans Narrow", sans-serif', color: '#fff', marginTop: 8, marginBottom: 0, fontWeight: 'normal' }}>
              {whoFor.subheadline}
            </h2>
          )}
        </div>
      )}

      {/* Items — centered, wrap evenly at every width */}
      <div style={{
        backgroundColor: BROWN_BG,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '0 0 40px',
      }}>
        {whoFor.items.map((item, i) => <ItemCard key={i} item={item} />)}
      </div>
    </div>
  )
}
