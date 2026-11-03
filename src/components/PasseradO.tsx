'use client'
/**
 * En ö man passerat från sjön, med knappen "Jag gick i land" (2026-10-29).
 * Gränsen för besök (stopp ≥ 10 min, islandCoords.ts BESOK_MIN_S) är en
 * bedömning; den som gick i land kortare stund eller vars GPS tappade stoppet
 * flyttar själv ön till besökta. Skriver bara egna rader (RLS).
 */
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { track } from '@/lib/analytics-events'

export default function PasseradO({ slug, namn, tripId }: { slug: string; namn: string; tripId: string | null }) {
  const router = useRouter()
  const [laget, setLaget] = useState<'vila' | 'sparar' | 'klar' | 'fel'>('vila')

  async function gickILand() {
    setLaget('sparar')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLaget('fel'); return }
    const { error } = await supabase.from('visited_islands')
      .upsert({ user_id: user.id, island_slug: slug, trip_id: tripId }, { onConflict: 'user_id,island_slug', ignoreDuplicates: true })
    if (error) { setLaget('fel'); return }
    await supabase.from('passerade_oar').delete().eq('user_id', user.id).eq('island_slug', slug)
    track('passerad_till_besokt', { slug })
    setLaget('klar')
    router.refresh()
  }

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 2, borderRadius: 999,
      border: '1.5px dashed rgba(10,123,140,0.35)', paddingLeft: 12, paddingRight: 4, height: 34,
    }}>
      <Link href={`/o/${slug}`} style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt2)', textDecoration: 'none', paddingRight: 6 }}>{namn}</Link>
      <button
        type="button"
        onClick={gickILand}
        disabled={laget === 'sparar' || laget === 'klar'}
        aria-label={`Jag gick i land på ${namn}`}
        style={{
          border: 'none', borderRadius: 999, height: 26, padding: '0 10px', cursor: 'pointer',
          background: laget === 'fel' ? 'rgba(200,60,40,0.12)' : 'rgba(10,123,140,0.10)',
          color: laget === 'fel' ? 'var(--red)' : 'var(--sea)', fontSize: 11, fontWeight: 700, fontFamily: 'inherit',
        }}
      >
        {laget === 'sparar' ? 'Sparar…' : laget === 'klar' ? 'Besökt' : laget === 'fel' ? 'Försök igen' : 'Jag gick i land'}
      </button>
    </div>
  )
}
