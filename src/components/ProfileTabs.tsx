'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'

type Flik = 'turer' | 'taggad' | 'forum'

/**
 * Flikarna på en profil (Turer / Taggad i / Forum).
 *
 * VARFÖR FLIKVALET LIGGER I KLIENTEN (2026-08-02):
 * Sidan läste tidigare `?tab=` via `searchParams` på servern. Att läsa
 * searchParams tvingar dynamisk rendering i App Router — undantagslöst, och
 * oberoende av cookies och `revalidate`. /u/[username] deklarerade
 * `revalidate = 60` men svarade `x-vercel-cache: MISS` på varje anrop och tog
 * 923–2807 ms. Byggutdata sa `●` (statisk) medan sidan i verkligheten
 * renderades dynamiskt — så byggsymbolen räcker inte som bevis, mät
 * `cache-control` live.
 *
 * Det här är samma mönster som DM-knappen (se DmButton.tsx): vilken flik som
 * är öppen är vy-tillstånd, inte identitet på en resurs, och ska därför inte
 * avgöras på servern. Regeln som gäller: en serversida får inte fråga
 * requesten om saker som bara styr vad som SYNS.
 *
 * Panelerna renderas fortfarande på servern och skickas in som slots — bara
 * växlingen sker här. Mätt kostnad för att serialisera alla tre i stället för
 * en: sidan är 94 kB och skillnaden mellan flikarna var 87–94 kB, alltså runt
 * 15 kB extra. Försumbart mot att sidan i gengäld serveras från CDN.
 *
 * OBS: useSearchParams() kräver en Suspense-gräns på en statiskt renderad
 * sida. Anroparen måste alltså wrappa den här komponenten i <Suspense>.
 */
export default function ProfileTabs({
  username,
  antal,
  turer,
  taggad,
  forum,
}: {
  username: string
  antal: { turer: number; taggad: number; forum: number }
  turer: ReactNode
  taggad: ReactNode
  forum: ReactNode
}) {
  const sp = useSearchParams()
  const raw = sp.get('tab')
  const aktiv: Flik = raw === 'taggad' ? 'taggad' : raw === 'forum' ? 'forum' : 'turer'

  const flikar = [
    { key: 'turer' as const, label: 'Turer', count: antal.turer },
    ...(antal.taggad > 0 ? [{ key: 'taggad' as const, label: 'Taggad i', count: antal.taggad }] : []),
    ...(antal.forum > 0 ? [{ key: 'forum' as const, label: 'Forum', count: antal.forum }] : []),
  ]

  return (
    <div style={{ background: 'var(--white)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,45,60,0.07)' }}>

      {/* Flikrad */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(10,123,140,0.08)' }}>
        {flikar.map(({ key, label, count }) => {
          const active = aktiv === key
          return (
            <Link
              key={key}
              href={key === 'turer'
                ? `/u/${encodeURIComponent(username)}`
                : `/u/${encodeURIComponent(username)}?tab=${key}`}
              scroll={false}
              style={{
                flex: 1, textAlign: 'center', textDecoration: 'none',
                padding: '13px 8px 11px',
                fontSize: 12, fontWeight: 700,
                color: active ? 'var(--sea)' : 'var(--txt3)',
                borderBottom: active ? '2px solid var(--sea)' : '2px solid transparent',
                transition: 'color .15s',
              }}
            >
              {label}
              <span style={{ marginLeft: 5, fontSize: 11, fontWeight: 400, opacity: 0.75 }}>
                {count}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Innehåll — alla tre är server-renderade, vi växlar bara vilken som visas */}
      {aktiv === 'forum' ? forum : aktiv === 'taggad' ? taggad : turer}
    </div>
  )
}
