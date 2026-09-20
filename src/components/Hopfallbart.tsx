'use client'
import { useState, type ReactNode } from 'react'

/**
 * Visar en förhandsdel och fäller ihop resten bakom en knapp.
 *
 * Bakgrund (mätt 2026-09-19, 390 px): ö-sidorna var 14 000–15 000 px höga,
 * 17–18 skärmar. "Om X" ensam var 3 400–4 000 px (18 stycken på Grinda) och
 * "Guider om X" 2 250–3 050 px (20 länkar). Innehållet ska inte bort — det
 * är det som gör sidan rik — men en förälder på bryggan ska hitta "Ta sig
 * dit" utan att svepa förbi fem skärmar historia.
 *
 * Det dolda ligger kvar i DOM:en (hidden), så sökmotorer och skärmläsare
 * ser allt. Utan JavaScript visas allt.
 */
export default function Hopfallbart({
  synligt,
  dolt,
  etikett,
  stangEtikett = 'Visa mindre',
}: {
  synligt: ReactNode
  dolt: ReactNode
  /** t.ex. "Läs hela texten (14 stycken till)" */
  etikett: string
  stangEtikett?: string
}) {
  const [oppen, setOppen] = useState(false)
  return (
    <>
      {synligt}
      <div hidden={!oppen} data-hopfallbart-dolt style={{ display: oppen ? 'contents' : undefined }}>
        {dolt}
      </div>
      <noscript>
        <style>{`[data-hopfallbart-dolt] { display: contents !important; }`}</style>
      </noscript>
      <button
        type="button"
        onClick={() => setOppen(o => !o)}
        aria-expanded={oppen}
        style={{
          alignSelf: 'flex-start',
          marginTop: 4,
          padding: '10px 18px',
          borderRadius: 999,
          border: '1px solid var(--surface-3)',
          background: 'var(--white)',
          color: 'var(--sea)',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {oppen ? stangEtikett : etikett}
      </button>
    </>
  )
}
