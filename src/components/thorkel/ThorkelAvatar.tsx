'use client'
import Image from 'next/image'
import { THORKEL } from '@/lib/thorkel/persona'

type Props = {
  size?: number
  className?: string
  priority?: boolean
}

/**
 * ThorkelAvatar — cirkulär avatar-SVG.
 * Default 40px, 56px i chat, 80px i intro-overlay, 120px på /guide-sidan.
 */
export default function ThorkelAvatar({ size = 40, className, priority }: Props) {
  return (
    <Image
      src={THORKEL.avatar}
      alt={`${THORKEL.name}, ${THORKEL.title}`}
      width={size}
      height={size}
      priority={priority ?? size >= 80}
      className={className}
      style={{
        borderRadius: '50%',
        display: 'inline-block',
        background: 'var(--thor)',
      }}
    />
  )
}
