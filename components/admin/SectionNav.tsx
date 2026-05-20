'use client'
import type { SectionKey } from '@/lib/types'

const SECTIONS: { key: SectionKey; label: string; icon: string }[] = [
  { key: 'meta',               label: 'SEO / Meta',      icon: '🔍' },
  { key: 'navBar',             label: 'Nav Bar',         icon: '📢' },
  { key: 'hero',               label: 'Hero',            icon: '🏠' },
  { key: 'seriesInfo',         label: 'Series Info',     icon: 'ℹ️' },
  { key: 'whoFor',             label: "Who It's For",    icon: '✅' },
  { key: 'whoNotFor',          label: "Who It's NOT For",icon: '❌' },
  { key: 'joinShow',           label: 'Join Show CTA',   icon: '📋' },
  { key: 'transformation',     label: 'Transformation',  icon: '🎯' },
  { key: 'itsTime',            label: "It's Time",       icon: '⏰' },
  { key: 'beingFeatured',      label: 'Being Featured',  icon: '🎬' },
  { key: 'trustedMedia',       label: 'Trusted Media',   icon: '📰' },
  { key: 'legendsLineup',      label: 'Legends Lineup',  icon: '🏆' },
  { key: 'otherShows',         label: 'Other Shows',     icon: '📺' },
  { key: 'tvPackageIncluded',  label: 'TV Package',      icon: '📦' },
  { key: 'bigScreen',          label: 'Big Screen',      icon: '▶️' },
  { key: 'pressAwards',        label: 'Press & Awards',  icon: '🏅' },
  { key: 'aboutShow',          label: 'About the Show',  icon: '🎥' },
  { key: 'howItWorks',         label: 'How It Works',    icon: '🔄' },
  { key: 'aboutNetwork',       label: 'About Network',   icon: '🏢' },
  { key: 'faq',                label: 'FAQ',             icon: '❓' },
  { key: 'nineConsiderations', label: 'Considerations',  icon: '💡' },
  { key: 'footer',             label: 'Footer',          icon: '🦶' },
  { key: 'theme',              label: 'Theme',           icon: '🎨' },
]

type Props = {
  active: SectionKey
  onChange: (key: SectionKey) => void
}

export default function SectionNav({ active, onChange }: Props) {
  return (
    <nav className="w-44 bg-gray-800 text-gray-200 flex flex-col overflow-y-auto flex-shrink-0 h-full">
      <div className="px-3 py-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">
        Sections
      </div>
      {SECTIONS.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-700 transition-colors ${
            active === key ? 'bg-gray-600 font-semibold' : ''
          }`}
        >
          <span className="text-base">{icon}</span>
          <span className="truncate">{label}</span>
        </button>
      ))}
    </nav>
  )
}
