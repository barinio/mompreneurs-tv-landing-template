'use client'
import type { ContentJson, SectionKey } from '@/lib/types'
import ArrayEditor from './ArrayEditor'
import ImageUpload from './ImageUpload'

type Props = {
  sectionKey: SectionKey
  content: ContentJson
  onChange: (key: SectionKey, value: unknown) => void
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</label>
      {children}
    </div>
  )
}

function TextInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
    />
  )
}

function TextArea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-y focus:outline-none focus:border-blue-400"
    />
  )
}

export default function FieldEditor({ sectionKey, content, onChange }: Props) {
  function set(value: unknown) {
    onChange(sectionKey, value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = content[sectionKey] as any

  switch (sectionKey) {
    case 'hero':
      return (
        <div>
          <ImageUpload label="Logo" value={s.logoUrl} onChange={(v) => set({ ...s, logoUrl: v })} />
          <div className="mt-4" />
          <Field label="Headline"><TextArea value={s.headline} onChange={(v) => set({ ...s, headline: v })} rows={3} /></Field>
          <Field label="CTA Button Text"><TextInput value={s.ctaText} onChange={(v) => set({ ...s, ctaText: v })} /></Field>
          <Field label="CTA Button URL"><TextInput value={s.ctaUrl} onChange={(v) => set({ ...s, ctaUrl: v })} /></Field>
        </div>
      )

    case 'cast':
      return (
        <div>
          <Field label="Heading"><TextInput value={s.heading} onChange={(v) => set({ ...s, heading: v })} /></Field>
          <Field label="Cast Images">
            <ArrayEditor
              value={s.images}
              onChange={(v) => set({ ...s, images: v })}
              template={{ url: '', label: 'Announced Soon' }}
              fields={[
                { key: 'url', label: 'Image URL' },
                { key: 'label', label: 'Label' },
              ]}
            />
          </Field>
        </div>
      )

    case 'seriesInfo':
      return (
        <div>
          <Field label="Series Name"><TextInput value={s.series} onChange={(v) => set({ ...s, series: v })} /></Field>
          <Field label="Status"><TextInput value={s.status} onChange={(v) => set({ ...s, status: v })} /></Field>
          <Field label="Location"><TextInput value={s.location} onChange={(v) => set({ ...s, location: v })} /></Field>
          <Field label="Filming Date"><TextInput value={s.filmingDate} onChange={(v) => set({ ...s, filmingDate: v })} /></Field>
        </div>
      )

    case 'whoFor':
      return (
        <ArrayEditor
          value={s}
          onChange={set}
          template={{ title: '', description: '' }}
          fields={[
            { key: 'title', label: 'Category Title' },
            { key: 'description', label: 'Description', multiline: true },
          ]}
        />
      )

    case 'whoNotFor':
      return (
        <ArrayEditor
          value={s}
          onChange={set}
          template={{ text: '' }}
          fields={[{ key: 'text', label: 'Exclusion text', multiline: true }]}
        />
      )

    case 'transformation':
      return (
        <div>
          <Field label="Headline"><TextArea value={s.headline} onChange={(v) => set({ ...s, headline: v })} /></Field>
          <Field label="Benefits (one per line)">
            <TextArea
              value={s.benefits.join('\n')}
              onChange={(v) => set({ ...s, benefits: v.split('\n').filter(Boolean) })}
              rows={6}
            />
          </Field>
          <ImageUpload label="Poster Image" value={s.posterUrl} onChange={(v) => set({ ...s, posterUrl: v })} />
        </div>
      )

    case 'problemSolution':
      return (
        <Field label="Body Text (separate paragraphs with blank line)">
          <TextArea value={s.body} onChange={(v) => set({ ...s, body: v })} rows={8} />
        </Field>
      )

    case 'aboutShow':
      return (
        <div>
          <Field label="Body Text">
            <TextArea value={s.body} onChange={(v) => set({ ...s, body: v })} rows={6} />
          </Field>
          <ImageUpload label="Supporting Image" value={s.imageUrl} onChange={(v) => set({ ...s, imageUrl: v })} />
        </div>
      )

    case 'tvPackages':
      return (
        <div>
          <Field label="Section Heading"><TextInput value={s.heading} onChange={(v) => set({ ...s, heading: v })} /></Field>
          <Field label="Package Features">
            <ArrayEditor
              value={s.features}
              onChange={(v) => set({ ...s, features: v })}
              template={{ title: '', description: '', imageUrl: '' }}
              fields={[
                { key: 'title', label: 'Title' },
                { key: 'description', label: 'Description', multiline: true },
                { key: 'imageUrl', label: 'Image URL' },
              ]}
            />
          </Field>
        </div>
      )

    case 'streamingPlatforms':
      return (
        <div>
          <Field label="Heading"><TextInput value={s.heading} onChange={(v) => set({ ...s, heading: v })} /></Field>
          <ImageUpload label="Desktop Logos" value={s.logosDesktopUrl} onChange={(v) => set({ ...s, logosDesktopUrl: v })} />
          <div className="mt-3" />
          <ImageUpload label="Mobile Logos" value={s.logosMobileUrl} onChange={(v) => set({ ...s, logosMobileUrl: v })} />
        </div>
      )

    case 'mediaCredibility':
      return (
        <div>
          <Field label="Screenshots">
            <ArrayEditor
              value={s.screenshots}
              onChange={(v) => set({ ...s, screenshots: v })}
              template={{ url: '' }}
              fields={[{ key: 'url', label: 'Image URL' }]}
            />
          </Field>
          <Field label="Stats">
            <ArrayEditor
              value={s.stats}
              onChange={(v) => set({ ...s, stats: v })}
              template={{ text: '' }}
              fields={[{ key: 'text', label: 'Stat text', multiline: true }]}
            />
          </Field>
        </div>
      )

    case 'womenInPower':
      return (
        <div>
          <Field label="Heading"><TextInput value={s.heading} onChange={(v) => set({ ...s, heading: v })} /></Field>
          <Field label="Description"><TextArea value={s.description} onChange={(v) => set({ ...s, description: v })} /></Field>
          <Field label="CTA Text"><TextInput value={s.ctaText} onChange={(v) => set({ ...s, ctaText: v })} /></Field>
          <Field label="CTA URL"><TextInput value={s.ctaUrl} onChange={(v) => set({ ...s, ctaUrl: v })} /></Field>
          <ImageUpload label="Image" value={s.imageUrl} onChange={(v) => set({ ...s, imageUrl: v })} />
        </div>
      )

    case 'howItWorks':
      return (
        <ArrayEditor
          value={s}
          onChange={set}
          template={{ step: String(s.length + 1), title: '', description: '' }}
          fields={[
            { key: 'step', label: 'Step Number' },
            { key: 'title', label: 'Title' },
            { key: 'description', label: 'Description', multiline: true },
          ]}
        />
      )

    case 'threePackages':
      return (
        <ArrayEditor
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value={(s as any[]).map((p: any) => ({ ...p, features: p.features.join('\n') }))}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(v) => set(v.map((p: any) => ({ ...p, features: p.features.split('\n').filter(Boolean) })))}
          template={{ title: '', description: '', features: '' }}
          fields={[
            { key: 'title', label: 'Package Title' },
            { key: 'description', label: 'Description', multiline: true },
            { key: 'features', label: 'Features (one per line)', multiline: true },
          ]}
        />
      )

    case 'whyTvStats':
      return (
        <ArrayEditor
          value={s}
          onChange={set}
          template={{ stat: '', description: '' }}
          fields={[
            { key: 'stat', label: 'Stat (e.g. 80%)' },
            { key: 'description', label: 'Description', multiline: true },
          ]}
        />
      )

    case 'aboutNetwork':
      return (
        <div>
          <Field label="Body Text"><TextArea value={s.body} onChange={(v) => set({ ...s, body: v })} rows={5} /></Field>
          <ImageUpload label="Logo" value={s.logoUrl} onChange={(v) => set({ ...s, logoUrl: v })} />
        </div>
      )

    case 'team':
      return (
        <ArrayEditor
          value={s}
          onChange={set}
          template={{ name: '', role: '', imageUrl: '' }}
          fields={[
            { key: 'name', label: 'Name' },
            { key: 'role', label: 'Role' },
            { key: 'imageUrl', label: 'Photo URL' },
          ]}
        />
      )

    case 'faq':
      return (
        <ArrayEditor
          value={s}
          onChange={set}
          template={{ question: '', answer: '' }}
          fields={[
            { key: 'question', label: 'Question' },
            { key: 'answer', label: 'Answer', multiline: true },
          ]}
        />
      )

    case 'nineConsiderations':
      return (
        <ArrayEditor
          value={s}
          onChange={set}
          template={{ title: '', body: '' }}
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'body', label: 'Body', multiline: true },
          ]}
        />
      )

    case 'footer':
      return (
        <div>
          <Field label="Address"><TextInput value={s.address} onChange={(v) => set({ ...s, address: v })} /></Field>
          <Field label="Privacy URL"><TextInput value={s.privacyUrl} onChange={(v) => set({ ...s, privacyUrl: v })} /></Field>
          <Field label="Terms URL"><TextInput value={s.termsUrl} onChange={(v) => set({ ...s, termsUrl: v })} /></Field>
          <Field label="Disclaimer"><TextArea value={s.disclaimer} onChange={(v) => set({ ...s, disclaimer: v })} rows={4} /></Field>
        </div>
      )

    default:
      return <p className="text-sm text-gray-400">Select a section to edit.</p>
  }
}
