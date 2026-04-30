'use client'

import Icon from '@/components/Icon'
import { buildQuotePrefix } from '@/lib/forum-render'

interface Props {
  username: string
  body: string
}

/**
 * Citera-knapp på ett forum-inlägg.
 * Vid klick skickar ett custom event som ForumReplyForm lyssnar på och
 * preflyller textareat med ett citatblock + scrollar dit.
 */
export default function ForumQuoteButton({ username, body }: Props) {
  function handleClick() {
    const quote = buildQuotePrefix(username, body)
    window.dispatchEvent(new CustomEvent('forum-quote', { detail: { quote } }))
  }

  return (
    <button
      onClick={handleClick}
      title={`Citera ${username}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '4px 10px',
        borderRadius: 8,
        border: 'none',
        background: 'rgba(10,123,140,0.06)',
        color: 'var(--sea)',
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background 0.15s',
        fontFamily: 'inherit',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(10,123,140,0.12)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,123,140,0.06)' }}
    >
      <Icon name="quote" size={12} stroke={2} />
      Citera
    </button>
  )
}
