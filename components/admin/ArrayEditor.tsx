'use client'

type Props<T extends Record<string, string>> = {
  value: T[]
  onChange: (value: T[]) => void
  template: T
  fields: { key: keyof T; label: string; multiline?: boolean }[]
}

export default function ArrayEditor<T extends Record<string, string>>({
  value,
  onChange,
  template,
  fields,
}: Props<T>) {
  function update(i: number, key: keyof T, val: string) {
    const next = value.map((item, idx) => (idx === i ? { ...item, [key]: val } : item))
    onChange(next)
  }

  function add() {
    onChange([...value, { ...template }])
  }

  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i))
  }

  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded p-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500 font-semibold">#{i + 1}</span>
            <button
              onClick={() => remove(i)}
              className="text-red-400 hover:text-red-600 text-xs"
            >
              Remove
            </button>
          </div>
          {fields.map(({ key, label, multiline }) => (
            <div key={String(key)} className="mb-2">
              <label className="block text-xs text-gray-500 mb-1">{label}</label>
              {multiline ? (
                <textarea
                  value={String(item[key] ?? '')}
                  onChange={(e) => update(i, key, e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-xs resize-y"
                />
              ) : (
                <input
                  type="text"
                  value={String(item[key] ?? '')}
                  onChange={(e) => update(i, key, e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={add}
        className="w-full border-2 border-dashed border-gray-300 rounded py-2 text-xs text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
      >
        + Add item
      </button>
    </div>
  )
}
