import type { Metadata } from 'next'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'
import { SEED_FERRY_ROUTES, fetchDepartures, type FerryDeparture } from '@/lib/ferries'

export const metadata: Metadata = {
  title: 'Färjetider Stockholms skärgård — Cinderella & Waxholmsbolaget',
  description: 'Färjetider för Stockholms skärgård 2026. Cinderella tidtabell Sandhamn, Waxholmsbolaget linjer och avgångar från Stockholm. Aktuella tider och hållplatser.',
  keywords: [
    'cinderella tidtabell',
    'cinderella sandhamn tidtabell',
    'cinderellabåtarna tidtabell',
    'cinderella sandhamn',
    'waxholmsbolaget tidtabell',
    'skärgårdsbåt tidtabell',
    'färjetider stockholms skärgård',
    'båt sandhamn stockholm',
    'cinderella tidtabell 2026',
    'waxholmsbolaget sandhamn',
    'skärgårdslinjer stockholm',
    'färjetider stockholm',
  ],
  openGraph: {
    title: 'Cinderella & Waxholmsbolaget tidtabell — Färjetider Stockholms skärgård | Svalla',
    description: 'Cinderella tidtabell Sandhamn och Waxholmsbolaget tidtabeller för Stockholms skärgård 2026.',
    url: 'https://svalla.se/farjor',
  },
  alternates: { canonical: 'https://svalla.se/farjor' },
}

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
    sameAs: r.operator === 'Cinderella'
      ? 'https://www.cinderellabatarna.com'
      : 'https://sl.se',
  },
  offers: {
    '@type': 'Offer',
    url: r.infoUrl,
    availability: 'https://schema.org/InStock',
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
      acceptedAnswer: { '@type': 'Answer', text: 'Från Strömkajen till Sandhamn tar det cirka 3 timmar med Cinderella. Båten stannar på vägen vid Djurgårdsbryggan och Vaxholm.' },
    },
    {
      '@type': 'Question',
      name: 'Kan man ta SL-kortet med Waxholmsbolaget?',
      acceptedAnswer: { '@type': 'Answer', text: 'Ja. SL-kortet och SL Access gäller på Waxholmsbolagets linjer inom SL:s trafikområde. Vissa yttre linjer kan kräva tillägg — kolla aktuell info på sl.se.' },
    },
    {
      '@type': 'Question',
      name: 'Vad skiljer Cinderella från Waxholmsbolaget?',
      acceptedAnswer: { '@type': 'Answer', text: 'Waxholmsbolaget är skärgårdens kollektivtrafik med SL-kort. Cinderella är turistinriktad med längre dagsrutter och bar ombord. Cinderella passar bäst för dagstur; Waxholmsbolaget för pendlare.' },
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
  // Hämta avgångar parallellt för alla rutter. fetchDepartures returnerar
  // tom lista om ResRobot inte har någon båtresa på sträckan — då visas inga
  // tider. Seed-generatorn är borttagen; vi hittar inte på tidtabeller.
  const routesWithDeps = await Promise.all(
    SEED_FERRY_ROUTES.map(async r => ({
      route: r,
      deps: await fetchDepartures(r, 3) as FerryDeparture[],
    })),
  )
  const anyLive = routesWithDeps.some(r => r.deps.length > 0)

  const speakableJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Färjetider Stockholms skärgård — Cinderella & Waxholmsbolaget',
    url: 'https://svalla.se/farjor',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#farjor-intro'],
    },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 96 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      {ferryTripsJsonLd.map((schema, i) => (
        <script key={`ferry-trip-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      {/* HERO */}
      <div style={{
        background: 'var(--grad-sea-hero)',
        padding: '52px 20px 40px',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            <SvallaLogo height={26} color="#ffffff" />
          </Link>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: -0.3 }}>
            Färjetider
          </h1>
          <p id="farjor-intro" style={{ color: 'rgba(255,255,255,0.82)', fontSize: 15, margin: 0, maxWidth: 640, lineHeight: 1.5 }}>
            Waxholmsbolaget och Cinderellabåtarna — linjer, bryggor och kommande avgångar för Stockholms skärgård. Cinderella avgår från Strömkajen till Sandhamn på ca 3 timmar. Waxholmsbolaget täcker hundratals bryggor med SL-kort.
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
            <strong style={{ color: 'var(--txt)' }}>Live.</strong> Avgångar hämtas från Trafiklab (Waxholmsbolaget & Cinderella).
            Uppdateras löpande. Dubbelkolla alltid mot operatören inför avgång.
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
            <strong style={{ color: 'var(--txt)' }}>Inga live-avgångar just nu.</strong> Vi visar bara tider vi kan hämta
            från Trafiklab — aldrig uppskattningar. Följ länken till operatören för tidtabell och bokning.
          </div>
        )}
      </div>

      {/* ROUTES */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {routesWithDeps.map(({ route: r, deps }) => {
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
                      LIVE
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
                      Ingen båtavgång hittad på den här sträckan just nu. Det kan bero på säsong,
                      tid på dygnet eller att linjen inte finns i Trafiklab. Tidtabellen hos
                      operatören gäller.
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
                        {d.arrival && <span style={{ fontWeight: 400, color: 'var(--txt3)' }}>{'\u2013'}{d.arrival}</span>}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--txt2)', textAlign: 'right' }}>
                        {d.to}
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
                    background: 'var(--sea)',
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
            Cinderellabåtarna 2026 — vart går de och när?
          </h2>
          <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '0 0 24px', lineHeight: 1.6 }}>
            Cinderellabåtarna avgår från <strong>Strandvägen</strong> i centrala Stockholm — inte
            från Strömkajen, som är Waxholmsbolagets kaj. Linjen går till Vaxholm, Grinda,
            Gällnö och Sandhamn. Säsongen löper från slutet av april till slutet av september.
          </p>

          {/* Sträckor — restid och pris från operatörens egen sida */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 24 }}>
            {[
              { mal: 'Sandhamn', tid: '2 tim 30 min', pris: 'från 255 kr' },
              { mal: 'Gällnö',   tid: '1 tim 45 min', pris: 'från 235 kr' },
              { mal: 'Grinda',   tid: '1 tim 30 min', pris: 'från 235 kr' },
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
              Cinderella rapporterar inte till Trafiklab, och tidtabellen varierar per datum.
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
              Waxholmsbolaget — pendlarbåtarna
            </h3>
            <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 12px' }}>
              Waxholmsbolaget är skärgårdens kollektivtrafik och täcker hundratals bryggor.
              Till skillnad från Cinderella, som är turistinriktad, går Waxholmsbolaget från
              tidig morgon till sen kväll. Linjerna nedan är hämtade ur faktiska reseförslag
              i Trafiklab — inte ur en broschyr.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 10 }}>
              {[
                { name: 'Färja 16', desc: 'Stavsnäs vinterhamn → Sandhamn, ca 50 min' },
                { name: 'Färja 17-1', desc: 'Stavsnäs vinterhamn → Nämdö' },
                { name: 'Färja 40', desc: 'Nynäshamn → Fjärdlång, ca 1 tim 50 min utan byten' },
                { name: 'Färja 941', desc: 'Vaxholm → Rindö, vägfärja, avgiftsfri' },
                { name: 'Färja 31-1', desc: 'Räfsnäs brygga → Lidö, ca 15 min' },
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
                a: 'Från Strömkajen till Sandhamn tar det cirka 3 timmar med Cinderella. Båten stannar på vägen vid Djurgårdsbryggan och Vaxholm. Om du vill ta ett kvällsbad och äta middag i Sandhamn hinner du med dagstur — avgång runt 10:00, tillbaka till Stockholm runt 20:00.',
              },
              {
                q: 'Kan man ta SL-kortet med Waxholmsbolaget?',
                a: 'Ja. SL-kortet och SL Access gäller på Waxholmsbolagets linjer inom SL:s trafikområde. Observera att vissa yttre linjer (t.ex. till Utö via Nynäshamn) kan kräva tillägg eller separat biljett — kolla aktuell info på sl.se.',
              },
              {
                q: 'Vad skiljer Cinderella från Waxholmsbolaget?',
                a: 'Waxholmsbolaget är skärgårdens kollektivtrafik — många linjer, fler avgångar, SL-kort gäller. Cinderella är mer turistinriktad med längre dagsrutter, bar ombord och mer festlig stämning. Cinderella passar bäst för dagstur eller helgresa; Waxholmsbolaget passar bättre för att pendla till sommarstugan.',
              },
              {
                q: 'När börjar och slutar Cinderellabåtarnas säsong?',
                a: 'Cinderellabåtarna trafikerar skärgården från slutet av april till slutet av september enligt operatören Strömma. Exakta datum varierar år till år — se stromma.com för aktuell säsongsinfo.',
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
    </div>
  )
}

function operatorColor(op: string): string {
  switch (op) {
    case 'Waxholmsbolaget': return '#1e5c82'
    case 'Cinderella':      return '#c96e2a'
    case 'SL':              return '#2e7d32'
    default:                return '#555'
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
