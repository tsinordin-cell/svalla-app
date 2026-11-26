import { serializeForScript } from '@/lib/serializeForScript'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland, type IslandBeach } from '../../island-data'
import IslandSubPageHeader from '@/components/IslandSubPageHeader'
import Icon, { type IconName } from '@/components/Icon'
import IslandPlacesList from '@/components/IslandPlacesList'
import { ogO } from '@/lib/og-standard'
import { getIslandPlaces, utanDubbletter, normaliseraPlatsnamn } from '@/lib/islandPlaces'
import { omBad } from '@/lib/mallRegler'
import { lage, aktivitetensLage, grannoarIData, LAGESORD } from '@/lib/badLage'
import { getIslandTransit } from '@/lib/transit-stops'

// ISR: badplatserna ur platsdatabasen hämtas vid bygget och uppdateras varje timme.
export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

function isBeachObject(b: string | IslandBeach): b is IslandBeach {
  return typeof b === 'object' && b !== null && 'name' in b
}

/*
 * Handlar aktiviteten om bad? omBad i src/lib/mallRegler.ts, samma regel som ösidan: "strand" fångade
 * ortnamn och strandängar (mall-0198), badtunnor gav "Badplatser på och nära Lidö" (mall-0192 omarbete 2),
 * och badstegen vid bastun gav "Badplatser på och nära Bullerö" fast ön saknar badplats (2026-11-07,
 * mall-0191 och mall-0192 omarbete 4). En post som säger att ön saknar badplats räknas inte heller.
 */

/**
 * Text för öar utan badplats. "… och i resten av skärgården" bara när öns data lägger den i en skärgård
 * (regionLabel): Blå Jungfrun (Kalmarsund), Lilla Karlsö (Gotland), Hanö (Blekinge), Adelsö (Mälaren),
 * Fjällbacka och Grundsund (Bohuslän) gör det inte (2026-11-03, mall-0191 och mall-0192 omarbete 3).
 */
function utanBadText(island: { name: string; regionLabel?: string }): string {
  return `Vad som gäller när du badar vid ${island.name}${/skärgård/i.test(island.regionLabel ?? '') ? ' och i resten av skärgården' : ''}.`
}

const typeLabel: Record<IslandBeach['type'], { icon: IconName; text: string }> = {
  sandstrand:    { icon: 'waves',    text: 'Sandstrand' },
  klippbad:      { icon: 'mountain', text: 'Klippbad' },
  grusstrand:    { icon: 'mountain', text: 'Grusstrand' },
  stenstrand:    { icon: 'mountain', text: 'Stenstrand' },
  brygga:        { icon: 'anchor',   text: 'Badbrygga' },
  trampolinbad:  { icon: 'star',     text: 'Trampolinbad' },
  badvik:        { icon: 'water',    text: 'Badvik' },
}

