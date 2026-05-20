'use client'
import ImageUpload from './ImageUpload'

type FieldType = 'text' | 'textarea' | 'image' | 'checkbox'

// Item values may be strings (text/textarea/image) or booleans (checkbox).
type Item = Record<string, string | boolean | undefined>

type Props<T extends Item> = {
  value: T[]
  onChange: (value: T[]) => void
  template: T
  fields: { key: keyof T; label: string; multiline?: boolean; type?: FieldType }[]
  addLabel?: string
}

export default function ArrayEditor<T extends Item>({
  value,
  onChange,
  template,
  fields,
  addLabel = '+ Add item',
}: Props<T>) {
  function update(i: number, key: keyof T, val: string | boolean) {
    const next = value.map((item, idx) => (idx === i ? { ...item, [key]: val } : item))
    onChange(next)
  }

  function add() {
    onChange([...value, { ...template }])
  }

  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i))
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= value.length) return
    const next = [...value]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
  }

  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded p-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500 font-semibold">#{i + 1}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="text-gray-400 hover:text-gray-700 text-xs disabled:opacity-30"
                title="Move up"
              >
                ↑
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === value.length - 1}
                className="text-gray-400 hover:text-gray-700 text-xs disabled:opacity-30"
                title="Move down"
              >
                ↓
              </button>
              <button
                onClick={() => remove(i)}
                className="text-red-400 hover:text-red-600 text-xs"
              >
                Remove
              </button>
            </div>
          </div>
          {fields.map(({ key, label, multiline, type }) => {
            const resolved: FieldType = type ?? (multiline ? 'textarea' : 'text')
            const raw = item[key]
            return (
              <div key={String(key)} className="mb-2">
                {resolved !== 'checkbox' && (
                  <label className="block text-xs text-gray-500 mb-1">{label}</label>
                )}
                {resolved === 'image' ? (
                  <ImageUpload value={String(raw ?? '')} onChange={(v) => update(i, key, v)} />
                ) : resolved === 'checkbox' ? (
                  <label className="flex items-center gap-2 text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={Boolean(raw)}
                      onChange={(e) => update(i, key, e.target.checked)}
                    />
                    {label}
                  </label>
                ) : resolved === 'textarea' ? (
                  <textarea
                    value={String(raw ?? '')}
                    onChange={(e) => update(i, key, e.target.value)}
                    rows={2}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-xs resize-y"
                  />
                ) : (
                  <input
                    type="text"
                    value={String(raw ?? '')}
                    onChange={(e) => update(i, key, e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                  />
                )}
              </div>
            )
          })}
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border-2 border-dashed border-gray-300 rounded py-2 text-xs text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
      >
        {addLabel}
      </button>
    </div>
  )
}
