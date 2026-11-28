import { serializeForScript } from '@/lib/serializeForScript'
import type { Metadata } from 'next'
import SidHuvud from '@/components/SidHuvud'
import Link from 'next/link'
import PublicFooter from '@/components/PublicFooter'
import { SEED_FERRY_ROUTES, fetchDeparturesResult, operatorWebbplats, visaBryggnamn } from '@/lib/ferries'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { ogSida } from '@/lib/og-standard'

// SEO 2026-09-23 (Search Console 3 mån): 32 500 visningar, plats 8,1, 0,5 % klick.
// Sökorden är mest "cinderella …" (egen sida finns: /cinderella-baaten) och
// sträckor som "vaxholm grinda tidtabell", "strömkajen till möja", "båt till
// finnhamn". Sidan pekar nu vidare till varje ös resesida och till
// Cinderella-sidan i stället för att konkurrera med dem.
export const metadata: Metadata = {
  // absolute: utan " – Svalla" så att Google inte klipper Waxholmsbolaget/Cinderella (≈60 tecken)
  title: { absolute: 'Färjetider Stockholms skärgård: Waxholmsbolaget & Cinderella' },
  // RÄTTAD 2026-11-28 (fas 3, f300b-0002, f300b-0003): kommande avgångar finns bara för Waxholmsbolaget, och listan
  // "Båt till öarna" har 58 öar, alltså 53 utöver de fem som nämns (MÄTT: STOCKHOLMSOAR på main 5e0a08d).
  description: 'Linjer och bryggor för Waxholmsbolaget och Cinderellabåtarna, kommande avgångar för Waxholmsbolaget och hur du tar båten till Sandhamn, Möja, Finnhamn, Grinda, Utö och ett femtiotal andra öar.',
  keywords: [
    'färjetider stockholms skärgård',
    'båt till sandhamn',
    'båt till möja',
    'båt till finnhamn',
    'båt till grinda',
    'waxholmsbolaget tidtabell',
    'skärgårdsbåt tidtabell',
    'skärgårdslinjer stockholm',
  ],
  openGraph: {
    images: ogSida('https://svalla.se/farjor'),
    title: 'Färjetider och båt till öarna i Stockholms skärgård',
    description: 'Waxholmsbolaget, Cinderellabåtarna och hur du tar dig till ett sextiotal öar.',
    url: 'https://svalla.se/farjor',
  },
  alternates: { canonical: 'https://svalla.se/farjor' },
}

// Stockholmsöarna med egen resesida (/o/[ö]/komma-dit), i bokstavsordning.
const STOCKHOLMSOAR = ALL_ISLANDS
  .filter(i => (i.region === 'norra' || i.region === 'mellersta' || i.region === 'södra') && i.getting_there.length > 0)
  .sort((a, b) => a.name.localeCompare(b.name, 'sv'))

export const revalidate = 600

