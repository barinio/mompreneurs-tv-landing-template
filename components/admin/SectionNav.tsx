'use client'
import type { SectionKey } from '@/lib/types'

const SECTIONS: { key: SectionKey; label: string; icon: string }[] = [
  { key: 'hero',                label: 'Hero',               icon: '🏠' },
  { key: 'cast',                label: 'Cast',               icon: '⭐' },
  { key: 'seriesInfo',          label: 'Series Info',        icon: 'ℹ️' },
  { key: 'whoFor',              label: "Who It's For",       icon: '✅' },
  { key: 'whoNotFor',           label: "Who It's NOT For",   icon: '❌' },
  { key: 'transformation',      label: 'Transformation',     icon: '🎯' },
  { key: 'problemSolution',     label: 'Problem/Solution',   icon: '📖' },
  { key: 'aboutShow',           label: 'About the Show',     icon: '📺' },
  { key: 'tvPackages',          label: 'TV Packages',        icon: '📦' },
  { key: 'streamingPlatforms',  label: 'Streaming',          icon: '▶️' },
  { key: 'mediaCredibility',    label: 'Media Credibility',  icon: '📰' },
  { key: 'womenInPower',        label: 'Sister Show',        icon: '💪' },
  { key: 'howItWorks',          label: 'How It Works',       icon: '🔄' },
  { key: 'threePackages',       label: 'Packages',           icon: '💼' },
  { key: 'whyTvStats',          label: 'Why TV Stats',       icon: '📊' },
  { key: 'aboutNetwork',        label: 'About Network',      icon: '🏢' },
  { key: 'team',                label: 'Team',               icon: '👥' },
  { key: 'faq',                 label: 'FAQ',                icon: '❓' },
  { key: 'nineConsiderations',  label: 'Considerations',     icon: '💡' },
  { key: 'footer',              label: 'Footer',             icon: '🦶' },
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
