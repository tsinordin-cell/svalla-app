'use client'
import { useEffect, useRef, useState } from 'react'

export type OReserv = {
  url: string
  oNamn: string
  fotograf: string
  licens: string
  licensUrl: string | null
  kalla: string
}

/**
 * Toppbilden på /plats/[slug] med reserv.
 *
 * Bakgrund (mätt 2026-11-23): Google nekar fotonyckeln (403 PERMISSION_DENIED,
 * places.googleapis.com) och 574 av 699 platser har Google-foto som förstaval.
 * <img> saknade reserv, så toppen visade en trasig bildikon och alt-texten.
 *
 * Ordning:
 *   1. Platsens egna foton (Google, eller kopior av dem i vår storage).
 *      Stockfoton (Unsplash) filtreras bort redan i page.tsx: de är inte
 *      platsen, och en bild på en hamburgare under "Finnhamns Krog" påstår
 *      något vi inte vet.
 *   2. Öns eget foto från Wikimedia Commons, med en rad som säger att det är
 *      ön och vem som tog bilden (licensvillkor, se IslandFoto.tsx).
 *   3. Ingen bild: havsfärgen bakom syns, och den ser inte ut som ett foto.
 *
 * Bilden är osynlig tills den laddat, så en trasig bild aldrig skymtar.
 * Ett fel eller en laddning som hinner ske innan React tagit över sidan
 * fångas inte av onError/onLoad, därför kontrolleras bilden när den monteras.
 */
export default function PlatsHeroBild({ kallor, alt, reserv }: { kallor: string[]; alt: string; reserv: OReserv | null }) {
  const [index, setIndex] = useState(0)
  const [laddad, setLaddad] = useState(false)
  const ref = useRef<HTMLImageElement>(null)

  const egen = index < kallor.length
  const src = egen ? kallor[index] : index === kallor.length ? reserv?.url : undefined

  useEffect(() => {
    const img = ref.current
    if (!img || !img.complete) return
    if (img.naturalWidth === 0) setIndex(i => i + 1)
    else setLaddad(true)
  }, [index])

  if (!src) return null
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        key={src}
        src={src}
        alt={egen ? alt : `${reserv!.oNamn}, ön där ${alt} ligger`}
        onLoad={() => setLaddad(true)}
        onError={() => { setLaddad(false); setIndex(i => i + 1) }}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          opacity: laddad ? 1 : 0, transition: 'opacity .25s',
        }}
      />
      {!egen && reserv && laddad && (
        <p style={{
          position: 'absolute', top: 12, right: 12, zIndex: 6, margin: 0, maxWidth: '70%',
          padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.5)',
          color: '#fff', fontSize: 11, lineHeight: 1.4, textAlign: 'right',
        }}>
          Bild: {reserv.oNamn} ·{' '}
          <a href={reserv.kalla} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{reserv.fotograf}</a>,{' '}
          {reserv.licensUrl
            ? <a href={reserv.licensUrl} target="_blank" rel="noopener noreferrer license" style={{ color: 'inherit' }}>{reserv.licens}</a>
            : reserv.licens}
        </p>
      )}
    </>
  )
}
