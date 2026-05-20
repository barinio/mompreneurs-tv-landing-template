'use client'
import { useState } from 'react'
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

// A single optional text element. Empty/missing means it is hidden on the site.
// Shows an "+ Add" button when absent, and a "Remove" button when present.
function OptionalText({
  label,
  value,
  onChange,
  multiline,
  rows,
}: {
  label: string
  value: string | undefined
  onChange: (v: string) => void
  multiline?: boolean
  rows?: number
}) {
  const [revealed, setRevealed] = useState(!!value && value.trim() !== '')
  const active = revealed || (!!value && value.trim() !== '')

  if (!active) {
    return (
      <div className="mb-4">
        <button
          onClick={() => setRevealed(true)}
          className="w-full border-2 border-dashed border-gray-300 rounded py-2 text-xs text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
        >
          + Add {label}
        </button>
      </div>
    )
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <label className="block text-xs text-gray-500 uppercase tracking-wide">{label}</label>
        <button
          onClick={() => {
            onChange('')
            setRevealed(false)
          }}
          className="text-red-400 hover:text-red-600 text-xs"
        >
          Remove
        </button>
      </div>
      {multiline ? (
        <TextArea value={value ?? ''} onChange={onChange} rows={rows} />
      ) : (
        <TextInput value={value ?? ''} onChange={onChange} />
      )}
    </div>
  )
}

// A single optional image. Empty/missing means it is hidden on the site.
function OptionalImage({
  label,
  value,
  onChange,
}: {
  label: string
  value: string | undefined
  onChange: (v: string) => void
}) {
  const [revealed, setRevealed] = useState(!!value && value.trim() !== '')
  const active = revealed || (!!value && value.trim() !== '')

  if (!active) {
    return (
      <div className="mb-4">
        <button
          onClick={() => setRevealed(true)}
          className="w-full border-2 border-dashed border-gray-300 rounded py-2 text-xs text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
        >
          + Add {label}
        </button>
      </div>
    )
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <label className="block text-xs text-gray-500 uppercase tracking-wide">{label}</label>
        <button
          onClick={() => {
            onChange('')
            setRevealed(false)
          }}
          className="text-red-400 hover:text-red-600 text-xs"
        >
          Remove
        </button>
      </div>
      <ImageUpload value={value ?? ''} onChange={onChange} />
    </div>
  )
}

