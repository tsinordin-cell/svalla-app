'use client'
import { useState } from 'react'

interface Props {
  threadId:          string
  initialSubscribed: boolean
  currentUserId:     string | null
}

export default function ForumSubscribeButton({ threadId, initialSubscribed, currentUserId }: Props) {
  const [subscribed, setSubscribed] = useState(initialSubscribed)
  const [loading,    setLoading]    = useState(false)

  if (!currentUserId) return null

  async function toggle() {
    if (loading) return
    setLoading(true)
    try {
      const res  = await fetch(`/api/forum/subscribe/${threadId}`, { method: 'POST' })
      const data = await res.json()
      if (res.ok) setSubscribed(data.subscribed)
    } catch {
      // tyst fel — state oförändrat
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="press-feedback"
      aria-label={subscribed ? 'Sluta bevaka tråd' : 'Bevaka tråd'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '7px 14px',
        borderRadius: 20,
        border: subscribed
          ? '1.5px solid var(--sea)'
          : '1.5px solid rgba(10,123,140,0.2)',
        background: subscribed
          ? 'rgba(10,123,140,0.08)'
          : 'transparent',
        color: subscribed ? 'var(--sea)' : 'var(--txt3)',
        fontSize: 13,
        fontWeight: 600,
        cursor: loading ? 'default' : 'pointer',
        transition: 'all 0.15s',
        flexShrink: 0,
      }}
    >
      {/* Bell icon */}
      <svg
        width={14} height={14}
        viewBox="0 0 24 24"
        fill={subscribed ? 'var(--sea)' : 'none'}
        stroke={subscribed ? 'var(--sea)' : 'currentColor'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {loading ? '…' : subscribed ? 'Bevakar' : 'Bevaka'}
    </button>
  )
}