const ferryTripsJsonLd = SEED_FERRY_ROUTES.map(r => ({
  '@context': 'https://schema.org',
  '@type': 'BoatTrip',
  name: r.name,
  departureBoatTerminal: {
    '@type': 'BoatTerminal',
    name: r.from,
  },
  arrivalBoatTerminal: {
    '@type': 'BoatTerminal',
    name: r.to,
  },
  provider: {
    '@type': 'Organization',
    name: r.operator,
    url: r.operator === 'Cinderella'
      ? 'https://www.stromma.com/sv-se/stockholm/cinderellabatarna/'
      : 'https://www.waxholmsbolaget.se',
    // RÄTTAD 2026-11-28 (fas 3, f300b-0027): sameAs sa att Waxholmsbolaget är samma organisation som SL. Borttaget.
    // Runda 3 (f300b-0028): Cinderellas sameAs (cinderellabatarna.com) är också borttaget. Sidan gick inte att nå,
    // varken här eller i Toms webbläsare, och Strömmas egen sida står redan som url.
  },
  // availability InStock borttaget (f300b-0029): Cinderellabåtarna står som "ÅTER APRIL 2027" hos Strömma.
  offers: {
    '@type': 'Offer',
    url: r.infoUrl,
  },
  itinerary: r.stops.map(stop => ({
    '@type': 'BoatTerminal',
    name: stop,
  })),
}))

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hur länge tar resan med Cinderella till Sandhamn?',
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/cinderellabatarna/tidtabeller/ — "Hela resan till Sandhamn tar ungefär 2 timmar och 30 minuter.", "2. Nacka Strand", "3. Gåshaga", "4. Vaxholm", "6. Södra Grinda", "7. Gällnö", "8. Eknö", "9. Telegrafholmen" (läst 2026-11-28)
      acceptedAnswer: { '@type': 'Answer', text: 'Cinderellabåtarna går från Strandvägen i Stockholm till Sandhamn på 2 timmar och 30 minuter enligt operatören Strömma. På vägen angör båten Nacka strand, Gåshaga, Vaxholm, Södra Grinda, Gällnö, Eknö och Telegrafholmen.' },
    },
    {
      '@type': 'Question',
      name: 'Kan man ta SL-kortet med Waxholmsbolaget?',
      acceptedAnswer: { '@type': 'Answer', text: 'Delvis. Alla SL-biljetter gäller på Waxholmsbolaget mellan Strömkajen och Vaxholm med omnejd (44 bryggor), året runt. Under lågsäsongen, 14 september till 29 april, gäller SL:s periodbiljetter på 30 dagar eller längre i hela Waxholmsbolagets trafik. Annars kompletterar du med en Waxholmsbolaget-biljett för den del av resan som går utanför SL-området. På linje 17, 18 och 19 mot södra skärgården via Baggensstäket gäller inte SL-biljetter, utom lågsäsongens periodbiljetter, som enligt Waxholmsbolaget gäller i hela trafiken.' }, // KÄLLA: se KÄLLA-raderna vid samma fråga längre ned (läst 2026-11-28)
    },
    {
      '@type': 'Question',
      name: 'Vad skiljer Cinderella från Waxholmsbolaget?',
      // RÄTTAD 2026-11-28 (fas 3, f300b-0037 till f300b-0040): SL-biljett gäller bara i en del av trafiken, och "längre dagsrutter" är obelagt.
      // KÄLLA: https://waxholmsbolaget.se/om-oss — "Allt sedan dess har vi trafikerat Stockholms skärgård varenda dag året runt." (läst 2026-11-28)
      // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Alla SL-biljetter gäller mellan 44 bryggor i Waxholmsbolagets trafik" (läst 2026-11-28)
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/cinderellabatarna/ — "Säsongen löper från slutet av april till slutet av september.", "Ombord finns café och bar med något för alla" (läst 2026-11-28)
      acceptedAnswer: { '@type': 'Answer', text: 'Waxholmsbolaget är kollektivtrafiken på vattnet i Stockholms skärgård och går året runt. SL-biljetter gäller mellan 44 bryggor i dess trafik. Cinderellabåtarna drivs av Strömma, går från slutet av april till slutet av september och har café och bar ombord.' },
    },
    {
      '@type': 'Question',
      name: 'När börjar och slutar Cinderellabåtarnas säsong?',
      acceptedAnswer: { '@type': 'Answer', text: 'Cinderellabåtarna trafikerar skärgården från slutet av april till slutet av september enligt operatören Strömma.' },
    },
  ],
}

/**
 * Visar tid som "17:00" om avgången är idag, annars "i morgon 07:45" eller
 * "tors 07:45". Utan detta listades en avgång 07:45 dagen efter rakt under
 * en 17:00 idag, som om båten gick om tio timmar bakåt i tiden.
 *
 * Jämför på datumsträng i Europe/Stockholm i stället för att konvertera
 * Date-objekt: tiderna från ResRobot är redan lokala klockslag utan zon, och
 * en konvertering på en UTC-server hade flyttat dem.
 */
function departureLabel(iso: string): string {
  const [datum, klocka = ''] = iso.split('T')
  const hhmm = klocka.slice(0, 5)
  const nu = new Date()
  const idag = nu.toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })
  if (datum === idag) return hhmm
  const imorgon = new Date(nu.getTime() + 86400000).toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })
  if (datum === imorgon) return `i morgon ${hhmm}`
  const dag = new Date(`${datum}T12:00:00`).toLocaleDateString('sv-SE', { weekday: 'short' })
  return `${dag} ${hhmm}`
}

