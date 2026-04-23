'use client'
import { THORKEL } from '@/lib/thorkel/persona'

type Props = {
  size?: number
  className?: string
  priority?: boolean
}

/**
 * ThorkelAvatar — cirkulär avatar-SVG.
 * Default 40px, 56px i chat, 80px i intro-overlay, 120px på /guide-sidan.
 *
 * Använder vanlig <img> istället för Next.js <Image> eftersom SVG-filer
 * blockeras av Next/Image som standard (behöver dangerouslyAllowSVG).
 * Ingen optimerings-vinst förloras — SVG är redan vektor.
 */
export default function ThorkelAvatar({ size = 40, className, priority }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={THORKEL.avatar}
      alt={`${THORKEL.name}, ${THORKEL.title}`}
      width={size}
      height={size}
      loading={priority || size >= 80 ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={{
        borderRadius: '50%',
        display: 'inline-block',
        background: 'var(--thor)',
        objectFit: 'cover',
      }}
    />
  )
}
