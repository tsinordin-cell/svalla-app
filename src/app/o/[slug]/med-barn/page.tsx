import { serializeForScript } from '@/lib/serializeForScript'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland } from '../../island-data'
import IslandSubPageHeader from '@/components/IslandSubPageHeader'
import Icon, { type IconName } from '@/components/Icon'
import { emojiToIcon } from '@/lib/iconMap'
import { getIslandPlaces, krogarIDatabasen, utanDubbletter } from '@/lib/islandPlaces'
import { klockslagsregler, arButik, barnAktivitet } from '@/lib/mallRegler'
import { stryksKlockslag } from '@/lib/klockslagStrykning'
import { aktivitetensLage, grannoarIData, LAGESORD } from '@/lib/badLage'
import { getIslandTransit } from '@/lib/transit-stops'
import { ogO } from '@/lib/og-standard'

type Props = { params: Promise<{ slug: string }> }

// SOFT-404, DEL 2 (2026-08-12). notFound() i generateMetadata (PR #117)
// räckte inte: Vercel serverar ett byggtids-fallbackskal för ISR-rutter
// med loading.tsx (x-nextjs-prerender: 1) — 200-statusen är satt INNAN
// någon kod körs, och vår notFound() landar bara som en error-digest i
// streamen (NEXT_HTTP_ERROR_FALLBACK;404 i body, status ändå 200).
// Den här routens hela slug-mängd är känd vid bygget (data ligger i
// repot), så dynamicParams=false är semantiskt rätt: okänd slug 404:ar
// i routern, före skalet. Gäller INTE db-backade rutter (upptack, tur,
// u) — nya rader där måste kunna renderas utan ny deploy.
export const dynamicParams = false
// ISR: badplatser och krogar ur platsdatabasen hämtas vid bygget och uppdateras varje timme.
export const revalidate = 3600

