'use client'

import { isProEnabled } from '@/lib/pro'

interface Props {
  size?: number
}

export default function ProBadge({ size = 14 }: Props) {
  if (!isProEnabled()) return null
  return (
    <span
      title="Svalla Pro"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size + 6,
        height: size + 6,
        borderRadius: '50%',
        background: 'var(--grad-sea)',
        color: '#fff',
        fontSize: size - 2,
        lineHeight: 1,
        flexShrink: 0,
      }}
      aria-label="Pro-användare"
    >
      </span>
  )
}
