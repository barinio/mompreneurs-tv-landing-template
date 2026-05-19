import type { ContentJson } from '@/lib/types'

type Props = {
  hero: ContentJson['hero']
  theme: ContentJson['theme']
}

export default function Hero({ hero, theme }: Props) {
  return (
    <div
      style={{
        backgroundImage: `url(${hero.bgImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh',
      }}
    />
  )
}
