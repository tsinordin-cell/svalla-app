import type { Metadata } from 'next'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'
import { SEED_FERRY_ROUTES, fetchDepartures, type FerryDeparture } from '@/lib/ferries'

export const metadata: Metadata = {
  title: 'Färjetider Stockholms skärgård — Cinderella & Waxholmsbolaget | Svalla',
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
      acceptedAnswer: { '@type': 'Answer', text: 'Cinderellabåtarna trafikerar vanligtvis skärgården från slutet av maj (runt Kristi Himmelsfärd) till mitten av september.' },
    },
  ],
}

export default async function FarjorPage() {
  // Hämta avgångar parallellt för alla rutter. fetchDepartures faller
  // tillbaka till seed om TRAFIKLAB_API_KEY saknas eller API:t felar.
  const routesWithDeps = await Promise.all(
    SEED_FERRY_ROUTES.map(async r => ({
      route: r,
      deps: await fetchDepartures(r, 3) as FerryDeparture[],
    })),
  )
  const anyLive = routesWithDeps.some(r => r.deps.some(d => d.source === 'live'))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 96 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 15, margin: 0, maxWidth: 640, lineHeight: 1.5 }}>
            Waxholmsbolaget och Cinderellabåtarna — linjer, bryggor och kommande avgångar för Stockholms skärgård.
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
            <strong style={{ color: 'var(--txt)' }}>Förhandsvisning.</strong> Live-tidtabell är under konfiguration.
            Avgångar nedan är exempeldata — följ länken till operatören för bokning och aktuella tider.
          </div>
        )}
      </div>

      {/* ROUTES */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {routesWithDeps.map(({ route: r, deps }) => {
            const isLive = deps.some(d => d.source === 'live')
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
                  {deps.map((d, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '7px 0',
                      borderBottom: i === deps.length - 1 ? 'none' : '1px solid var(--border)',
                    }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>
                        {new Date(d.time).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--txt2)' }}>
                        {d.from} → {d.to}
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

      {/* CINDERELLA TIDTABELL — statisk SEO-sektion */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px 48px' }}>
        <div style={{
          background: 'var(--white)',
          borderRadius: 20,
          padding: '32px 32px 36px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px', letterSpacing: -0.2 }}>
            Cinderella tidtabell 2026
          </h2>
          <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '0 0 28px', lineHeight: 1.6 }}>
            Cinderellabåtarna trafikerar Stockholms skärgård från slutet av maj till mitten av september. Linjerna avgår från <strong>Strömkajen</strong> (Strandvägen) i centrala Stockholm ut till Sandhamn och tillbaka, med stopp vid Vaxholm, Grinda och Möja. Nedan finns ett urval av hållplatser och typiska avgångstider — kontrollera alltid aktuella tider på <a href="https://www.cinderellabatarna.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sea)', fontWeight: 600 }}>cinderellabatarna.com</a> eller via deras app inför resan.
          </p>

          {/* Sandhamnslinjen */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: '#c96e2a',
                background: 'rgba(201,110,42,0.1)', padding: '3px 10px',
                borderRadius: 20, textTransform: 'uppercase', letterSpacing: 0.4,
              }}>Cinderella</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>Sandhamnslinjen</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--txt2)', margin: '0 0 14px', lineHeight: 1.5 }}>
              Direktlinje från Stockholm ut till Sandhamn med stopp vid Djurgårdsbryggan och Vaxholm. Resa enkel väg tar ca 3 timmar. Populär dagstur och helgresa — boka i förväg under högsäsong (juli–aug).
            </p>
            <div style={{ background: 'var(--bg)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', background: 'rgba(30,92,130,0.06)', padding: '8px 16px' }}>
                {['Hållplats', 'Avgång (typisk)', 'Ankomst', 'Anmärkning'].map(h => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.4 }}>{h}</div>
                ))}
              </div>
              {[
                ['Strömkajen, Stockholm', '10:00', '—', 'Avgång'],
                ['Djurgårdsbryggan', '~10:20', '—', 'Mellanstop'],
                ['Vaxholm', '~11:10', '—', 'Mellanstop'],
                ['Sandhamn', '—', '~13:00', 'Slutdestination'],
              ].map(([stop, dep, arr, note], i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  padding: '10px 16px',
                  borderTop: '1px solid var(--border)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)' }}>{stop}</div>
                  <div style={{ fontSize: 13, color: 'var(--txt2)' }}>{dep}</div>
                  <div style={{ fontSize: 13, color: 'var(--txt2)' }}>{arr}</div>
                  <div style={{ fontSize: 12, color: 'var(--txt3)' }}>{note}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '8px 0 0', fontStyle: 'italic' }}>
              Avgångstider varierar per dag och vecka. Kvällsavgångar från Sandhamn tillbaka till Stockholm avgår vanligen runt 16:30–17:00. Se aktuell tidtabell hos operatören.
            </p>
          </div>

          {/* Säsong & priser */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginBottom: 28 }}>
            {[
              {
                label: 'Säsong',
                icon: '📅',
                text: 'Cinderellabåtarna trafikerar skärgården från slutet av maj till mitten av september. Högsäsongen är juli–augusti med flest avgångar per dag.',
              },
              {
                label: 'Biljetter & priser',
                icon: '🎫',
                text: 'Biljetter köps online via cinderellabatarna.com eller i appen. Dagsbiljett tur/retur Sandhamn kostar ca 400–500 kr för vuxna. Barn under 7 år åker gratis.',
              },
              {
                label: 'Ta med båten',
                icon: '⛵',
                text: 'Cinderella trafikerar många av samma bryggor som Waxholmsbolaget. Många seglare tar färjan hem och hämtar båten nästa dag — ett bekvämt sätt att avsluta en segeltur.',
              },
            ].map(item => (
              <div key={item.label} style={{
                background: 'rgba(30,92,130,0.04)',
                border: '1px solid rgba(30,92,130,0.12)',
                borderRadius: 12,
                padding: '16px 18px',
              }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.55 }}>{item.text}</div>
              </div>
            ))}
          </div>

          {/* Waxholmsbolaget kort-intro */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, marginTop: 4 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px' }}>
              Waxholmsbolaget — pendlarbåtar i skärgården
            </h3>
            <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 12px' }}>
              Waxholmsbolaget är SL:s skärgårdstrafik och täcker hundratals bryggor i Stockholms skärgård. Till skillnad från Cinderella som är mer turistinriktad, är Waxholmsbolaget pendlarnas linje — med avgångar från tidig morgon till sen kväll. SL-kort och resekort gäller ombord.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {[
                { name: 'Linje 80 — Vaxholm', desc: 'Stockholm → Rindö → Vaxholm, ca 75 min' },
                { name: 'Linje 89 — Ljusterö', desc: 'Stockholm → Österskär → Ljusterö' },
                { name: 'Linje 95 — Ornö', desc: 'Dalarö → Ornö, södra skärgården' },
                { name: 'Linje 96 — Utö', desc: 'Nynäshamn → Utö, ca 90 min' },
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
              Fullständig tidtabell med alla linjer och bryggor hittar du på <a href="https://www.waxholmsbolaget.se" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sea)' }}>waxholmsbolaget.se</a>.
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
                a: 'Cinderellabåtarna trafikerar vanligtvis skärgården från slutet av maj (runt Kristi Himmelsfärd) till mitten av september. Exakta datum varierar år till år — kolla på cinderellabatarna.com för aktuell säsongsinfo.',
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