export async function generateStaticParams() {
  return ALL_ISLANDS.map(island => ({ slug: island.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  // SOFT-404-SKYDD: loading.tsx streamar svaret — 200 flushas före sidkroppen,
  // så bara ett notFound() HÄR (före headers) ger riktig 404-status. Se
  // motsvarande kommentar i o/[slug]/page.tsx och CLAUDE.md.
  if (!island) notFound()
  return {
    title: `${island.name} med barn: bad, mat och resväg`,
    description: `Bad, mat och resväg för dig som åker till ${island.name} med barn.`,
    keywords: [
      `${island.name.toLowerCase()} med barn`,
      `${island.name.toLowerCase()} barnfamilj`,
      `${island.name.toLowerCase()} barn`,
      `barnvänlig ${island.name.toLowerCase()}`,
      `familj ${island.name.toLowerCase()}`,
      `dagstur med barn ${island.name.toLowerCase()}`,
    ],
    openGraph: {
      images: ogO(island.slug),
      title: `${island.name} med barn: bad, mat och resväg`,
      description: `Bad, mat och resväg för dig som åker till ${island.name} med barn.`,
      url: `https://svalla.se/o/${slug}/med-barn`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/med-barn` },
  }
}

export default async function IslandMedBarnPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()
  const thorkelBat = getIslandTransit(slug) !== null


  const beaches = island.activity_meta?.bad?.beaches ?? []
  /** Badplatserna som rena namn. Fältet rymmer både strängar och IslandBeach. */
  const badnamn = beaches.map(b => (typeof b === 'string' ? b : b.name)).filter(Boolean)
  const travelTime = island.facts.travel_time ?? ''
  // Restiden utan led med klockslag, som på komma-dit (Lilla Karlsö, Blå Jungfrun; mall-0166 omarbete 4, runda 5).
  // Klockslagen stryks enligt Toms beslut 10 (src/lib/klockslagStrykning.ts; mallarnas runda 7, 2026-11-17).
  const { utanKlockslag, utanKlockslagsmeningar, fardUtanKlockslag } = klockslagsregler(stryksKlockslag(slug, 'med-barn'))
  const restid = utanKlockslag(travelTime)
  const shortTravel = island.transport_meta
    ? island.transport_meta.from_city_min <= 90
    : travelTime.includes('20') || travelTime.includes('30') || travelTime.includes('40') || travelTime.includes('45') || travelTime.includes('1 tim')

  // Urvalet i src/lib/mallRegler.ts (barnAktivitet): Husarös "Fiske" kom med för ordet "bad" i texten (sm05-k003; runda 10).
  const kidFriendlyActivities = island.activities.filter(barnAktivitet)
  // "Aktiviteter på X" bara för det som gäller ön; kort om en annan plats under "nära X" (Vindö "Bad på Djurö", Gräddö
  // Björköörens badplats; samma regel som badsidan, mall-0198; mallarnas runda 5, 2026-11-10), och kort om både ön och en
  // annan plats under "på och nära X" (Utös "Bad & stränder"; runda 6, 2026-11-16, ma5021).
  const grannoar = grannoarIData(island)
  const aktivitetsGrupper = (['pa', 'bada', 'annan'] as const).map(l => [LAGESORD[l], kidFriendlyActivities.filter(a => aktivitetensLage(a, island.name, grannoar) === l)] as const)

  const kidFriendlyRestaurants = island.restaurants.filter(r =>
    ['barn', 'familj', 'café', 'glass', 'lunch', 'enkel'].some(k =>
      r.desc.toLowerCase().includes(k) || r.type.toLowerCase().includes(k)
    )
  )

  // Badplatser och krogar ur platsdatabasen, som komplement till island-data.
  const [dbBeaches, dbFood] = await Promise.all([
    getIslandPlaces(island, ['beach'], { extraKm: 0 }),
    krogarIDatabasen(island),
  ])
  // Databasens bad utan dem som redan står i öns lista, med samma jämförelse som badsidan (utanDubbletter). Förut räknades
  // Sandhamns Trouville två gånger, som "Trouville" ur ödatan och "Stora Trouvillestranden" ur databasen (Kontrollantens fynd
  // sm04-k004; mallarnas runda 10, 2026-11-17).
  const allaBad = [...new Set([...badnamn, ...utanDubbletter(dbBeaches.filter(p => p.onIsland), badnamn, island.name).map(p => p.name)])]
  // Samma räkning som restaurangsidan: ölistan plus databasens ställen på ön, utan dubbletter, med samma urval
  // (krogarIDatabasen). Förut jämfördes bara namnen, och databasposten med samma slug som ödatans räknades två
  // gånger: 10 mot restaurangsidans 9 på Utö (Kontrollantens fynd ma5013; mallarnas runda 6, 2026-11-16).
  // Butiker räknas inte som restauranger och kaféer (Coop Ingmarsö, Tempo Runmarö; mo01-k055, mallarnas runda 7).
  const antalKrogar = island.restaurants.filter(r => !arButik(r.type)).length + dbFood.filter(p => p.onIsland).length
  // Bara allmänna färdsätt: Yttre Gårdens "Ingen reguljär båt" nämner Waxholmsbolaget
  // för att säga att bolaget inte går dit (2026-11-02, mall-0174 omarbete). Samma test som komma-dit.
  const usesWaxholmsbolaget = (island.transport_meta?.operator ?? '').includes('Waxholmsbolaget')
    || island.getting_there.some(t => !/egen båt|egen eller hyrd båt|fritidsbåt|segelbåt|kajak|charter|ingen reguljär/i.test(t.method) && `${t.method} ${t.desc}`.includes('Waxholm'))

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Vad finns för barnfamiljer på ${island.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: [
            allaBad.length > 0 ? `Badplatser på och nära ön: ${allaBad.slice(0, 4).join(', ')}.` : null,
            antalKrogar > 0 ? `${antalKrogar === 1 ? 'En restaurang eller ett kafé' : `${antalKrogar} restauranger och kaféer`} som vi har uppgifter om.` : 'Vi har inga restauranger registrerade på ön. Ta med matsäck om du är osäker.',
            restid ? `Restid: ${restid}.` : null,
          ].filter(Boolean).join(' '),
        },
      },
      {
        '@type': 'Question',
        name: `Hur tar man sig till ${island.name} med barn?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: island.getting_there.length > 0
            // Utan meningar med klockslag ur datan (Vaktens lista; mallarnas runda 5, 2026-11-10).
            ? island.getting_there.map(t => { const d = utanKlockslagsmeningar(t.desc); const s = (d ? `${t.method}: ${d}` : t.method).trim(); return /[.!?]$/.test(s) ? s : `${s}.` }).join(' ')
            : `Vi har inte kunnat belägga någon reguljär förbindelse till ${island.name}.`,
        },
      },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeForScript(faqSchema) }} />

      <IslandSubPageHeader
        island={island}
        tab="med-barn"
        subtitle={
          `Bad, mat och resväg för dig som åker till ${island.name} med barn.`
        }
      />

      <div style={{ maxWidth: 900, margin: '24px auto 0', padding: '0 16px 60px' }}>

        {/* Snabbfakta för familjer */}
        <div style={{
          background: 'var(--white)', borderRadius: 16, padding: '22px 20px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          border: '1px solid rgba(10,123,140,0.07)',
          marginBottom: 28,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
            Snabbfakta, {island.name} med barn
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {([
              { icon: 'ship', label: 'Restid', value: restid || 'Se fliken Komma dit' },
              // beaches är (string | IslandBeach)[]. Ett rakt join() gav
              // "[object Object]" på varje ö som fått strukturerad baddata —
              // syntes live på /o/moja/med-barn 2026-09-23.
              { icon: 'waves', label: 'Badmöjligheter', value: allaBad.length > 0 ? allaBad.slice(0, 2).join(', ') : 'Se fliken Bad' },
              // "1 krogar och caféer" stod live på varje ö med exakt ett ställe.
              { icon: 'utensils', label: 'Restauranger', value: antalKrogar === 1 ? 'En krog eller kafé' : antalKrogar > 1 ? `${antalKrogar} krogar och kaféer` : 'Ingen registrerad: ta med matsäck' },
              // "Cykelleder finns" bara när datan nämner cykelleder eller cykelvägar. Förut räckte ett cykel-objekt utan
              // uthyrning, och Birka ("grusvägar och plana promenadstråk") fick raden (mo01-k034, sl05-k004; runda 7).
              { icon: 'navigation', label: 'Cykling', value: island.activity_meta?.cykel?.rental ? 'Cykeluthyrning finns' : (/cykel(?:led|väg|stråk|bana|banor)/i.test(island.activity_meta?.cykel?.notes ?? '') ? 'Cykelleder finns' : 'Kontrollera lokalt') },
              { icon: 'calendar', label: 'Säsong', value: island.facts.season },
              { icon: 'users', label: 'Passar', value: island.facts.best_for },
            ] satisfies { icon: IconName; label: string; value: React.ReactNode }[]).map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, color: 'var(--sea)', display: 'inline-flex', marginTop: 1 }}>
                  <Icon name={f.icon} size={20} stroke={1.8} />
                </span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: 14, color: 'var(--txt)', fontWeight: 600 }}>{f.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aktiviteter för barn */}
        {aktivitetsGrupper.map(([rubrik, lista]) => lista.length > 0 && (
          <div key={rubrik} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
              Aktiviteter {rubrik} {island.name}
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {lista.map((a, i) => (
                <div key={i} style={{
                  background: 'var(--white)', borderRadius: 14, padding: '16px 18px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(10,123,140,0.07)',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--txt)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon name={emojiToIcon(a.icon)} size={16} stroke={1.9} />{a.name}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6 }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Mat för barnfamiljer */}
        {kidFriendlyRestaurants.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
              Kaféer och lunchställen på {island.name}
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {kidFriendlyRestaurants.map((r, i) => (
                <div key={i} style={{
                  background: 'var(--white)', borderRadius: 14, padding: '16px 18px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(10,123,140,0.07)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--txt)' }}>{r.name}</div>
                    <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 999, background: 'rgba(10,123,140,0.08)', color: '#1e5c82', fontWeight: 700 }}>{r.type}</span>
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, marginTop: 6 }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transport med barn */}
        {island.getting_there.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
              Att ta sig till {island.name} med barn
            </h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {/* Korten utan klockslag, som på komma-dit (Toms beslut 10; mallarnas runda 7). */}
              {island.getting_there.map(fardUtanKlockslag).map((t, i) => (
                <div key={i} style={{
                  background: 'var(--white)', borderRadius: 14, padding: '16px 18px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(10,123,140,0.07)',
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                }}>
                  <span style={{ flexShrink: 0, color: 'var(--sea)', display: 'inline-flex', marginTop: 1 }}>
                    <Icon name={emojiToIcon(t.icon)} size={22} stroke={1.7} />
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--txt)', marginBottom: 4 }}>
                      {t.method}{t.time ? `, ${t.time}` : ''}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            {usesWaxholmsbolaget && (
            <p style={{ fontSize: 13, color: 'var(--txt3)', marginTop: 12, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
              <Icon name="star" size={14} stroke={2} style={{ marginTop: 3 }} />
              {/* KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Barn som är under 7 år gamla reser utan avgift med annan betalande resenär.", "Du räknas som ungdom om du är över 7 år gammal men inte har fyllt 20 år ännu." (läst 2026-10-29) */}
              <span>Barn under 7 år åker gratis med Waxholmsbolaget i sällskap med en annan betalande resenär, och 7 till 19 år betalar rabatterat pris.</span>
            </p>
            )}
          </div>
        )}

        {/* Insidertips */}
        {island.insiderTips && island.insiderTips.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(10,123,140,0.06) 0%, rgba(26,74,107,0.04) 100%)',
            borderRadius: 16, padding: '22px 20px',
            border: '1px solid rgba(10,123,140,0.10)',
            marginBottom: 28,
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 12 }}>
              Tips om {island.name}
            </h3>
            <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 14, color: 'var(--txt2)', lineHeight: 1.9 }}>
              {island.insiderTips.slice(0, 4).map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
        )}

        {/* Thorkel CTA */}
        <div style={{
          background: 'linear-gradient(160deg, #1a4a6b 0%, #0d6e6e 100%)',
          borderRadius: 16, padding: '28px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 20, flexWrap: 'wrap' as const,
          marginBottom: 32,
        }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 600, marginBottom: 6 }}>{thorkelBat ? 'Thorkel' : 'AI-planeraren'}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              Planera familjedagen på {island.name}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
              {thorkelBat ? 'Thorkel hjälper dig med båt, lunch och bad.' : 'Välj krog, bad och brygga som stopp längs rutten.'}
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

        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
