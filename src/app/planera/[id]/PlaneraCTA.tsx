'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Icon from '@/components/Icon'

/**
 * Avslutet på ruttsidan (2026-11-16).
 *
 * Tidigare: en knapp "Jag gjorde den här turen!" → /logga, där förstavalet
 * "Starta spårning" tappade kopplingen till rutten (GPS-sidan läste aldrig
 * planned_route_id). 31 rutter, 0 kopplade turer.
 *
 * Nu två tydliga vägar, båda med rutt-id:
 * - "Starta turen nu": GPS-loggning (/spara) med rutten förifylld.
 * - "Jag har redan gjort turen": manuell loggning med start och mål ifyllda.
 * Klar tur visas med länk till turen. doneTripId kommer från trips
 * (planned_route_id, egen tur) eller från planned_routes.trip_id.
 */
export default function PlaneraCTA({ routeId, doneTripId }: { routeId: string; doneTripId: string | null }) {
  const router = useRouter()
  const [loading, setLoading] = useState<'gps' | 'manuell' | null>(null)

  if (doneTripId) {
    return (
      <div style={{
        marginTop: 20, background: 'rgba(42,157,92,0.1)', borderRadius: 16,
        padding: '14px 16px', border: '1px solid rgba(42,157,92,0.2)',
        display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
      }}>
        <span aria-hidden><Icon name="check" size={20} /></span>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#2a9d5c', flex: 1 }}>Du har gjort den här turen</span>
        <Link href={`/tur/${doneTripId}`} style={{ fontSize: 13, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none' }}>
          Se turen →
        </Link>
      </div>
    )
  }

  async function ga(till: 'gps' | 'manuell') {
    setLoading(till)
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push(`/logga-in?returnTo=/planera/${routeId}`)
      return
    }
    router.push(till === 'gps' ? `/spara?planned_route_id=${routeId}` : `/logga/manuell?planned_route_id=${routeId}`)
  }

  return (
    <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <button
        onClick={() => ga('gps')}
        disabled={loading !== null}
        style={{
          width: '100%', padding: '15px', borderRadius: 16, border: 'none',
          background: 'var(--grad-sea)', color: '#fff', fontSize: 15, fontWeight: 700,
          cursor: 'pointer', boxShadow: '0 4px 20px rgba(10,123,140,0.35)',
          opacity: loading === 'gps' ? 0.7 : 1,
        }}
      >
        Starta turen nu
      </button>
      <button
        onClick={() => ga('manuell')}
        disabled={loading !== null}
        style={{
          width: '100%', padding: '12px', borderRadius: 16,
          border: '1.5px solid var(--border, rgba(10,123,140,0.25))',
          background: 'transparent', color: 'var(--sea)', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', opacity: loading === 'manuell' ? 0.7 : 1,
        }}
      >
        Jag har redan gjort turen
      </button>
      <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '2px 4px 0', lineHeight: 1.4 }}>
        Turen loggas i din loggbok med rutten kopplad. Start och mål fylls i åt dig.
      </p>
    </div>
  )
}
