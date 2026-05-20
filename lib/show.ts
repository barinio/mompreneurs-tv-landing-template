// "Empty = hidden" convention: an optional text/url field that is missing or
// blank means the element should not render. Used across section components so
// the admin can delete a single element by clearing its field.
export function show(value?: string): value is string {
  return typeof value === 'string' && value.trim() !== ''
}
