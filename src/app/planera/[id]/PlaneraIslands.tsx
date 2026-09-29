import Link from 'next/link'
import Icon, { type IconName } from '@/components/Icon'
import SaveIslandButton from '@/components/SaveIslandButton'
import type { IslandAlongRoute, IslandChip } from '@/lib/islandsAlongRoute'

/**
 * "Öar längs rutten" på ruttsidan (2026-09-28, ruttplanerarens nästa steg).
 *
 * Serverkomponent: listan räknas ut i page.tsx (islandsAlongRoute) och
 * renderas här. Varje ö länkar till sin ösida och har hjärtknappen (klient),
 * som för utloggade går via registrering och fullföljs efteråt.
 */

const CHIP: Record<IslandChip, { label: string; icon: IconName }> = {
  'gästhamn': { label: 'Gästhamn', icon: 'anchor' },
  krog:       { label: 'Krog',     icon: 'utensils' },
  bad:        { label: 'Bad',      icon: 'waves' },
  bastu:      { label: 'Bastu',    icon: 'sun' },
  natur:      { label: 'Natur',    icon: 'leaf' },
  barn:       { label: 'Med barn', icon: 'child' },
  lugnt:      { label: 'Lugnt',    icon: 'moon' },
}

function distLabel(km: number): string {
  if (km < 1) return 'vid rutten'
  return `${String(km).replace('.', ',')} km från rutten`
}

export default function PlaneraIslands({ islands }: { islands: IslandAlongRoute[] }) {
  if (islands.length === 0) return null
  return (
    <section aria-labelledby="oar-langs-rutten" style={{ marginBottom: 24 }}>
      <h2 id="oar-langs-rutten" style={{
        fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--sea)', margin: '0 0 6px',
      }}>
        {islands.length === 1 ? '1 ö längs rutten' : `${islands.length} öar längs rutten`}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 14px', lineHeight: 1.5 }}>
        Ösidor med hamnar, bad, krogar och båttider. Spara de du vill besöka, så ligger de i Min skärgård.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {islands.map((island, idx) => (
          <div key={island.slug} style={{
            background: 'var(--white)', borderRadius: 16, padding: '12px 12px 12px 16px',
            border: '1px solid rgba(10,123,140,0.08)',
            boxShadow: '0 2px 8px rgba(0,45,60,0.06)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Link href={`/o/${island.slug}`} style={{ textDecoration: 'none', flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div aria-hidden style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(30,92,130,0.10)', color: 'var(--sea)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
              }}>
                <Icon name="island" size={18} stroke={2} />
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 16, height: 16, borderRadius: '50%',
                  background: 'var(--sea)', color: '#fff',
                  fontSize: 9, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{idx + 1}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {island.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--txt3)', marginBottom: island.chips.length ? 6 : 0 }}>
                  {island.regionLabel ? `${island.regionLabel} · ` : ''}{distLabel(island.distKm)}
                </div>
                {island.chips.length > 0 && (
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {island.chips.map(c => (
                      <span key={c} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        fontSize: 11, fontWeight: 600, color: 'var(--txt2)',
                        background: 'rgba(30,92,130,0.07)', borderRadius: 20, padding: '2px 8px',
                      }}>
                        <Icon name={CHIP[c].icon} size={11} stroke={2.2} />
                        {CHIP[c].label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
            <SaveIslandButton islandSlug={island.slug} islandName={island.name} variant="icon" />
          </div>
        ))}
      </div>
    </section>
  )
}
