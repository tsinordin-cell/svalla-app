'use client'
/**
 * RealtimeFeedBanner
 * Lyssnar på nya trips via Supabase Realtime.
 * Visar ett flytande "↑ X nya turer" badge — klick triggar router.refresh().
 * Injiceras i feed/page.tsx (server component) och FeedTabs.
 */
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function RealtimeFeedBanner() {
  const [count,   setCount]   = useState(0)
  const [visible, setVisible] = useState(false)
  const [me,      setMe]      = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router   = useRouter()

  // Hämta inloggad användares id — filtrera bort egna turer
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setMe(user?.id ?? null)
    })
  }, [])

  useEffect(() => {
    const supabase = createClient()

    const ch = supabase
      .channel('realtime-feed-trips')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'trips' },
        (payload) => {
          // Ignorera egna inlägg
          if (me && (payload.new as { user_id?: string }).user_id === me) return
          // Ignorera soft-deleted (kan hända i edge-cases)
          if ((payload.new as { deleted_at?: string }).deleted_at) return

          setCount(prev => prev + 1)
          setVisible(true)

          // Auto-dölj efter 30 sekunder
          if (timerRef.current) clearTimeout(timerRef.current)
          timerRef.current = setTimeout(() => {
            setVisible(false)
            setCount(0)
          }, 30_000)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(ch)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [me])

  function handleClick() {
    setVisible(false)
    setCount(0)
    if (timerRef.current) clearTimeout(timerRef.current)
    router.refresh()
    // Scrolla till toppen
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible || count === 0) return null

  return (
    <button
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: 70, // under header
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 400,
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 18px',
        borderRadius: 24,
        border: 'none',
        background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
        color: '#fff',
        fontSize: 13, fontWeight: 800,
        boxShadow: '0 4px 20px rgba(30,92,130,0.45)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        animation: 'feedBannerIn .3s cubic-bezier(0.34,1.56,0.64,1)',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
      {count === 1 ? '1 ny tur' : `${count} nya turer`}
      <style>{`
        @keyframes feedBannerIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-12px) scale(0.9); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1);   }
        }
      `}</style>
    </button>
  )
}
