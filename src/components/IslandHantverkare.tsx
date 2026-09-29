import Link from 'next/link'
import Icon from '@/components/Icon'
import HantverkarKort from '@/components/HantverkarKort'
import { getHantverkareForIsland } from '@/app/o/hantverkare-data'

/**
 * IslandHantverkare — avsnittet på ösidan som leder vidare till hantverkarsidan.
 *
 * Visar ett smakprov, inte hela listan. Ösidan har många andra saker att göra,
 * och den som letar hantverkare ska hamna på undersidan där filtreringen finns.
 *
 * Renderar ingenting alls när ön saknar poster. En tom rubrik är sämre än
 * ingen rubrik, och de flesta öar kommer aldrig ha tillräckligt underlag —
 * Husarö har två företag för att det bor ett fåtal människor där.
 *
 * Filtreringen sker i getHantverkareForIsland(), inte här. Den utesluter
 * poster vars enda yrke är elektriker utan bekräftad registrering hos
 * Elsäkerhetsverket.
 */
const SMAKPROV = 3

export default function IslandHantverkare({
  islandSlug,
  islandName,
}: {
  islandSlug: string
  islandName?: string
}) {
  const alla = getHantverkareForIsland(islandSlug)
  if (alla.length === 0) return null

  const visade = alla.slice(0, SMAKPROV)
  const fler = alla.length - visade.length

  return (
    <section style={{ marginBottom: 52 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginBottom: 6, flexWrap: 'wrap',
      }}>
        <div style={{
          minWidth: 30, height: 30, borderRadius: 9,
          background: 'var(--grad-sea)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="wrench" size={16} stroke={1.9} />
        </div>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
          Hantverkare och service{islandName ? ` på ${islandName}` : ' på ön'}
        </h2>
      </div>

      <p style={{ margin: '0 0 14px', fontSize: 13.5, color: 'var(--txt3)', lineHeight: 1.6 }}>
        {alla.length} {alla.length === 1 ? 'företag' : 'företag'} med verksamhet här.
        {' '}Varje uppgift visas med källa och läsdatum.
      </p>

      <ul style={{ display: 'grid', gap: 10, margin: 0, padding: 0 }}>
        {visade.map(h => <HantverkarKort key={h.slug} h={h} oSlug={islandSlug} />)}
      </ul>

      {fler > 0 && (
        <Link
          href={`/o/${islandSlug}/hantverkare`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            marginTop: 14, fontSize: 14, fontWeight: 600,
            color: 'var(--acc-d)', textDecoration: 'none',
          }}
        >
          Se alla {alla.length} och filtrera efter behov
          <Icon name="arrowRight" size={15} stroke={2.2} />
        </Link>
      )}
    </section>
  )
}
