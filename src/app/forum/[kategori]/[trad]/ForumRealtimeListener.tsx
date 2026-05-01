'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Icon from '@/components/Icon'

interface Props {
  threadId: string
  /** Antal posts vid SSR — för att räkna ut hur många nya som kommit */
  initialCount: number
}

/**
 * Lyssnar på Supabase Realtime för nya forum_posts i en specifik tråd.
 * När någon annan postar visas en pill: "X nya svar — visa".
 * Vid klick refreshar router och pillen försvinner.
 *
 * Designval: vi auto-uppdaterar INTE — det skulle störa läsningen om man
 * är mitt i ett långt svar eller scrollat. Användaren får välja.
 */
export default function ForumRealtimeListener({ threadId, initialCount: _initialCount }: Props) {
  const router = useRouter()
  const [newCount, setNewCount] = useState(0)
  const seenIdsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel(`forum-thread-${threadId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'forum_posts',
        filter: `thread_id=eq.${threadId}`,
      }, (payload) => {
        const id = (payload.new as { id?: string })?.id
        if (!id || seenIdsRef.current.has(id)) return
        seenIdsRef.current.add(id)
        setNewCount(c => c + 1)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [threadId])

  if (newCount === 0) return null

  function reload() {
    setNewCount(0)
    seenIdsRef.current.clear()
    router.refresh()
  }

  return (
    <button
      onClick={reload}
      style={{
        position: 'fixed',
        bottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 16px)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 18px',
        background: 'var(--grad-sea, linear-gradient(135deg, #0a7b8c 0%, #0d8fa3 100%))',
        color: '#fff',
        border: 'none',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '0.02em',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(10,123,140,0.40)',
        zIndex: 200,
        animation: 'svallaRealtimePillIn 280ms cubic-bezier(.2,.8,.2,1)',
        fontFamily: 'inherit',
      }}
    >
      <style>{`
        @keyframes svallaRealtimePillIn {
          from { opacity: 0; transform: translate(-50%, 16px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
      <Icon name="trendingUp" size={14} stroke={2.4} />
      {newCount === 1 ? '1 nytt svar — visa' : `${newCount} nya svar — visa`}
    </button>
  )
}
