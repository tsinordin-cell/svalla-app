import Link from 'next/link'
import { ALL_ISLANDS } from '@/app/o/island-data'
import Icon from '@/components/Icon'
import { emojiToIcon } from '@/lib/iconMap'

/**
 * Öarna i en region, renderade ur island-data — så att regionsidorna pekar på
 * det som finns i stället för på en tom kartvy.
 *
 * Bakgrund 2026-09-20: sex regionsidor hade kortet "Karta över X — alla
 * verifierade platser" som gick till /upptack. MÄTT: utforskaren har 0 platser
 * utanför Stockholmsregionen. Samtidigt finns ö-sidor med källor för Göteborg (7),
 * Gotland (4), Blekinge (4), Mälaren (3), Höga Kusten (3). Halland har inga —
 * då säger komponenten det, i stället för att låtsas.
 */
export function oarIRegion(etiketter: string[]) {
  return ALL_ISLANDS.filter(i => i.regionLabel && etiketter.includes(i.regionLabel))
}

export default function RegionOar({
  id = 'oar',
  rubrik,
  etiketter,
}: {
  id?: string
  rubrik: string
  /** regionLabel-värden ur island-data, t.ex. ['Göteborgs södra skärgård', 'Göteborgs norra skärgård'] */
  etiketter: string[]
}) {
  const oar = oarIRegion(etiketter)
  return (
    <>
      <h2 id={id} style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
        {rubrik}
      </h2>
      {oar.length === 0 ? (
        <p>
          Vi har ännu inga ö-sidor här. Vet du en ö som borde vara med — <Link href="/tips">tipsa oss</Link>.
        </p>
      ) : (
        <>
          <p>
            {oar.length} {oar.length === 1 ? 'sida' : 'sidor'}, var och en med hamnar, aktiviteter och källor.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10, margin: '12px 0 28px' }}>
            {oar.map(o => (
              <Link key={o.slug} href={`/o/${o.slug}`} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', borderRadius: 12,
                background: 'var(--white)', border: '1px solid var(--surface-3)',
                textDecoration: 'none', boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
              }}>
                <span style={{ flexShrink: 0, color: 'var(--sea)' }} aria-hidden><Icon name={emojiToIcon(o.emoji)} size={20} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>{o.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--txt3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {o.harbors.length > 0 ? o.harbors.map(h => h.name).join(' · ') : o.tagline}
                  </div>
                </div>
                <span style={{ color: 'var(--sea)', fontWeight: 700, flexShrink: 0 }}>→</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}
