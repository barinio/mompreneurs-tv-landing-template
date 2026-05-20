import type { ContentJson } from '@/lib/types'

type Props = {
  hero: ContentJson['hero']
  theme?: ContentJson['theme']
}

export default function Hero({ hero }: Props) {
  return (
    <picture>
      <source media="(max-width: 768px)" srcSet="/images/mompreneurs1-mob-1-.png" />
      <img src={hero.bgImageUrl} alt="" className="hero-img" />
    </picture>
  )
}
