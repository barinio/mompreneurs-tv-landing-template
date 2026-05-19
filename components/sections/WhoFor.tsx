import type { ContentJson } from '@/lib/types'

type Props = { whoFor: ContentJson['whoFor']; theme: ContentJson['theme'] }

const ICON_STYLE = { color: 'rgba(255,234,180,0.98)', fontSize: 42, lineHeight: '1em', display: 'block', textAlign: 'center' as const }
const ITEM_TITLE_STYLE = { textAlign: 'center' as const, fontSize: 24, fontWeight: 700, color: '#fff', marginTop: 10, marginBottom: 0, lineHeight: 1.2 }
const ITEM_DESC_STYLE = { textAlign: 'center' as const, fontSize: 21, color: '#fff', marginTop: 8, marginBottom: 0, lineHeight: 1.3, fontWeight: 500 }
const BROWN_BG = 'rgb(102, 69, 46)'

function ItemCard({ item }: { item: ContentJson['whoFor'][number] }) {
  return (
    <div style={{ padding: '0 10px' }}>
      <i className="fas fa-check-circle" style={ICON_STYLE} />
      <h2 style={ITEM_TITLE_STYLE}>{item.title}</h2>
      <h2 style={ITEM_DESC_STYLE}>{item.description}</h2>
    </div>
  )
}

export default function WhoFor({ whoFor }: Props) {
  const row1 = whoFor.slice(0, 4)
  const row2 = whoFor.slice(4)

  return (
    <div style={{ maxWidth: 995, width: '100%', margin: '0 auto' }}>
      {/* Title panel — overlaps slightly above */}
      <div style={{ backgroundColor: BROWN_BG, padding: '20px 10px', marginTop: -40 }}>
        <h1 style={{ textAlign: 'center', fontSize: 72, color: '#fff', margin: 0, lineHeight: 1.1, fontFamily: 'Imbue, sans-serif', fontWeight: 500 }}>WHO THIS IS FOR</h1>
        <h2 style={{ textAlign: 'center', fontSize: 23, fontFamily: '"PT Sans Narrow", sans-serif', color: '#fff', marginTop: 8, marginBottom: 0, fontWeight: 'normal', whiteSpace: 'nowrap' }}>
          This opportunity is designed for successful Mompreneurs who have built real wealth while raising their children:
        </h2>
      </div>

      {/* Row 1 — 4 columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        backgroundColor: BROWN_BG,
        paddingTop: 0,
        paddingBottom: 20,
      }}>
        {row1.map((item, i) => <ItemCard key={i} item={item} />)}
      </div>

      {/* Row 2 — remaining items centered */}
      {row2.length > 0 && (
        <div style={{ backgroundColor: BROWN_BG, padding: '10px 0 40px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${row2.length}, 1fr)`,
            width: `${(row2.length / 4) * 100}%`,
            margin: '0 auto',
          }}>
            {row2.map((item, i) => <ItemCard key={i} item={item} />)}
          </div>
        </div>
      )}
    </div>
  )
}
