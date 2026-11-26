import Link from 'next/link'
import { formatKm, type IslandPlace } from '@/lib/islandPlaces'

/**
 * Lista med platser ur platsdatabasen på en ösida (bad, restauranger, hamnar,
 * boende). Texterna kommer från platsens egen sida på Svalla och är
 * källbelagda där; här visas en förkortad version med länk.
 */
export default function IslandPlacesList({
  places,
  islandName,
  heading,
  etiketter,
}: {
  places: IslandPlace[]
  islandName: string
  heading: string
  /** Etikett per platstyp, t.ex. "Camping" på boendesidan (mallarnas runda 5, 2026-11-10). Typer utan etikett visas utan. */
  etiketter?: Record<string, string>
}) {
  if (places.length === 0) return null
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>{heading}</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {places.map(p => {
          const text = p.description
            ? (p.description.length > 240 ? `${p.description.slice(0, 237).replace(/\s+\S*$/, '')} …` : p.description)
            : null
          return (
            <Link
              key={p.slug}
              href={`/upptack/${p.slug}`}
              style={{
                display: 'block', textDecoration: 'none', color: 'inherit',
                background: 'var(--white)', borderRadius: 14, padding: '16px 20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(10,123,140,0.07)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--txt)' }}>
                  {p.name}
                  {etiketter?.[p.type] && (
                    <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: 'rgba(30,92,130,0.08)', color: '#1e5c82', verticalAlign: 'middle' }}>
                      {etiketter[p.type]}
                    </span>
                  )}
                </span>
                {!p.onIsland && p.km != null && (
                  <span style={{ fontSize: 12, color: 'var(--txt3)' }}>{formatKm(p.km)} fågelvägen från {islandName}</span>
                )}
              </div>
              {text && <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, margin: '6px 0 0' }}>{text}</p>}
              <span style={{ fontSize: 12, color: 'var(--sea)', marginTop: 8, display: 'inline-block', fontWeight: 600 }}>Karta och mer info →</span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