export async function generateStaticParams() {
  return ALL_ISLANDS.map(island => ({ slug: island.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) return {}
  // "med beskrivning" bara när någon badplats i datan har en beskrivning: på 18 öar
  // är badplatserna bara namn (2026-11-02, mall-0191 omarbete).
  const medBeskrivning = (island.activity_meta?.bad?.beaches ?? []).some(isBeachObject)
  // Öar utan badplats och utan bad i aktiviteterna får samma text som undertiteln, inte
  // "Badplatser på och nära X" (Långskär, Storskär, Svenska Högarna m.fl.; mall-0191 omarbete 2).
  const harBad = (island.activity_meta?.bad?.beaches ?? []).length > 0 || island.activities.some(omBad)
  const utanBad = utanBadText(island)
  return {
    title: `Bad på och nära ${island.name}`,
    description: harBad
      ? `Badplatser på och nära ${island.name}${medBeskrivning ? ', med beskrivning och' : ' och'} vad allemansrätten säger om att bada.`
      : utanBad,
    keywords: [
      `bada på ${island.name.toLowerCase()}`,
      `badplatser ${island.name.toLowerCase()}`,
      `${island.name.toLowerCase()} bad`,
      `${island.name.toLowerCase()} strand`,
      `klippbad ${island.name.toLowerCase()}`,
      `${island.name.toLowerCase()} swim`,
    ],
    openGraph: {
      images: ogO(island.slug),
      title: `Bad på och nära ${island.name}`,
      description: harBad ? `Badplatser på och nära ${island.name}.` : utanBad,
      url: `https://svalla.se/o/${slug}/bad`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/bad` },
  }
}

export default async function IslandBadPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()
  const thorkelBat = getIslandTransit(slug) !== null

  const beaches = island.activity_meta?.bad?.beaches ?? []
  const badNote = island.activity_meta?.bad?.note
  // "strand" fångade ortnamn, gatunamn och strandängar (Marstrandsön, Hunnebostrand,
  // Strandgatan, Klara Mälarstrand); bara sand- och stenstränder räknas (2026-11-02, mall-0198 omarbete).
  const hasBad = island.activities.some(omBad)
  const badActivities = island.activities.filter(a =>
    // "brygga" och "klipp" tog med krogar med gästbrygga och vandring över klippor (2026-11-02, mall-0198).
    // "dyk" (dykning hör till vattenlivet) sedan mallarnas runda 8 (2026-11-17, mall-N024): Dalarö "Vrakdykning" och
    // Kosterhavet "Snorkling och dykning" visades på main och föll bort med mall-0198. Båda korten är lästa mot källan.
    // "snork" tas inte med: Nåttarös kort "Länets första snorkelled" stämmer inte med Länsstyrelsen (Vaktens lista).
    ['bad', 'klippbad', 'sim', 'sandstrand', 'sandstränd', 'stenstrand', 'dopp', 'dyk'].some(k =>
      a.name.toLowerCase().includes(k) || a.desc.toLowerCase().includes(k)
    )
  )
  // Grannöar som öns egen data nämner ("Härmanö huvud på grannön Härmanö"). Tre grupper: på ön, både ön och en annan plats
  // (Utös "Bad & stränder", rubriken "på och nära"), bara en annan plats ("nära") (runda 6, 2026-11-16, ma5027).
  const grannoar = grannoarIData(island)
  const badGrupper = (['pa', 'bada', 'annan'] as const).map(l => [LAGESORD[l], badActivities.filter(a => aktivitetensLage(a, island.name, grannoar) === l)] as const)

  // Badplatser ur platsdatabasen (källbelagda texter), utom de som redan står i island-data.
  const beachNames = new Set(beaches.map(b => (isBeachObject(b) ? b.name : b).toLowerCase()))
  // "Dyröns badplats" och "Klädesholmens badplats" blir bara "badplats" utan önamnet och tog då bort varje
  // "… badplats" ur platsdatabasen (Kåreviks badplats). Ett sådant namn jämförs bara exakt (2026-11-03, badkomp-dyron-N001).
  const dbBeaches = utanDubbletter(
    (await getIslandPlaces(island, ['beach'])).filter(p => !beachNames.has(p.name.toLowerCase())),
    [...beachNames].filter(n => normaliseraPlatsnamn(n, island.name) !== 'badplats'),
    island.name,
  )
  const allBeachNames = [...beaches.map(b => (isBeachObject(b) ? b.name : b)), ...dbBeaches.map(p => p.name)]
  // Öns egna badplatser: "på" bara när varje plats ligger på ön enligt sin text, "nära" när alla ligger på en
  // annan ö, annars "på och nära" (mall-N004 omarbete 4).
  const dataLage = beaches.map(b => lage(isBeachObject(b) ? `${b.name} ${b.desc}` : b, island.name, true))
  const dataAnnan = dataLage.filter(l => l === 'annan').length
  const dataRubrik = dataLage.every(l => l === 'pa') ? 'på' : dataAnnan === beaches.length ? 'nära' : 'på och nära'
  // Databasplatser: "på X" bara när platsens text säger det; en plats på en annan ö visar avståndet.
  const dbLage = dbBeaches.map(p => ({ p, l: lage(p.description ?? p.name, island.name) }))
  const dbPa = dbLage.filter(x => x.l === 'pa').map(x => ({ ...x.p, onIsland: true }))
  // "På och nära X" bara för platser inom platsradien (eller med öns namn i ö-fältet); en plats utanför radien eller på
  // en annan ö står under "nära X" med avståndet (full-24 k011, mall-0094; mallarnas runda 5, 2026-11-10).
  const dbPaEllerNara = dbLage.filter(x => x.l === 'oklar' && x.p.onIsland).map(x => x.p)
  const dbNara = dbLage.filter(x => x.l === 'annan' || (x.l === 'oklar' && !x.p.onIsland)).map(x => ({ ...x.p, onIsland: false }))

  const badSchema = allBeachNames.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Badplatser på och nära ${island.name}`,
    url: `https://svalla.se/o/${slug}/bad`,
    numberOfItems: allBeachNames.length,
    itemListElement: allBeachNames.map((name, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
    })),
  } : null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {badSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeForScript(badSchema) }} />
      )}

      <IslandSubPageHeader
        island={island}
        tab="bad"
        subtitle={
          beaches.length === 0 && dbBeaches.length === 0 && !hasBad
            ? utanBadText(island)
            // "med beskrivning" bara när en badplats har beskrivning (2026-11-02, mall-0192 omarbete).
            : beaches.some(isBeachObject) || dbBeaches.some(p => p.description)
            ? `Badplatser på och nära ${island.name}, med beskrivning.`
            : `Badplatser på och nära ${island.name}.`
        }
      />

      <div style={{ maxWidth: 900, margin: '24px auto 0', padding: '0 16px 60px' }}>

        {/* Källbelagd upplysning om bad på just den här ön */}
        {badNote && (
          <div style={{
            background: 'var(--white)', borderRadius: 14, padding: '20px 20px',
            border: '1px solid rgba(10,123,140,0.07)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)', marginBottom: 24,
          }}>
            <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.7, margin: 0 }}>{badNote}</p>
          </div>
        )}

        {/* Stränder och badplatser */}
        {beaches.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
              Badplatser {dataRubrik} {island.name}
            </h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {beaches.map((beach, i) => (
                isBeachObject(beach) ? (
                  <div key={i} style={{
                    background: 'var(--white)', borderRadius: 14,
                    padding: '20px 22px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(10,123,140,0.07)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sea)', background: 'rgba(10,123,140,0.08)', padding: '2px 10px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        {typeLabel[beach.type]
                          ? <><Icon name={typeLabel[beach.type].icon} size={13} stroke={2} />{typeLabel[beach.type].text}</>
                          : beach.type}
                      </span>
                      {beach.child_friendly && (
                        <span style={{ fontSize: 13, color: '#4a8c4a', background: 'rgba(74,140,74,0.08)', padding: '2px 10px', borderRadius: 20, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                          <Icon name="users" size={13} stroke={2} />Barnvänlig
                        </span>
                      )}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--txt)', marginBottom: 6 }}>{beach.name}</div>
                    <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, marginBottom: beach.depth || beach.directions || beach.insider_tip ? 12 : 0 }}>
                      {beach.desc}
                    </div>
                    {beach.depth && (
                      <div style={{ fontSize: 13, color: 'var(--txt3)', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}>Djup: </span>{beach.depth}
                      </div>
                    )}
                    {beach.directions && (
                      <div style={{ fontSize: 13, color: 'var(--txt3)', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600 }}>Vägbeskrivning: </span>{beach.directions}
                      </div>
                    )}
                    {beach.insider_tip && (
                      <div style={{ fontSize: 13, background: 'rgba(232,146,74,0.08)', borderLeft: '3px solid #e8924a', padding: '8px 12px', borderRadius: '0 8px 8px 0', marginTop: 10 }}>
                        <span style={{ fontWeight: 600, color: '#c07030' }}>Insidertips: </span>
                        <span style={{ color: 'var(--txt2)' }}>{beach.insider_tip}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div key={i} style={{
                    background: 'var(--white)', borderRadius: 14,
                    padding: '18px 20px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(10,123,140,0.07)',
                    display: 'flex', alignItems: 'center', gap: 14,
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--txt)' }}>{beach}</div>
                      <div style={{ fontSize: 13, color: 'var(--txt3)', marginTop: 3 }}>
                        {dataLage[i] === 'pa' ? `Badplats på ${island.name}` : dataLage[i] === 'annan' ? `Badplats nära ${island.name}` : `Badplats på eller nära ${island.name}`}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Badplatser ur platsdatabasen: först de som ligger på ön, sedan övriga (mall-N004) */}
        <IslandPlacesList
          places={dbPa}
          islandName={island.name}
          heading={beaches.length > 0 && dataRubrik !== 'nära' ? `Fler badplatser på ${island.name}` : `Badplatser på ${island.name}`}
        />
        <IslandPlacesList
          places={dbPaEllerNara}
          islandName={island.name}
          heading={`${beaches.length > 0 || dbPa.length > 0 ? 'Fler badplatser' : 'Badplatser'} på och nära ${island.name}`}
        />
        <IslandPlacesList
          places={dbNara}
          islandName={island.name}
          heading={`${(beaches.length > 0 && dataRubrik === 'nära') || dbPaEllerNara.length > 0 ? 'Fler badplatser' : 'Badplatser'} nära ${island.name}`}
        />

        {/* Bad-aktiviteter från activities[]: först de som gäller ön, sedan de som gäller både ön och en annan plats, sist de som
            gäller andra platser (mall-0198; runda 6) */}
        {badGrupper.map(([rubrik, lista]) => lista.length > 0 && (
          <div key={rubrik} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
              Bad och vattenliv {rubrik} {island.name}
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {lista.map((a, i) => (
                <div key={i} style={{
                  background: 'var(--white)', borderRadius: 14,
                  padding: '18px 20px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(10,123,140,0.07)',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--txt)', marginBottom: 6 }}>
                    {a.name}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6 }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Om inga baddata finns */}
        {beaches.length === 0 && badActivities.length === 0 && dbBeaches.length === 0 && (
          <div style={{
            background: 'var(--white)', borderRadius: 14, padding: '24px 20px',
            border: '1px solid rgba(10,123,140,0.07)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.7, margin: 0 }}>
              {!badNote && <>Vi har ännu inga badplatser med källa på {island.name}. </>}Enligt allemansrätten får du bada vid stränder som inte hör till någon tomt. Fler badplatser hittar du på <Link href="/upptack" style={{ color: 'var(--sea)' }}>kartan</Link>, och fler saker att göra på <Link href={`/o/${slug}/aktiviteter`} style={{ color: 'var(--sea)' }}>{island.name}s aktivitetssida</Link>.
            </p>
          </div>
        )}

        {/* Allmänt om bad i skärgården */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(10,123,140,0.06) 0%, rgba(26,74,107,0.04) 100%)',
          borderRadius: 16, padding: '24px 22px',
          border: '1px solid rgba(10,123,140,0.10)',
          marginBottom: 32,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 12 }}>
            Bra att veta innan du badar
          </h3>
          {/* KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Du får gå i land, bada, ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt", "Det finns inget förbud mot att tillfälligt förtöja eller bada vid en brygga som ligger utanför en tomt.", "Du som lånar bryggan måste däremot se till att den som äger bryggan inte blir hindrad från att använda den.", "Vid fågel- eller sälskyddsområden får du inte stiga iland under en viss tid av året." (läst 2026-11-02) */}
          {/* KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten.html — "Frågor om lagstiftning och webbplatsen Badplatsen", "Kommunerna står för provtagning och insamling av data som ligger till grund för informationen.", "EU-bad måste provtas och besiktigas regelbundet av kommunerna. Många kommuner provtar och besiktigar även övriga bad." (läst 2026-11-02) */}
          {/* KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hundar-i-naturen/ — "Mellan 1 mars och 20 augusti måste du ha extra uppsikt över din hund i naturen. Under den tiden får hunden inte springa lös.", "I alla Sveriges nationalparker ska din hund alltid vara kopplad, oavsett hur bra lydnad du har på din hund.", "I vissa skyddade områden kan det vara förbjudet att ta med hund, kolla upp vad som gäller innan.", "Ofta kopplingstvång i naturreservat", "Läs informationsskylten vid entrén till naturreservatet eller fråga länsstyrelsen eller kommunen för att ta reda på vad som gäller just där." (läst 2026-11-02) */}
          <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 14, color: 'var(--txt2)', lineHeight: 1.9 }}>
            <li>Enligt allemansrätten får du bada vid en strand som inte hör till någon tomt, och vid en brygga utanför en tomt så länge ägaren inte hindras.</li>
            <li>Håll koll på skyltar för fågel- och sälskyddsområden, där det kan vara förbjudet att gå i land under delar av året.</li>
            <li>Havs- och vattenmyndighetens Badplatsen visar provsvar för de bad som kommunen provtar. Alla bad provtas inte.</li>
            <li>Hunden får inte springa lös i naturen 1 mars till 20 augusti. I alla nationalparker ska den alltid vara kopplad, och i vissa skyddade områden kan det vara förbjudet att ta med hund. I naturreservat är det ofta kopplingstvång, så läs informationsskylten vid entrén eller fråga länsstyrelsen eller kommunen.</li>
          </ul>
        </div>

        {/* Planera med Thorkel */}
        <div style={{
          background: 'linear-gradient(160deg, #1a4a6b 0%, #0d6e6e 100%)',
          borderRadius: 16, padding: '28px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 20, flexWrap: 'wrap' as const,
        }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 600, marginBottom: 6 }}>{thorkelBat ? 'Thorkel' : 'AI-planeraren'}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              Planera hela dagen på {island.name}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
              {thorkelBat ? 'Thorkel hjälper dig med båttider, lunch och bad.' : 'Välj krog, bad och brygga som stopp längs rutten.'}
            </div>
            {/* Båttider bara där Thorkel har båtdata (ISLAND_TRANSIT, 49 öar), och då leder knappen till Thorkel (/guide),
                inte till ruttplaneraren, som inte ger båttider (mo01-k036, k048, sl05-k007, k060; mallarnas runda 7,
                2026-11-17). Thorkels API kräver inloggning, och båtverktyget hämtar "de 3 nästa faktiska kollektivtrafik-resorna från fastlandet" (src/app/api/guide/route.ts). Ruttplaneraren (/planera/ny) fungerar utan
                konto (2026-11-02, mall-0189; middleware.ts skyddar bara ruttlistan /planera, mallarnas runda 8); inloggning behövs för att spara rutten (/api/planera/claim), och dess
                intressen är bland annat krog, bad och brygga (src/app/planera/ny/PlaneraNyClient.tsx). */}
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>{thorkelBat ? 'Thorkel kräver ett gratis konto. Han hämtar de tre nästa resorna hit med kollektivtrafik från fastlandet.' : 'Ruttplaneraren fungerar utan konto. Logga in om du vill spara rutten i dina rutter.'}</div>
          </div>
          <Link href={thorkelBat ? `/guide?fraga=${encodeURIComponent(`Hur tar jag mig till ${island.name}?`)}` : '/planera/ny'} prefetch={false} style={{
            display: 'inline-block', background: 'var(--acc-knapp)', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            padding: '12px 28px', borderRadius: 50, flexShrink: 0,
          }}>
            {thorkelBat ? 'Fråga Thorkel →' : 'Planera med Thorkel →'}
          </Link>
        </div>

        <div style={{ marginTop: 36, display: 'flex', justifyContent: 'center' }}>
          <Link href={`/o/${slug}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--sea-knapp)', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            padding: '12px 28px', borderRadius: 28,
          }}>
            ← Tillbaka till {island.name}
          </Link>
        </div>
      </div>
    </div>
  )
}
