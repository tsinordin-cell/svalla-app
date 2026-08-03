'use client'
import { useEffect, useState } from 'react'
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
 * VARFÖR INTE useSearchParams(): första försöket använde den, och då hoppar
 * Next.js över hela subträdet vid prerendering — den statiska HTML:en
 * innehöll bara Suspense-fallbacken, så besökaren såg en tom ruta där
 * turrutnätet skulle vara tills JS hunnit ladda. Sidan blev snabb men såg
 * trasig ut under laddningen.
 *
 * Nu hålls fliken i vanligt klient-state med 'turer' som utgångsläge, vilket
 * betyder att servern renderar den panelen direkt i HTML:en. `?tab=` läses en
 * gång efter montering, så delbara länkar fungerar fortfarande — de byter
 * bara flik strax efter att sidan visats, i stället för att blockera den.
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
  // Utgångsläget måste vara samma på server och klient, annars blir det
  // hydreringsfel. Därför alltid 'turer' först, och ?tab= läses efter mount.
  const [aktiv, setAktiv] = useState<Flik>('turer')

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('tab')
    if (t === 'taggad' || t === 'forum') setAktiv(t)
  }, [])

  function valj(flik: Flik) {
    setAktiv(flik)
    // Håll URL:en i synk så att fliken går att dela och backa till, utan att
    // navigera om sidan (och utan att servern behöver läsa searchParams).
    const url = flik === 'turer'
      ? `/u/${encodeURIComponent(username)}`
      : `/u/${encodeURIComponent(username)}?tab=${flik}`
    window.history.replaceState(null, '', url)
  }

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
            <button
              key={key}
              type="button"
              onClick={() => valj(key)}
              aria-pressed={active}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit',
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
            </button>
          )
        })}
      </div>

      {/* Innehåll — alla tre är server-renderade, vi växlar bara vilken som visas */}
      {aktiv === 'forum' ? forum : aktiv === 'taggad' ? taggad : turer}
    </div>
  )
}
