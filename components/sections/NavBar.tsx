import type { ContentJson } from '@/lib/types'

type Props = { ctaUrl: string }

export default function NavBar({ ctaUrl }: Props) {
  return (
    <div
      className="container fullContainer noTopMargin padding20-top padding20-bottom padding40H noBorder borderSolid border3px cornersAll radius0 shadow0 bgNoRepeat emptySection containerWithVisibleOverflow stickyTop"
      style={{ paddingTop: 0, paddingBottom: 3, backgroundColor: 'rgba(22, 10, 1, 0.97)', marginTop: 0, position: 'sticky', top: 0, zIndex: 99 }}
    >
      <div className="containerInner">
        <div className="row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 20px' }}>
          <iframe
            src="https://www.womeninpowertv.com/header-line-global"
            style={{ border: 'none', width: '70%', minHeight: 60, height: 60, display: 'block', overflow: 'hidden' }}
            scrolling="no"
          />
          <a
            href={ctaUrl}
            className="elButton elButtonSize1 elButtonFlat elButtonRounded elButtonPadding2"
            style={{ color: 'rgb(255, 255, 255)', backgroundColor: 'rgb(214, 8, 46)', fontSize: 22, fontWeight: 600, padding: '10px 24px', textDecoration: 'none', borderRadius: 4, whiteSpace: 'nowrap' }}
          >
            APPLY NOW
          </a>
        </div>
      </div>
    </div>
  )
}
