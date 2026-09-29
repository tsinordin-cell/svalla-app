'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { setPendingAction, takePendingAction } from '@/lib/pendingAction'

interface Props {
  islandSlug: string
  islandName: string
  variant?: 'pill' | 'icon'
}

/**
 * SaveIslandButton — hjärtknapp som sparar en ö i `saved_islands`.
 * - Utloggad: skickar till /logga-in?returnTo=… så användaren kan logga in/skapa konto.
 * - Inloggad: toggle save state.
 *
 * Variant 'pill': stor textknapp för ösidan.
 * Variant 'icon': liten knapp för listor/cards.
 */
export default function SaveIslandButton({ islandSlug, islandName, variant = 'pill' }: Props) {
  const supabase = useRef(createClient()).current
  const router = useRouter()
  const [saved, setSaved] = useState(false)
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
        .from('saved_islands')
        .select('id')
        .eq('user_id', user.id)
        .eq('island_slug', islandSlug)
        .maybeSingle()
      if (data) { setSaved(true); takePendingAction('save_island', islandSlug); return }
      // Kom hon hit från "Spara ön" → skapa konto → tillbaka? Då sparar vi nu,
      // så klicket hon gjorde som utloggad blir gjort (se lib/pendingAction.ts).
      if (takePendingAction('save_island', islandSlug)) {
        const { error } = await supabase.from('saved_islands').insert({ user_id: user.id, island_slug: islandSlug })
        if (!error) {
          setSaved(true)
          setShowToast(true)
          setTimeout(() => setShowToast(false), 2400)
        }
      }
    }
    load()
  }, [islandSlug, supabase])

  async function toggle() {
    if (loading) return
    if (!userId) {
      // Utloggad → till inloggningen med returnTo. RÄTTAT 2026-09-28: pekade på
      // /auth?next=…, en sida som aldrig funnits (bara /auth/callback), så varje
      // utloggat klick gav 404 sedan 2026-04-28. ?saved=1 togs bort: ingen läste den.
      setPendingAction('save_island', islandSlug)
      router.push(`/logga-in?returnTo=${encodeURIComponent(`/o/${islandSlug}`)}&mode=ny`)
      return
    }
    setLoading(true)
    if (saved) {
      await supabase
        .from('saved_islands')
        .delete()
        .eq('user_id', userId)
        .eq('island_slug', islandSlug)
      setSaved(false)
    } else {
      await supabase.from('saved_islands').insert({
        user_id: userId,
        island_slug: islandSlug,
      })
      setSaved(true)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2400)
    }
    setLoading(false)
  }

  if (!hydrated) {
    // SSR-safe placeholder för att undvika hydration-mismatch
    return null
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={toggle}
        aria-label={saved ? `Ta bort ${islandName} från sparade` : `Spara ${islandName}`}
        className="press-feedback"
        style={{
          width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: saved ? 'rgba(201,110,42,0.16)' : 'var(--surface-2, rgba(0,0,0,0.05))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all .15s', flexShrink: 0,
        }}
      >
        <svg viewBox="0 0 24 24" fill={saved ? '#c96e2a' : 'none'} stroke={saved ? '#c96e2a' : 'currentColor'} strokeWidth={2}
          style={{ width: 18, height: 18 }}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>
    )
  }

  return (
    <>
      <button
        onClick={toggle}
        disabled={loading}
        aria-label={saved ? `${islandName} sparad — tryck för att ta bort` : `Spara ${islandName}`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '10px 18px',
          borderRadius: 999,
          border: saved ? '1.5px solid #c96e2a' : '1.5px solid rgba(255,255,255,0.4)',
          background: saved ? 'rgba(201,110,42,0.12)' : 'rgba(255,255,255,0.18)',
          color: saved ? '#c96e2a' : '#fff',
          fontSize: 13.5, fontWeight: 700,
          cursor: loading ? 'wait' : 'pointer',
          transition: 'all .15s',
          backdropFilter: 'blur(8px)',
          opacity: loading ? 0.6 : 1,
        }}
      >
        <svg viewBox="0 0 24 24" fill={saved ? '#c96e2a' : 'none'} stroke="currentColor" strokeWidth={2}
          style={{ width: 16, height: 16 }}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        {saved ? 'Sparad' : 'Spara ön'}
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
            zIndex: 9999, animation: 'svalla-fade-in .2s ease',
          }}
        >
          {islandName} sparad — se din lista i <a href="/min-skargard" style={{ color: '#ffb27a', textDecoration: 'underline' }}>Min skärgård</a>
        </div>
      )}
    </>
  )
}
