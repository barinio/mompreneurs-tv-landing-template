export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/css/all.css" />
      <link rel="stylesheet" href="/css/v4-shims.css" />
      <link
        href="https://fonts.googleapis.com/css2?family=Imbue:opsz,wght@10..100,500&family=Montserrat:wght@400;600;700&family=Oswald:wght@400;700&family=PT+Sans+Narrow:wght@400;700&family=Playfair+Display:wght@400;700;900&family=Roboto+Condensed:wght@600&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
