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
    case 'navBar':
      return (
        <div>
          <Field label="Announcement Text (use new line for line break)">
            <TextArea value={s.announcementText} onChange={(v) => set({ ...s, announcementText: v })} rows={3} />
          </Field>
          <Field label="Button Text"><TextInput value={s.ctaText} onChange={(v) => set({ ...s, ctaText: v })} /></Field>
        </div>
      )

    case 'hero':
      return (
        <div>
          <ImageUpload label="Background Image" value={s.bgImageUrl} onChange={(v) => set({ ...s, bgImageUrl: v })} />
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
          <Field label="Subheadline"><TextInput value={s.subheadline} onChange={(v) => set({ ...s, subheadline: v })} /></Field>
          <Field label="Benefits">
            <ArrayEditor
              value={s.benefits}
              onChange={(v) => set({ ...s, benefits: v })}
              template={{ title: '', description: '' }}
              fields={[
                { key: 'title', label: 'Title' },
                { key: 'description', label: 'Description', multiline: true },
              ]}
            />
          </Field>
          <ImageUpload label="Poster Image" value={s.posterUrl} onChange={(v) => set({ ...s, posterUrl: v })} />
        </div>
      )

    case 'joinShow':
      return (
        <div>
          <Field label="Headline"><TextInput value={s.headline} onChange={(v) => set({ ...s, headline: v })} /></Field>
          <Field label="Subheadline"><TextInput value={s.subheadline} onChange={(v) => set({ ...s, subheadline: v })} /></Field>
          <Field label="CTA Button Text"><TextInput value={s.ctaText} onChange={(v) => set({ ...s, ctaText: v })} /></Field>
          <Field label="CTA Button URL"><TextInput value={s.ctaUrl} onChange={(v) => set({ ...s, ctaUrl: v })} /></Field>
        </div>
      )

    case 'itsTime':
      return (
        <div>
          <Field label="Headline Top"><TextInput value={s.headlineTop} onChange={(v) => set({ ...s, headlineTop: v })} /></Field>
          <Field label="Headline Bottom"><TextInput value={s.headlineBottom} onChange={(v) => set({ ...s, headlineBottom: v })} /></Field>
          <Field label="Body (one paragraph per line)">
            <TextArea value={s.bodyTop.join('\n')} onChange={(v) => set({ ...s, bodyTop: v.split('\n').filter(Boolean) })} rows={5} />
          </Field>
          <Field label="Mid Headline Top"><TextInput value={s.headlineMidTop} onChange={(v) => set({ ...s, headlineMidTop: v })} /></Field>
          <Field label="Mid Headline Bottom"><TextInput value={s.headlineMidBottom} onChange={(v) => set({ ...s, headlineMidBottom: v })} /></Field>
          <ImageUpload label="Image" value={s.imageUrl} onChange={(v) => set({ ...s, imageUrl: v })} />
        </div>
      )

    case 'beingFeatured':
      return (
        <div>
          <Field label="Headline"><TextArea value={s.headline} onChange={(v) => set({ ...s, headline: v })} /></Field>
          <Field label="Intro"><TextArea value={s.intro} onChange={(v) => set({ ...s, intro: v })} /></Field>
          <ImageUpload label="Background Image" value={s.backgroundUrl} onChange={(v) => set({ ...s, backgroundUrl: v })} />
        </div>
      )

    case 'trustedMedia':
      return (
        <div>
          <Field label="Headline"><TextInput value={s.headline} onChange={(v) => set({ ...s, headline: v })} /></Field>
          <Field label="Screenshot URLs (one per line)">
            <TextArea
              value={s.screenshots.join('\n')}
              onChange={(v) => set({ ...s, screenshots: v.split('\n').filter(Boolean) })}
              rows={4}
            />
          </Field>
        </div>
      )

    case 'legendsLineup':
      return (
        <div>
          <Field label="Headline"><TextInput value={s.headline} onChange={(v) => set({ ...s, headline: v })} /></Field>
        </div>
      )

    case 'otherShows':
      return (
        <div>
          <Field label="Headline"><TextInput value={s.headline} onChange={(v) => set({ ...s, headline: v })} /></Field>
          <Field label="Show Posters">
            <ArrayEditor
              value={s.posters}
              onChange={(v) => set({ ...s, posters: v })}
              template={{ url: '', alt: '' }}
              fields={[
                { key: 'url', label: 'Image URL' },
                { key: 'alt', label: 'Show Name' },
              ]}
            />
          </Field>
        </div>
      )

    case 'tvPackageIncluded':
      return (
        <div>
          <Field label="Headline Top"><TextInput value={s.headlineTop} onChange={(v) => set({ ...s, headlineTop: v })} /></Field>
          <Field label="Headline Bottom"><TextInput value={s.headlineBottom} onChange={(v) => set({ ...s, headlineBottom: v })} /></Field>
          <ImageUpload label="Logo" value={s.logoUrl} onChange={(v) => set({ ...s, logoUrl: v })} />
          <Field label="Package Items">
            <ArrayEditor
              value={s.items}
              onChange={(v) => set({ ...s, items: v })}
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

    case 'bigScreen':
      return (
        <div>
          <Field label="Eyebrow"><TextInput value={s.eyebrow} onChange={(v) => set({ ...s, eyebrow: v })} /></Field>
          <Field label="Headline"><TextInput value={s.headline} onChange={(v) => set({ ...s, headline: v })} /></Field>
          <Field label="Body (one paragraph per line)">
            <TextArea value={s.body.join('\n')} onChange={(v) => set({ ...s, body: v.split('\n').filter(Boolean) })} rows={4} />
          </Field>
          <ImageUpload label="Streaming Logos" value={s.logosUrl} onChange={(v) => set({ ...s, logosUrl: v })} />
          <div className="mt-3" />
          <ImageUpload label="Phone Mockup" value={s.phoneUrl} onChange={(v) => set({ ...s, phoneUrl: v })} />
        </div>
      )

    case 'pressAwards':
      return (
        <div>
          <Field label="'As Seen On' Headline"><TextInput value={s.seenOnHeadline} onChange={(v) => set({ ...s, seenOnHeadline: v })} /></Field>
          <ImageUpload label="'As Seen On' Logos" value={s.seenOnLogosUrl} onChange={(v) => set({ ...s, seenOnLogosUrl: v })} />
          <div className="mt-3" />
          <Field label="Reviews Headline"><TextInput value={s.reviewsHeadline} onChange={(v) => set({ ...s, reviewsHeadline: v })} /></Field>
          <ImageUpload label="Reviews Image (Desktop)" value={s.reviewsImageDesktopUrl} onChange={(v) => set({ ...s, reviewsImageDesktopUrl: v })} />
          <div className="mt-3" />
          <ImageUpload label="Reviews Image (Mobile)" value={s.reviewsImageMobileUrl} onChange={(v) => set({ ...s, reviewsImageMobileUrl: v })} />
          <div className="mt-3" />
          <Field label="Awards Headline Top"><TextInput value={s.awardsHeadlineTop} onChange={(v) => set({ ...s, awardsHeadlineTop: v })} /></Field>
          <Field label="Awards Headline Bottom"><TextInput value={s.awardsHeadlineBottom} onChange={(v) => set({ ...s, awardsHeadlineBottom: v })} /></Field>
          <ImageUpload label="Awards Image" value={s.awardsImageUrl} onChange={(v) => set({ ...s, awardsImageUrl: v })} />
        </div>
      )

    case 'aboutShow':
      return (
        <div>
          <Field label="Eyebrow"><TextInput value={s.eyebrow} onChange={(v) => set({ ...s, eyebrow: v })} /></Field>
          <Field label="Body Text">
            <TextArea value={s.body} onChange={(v) => set({ ...s, body: v })} rows={6} />
          </Field>
          <ImageUpload label="Logo" value={s.logoUrl} onChange={(v) => set({ ...s, logoUrl: v })} />
          <div className="mt-3" />
          <ImageUpload label="Supporting Image" value={s.imageUrl} onChange={(v) => set({ ...s, imageUrl: v })} />
          <Field label="'Stand Among' Headline Top">
            <TextInput value={s.standAmongHeadlineTop} onChange={(v) => set({ ...s, standAmongHeadlineTop: v })} />
          </Field>
          <Field label="'Stand Among' Headline Bottom">
            <TextInput value={s.standAmongHeadlineBottom} onChange={(v) => set({ ...s, standAmongHeadlineBottom: v })} />
          </Field>
          <Field label="Body 2 Paragraphs">
            <ArrayEditor
              value={s.body2}
              onChange={(v) => set({ ...s, body2: v })}
              template={{ text: '' }}
              fields={[{ key: 'text', label: 'Paragraph', multiline: true }]}
            />
          </Field>
        </div>
      )

    case 'howItWorks':
      return (
        <div>
          <Field label="Eyebrow"><TextInput value={s.eyebrow} onChange={(v) => set({ ...s, eyebrow: v })} /></Field>
          <Field label="Headline"><TextInput value={s.headline} onChange={(v) => set({ ...s, headline: v })} /></Field>
          <Field label="Steps">
            <ArrayEditor
              value={s.items}
              onChange={(v) => set({ ...s, items: v })}
              template={{ title: '', description: '' }}
              fields={[
                { key: 'title', label: 'Step Title' },
                { key: 'description', label: 'Description', multiline: true },
              ]}
            />
          </Field>
        </div>
      )

    case 'aboutNetwork':
      return (
        <div>
          <Field label="Eyebrow"><TextInput value={s.eyebrow} onChange={(v) => set({ ...s, eyebrow: v })} /></Field>
          <Field label="Headline Top"><TextInput value={s.headlineTop} onChange={(v) => set({ ...s, headlineTop: v })} /></Field>
          <Field label="Headline Bottom"><TextInput value={s.headlineBottom} onChange={(v) => set({ ...s, headlineBottom: v })} /></Field>
          <Field label="Subheadline"><TextInput value={s.subheadline} onChange={(v) => set({ ...s, subheadline: v })} /></Field>
          <Field label="Subheadline Bold Part"><TextInput value={s.subheadlineBold} onChange={(v) => set({ ...s, subheadlineBold: v })} /></Field>
          <Field label="Body Text"><TextArea value={s.body} onChange={(v) => set({ ...s, body: v })} rows={5} /></Field>
          <ImageUpload label="Logo" value={s.logoUrl} onChange={(v) => set({ ...s, logoUrl: v })} />
        </div>
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
        <div>
          <Field label="Section Headline">
            <TextInput value={s.headline} onChange={(v) => set({ ...s, headline: v })} />
          </Field>
          <Field label="Considerations">
            <ArrayEditor
              value={s.items}
              onChange={(v) => set({ ...s, items: v })}
              template={{ title: '', body: '' }}
              fields={[
                { key: 'title', label: 'Title' },
                { key: 'body', label: 'Body', multiline: true },
              ]}
            />
          </Field>
        </div>
      )

    case 'footer':
      return (
        <div>
          <ImageUpload label="Logo" value={s.logoUrl} onChange={(v) => set({ ...s, logoUrl: v })} />
          <div className="mt-3" />
          <Field label="Address"><TextArea value={s.address} onChange={(v) => set({ ...s, address: v })} rows={2} /></Field>
          <Field label="Privacy Label"><TextInput value={s.privacyLabel} onChange={(v) => set({ ...s, privacyLabel: v })} /></Field>
          <Field label="Privacy URL"><TextInput value={s.privacyUrl} onChange={(v) => set({ ...s, privacyUrl: v })} /></Field>
          <Field label="Terms Label"><TextInput value={s.termsLabel} onChange={(v) => set({ ...s, termsLabel: v })} /></Field>
          <Field label="Terms URL"><TextInput value={s.termsUrl} onChange={(v) => set({ ...s, termsUrl: v })} /></Field>
          <Field label="Disclaimer Headline"><TextInput value={s.disclaimerHeadline} onChange={(v) => set({ ...s, disclaimerHeadline: v })} /></Field>
          <Field label="Disclaimer Paragraphs">
            <ArrayEditor
              value={s.disclaimerParagraphs.map((t: string) => ({ text: t }))}
              onChange={(v: Array<{ text: string }>) => set({ ...s, disclaimerParagraphs: v.map((x) => x.text) })}
              template={{ text: '' }}
              fields={[{ key: 'text', label: 'Paragraph', multiline: true }]}
            />
          </Field>
        </div>
      )

    default:
      return <p className="text-sm text-gray-400">Select a section to edit.</p>
  }
}
