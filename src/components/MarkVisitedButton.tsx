'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { analytics } from '@/lib/analytics'

interface Props {
  islandSlug: string
  islandName: string
}

export default function MarkVisitedButton({ islandSlug, islandName }: Props) {
  const supabase = useRef(createClient()).current
  const router = useRouter()
  const [visited, setVisited] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)
      const { data } = await supabase
        .from('visited_islands')
        .select('id')
        .eq('user_id', user.id)
        .eq('island_slug', islandSlug)
        .maybeSingle()
      setVisited(!!data)
    }
    load()
  }, [islandSlug, supabase])

  async function handleClick() {
    if (loading) return
    if (!userId) {
      router.push(`/auth?next=${encodeURIComponent(`/o/${islandSlug}`)}`)
      return
    }
    if (visited) return

    setLoading(true)
    const { error } = await supabase.from('visited_islands').upsert(
      { user_id: userId, island_slug: islandSlug, visited_at: new Date().toISOString() },
      { onConflict: 'user_id,island_slug', ignoreDuplicates: true },
    )
    if (!error) {
      setVisited(true)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      analytics.islandMarkedVisited({
        island_slug: islandSlug,
        island_name: islandName,
      })
    }
    setLoading(false)
  }

  if (!hydrated) return null

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading || visited}
        aria-label={visited ? `Du har besökt ${islandName}` : `Markera ${islandName} som besökt`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 18px',
          borderRadius: 999,
          border: visited ? '1.5px solid rgba(34,197,94,0.6)' : '1.5px solid rgba(255,255,255,0.4)',
          background: visited ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.18)',
          color: visited ? 'rgba(34,197,94,0.9)' : '#fff',
          fontSize: 13.5, fontWeight: 700,
          cursor: loading ? 'wait' : visited ? 'default' : 'pointer',
          transition: 'all .15s',
          backdropFilter: 'blur(8px)',
          opacity: loading ? 0.7 : 1,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {visited ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} style={{ width: 16, height: 16 }}>
            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} style={{ width: 16, height: 16 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.3C7 14.5 4.8 11 4.8 7.8a7.2 7.2 0 0 1 14.4 0c0 3.2-2.2 6.7-7.2 13.5Z" />
            <circle cx="12" cy="8" r="2.4" />
          </svg>
        )}
        {visited ? 'Besökt' : loading ? 'Sparar…' : 'Jag har besökt denna ö'}
      </button>

      {showToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(20,30,40,0.92)', color: '#fff',
            padding: '12px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600,
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            zIndex: 9999, whiteSpace: 'nowrap',
          }}
        >
          ✓ {islandName} loggad — dina följare ser detta!
        </div>
      )}
    </>
  )
}
