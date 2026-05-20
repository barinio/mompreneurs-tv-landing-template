import type { ContentJson } from '@/lib/types'

type Props = {
  hero: ContentJson['hero']
  theme?: ContentJson['theme']
}

export default function Hero({ hero }: Props) {
  return (
    <picture>
      {hero.bgImageMobileUrl && <source media="(max-width: 768px)" srcSet={hero.bgImageMobileUrl} />}
      <img src={hero.bgImageUrl} alt="" className="hero-img" />
    </picture>
  )
}
