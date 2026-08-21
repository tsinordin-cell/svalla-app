'use client'

/**
 * Liten Client Component för "Kopiera länk"-knappen.
 * Separerad från blogg/[slug]/page.tsx (Server Component) för att
 * onClick-handlers inte får finnas i Server Components.
 */

import { useState } from 'react'
import Icon from '@/components/Icon'

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '8px 14px', borderRadius: 20, cursor: 'pointer',
        background: copied ? 'rgba(45,138,80,0.10)' : 'rgba(30,92,130,0.08)',
        color: copied ? '#2d8a50' : 'var(--sea)',
        border: copied ? '1.5px solid rgba(45,138,80,0.25)' : '1.5px solid rgba(30,92,130,0.18)',
        fontSize: 13, fontWeight: 700,
        transition: 'all .2s',
      }}
    >
      <Icon name={copied ? 'check' : 'clipboard'} size={14} stroke={2.2} />
      {copied ? 'Kopierad!' : 'Kopiera länk'}
    </button>
  )
}
