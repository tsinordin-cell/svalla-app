'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { analytics } from '@/lib/analytics'
import { setPendingAction, takePendingAction } from '@/lib/pendingAction'
import Icon from '@/components/Icon'

/**
 * "Markera öarna som besökta" (2026-09-28, ruttplanerarens nästa steg).
 *
 * Ett avslut på rutten som inte kräver GPS-loggning: ett tryck lägger alla
 * öar längs rutten i visited_islands, så Min skärgård växer. Utloggad →
 * registrering → tillbaka → markerat (pendingAction med ruttens id).
 *
 * Skriver bara egna rader (RLS), samma upsert som MarkVisitedButton.
 */
export default function PlaneraMarkVisited({ routeId, slugs, names }: { routeId: string; slugs: string[]; names: string[] }) {
  const supabase = useRef(createClient()).current
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')
  const [hydrated, setHydrated] = useState(false)

  async function markAll(uid: string) {
    setState('saving')
    const now = new Date().toISOString()
    const { error } = await supabase.from('visited_islands').upsert(
      slugs.map(slug => ({ user_id: uid, island_slug: slug, visited_at: now })),
      { onConflict: 'user_id,island_slug', ignoreDuplicates: true },
    )
    if (error) { setState('error'); return }
    setState('done')
    for (let i = 0; i < slugs.length; i++) {
      analytics.islandMarkedVisited({ island_slug: slugs[i]!, island_name: names[i] ?? slugs[i]! })
    }
  }

  useEffect(() => {
    setHydrated(true)
    let cancelled = false
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || cancelled) return
      setUserId(user.id)
      // Alla redan besökta? Visa det i stället för knappen.
      const { data } = await supabase
        .from('visited_islands').select('island_slug')
        .eq('user_id', user.id).in('island_slug', slugs)
      const have = new Set((data ?? []).map(r => r.island_slug as string))
      if (slugs.every(s => have.has(s))) { setState('done'); takePendingAction('mark_route_visited', routeId); return }
      // Kom hon tillbaka från registreringen? Då gör vi det hon tryckte på.
      if (takePendingAction('mark_route_visited', routeId)) await markAll(user.id)
    }
    load()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeId, supabase])

  if (!hydrated || slugs.length === 0) return null

  function handleClick() {
    if (state === 'saving' || state === 'done') return
    if (!userId) {
      setPendingAction('mark_route_visited', routeId)
      router.push(`/logga-in?returnTo=${encodeURIComponent(`/planera/${routeId}`)}&mode=ny`)
      return
    }
    void markAll(userId)
  }

  if (state === 'done') {
    return (
      <div style={{
        marginTop: 10, borderRadius: 14, padding: '12px 14px',
        background: 'rgba(42,157,92,0.10)', border: '1px solid rgba(42,157,92,0.2)',
        display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 600, color: '#2a9d5c',
      }}>
        <Icon name="check" size={18} stroke={2.4} />
        {slugs.length === 1 ? `${names[0]} är markerad som besökt.` : `${slugs.length} öar är markerade som besökta i Min skärgård.`}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={state === 'saving'}
      style={{
        width: '100%', marginTop: 10, padding: '13px 15px', borderRadius: 14,
        background: 'var(--white)', color: 'var(--sea)',
        border: '1.5px solid rgba(30,92,130,0.35)', fontSize: 14, fontWeight: 700,
        cursor: state === 'saving' ? 'wait' : 'pointer', fontFamily: 'inherit',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}
    >
      <Icon name="flag" size={16} stroke={2.2} />
      {state === 'saving' ? 'Markerar…'
        : state === 'error' ? 'Kunde inte spara, försök igen'
        : slugs.length === 1 ? `Markera ${names[0]} som besökt`
        : `Markera ${slugs.length} öar som besökta`}
    </button>
  )
}