export default async function FarjorPage() {
  // Hämta avgångar parallellt för alla rutter. Tom lista betyder att ResRobot
  // inte har någon båtresa på sträckan — då visas inga tider. Seed-generatorn
  // är borttagen; vi hittar inte på tidtabeller.
  // revision 2026-10-02: `fel` skiljer "kunde inte hämtas" från "inga
  // avgångar". Förut såg ett API-fel ut exakt som en tom tidtabell.
  const routesWithDeps = await Promise.all(
    SEED_FERRY_ROUTES.map(async r => {
      const { departures, fel } = await fetchDeparturesResult(r, 3)
      return { route: r, deps: departures, fel }
    }),
  )
  const anyLive = routesWithDeps.some(r => r.deps.length > 0)
  const allaFel = routesWithDeps.every(r => r.fel !== null)

  const speakableJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Färjetider Stockholms skärgård: Cinderella & Waxholmsbolaget',
    url: 'https://svalla.se/farjor',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#farjor-intro'],
    },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeForScript(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeForScript(speakableJsonLd) }} />
      {ferryTripsJsonLd.map((schema, i) => (
        <script key={`ferry-trip-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeForScript(schema) }} />
      ))}
      {/* HERO */}
      <SidHuvud />
      <div style={{
        background: 'var(--grad-sea-hero)',
        padding: '52px 20px 40px',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: -0.3 }}>
            Färjetider
          </h1>
          <p id="farjor-intro" style={{ color: 'rgba(255,255,255,0.82)', fontSize: 15, margin: 0, maxWidth: 640, lineHeight: 1.5 }}>
            {/* revision 2026-10-02: "kommande avgångar" gäller bara Waxholmsbolagets linjer — ingen Cinderella-resa har setts i Trafiklabs data */}
            {/* RÄTTAD 2026-11-28 (fas 3, f300b-0006): SL-biljett gäller inte vid alla bryggor.
                KÄLLA: https://waxholmsbolaget.se/om-oss — "Under sommaren trafikerar vi 299 bryggor, allt från den norra till den södra skärgården, samt den inre mellanskärgården." (läst 2026-11-28)
                KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Mellan dessa bryggor kan du året runt resa med Waxholmsbolaget på alla sorters SL-biljetter:" (läst 2026-11-28) */}
            Waxholmsbolaget och Cinderellabåtarna: linjer och bryggor i Stockholms skärgård, och kommande avgångar för Waxholmsbolagets linjer. Cinderella avgår från Strandvägen till Sandhamn på 2 tim 30 min. Waxholmsbolaget trafikerar 299 bryggor sommartid, och mellan 44 av dem gäller alla SL-biljetter året runt.
          </p>
          <p style={{ margin: '12px 0 0', fontSize: 14 }}>
            <Link href="/vintertidtabeller" style={{ color: '#fff', fontWeight: 600, textDecoration: 'underline' }}>Vintertidtabeller 2026/27: vad som gäller efter 12 december</Link>
          </p>
        </div>
      </div>

      {/* DATA KÄLLA-NOTIS */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '20px 20px 0' }}>
        {anyLive ? (
          <div style={{
            background: 'rgba(30,92,130,0.08)',
            border: '1px solid rgba(30,92,130,0.22)',
            borderRadius: 12,
            padding: '12px 16px',
            fontSize: 13,
            color: 'var(--txt2)',
            lineHeight: 1.5,
          }}>
            {/* revision 2026-10-02: "(Waxholmsbolaget & Cinderella)" borttaget — ingen Cinderella-resa har setts i Trafiklabs data */}
            {/* RÄTTAD 2026-11-28 (fas 3, f300b-0008): "Live" och "uppdateras löpande" lovade realtid. Avgångarna kommer ur ResRobot,
                vars tidtabellsdata uppdateras högst en gång per dygn; sidan hämtar på nytt var tionde minut (revalidate = 600).
                KÄLLA: https://www.trafiklab.se/api/our-apis/resrobot-v21/route-planner/ — "The static data used for this API is updated when changes are made, at most once per day." (läst 2026-11-28) */}
            <strong style={{ color: 'var(--txt)' }}>Från Trafiklab.</strong> Avgångarna kommer ur Trafiklabs reseplanerare ResRobot
            och följer tidtabellen. Sidan hämtar dem på nytt var tionde minut. Dubbelkolla alltid mot operatören inför avgång.
          </div>
        ) : (
          <div style={{
            background: 'rgba(201,110,42,0.08)',
            border: '1px solid rgba(201,110,42,0.25)',
            borderRadius: 12,
            padding: '12px 16px',
            fontSize: 13,
            color: 'var(--txt2)',
            lineHeight: 1.5,
          }}>
            {/* revision 2026-10-02: när ingen rutt kunde hämtas säger vi det, i stället för "inga avgångar".
                Ingen orsak och inget "just nu": orsaken kan vara en saknad nyckel, och sidan kan vara cachad i timmar. */}
            {allaFel ? (
              <>
                <strong style={{ color: 'var(--txt)' }}>Avgångarna kunde inte hämtas.</strong> Vi visar bara tider vi kan hämta
                från Trafiklab, aldrig uppskattningar. Följ länken till operatören för tidtabell och bokning.
              </>
            ) : (
              <>
                <strong style={{ color: 'var(--txt)' }}>Inga live-avgångar.</strong> Vi visar bara tider vi kan hämta
                från Trafiklab, aldrig uppskattningar. Följ länken till operatören för tidtabell och bokning.
              </>
            )}
          </div>
        )}
      </div>

      {/* ROUTES */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {routesWithDeps.map(({ route: r, deps, fel }) => {
            const isLive = deps.length > 0
            return (
              <article key={r.id} style={{
                background: 'var(--white)',
                borderRadius: 16,
                padding: '20px 22px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: operatorColor(r.operator),
                    background: operatorBg(r.operator),
                    padding: '3px 9px',
                    borderRadius: 20,
                    textTransform: 'uppercase',
                    letterSpacing: 0.4,
                  }}>{r.operator}</span>
                  <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{r.season}</span>
                  {isLive && (
                    <span style={{
                      marginLeft: 'auto',
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#fff',
                      background: '#2e7d32',
                      padding: '2px 8px',
                      borderRadius: 20,
                      letterSpacing: 0.3,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                      {/* f300b-0009: tidtabellsdata, inte realtid */}
                      TIDTABELL
                    </span>
                  )}
                </div>

                <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
                  {r.name}
                </h2>
                <p style={{ fontSize: 13, color: 'var(--txt2)', margin: '0 0 16px', lineHeight: 1.5 }}>
                  {r.stops.join(' → ')}
                </p>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
                    Kommande avgångar
                  </div>
                  {deps.length === 0 ? (
                    <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5, padding: '4px 0 2px' }}>
                      {/* revision 2026-10-02: ett hämtfel får inte se ut som "inga båtar" */}
                      {fel ? (
                        <>Avgångarna kunde inte hämtas, se {operatorWebbplats(r)}.</>
                      ) : (
                        <>
                          Ingen båtavgång hittad på den här sträckan. Det kan bero på säsong,
                          tid på dygnet eller att linjen inte finns i Trafiklab. Tidtabellen hos
                          operatören gäller.
                        </>
                      )}
                    </div>
                  ) : deps.map((d, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 10,
                      padding: '7px 0',
                      borderBottom: i === deps.length - 1 ? 'none' : '1px solid var(--border)',
                    }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', whiteSpace: 'nowrap' }}>
                        {departureLabel(d.time)}
                        {d.arrival && <span style={{ fontWeight: 400, color: 'var(--txt3)' }}>{' till '}{d.arrival}</span>}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--txt2)', textAlign: 'right' }}>
                        {visaBryggnamn(d.to)}
                        {d.changes ? <span style={{ color: 'var(--txt3)' }}> · {d.changes} byte{d.changes > 1 ? 'n' : ''}</span> : null}
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={r.infoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    borderRadius: 10,
                    background: 'var(--sea-knapp)',
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Öppna tidtabell hos {r.operator} →
                </a>
              </article>
            )
          })}
        </div>
      </div>

      {/* BÅT TILL ÖARNA — interna länkar till varje ös resesida */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px 32px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px', letterSpacing: -0.2 }}>
          Båt till öarna
        </h2>
        <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '0 0 16px', lineHeight: 1.6 }}>
          Varifrån båten går, restid och operatör för varje ö, med länk till operatörens tidtabell.
        </p>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
          {STOCKHOLMSOAR.map(o => {
            const forsta = o.getting_there[0]
            return (
              <li key={o.slug}>
                <Link href={`/o/${o.slug}/komma-dit`} style={{
                  display: 'block', textDecoration: 'none', background: 'var(--white)',
                  borderRadius: 12, padding: '10px 14px', border: '1px solid var(--border)',
                }}>
                  <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>Båt till {o.name}</span>
                  {forsta?.from && (
                    <span style={{ display: 'block', fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>från {forsta.from}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* CINDERELLA — faktasektion.
          2026-08-05: den här sektionen innehöll en påhittad tidtabell
          ("Strömkajen 10:00, Djurgårdsbryggan ~10:20, Vaxholm ~11:10,
          Sandhamn ~13:00") plus flera sakfel. Kontrollerat mot Strömmas egen
          sida stromma.com/sv-se/stockholm/cinderellabatarna/ samma dag:

            påstod                          verkligt
            ─────────────────────────────── ────────────────────────────
            avgår Strömkajen                avgår Strandvägen
            slutet av maj–mitten av sept    slutet av april–slutet av sept
            stopp vid Möja                  Möja trafikeras inte
            (Gällnö saknades)               Gällnö trafikeras
            ca 3 timmar till Sandhamn       2 tim 30 min
            t/r 400–500 kr, barn <7 gratis  okontrollerat — borttaget

          Allt nedan är hämtat från operatörens egen sida. Inga klockslag
          publiceras: Strömmas tidtabell varierar per datum och vi kan inte
          hålla en kopia sann. Länken går dit i stället. */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px 48px' }}>
        <div style={{
          background: 'var(--white)',
          borderRadius: 20,
          padding: '32px 32px 36px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px', letterSpacing: -0.2 }}>
            Cinderellabåtarna 2027, vart går de och när?
          </h2>
          <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '0 0 24px', lineHeight: 1.6 }}>
            Cinderellabåtarna avgår från <strong>Strandvägen</strong> i centrala Stockholm: inte
            från Strömkajen, som är Waxholmsbolagets kaj. På väg till Sandhamn angör båten Nacka strand, Gåshaga,
            Vaxholm, Södra Grinda, Gällnö, Eknö och Telegrafholmen. Säsongen 2027 är 30 april till 26 september.
            {/* RÄTTAD 2026-11-28 (fas 3, f300b-0043, f300b-0044).
                KÄLLA: https://www.stromma.com/sv-se/stockholm/cinderellabatarna/tidtabeller/ — "Från Stockholm till Sandhamn - bryggor & restider", "2. Nacka Strand", "3. Gåshaga", "6. Södra Grinda", "8. Eknö", "9. Telegrafholmen" (läst 2026-11-28)
                KÄLLA: https://www.stromma.com/sv-se/stockholm/cinderellabatarna/ — "30 apr - 26 sep 2027" (läst 2026-11-28) */}
          </p>
          <p style={{ fontSize: 14, margin: '-12px 0 24px' }}>
            <Link href="/cinderella-baaten" style={{ color: 'var(--sea)', fontWeight: 700, textDecoration: 'none' }}>
              Allt om Cinderellabåtarna: hållplatser, restider och biljetter →
            </Link>
          </p>

          {/* RÄTTAD 2026-11-28 (fas 3, f300b-0046 till f300b-0048): priserna är Strömmas prisexempel för 2027, enkel resa från Strandvägen.
              KÄLLA: https://www.stromma.com/sv-se/stockholm/cinderellabatarna/tidtabeller/ — "Priser 2027", "Prisexempel - enkel resa från Strandvägen:", "Hela resan till Sandhamn tar ungefär 2 timmar och 30 minuter." (läst 2026-11-28)
              KÄLLA: https://www.stromma.com/sv-se/stockholm/cinderellabatarna/ — "Båt till Grinda - snabbt & lätt med Cinderellabåtarna", "Med Cinderella tar resan till Gällnö ca 1 tim och 45 min." (läst 2026-11-28) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 24 }}>
            {[
              { mal: 'Sandhamn', tid: '2 tim 30 min', pris: 'från 265 kr (2027)' },
              { mal: 'Gällnö',   tid: '1 tim 45 min', pris: 'från 245 kr (2027)' },
              { mal: 'Grinda',   tid: '1 tim 30 min', pris: 'från 245 kr (2027)' },
            ].map(r => (
              <div key={r.mal} style={{
                background: 'rgba(201,110,42,0.06)',
                border: '1px solid rgba(201,110,42,0.18)',
                borderRadius: 12, padding: '14px 16px',
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 4 }}>{r.mal}</div>
                <div style={{ fontSize: 13, color: 'var(--txt2)' }}>{r.tid}</div>
                <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>{r.pris}</div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(30,92,130,0.05)',
            border: '1px solid rgba(30,92,130,0.14)',
            borderRadius: 12, padding: '16px 18px', marginBottom: 28,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>
              Varför vi inte listar avgångstiderna här
            </div>
            <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.55, margin: 0 }}>
              {/* RÄTTAD 2026-11-28 (fas 3, f300b-0050): att Cinderella inte rapporterar till Trafiklab är obelagt (Trafiklab skriver
                  "All operators which operate in Sweden are covered by the ResRobot APIs."). Det vi vet är att Svalla inte har sett
                  någon Cinderellaresa i datan (revision 2026-10-02, se kommentaren vid sidans inledning). */}
              Vi visar bara avgångar som vi kan hämta från Trafiklab, och där har vi inte sett några turer med Cinderellabåtarna.
              En kopia här skulle bli fel utan att vi märkte det. Aktuella avgångar finns hos
              operatören:{' '}
              <a
                href="https://www.stromma.com/sv-se/stockholm/cinderellabatarna/tidtabeller/"
                target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--sea)', fontWeight: 600 }}
              >
                Strömmas tidtabell för Cinderellabåtarna
              </a>.
            </p>
          </div>

          {/* Waxholmsbolaget — linjenummer uppmätta mot ResRobot 2026-08-05 */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, marginTop: 4 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px' }}>
              Waxholmsbolaget: pendlarbåtarna
            </h3>
            <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 12px' }}>
              {/* RÄTTAD 2026-11-28 (fas 3, f300b-0052 till f300b-0054).
                  KÄLLA: https://waxholmsbolaget.se/om-oss — "Under sommaren trafikerar vi 299 bryggor, allt från den norra till den södra skärgården, samt den inre mellanskärgården.", "Allt sedan dess har vi trafikerat Stockholms skärgård varenda dag året runt." (läst 2026-11-28)
                  KÄLLA: https://www.stromma.com/sv-se/stockholm/cinderellabatarna/ — "Säsongen löper från slutet av april till slutet av september." (läst 2026-11-28) */}
              Waxholmsbolaget är kollektivtrafiken på vattnet i Stockholms skärgård och trafikerar 299 bryggor sommartid.
              Till skillnad från Cinderellabåtarna, som går från slutet av april till slutet av september, går
              Waxholmsbolaget året runt. Linjerna nedan är kontrollerade mot operatörernas egna tidtabeller.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 10 }}>
              {[
                // RÄTTAD 2026-11-28 (fas 3, f300b-0055): "ca 50 min" stämde inte med tabellen. Restiden är uppmätt i vintertabellen 16
                // (13 december 2026 till 11 april 2027), 15 turer Stavsnäs till Sandhamn: 54 till 70 min. Året runt: h16, s16 och w16.
                // KÄLLA: https://kund.printhuset-sthlm.se/wa/w16.pdf — "16A STAVSNÄS – SANDHAMN – HAGEDE", "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027" (läst 2026-11-28)
                // RUNDA 2 (2026-11-28): bryggan heter "Stavsnäs" i Waxholmsbolagets tabeller 16 och 17; "vinterhamn" står inte där.
                // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "16A STAVSNÄS – SANDHAMN – HAGEDE", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-11-28)
                // KÄLLA: https://kund.printhuset-sthlm.se/wa/s16.pdf — "16A STAVSNÄS – SANDHAMN – HAGEDE", "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026" (läst 2026-11-28)
                { name: 'Färja 16', desc: 'Stavsnäs → Sandhamn året runt, 54 till 70 min i vintertabellen från 13 dec 2026' },
                // KÄLLA: https://kund.printhuset-sthlm.se/wa/w17.pdf — "17A STAVSNÄS – NÄMDÖ – MÖRTÖ", "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027" (läst 2026-11-28)
                { name: 'Färja 17-1', desc: 'Stavsnäs → Nämdö' },
                // Rättad 2026-11-09 (P0 21): linje 40 är Nord/Sydlinjen, som bara går sommartid. Vår och höst går båten till Fjärdlång från Dalarö (tabell 19).
                // KÄLLA: https://kund.printhuset-sthlm.se/wa/s40.pdf — "GÄLLER 22 JUNI 2026 – 16 AUGUSTI 2026", "40B NORDSYDLINJEN: NYNÄSHAMN – SANDHAMN – ARHOLMA / NORRTÄLJE", "Fjärdlång"; uppmätt i tabellen: Nynäshamn–Fjärdlång 110 min, utan byte (läst 2026-11-09)
                { name: 'Färja 40', desc: 'Sommartid (2026: 22 juni till 16 augusti): Nord/Sydlinjen Nynäshamn → Fjärdlång, 1 tim 50 min utan byten' },
                // RÄTTAD 2026-11-28 (fas 3, f300b-0060): vägfärjan Vaxholm till Rindö är Trafikverkets Vaxholmsleden, inte Waxholmsbolaget.
                // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/vaxholmsleden/ — "Vaxholmsleden går mellan Vaxholm och Rindö i Stockholms skärgård. Färjeledens längd är 970 meter och överfartstiden är sex minuter. Resan med vägfärjan är avgiftsfri." (läst 2026-11-28)
                { name: 'Vaxholmsleden', desc: 'Vaxholm → Rindö, Trafikverkets vägfärja (inte Waxholmsbolaget), sex minuter, avgiftsfri' },
                // RÄTTAD 2026-11-28 (P0, fas 3, f300b-0062): varje tur från Räfsnäs till Lidö är beställningstur (märkt b) i höst-,
                // vinter- och sommartabellen 2026 utom en sommartur. Restiden uppmätt i w31: 10 till 15 min.
                // Rättelse P0 28 (2026-11-28, k32): anmärkning b ordagrant med fristen; citatet var anmärkning B:s ("minst 2 timmar").
                // KÄLLA: https://kund.printhuset-sthlm.se/wa/w31.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "31A RÄFSNÄS – TJOCKÖ – FEJAN", "Beställ resan i SL-appen, på", "Waxholmsbolagets webb eller via kundtjänst", "08-600 10 00 minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (läst 2026-11-28)
                // KÄLLA: https://kund.printhuset-sthlm.se/wa/h31.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "31A RÄFSNÄS – TJOCKÖ – FEJAN", "Beställ resan i SL-appen, på", "Waxholmsbolagets webb eller via kundtjänst", "08-600 10 00 minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (läst 2026-11-28)
                // Andra rättelsen P0 28 (2026-11-28, k08): i tabell 31 för 13 december 2026 till 11 april 2027 har Lidö tider bara på turer märkta H (MÄTT i 31A och 31B), så under isperioden angör ingen tur Lidö.
                // KÄLLA: https://kund.printhuset-sthlm.se/wa/w31.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "31A RÄFSNÄS – TJOCKÖ – FEJAN", "31B FEJAN – TJOCKÖ – RÄFSNÄS", "Lidö", "H Går under isfri period.", "I Går under isperiod." (läst 2026-11-28)
                // P0 29 (2026-11-28, Kontrollanten k12): hemresan saknades. I 31B (Lidö mot Räfsnäs) har h31 tur 3110 B och 3150, 3170 C; w31 3110 HB, 3152 HQB och 3150, 3170 HC.
                // Övriga turer mot Räfsnäs har b vid Lidö (h31 3112, w31 3112) eller ingen anmärkning (h31 3152, 3182; w31 3172) (MÄTT med pdftotext -bbox).
                // KÄLLA: https://kund.printhuset-sthlm.se/wa/h31.pdf — "31B FEJAN – TJOCKÖ – RÄFSNÄS", "Lidö", "Beställ resan i SL-appen, på", "08-600 10 00 minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "08-600 10 00 senast kl. 19.00 dag före", "resdag." (läst 2026-11-28)
                // KÄLLA: https://kund.printhuset-sthlm.se/wa/w31.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "31B FEJAN – TJOCKÖ – RÄFSNÄS", "Lidö", "B   Beställ resan i SL-appen, på", "08-600 10 00 minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "C   Beställ resan i SL-appen, på", "08-600 10 00 senast kl. 19.00 dag före", "resdag.", "H   Går under isfri period." (läst 2026-11-28)
                { name: 'Färja 31-1', desc: 'Räfsnäs brygga → Lidö, 10 till 15 min. Från Räfsnäs angör båten Lidö bara om resan är beställd. Tabell 31, anmärkning b: Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång från aktuell brygga, dock senast kl. 17.00. Från Lidö mot Räfsnäs har en del turer anmärkning B: Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 2 timmar innan avgång från aktuell brygga, dock senast kl. 17.00. Andra har anmärkning C: Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 senast kl. 19.00 dag före resdag. De övriga turerna mot Räfsnäs har anmärkning b vid Lidö eller ingen anmärkning. I tabell 31 för 13 december 2026 till 11 april 2027 har Lidö tider bara på turer med anmärkning H, "Går under isfri period", så under isperioden angör ingen tur Lidö.' },
              ].map(l => (
                <div key={l.name} style={{
                  background: 'rgba(30,92,130,0.04)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '12px 14px',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', marginBottom: 4 }}>{l.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--txt3)' }}>{l.desc}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '12px 0 0', fontStyle: 'italic' }}>
              Fullständig tidtabell med alla linjer och bryggor finns på{' '}
              <a href="https://waxholmsbolaget.se/reseplanering/tidtabeller" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sea)' }}>waxholmsbolaget.se</a>.
            </p>
          </div>

          {/* FAQ */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, marginTop: 24 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '0 0 16px' }}>
              Vanliga frågor om Cinderella och skärgårdsbåtar
            </h3>
            {[
              {
                q: 'Hur länge tar resan med Cinderella till Sandhamn?',
                // RÄTTAD 2026-11-28 (fas 3, f300b-0066): stoppen var ofullständiga. Runda 2 (f300b-0067): "fullt möjlig" var starkare än källan.
                // KÄLLA: https://www.stromma.com/sv-se/stockholm/cinderellabatarna/tidtabeller/ — "Hela resan till Sandhamn tar ungefär 2 timmar och 30 minuter.", "2. Nacka Strand", "3. Gåshaga", "6. Södra Grinda", "8. Eknö", "9. Telegrafholmen" (läst 2026-11-28)
                // KÄLLA: https://www.stromma.com/sv-se/stockholm/cinderellabatarna/ — "Oavsett om du planerar en dagsutflykt eller vill stanna några dagar är Cinderellabåtarna din naturliga startpunkt." (läst 2026-11-28)
                a: 'Cinderellabåtarna går från Strandvägen i Stockholm: inte Strömkajen, som är Waxholmsbolagets kaj. Resan till Sandhamn tar 2 timmar och 30 minuter enligt operatören Strömma, med stopp vid Nacka strand, Gåshaga, Vaxholm, Södra Grinda, Gällnö, Eknö och Telegrafholmen. Strömma beskriver båtarna som en startpunkt för en dagsutflykt. Avgångstiderna finns i Strömmas tidtabell, så vi hänvisar dit i stället för att gissa.',
              },
              {
                q: 'Kan man ta SL-kortet med Waxholmsbolaget?',
                // RUNDA 2 (2026-11-28): lågsäsongen och linje 17 till 19 enligt Waxholmsbolagets egna sidor.
                // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd. Det här gäller året runt ombord på Waxholmsbolagets fartyg i området och för alla sorters SL-biljetter.", "Det är totalt 44 bryggor som ingår i området." (läst 2026-11-28)
                // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "För resor som delvis sker inom SL-området behöver du komplettera med en Waxholmsbolaget-biljett för den delsträcka som är utanför området.", "Under lågsäsongen, 14 september–29 april, gäller vissa SL-biljetter i hela Waxholmsbolagets trafik." (läst 2026-11-28)
                // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "På båtar som går mot södra skärgården (till exempel Utö och Nämdö) via Baggensstäket (eller i omvänd riktning från södra skärgården till innerstaden) gäller inte SL-biljetter. Detta avser linje 17, 18 och 19." (läst 2026-11-28)
                // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/sa-galler-sl-biljetten-pa-baten — "Lågsäsong: Vissa SL-biljetter gäller i hela trafiken 14 september–29 april", "Under lågsäsong kan du resa med Waxholmsbolaget med SL:s periodbiljetter som gäller för 30 dagar eller längre." (läst 2026-11-28)
                a: 'Delvis. Alla SL-biljetter gäller på Waxholmsbolaget mellan Strömkajen och Vaxholm med omnejd (44 bryggor), året runt. Under lågsäsongen, 14 september till 29 april, gäller SL:s periodbiljetter på 30 dagar eller längre i hela Waxholmsbolagets trafik. Annars kompletterar du med en Waxholmsbolaget-biljett för den del av resan som går utanför SL-området. På linje 17, 18 och 19 mot södra skärgården via Baggensstäket gäller inte SL-biljetter, utom lågsäsongens periodbiljetter, som enligt Waxholmsbolaget gäller i hela trafiken.',
              },
              {
                q: 'Vad skiljer Cinderella från Waxholmsbolaget?',
                // RÄTTAD 2026-11-28 (fas 3, f300b-0068 till f300b-0072): värdeord och obelagda jämförelser borttagna; KÄLLA-raderna vid JSON-LD-frågan ovan.
                a: 'Waxholmsbolaget är kollektivtrafiken på vattnet i Stockholms skärgård och går året runt, och SL-biljetter gäller i SL-området mellan Strömkajen och Vaxholm med omnejd. Cinderellabåtarna drivs av Strömma, går från slutet av april till slutet av september och har café och bar ombord. Strömma beskriver båtarna som en startpunkt både för en dagsutflykt och för den som vill stanna några dagar.',
              },
              {
                q: 'När börjar och slutar Cinderellabåtarnas säsong?',
                // RÄTTAD 2026-11-28 (fas 3, f300b-0074). KÄLLA: https://www.stromma.com/sv-se/stockholm/cinderellabatarna/ — "30 apr - 26 sep 2027", "Säsongen löper från slutet av april till slutet av september." (läst 2026-11-28)
                a: 'Cinderellabåtarna trafikerar skärgården från slutet av april till slutet av september enligt operatören Strömma. Säsongen 2027 är 30 april till 26 september.',
              },
            ].map((faq, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 5 }}>{faq.q}</div>
                <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  )
}

function operatorColor(op: string): string {
  switch (op) {
    // Temafärger, inte fasta: #1e5c82 på mörk yta gav 2,2:1 i mörkt tema och
    // #c96e2a på det ljusa märket 3,2:1 (rester 2026-10-07).
    case 'Waxholmsbolaget': return 'var(--sea)'
    case 'Cinderella':      return 'var(--acc-text)'
    case 'SL':              return 'var(--ok)'
    default:                return 'var(--txt2)'
  }
}
function operatorBg(op: string): string {
  switch (op) {
    case 'Waxholmsbolaget': return 'rgba(30,92,130,0.08)'
    case 'Cinderella':      return 'rgba(201,110,42,0.1)'
    case 'SL':              return 'rgba(46,125,50,0.08)'
    default:                return 'rgba(0,0,0,0.05)'
  }
}
