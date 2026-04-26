'use client'
import { useState } from 'react'

interface Props {
  postId: string
  initialCount: number
  initialLiked: boolean
  /** null = ej inloggad — visa räknaren men gör knappen disabled */
  currentUserId: string | null
}

export default function ForumLikeButton({
  postId,
  initialCount,
  initialLiked,
  currentUserId,
}: Props) {
  const [count, setCount]   = useState(initialCount)
  const [liked, setLiked]   = useState(initialLiked)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    if (!currentUserId || loading) return
    setLoading(true)
    // Optimistisk uppdatering
    const optimisticLiked = !liked
    setLiked(optimisticLiked)
    setCount(c => optimisticLiked ? c + 1 : Math.max(0, c - 1))
    try {
      const res = await fetch(`/api/forum/likes/${postId}`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setLiked(data.liked)
        setCount(data.count)
      } else {
        // Rulla tillbaka
        setLiked(liked)
        setCount(initialCount)
      }
    } catch {
      setLiked(liked)
      setCount(initialCount)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={!currentUserId || loading}
      title={currentUserId ? (liked ? 'Ta bort like' : 'Gilla') : 'Logga in för att gilla'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '4px 10px',
        borderRadius: 8,
        border: 'none',
        cursor: currentUserId && !loading ? 'pointer' : 'default',
        background: liked
          ? 'rgba(239,68,68,0.08)'
          : 'rgba(10,123,140,0.05)',
        color: liked ? '#ef4444' : 'var(--txt3)',
        fontSize: 12,
        fontWeight: 600,
        transition: 'background 0.15s, color 0.15s, transform 0.1s',
        transform: loading ? 'scale(0.95)' : 'scale(1)',
      }}
    >
      <svg
        width={13} height={13}
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: 'fill 0.15s' }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {count > 0 && <span>{count}</span>}
    </button>
  )
}
