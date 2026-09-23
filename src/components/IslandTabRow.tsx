import Link from 'next/link'

export type IslandSubPageTab =
  | 'aktiviteter' | 'restauranger' | 'boende' | 'hamnar'
  | 'komma-dit' | 'bad' | 'med-barn' | 'hantverkare'

export const TAB_LABEL: Record<IslandSubPageTab, string> = {
  aktiviteter: 'Aktiviteter',
  restauranger: 'Restauranger',
  boende: 'Boende',
  hamnar: 'Hamnar',
  'komma-dit': 'Komma dit',
  bad: 'Bad',
  'med-barn': 'Med barn',
  // Adressen heter /hantverkare för att det är ordet folk söker på, men
  // listan rymmer sjötransport, båtmekaniker, dykare, markarbete,
  // brunnsborrning och sotare. "Hantverkare" som etikett hade utelovat
  // något smalare än vad sidan faktiskt innehåller. (Max 2026-09-23)
  hantverkare: 'Hantverk & service',
}

/**
 * Raden med undersidor för en ö.
 *
 * Fanns tidigare bara i IslandSubPageHeader, vilket gav den märkliga effekten
 * att man kunde navigera mellan öns undersidor så länge man redan stod på en
 * av dem — men inte från ösidan själv. Därför ligger den nu i en egen
 * komponent och används på båda ställena.
 *
 * `tab` utelämnas på ösidan: ingen flik är aktiv där.
 *
 * `dolj` tar bort flikar för undersidor som saknar underlag på just den ön.
 * Hantverkarfliken är den enda som använder det i dag — vi har poster för
 * 16 öar, inte alla 103, och en flik som leder till "inga uppgifter ännu"
 * är sämre än ingen flik.
 */
export default function IslandTabRow({
  islandSlug,
  tab,
  dolj = [],
  variant = 'hero',
}: {
  islandSlug: string
  tab?: IslandSubPageTab
  dolj?: IslandSubPageTab[]
  /** 'hero' = ljus text mot mörk bakgrund. 'ljus' = mörk text mot ljus sida. */
  variant?: 'hero' | 'ljus'
}) {
  const nycklar = (Object.keys(TAB_LABEL) as IslandSubPageTab[])
    .filter(k => !dolj.includes(k))

  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {nycklar.map(key => {
        const aktiv = key === tab
        return (
          <Link
            key={key}
            href={`/o/${islandSlug}/${key}`}
            aria-current={aktiv ? 'page' : undefined}
            style={{
              padding: '7px 14px', borderRadius: 999,
              fontSize: 12.5, fontWeight: 600,
              textDecoration: 'none',
              background: variant === 'hero'
                ? (aktiv ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.10)')
                : (aktiv ? 'var(--sea)' : 'var(--white)'),
              color: variant === 'hero'
                ? (aktiv ? 'var(--sea-d)' : 'rgba(255,255,255,0.85)')
                : (aktiv ? '#fff' : 'var(--txt2)'),
              border: variant === 'hero'
                ? '1px solid rgba(255,255,255,0.16)'
                : '1px solid var(--surface-3)',
              transition: 'background 0.14s, color 0.14s',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {TAB_LABEL[key]}
          </Link>
        )
      })}
    </div>
  )
}