export default function FieldEditor({ sectionKey, content, onChange }: Props) {
  function set(value: unknown) {
    onChange(sectionKey, value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = content[sectionKey] as any

  switch (sectionKey) {
    case 'meta':
      return (
        <div>
          <Field label="Site Title (browser tab + SEO)"><TextInput value={s.title} onChange={(v) => set({ ...s, title: v })} /></Field>
          <Field label="SEO Description"><TextArea value={s.description} onChange={(v) => set({ ...s, description: v })} rows={3} /></Field>
          <ImageUpload label="Favicon" value={s.faviconUrl} onChange={(v) => set({ ...s, faviconUrl: v })} />
          <div className="mt-3" />
          <ImageUpload label="Social Share Image" value={s.seoImageUrl} onChange={(v) => set({ ...s, seoImageUrl: v })} />
        </div>
      )

    case 'navBar':
      return (
        <div>
          <OptionalText
            label="Announcement Text (use new line for line break)"
            value={s.announcementText}
            onChange={(v) => set({ ...s, announcementText: v })}
            multiline
            rows={3}
          />
          <OptionalText label="Button Text" value={s.ctaText} onChange={(v) => set({ ...s, ctaText: v })} />
        </div>
      )

    case 'hero':
      return (
        <div>
          <ImageUpload label="Background Image (Desktop)" value={s.bgImageUrl} onChange={(v) => set({ ...s, bgImageUrl: v })} />
          <div className="mt-3" />
          <OptionalImage label="Background Image (Mobile)" value={s.bgImageMobileUrl} onChange={(v) => set({ ...s, bgImageMobileUrl: v })} />
        </div>
      )

    case 'seriesInfo':
      return (
        <Field label="Info Boxes">
          <ArrayEditor
            value={s.boxes}
            onChange={(v) => set({ ...s, boxes: v })}
            template={{ icon: 'fas fa-star', label: '', value: '' }}
            fields={[
              { key: 'icon', label: 'Icon (Font Awesome class, e.g. fas fa-film)' },
              { key: 'label', label: 'Label' },
              { key: 'value', label: 'Value' },
            ]}
            addLabel="+ Add box"
          />
        </Field>
      )

    case 'whoFor':
      return (
        <div>
          <OptionalImage label="Background (Who For → Transformation)" value={s.bgImageUrl} onChange={(v) => set({ ...s, bgImageUrl: v })} />
          <OptionalText label="Section Headline" value={s.headline} onChange={(v) => set({ ...s, headline: v })} />
          <OptionalText label="Subheadline" value={s.subheadline} onChange={(v) => set({ ...s, subheadline: v })} multiline />
          <Field label="Categories">
            <ArrayEditor
              value={s.items}
              onChange={(v) => set({ ...s, items: v })}
              template={{ title: '', description: '' }}
              fields={[
                { key: 'title', label: 'Category Title' },
                { key: 'description', label: 'Description', multiline: true },
              ]}
            />
          </Field>
        </div>
      )

    case 'whoNotFor':
      return (
        <div>
          <OptionalText label="Section Headline" value={s.headline} onChange={(v) => set({ ...s, headline: v })} />
          <Field label="Exclusions">
            <ArrayEditor
              value={s.items}
              onChange={(v) => set({ ...s, items: v })}
              template={{ text: '' }}
              fields={[{ key: 'text', label: 'Exclusion text', multiline: true }]}
            />
          </Field>
        </div>
      )

    case 'joinShow':
      return (
        <div>
          <OptionalText label="Headline" value={s.headline} onChange={(v) => set({ ...s, headline: v })} />
          <OptionalText label="Subheadline" value={s.subheadline} onChange={(v) => set({ ...s, subheadline: v })} />
          <OptionalText label="CTA Button Text" value={s.ctaText} onChange={(v) => set({ ...s, ctaText: v })} />
          <Field label="CTA Button URL"><TextInput value={s.ctaUrl} onChange={(v) => set({ ...s, ctaUrl: v })} /></Field>
        </div>
      )

    case 'transformation':
      return (
        <div>
          <OptionalText label="Headline" value={s.headline} onChange={(v) => set({ ...s, headline: v })} multiline />
          <OptionalText label="Subheadline" value={s.subheadline} onChange={(v) => set({ ...s, subheadline: v })} />
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
          <OptionalImage label="Poster Image" value={s.posterUrl} onChange={(v) => set({ ...s, posterUrl: v })} />
        </div>
      )

    case 'itsTime':
      return (
        <div>
          <OptionalImage label="Section Background" value={s.bgImageUrl} onChange={(v) => set({ ...s, bgImageUrl: v })} />
          <OptionalText label="Headline Top" value={s.headlineTop} onChange={(v) => set({ ...s, headlineTop: v })} />
          <OptionalText label="Headline Bottom" value={s.headlineBottom} onChange={(v) => set({ ...s, headlineBottom: v })} />
          <Field label="Body (Top)">
            <ArrayEditor
              value={s.bodyTop.map((t: string) => ({ text: t }))}
              onChange={(v: Array<{ text: string }>) => set({ ...s, bodyTop: v.map((x) => x.text) })}
              template={{ text: '' }}
              fields={[{ key: 'text', label: 'Paragraph', multiline: true }]}
              addLabel="+ Add paragraph"
            />
          </Field>
          <OptionalText label="Reality Intro" value={s.realityIntro} onChange={(v) => set({ ...s, realityIntro: v })} />
          <Field label="Reality Points">
            <ArrayEditor
              value={s.realityPoints.map((t: string) => ({ text: t }))}
              onChange={(v: Array<{ text: string }>) => set({ ...s, realityPoints: v.map((x) => x.text) })}
              template={{ text: '' }}
              fields={[{ key: 'text', label: 'Point', multiline: true }]}
              addLabel="+ Add point"
            />
          </Field>
          <OptionalText label="Mid Headline Top" value={s.headlineMidTop} onChange={(v) => set({ ...s, headlineMidTop: v })} />
          <OptionalText label="Mid Headline Bottom" value={s.headlineMidBottom} onChange={(v) => set({ ...s, headlineMidBottom: v })} />
          <Field label="Body (Mid)">
            <ArrayEditor
              value={s.bodyMid.map((t: string) => ({ text: t }))}
              onChange={(v: Array<{ text: string }>) => set({ ...s, bodyMid: v.map((x) => x.text) })}
              template={{ text: '' }}
              fields={[{ key: 'text', label: 'Paragraph', multiline: true }]}
              addLabel="+ Add paragraph"
            />
          </Field>
          <OptionalImage label="Image" value={s.imageUrl} onChange={(v) => set({ ...s, imageUrl: v })} />
          <OptionalText label="Imagine Headline" value={s.imagineHeadline} onChange={(v) => set({ ...s, imagineHeadline: v })} multiline />
          <Field label="Bullets">
            <ArrayEditor
              value={s.bullets.map((t: string) => ({ text: t }))}
              onChange={(v: Array<{ text: string }>) => set({ ...s, bullets: v.map((x) => x.text) })}
              template={{ text: '' }}
              fields={[{ key: 'text', label: 'Bullet', multiline: true }]}
              addLabel="+ Add bullet"
            />
          </Field>
        </div>
      )

    case 'beingFeatured':
      return (
        <div>
          <OptionalImage label="Background Image" value={s.backgroundUrl} onChange={(v) => set({ ...s, backgroundUrl: v })} />
          <OptionalText label="Headline" value={s.headline} onChange={(v) => set({ ...s, headline: v })} multiline />
          <OptionalText label="Intro" value={s.intro} onChange={(v) => set({ ...s, intro: v })} multiline />
          <OptionalText label="'This Creates' Headline" value={s.createsHeadline} onChange={(v) => set({ ...s, createsHeadline: v })} />
          <Field label="Bullets">
            <ArrayEditor
              value={s.bullets}
              onChange={(v) => set({ ...s, bullets: v })}
              template={{ title: '', description: '' }}
              fields={[
                { key: 'title', label: 'Title' },
                { key: 'description', label: 'Description', multiline: true },
              ]}
            />
          </Field>
          <OptionalText label="Closing Top" value={s.closingTop} onChange={(v) => set({ ...s, closingTop: v })} multiline />
          <OptionalText label="Closing Bold" value={s.closingBold} onChange={(v) => set({ ...s, closingBold: v })} multiline />
          <OptionalText label="Closing Bottom" value={s.closingBottom} onChange={(v) => set({ ...s, closingBottom: v })} multiline />
          <OptionalText label="Closing Extra" value={s.closingExtra} onChange={(v) => set({ ...s, closingExtra: v })} multiline />
        </div>
      )

    case 'trustedMedia':
      return (
        <div>
          <OptionalText label="Headline" value={s.headline} onChange={(v) => set({ ...s, headline: v })} />
          <Field label="Screenshots">
            <ArrayEditor
              value={s.screenshots.map((u: string) => ({ url: u }))}
              onChange={(v: Array<{ url: string }>) => set({ ...s, screenshots: v.map((x) => x.url) })}
              template={{ url: '' }}
              fields={[{ key: 'url', label: 'Screenshot', type: 'image' }]}
              addLabel="+ Add screenshot"
            />
          </Field>
        </div>
      )

    case 'legendsLineup':
      return (
        <div>
          <OptionalText label="Headline" value={s.headline} onChange={(v) => set({ ...s, headline: v })} />
          <Field label="Featured Banners">
            <ArrayEditor
              value={s.featured}
              onChange={(v) => set({ ...s, featured: v })}
              template={{ url: '', alt: '' }}
              fields={[
                { key: 'url', label: 'Image', type: 'image' },
                { key: 'alt', label: 'Name / Alt' },
              ]}
              addLabel="+ Add banner"
            />
          </Field>
          <Field label="Grid Images">
            <ArrayEditor
              value={s.grid}
              onChange={(v) => set({ ...s, grid: v })}
              template={{ url: '', alt: '' }}
              fields={[
                { key: 'url', label: 'Image', type: 'image' },
                { key: 'alt', label: 'Name / Alt' },
              ]}
              addLabel="+ Add image"
            />
          </Field>
        </div>
      )

    case 'otherShows':
      return (
        <div>
          <OptionalText label="Headline" value={s.headline} onChange={(v) => set({ ...s, headline: v })} />
          <Field label="Show Posters">
            <ArrayEditor
              value={s.posters}
              onChange={(v) => set({ ...s, posters: v })}
              template={{ url: '', alt: '' }}
              fields={[
                { key: 'url', label: 'Poster Image', type: 'image' },
                { key: 'alt', label: 'Show Name' },
              ]}
              addLabel="+ Add poster"
            />
          </Field>
        </div>
      )

    case 'tvPackageIncluded':
      return (
        <div>
          <OptionalImage label="Section Background" value={s.bgImageUrl} onChange={(v) => set({ ...s, bgImageUrl: v })} />
          <OptionalText label="Headline Top" value={s.headlineTop} onChange={(v) => set({ ...s, headlineTop: v })} />
          <OptionalImage label="Logo" value={s.logoUrl} onChange={(v) => set({ ...s, logoUrl: v })} />
          <OptionalText label="Headline Bottom" value={s.headlineBottom} onChange={(v) => set({ ...s, headlineBottom: v })} />
          <Field label="Package Items">
            <ArrayEditor
              value={s.items}
              onChange={(v) => set({ ...s, items: v })}
              template={{ title: '', description: '', imageUrl: '' }}
              fields={[
                { key: 'title', label: 'Title' },
                { key: 'description', label: 'Description', multiline: true },
                { key: 'imageUrl', label: 'Image', type: 'image' },
              ]}
            />
          </Field>
          <Field label="Closing Paragraphs">
            <ArrayEditor
              value={s.closingParagraphs}
              onChange={(v) => set({ ...s, closingParagraphs: v })}
              template={{ text: '', boldSuffix: '' }}
              fields={[
                { key: 'text', label: 'Paragraph', multiline: true },
                { key: 'boldSuffix', label: 'Bold suffix (optional)' },
              ]}
              addLabel="+ Add paragraph"
            />
          </Field>
        </div>
      )

    case 'bigScreen':
      return (
        <div>
          <OptionalText label="Eyebrow" value={s.eyebrow} onChange={(v) => set({ ...s, eyebrow: v })} />
          <OptionalText label="Headline" value={s.headline} onChange={(v) => set({ ...s, headline: v })} />
          <OptionalImage label="Streaming Logos" value={s.logosUrl} onChange={(v) => set({ ...s, logosUrl: v })} />
          <Field label="Body">
            <ArrayEditor
              value={s.body.map((t: string) => ({ text: t }))}
              onChange={(v: Array<{ text: string }>) => set({ ...s, body: v.map((x) => x.text) })}
              template={{ text: '' }}
              fields={[{ key: 'text', label: 'Paragraph', multiline: true }]}
              addLabel="+ Add paragraph"
            />
          </Field>
          <OptionalImage label="Phone Mockup" value={s.phoneUrl} onChange={(v) => set({ ...s, phoneUrl: v })} />
        </div>
      )

    case 'pressAwards':
      return (
        <div>
          <OptionalImage label="Section Background" value={s.bgImageUrl} onChange={(v) => set({ ...s, bgImageUrl: v })} />
          <OptionalText label="'As Seen On' Headline" value={s.seenOnHeadline} onChange={(v) => set({ ...s, seenOnHeadline: v })} />
          <OptionalImage label="'As Seen On' Logos" value={s.seenOnLogosUrl} onChange={(v) => set({ ...s, seenOnLogosUrl: v })} />
          <OptionalText label="Reviews Headline" value={s.reviewsHeadline} onChange={(v) => set({ ...s, reviewsHeadline: v })} />
          <OptionalImage label="Reviews Image (Desktop)" value={s.reviewsImageDesktopUrl} onChange={(v) => set({ ...s, reviewsImageDesktopUrl: v })} />
          <OptionalImage label="Reviews Image (Mobile)" value={s.reviewsImageMobileUrl} onChange={(v) => set({ ...s, reviewsImageMobileUrl: v })} />
          <OptionalText label="Awards Headline Top" value={s.awardsHeadlineTop} onChange={(v) => set({ ...s, awardsHeadlineTop: v })} />
          <OptionalText label="Awards Headline Bottom" value={s.awardsHeadlineBottom} onChange={(v) => set({ ...s, awardsHeadlineBottom: v })} />
          <OptionalImage label="Awards Image" value={s.awardsImageUrl} onChange={(v) => set({ ...s, awardsImageUrl: v })} />
        </div>
      )

    case 'aboutShow':
      return (
        <div>
          <OptionalImage label="Section Background" value={s.bgImageUrl} onChange={(v) => set({ ...s, bgImageUrl: v })} />
          <OptionalText label="Eyebrow" value={s.eyebrow} onChange={(v) => set({ ...s, eyebrow: v })} />
          <OptionalImage label="Logo" value={s.logoUrl} onChange={(v) => set({ ...s, logoUrl: v })} />
          <OptionalImage label="Supporting Image" value={s.imageUrl} onChange={(v) => set({ ...s, imageUrl: v })} />
          <OptionalText label="Body Text (blank line separates paragraphs)" value={s.body} onChange={(v) => set({ ...s, body: v })} multiline rows={6} />
          <OptionalText label="'Stand Among' Headline Top" value={s.standAmongHeadlineTop} onChange={(v) => set({ ...s, standAmongHeadlineTop: v })} />
          <OptionalText label="'Stand Among' Headline Bottom" value={s.standAmongHeadlineBottom} onChange={(v) => set({ ...s, standAmongHeadlineBottom: v })} />
          <Field label="Body 2 Paragraphs">
            <ArrayEditor
              value={s.body2}
              onChange={(v) => set({ ...s, body2: v })}
              template={{ text: '', bold: false }}
              fields={[
                { key: 'text', label: 'Paragraph', multiline: true },
                { key: 'bold', label: 'Bold', type: 'checkbox' },
              ]}
              addLabel="+ Add paragraph"
            />
          </Field>
        </div>
      )

    case 'howItWorks':
      return (
        <div>
          <OptionalImage label="Background (How It Works block)" value={s.bgImageUrl} onChange={(v) => set({ ...s, bgImageUrl: v })} />
          <OptionalText label="Eyebrow" value={s.eyebrow} onChange={(v) => set({ ...s, eyebrow: v })} />
          <OptionalText label="Headline" value={s.headline} onChange={(v) => set({ ...s, headline: v })} />
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
          <OptionalImage label="Section Background" value={s.bgImageUrl} onChange={(v) => set({ ...s, bgImageUrl: v })} />
          <OptionalText label="Eyebrow" value={s.eyebrow} onChange={(v) => set({ ...s, eyebrow: v })} />
          <OptionalText label="Headline Top" value={s.headlineTop} onChange={(v) => set({ ...s, headlineTop: v })} />
          <OptionalText label="Headline Bottom" value={s.headlineBottom} onChange={(v) => set({ ...s, headlineBottom: v })} />
          <OptionalText label="Subheadline" value={s.subheadline} onChange={(v) => set({ ...s, subheadline: v })} />
          <OptionalText label="Subheadline Bold Part" value={s.subheadlineBold} onChange={(v) => set({ ...s, subheadlineBold: v })} />
          <OptionalText label="Body Text (blank line separates paragraphs)" value={s.body} onChange={(v) => set({ ...s, body: v })} multiline rows={5} />
          <OptionalImage label="Logo" value={s.logoUrl} onChange={(v) => set({ ...s, logoUrl: v })} />
          <OptionalText label="Logo Link URL" value={s.logoLinkUrl} onChange={(v) => set({ ...s, logoLinkUrl: v })} />
        </div>
      )

    case 'faq':
      return (
        <div>
          <OptionalImage label="Background (FAQ → Considerations)" value={s.bgImageUrl} onChange={(v) => set({ ...s, bgImageUrl: v })} />
          <OptionalText label="Section Headline" value={s.headline} onChange={(v) => set({ ...s, headline: v })} />
          <Field label="Questions">
            <ArrayEditor
              value={s.items}
              onChange={(v) => set({ ...s, items: v })}
              template={{ question: '', answer: '' }}
              fields={[
                { key: 'question', label: 'Question' },
                { key: 'answer', label: 'Answer', multiline: true },
              ]}
            />
          </Field>
        </div>
      )

    case 'nineConsiderations':
      return (
        <div>
          <OptionalText label="Section Headline" value={s.headline} onChange={(v) => set({ ...s, headline: v })} />
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
          <OptionalImage label="Logo" value={s.logoUrl} onChange={(v) => set({ ...s, logoUrl: v })} />
          <OptionalText label="Address" value={s.address} onChange={(v) => set({ ...s, address: v })} multiline rows={2} />
          <OptionalText label="Privacy Label" value={s.privacyLabel} onChange={(v) => set({ ...s, privacyLabel: v })} />
          <Field label="Privacy URL"><TextInput value={s.privacyUrl ?? ''} onChange={(v) => set({ ...s, privacyUrl: v })} /></Field>
          <OptionalText label="Terms Label" value={s.termsLabel} onChange={(v) => set({ ...s, termsLabel: v })} />
          <Field label="Terms URL"><TextInput value={s.termsUrl ?? ''} onChange={(v) => set({ ...s, termsUrl: v })} /></Field>
          <OptionalText label="Disclaimer Headline" value={s.disclaimerHeadline} onChange={(v) => set({ ...s, disclaimerHeadline: v })} />
          <Field label="Disclaimer Paragraphs">
            <ArrayEditor
              value={s.disclaimerParagraphs.map((t: string) => ({ text: t }))}
              onChange={(v: Array<{ text: string }>) => set({ ...s, disclaimerParagraphs: v.map((x) => x.text) })}
              template={{ text: '' }}
              fields={[{ key: 'text', label: 'Paragraph', multiline: true }]}
              addLabel="+ Add paragraph"
            />
          </Field>
        </div>
      )

    case 'theme':
      return (
        <div>
          <Field label="Primary Color"><TextInput value={s.primaryColor} onChange={(v) => set({ ...s, primaryColor: v })} /></Field>
          <Field label="Accent Color"><TextInput value={s.accentColor} onChange={(v) => set({ ...s, accentColor: v })} /></Field>
          <Field label="Font Family"><TextInput value={s.fontFamily} onChange={(v) => set({ ...s, fontFamily: v })} /></Field>
        </div>
      )

    default:
      return <p className="text-sm text-gray-400">Select a section to edit.</p>
  }
}
