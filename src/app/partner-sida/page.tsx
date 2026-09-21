import type { Metadata } from 'next'
import Link from 'next/link'
import { GUIDES } from '@/app/guider/guides-data'
import { ALL_ISLANDS } from '@/app/o/island-data'

// OMSKRIVEN 2026-09-21. Den tidigare "mediakit 2026" byggde på siffror som inte
// gick att belägga: "18 000+ läsare", "2 200+ prenumeranter" (MÄTT: 12 i
// email_subscribers), "52 % öppningsgrad" för ett nyhetsbrev som aldrig skickats,
// påhittad demografi (68 % Stockholm, 54 % kvinnor, 71 % mobil), "280+ guider"
// (MÄTT: 248 i GUIDES) och ett låtsaserbjudande i namnet av Utö Värdshus. Att sälja
// annonser på påhittade publiksiffror är vilseledande marknadsföring. Här står
// bara det som går att räkna i koden — antalen nedan räknas vid bygget och kan
// därför inte glida isär från verkligheten.

export const metadata: Metadata = {
  title: 'Samarbeta med Svalla – partnerskap och annonsering',
  description: 'Redaktionella samarbeten och säsongspartnerskap på Svalla, tydligt märkta. Och gratis rättning av uppgifterna om din krog, hamn eller ö.',
  alternates: { canonical: 'https://svalla.se/partner-sida' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Samarbeta med Svalla',
    description: 'Tydligt märkta samarbeten i en skärgårdsguide där varje uppgift har en källa.',
    url: 'https://svalla.se/partner-sida',
    type: 'website',
  },
}

const MAIL = 'hej@svalla.se'
const mailto = (subject: string, body = '') =>
  `mailto:${MAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`

const WRAP: React.CSSProperties = { maxWidth: 880, margin: '0 auto', padding: '0 20px' }
const H2: React.CSSProperties = { fontSize: 'clamp(22px,3vw,28px)', fontWeight: 800, color: 'var(--txt)', margin: '0 0 10px', letterSpacing: '-0.01em' }
const LEAD: React.CSSProperties = { fontSize: 16, color: 'var(--txt2)', lineHeight: 1.75, margin: '0 0 24px', maxWidth: 640 }
const CARD: React.CSSProperties = { background: 'var(--white)', borderRadius: 16, border: '1px solid rgba(0,0,0,0.08)', padding: '24px 24px 22px' }

const FORMER = [
  {
    namn: 'Redaktionellt samarbete',
    kort: 'En guide eller destinationsartikel om din plats, skriven av Svalla.',
    punkter: [
      'Märks tydligt som samarbete på sidan',
      'Du får läsa texten före publicering och rätta sakfel',
      'Ton och bedömning är Svallas – det är därför läsaren litar på den',
      'Varje uppgift får en källa, som allt annat på Svalla',
      'Ligger kvar på svalla.se och hålls aktuell',
    ],
    for: 'Passar värdshus, gästhamnar, rederier och upplevelsebolag med något att berätta.',
  },
  {
    namn: 'Säsongspartner',
    kort: 'Synlighet på de ösidor och guider där din verksamhet faktiskt hör hemma.',
    punkter: [
      'Placering på relevanta ösidor och guider under en säsong',
      'Erbjudanden visas med märkningen samarbete',
      'Vi håller dina uppgifter – säsong, kontakt, läge – aktuella',
      'Rapport över visningar och klick när säsongen är slut',
    ],
    for: 'Passar hotell, krogar och destinationer som vill synas från vår till höst.',
  },
]

const FRAGOR = [
  {
    q: 'Hur många besöker Svalla?',
    a: 'Svalla är ett ungt projekt och vi publicerar inga publiksiffror vi inte kan visa underlag för. Frågar du får du de siffror vi har just då, och varifrån de kommer.',
  },
  {
    q: 'Kan jag betala för ett bättre omdöme?',
    a: 'Nej. Ett samarbete köper plats och märkning, aldrig bedömning. Om något inte stämmer med verkligheten skriver vi det inte, oavsett vem som betalar.',
  },
  {
    q: 'Kostar det något att rätta uppgifterna om min verksamhet?',
    a: 'Nej, och det kommer aldrig att kopplas till ett samarbete. Skicka en länk till din egen webbplats eller prislista så uppdaterar vi.',
  },
  {
    q: 'Har ni ett nyhetsbrev att annonsera i?',
    a: 'Inte ännu. När det finns ett regelbundet utskick berättar vi det här – tidigare säljer vi ingen plats i det.',
  },
]

export default function PartnerSidaPage() {
  const antal = [
    { v: GUIDES.length, l: 'guider' },
    { v: ALL_ISLANDS.length, l: 'öprofiler' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 96 }}>

      <header style={{ background: 'linear-gradient(160deg, #091e2e 0%, #0d3f5a 45%, #1a6b7a 100%)', padding: 'clamp(56px,8vw,88px) 20px clamp(44px,6vw,64px)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '1.6px', textTransform: 'uppercase', marginBottom: 18 }}>
            Samarbeten
          </div>
          <h1 style={{ fontSize: 'clamp(30px,5vw,46px)', fontWeight: 800, color: '#fff', margin: '0 0 18px', lineHeight: 1.15, letterSpacing: '-0.02em', textWrap: 'balance' }}>
            Syns där skärgårdsresan planeras
          </h1>
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, margin: '0 auto 32px', maxWidth: 560 }}>
            Svalla samlar öar, båtlinjer, krogar och hamnar längs Sveriges kust – med källan angiven för varje uppgift. Vi tar in ett fåtal samarbeten som passar det sammanhanget, och märker dem alltid.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            {antal.map(({ v, l }) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '12px 22px', minWidth: 110 }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{l}</div>
              </div>
            ))}
          </div>
          <a href={mailto('Samarbete med Svalla', 'Hej!\n\nVår verksamhet:\n\nVad vi vill uppnå:\n\n')} style={{ display: 'inline-block', padding: '14px 30px', background: '#fff', color: '#0d3f5a', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 800 }}>
            Hör av dig om samarbete
          </a>
        </div>
      </header>

      <main style={{ ...WRAP, paddingTop: 56, display: 'grid', gap: 56 }}>

        <section>
          <h2 style={H2}>Två sätt att samarbeta</h2>
          <p style={LEAD}>Båda bygger på samma sak som resten av Svalla: det som står på sidan ska stämma när läsaren kommer fram.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
            {FORMER.map(f => (
              <div key={f.namn} style={{ ...CARD, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--txt)', marginBottom: 6 }}>{f.namn}</div>
                <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 16px' }}>{f.kort}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'grid', gap: 8, flex: 1 }}>
                  {f.punkter.map(p => (
                    <li key={p} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--txt2)', lineHeight: 1.5 }}>
                      <svg aria-hidden viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--sea)" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12" /></svg>{p}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: 13, color: 'var(--txt3)', lineHeight: 1.55, margin: '0 0 16px' }}>{f.for}</p>
                <a href={mailto(`Samarbete: ${f.namn}`, `Hej!\n\nJag är intresserad av "${f.namn}".\n\nVår verksamhet:\n\n`)} style={{ fontSize: 14, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none' }}>
                  Fråga om {f.namn.toLowerCase()} →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section style={{ ...CARD, background: 'rgba(30,92,130,0.05)', border: '1px solid rgba(30,92,130,0.14)' }}>
          <h2 style={{ ...H2, fontSize: 22 }}>Stämmer uppgifterna om din verksamhet?</h2>
          <p style={{ ...LEAD, margin: '0 0 16px' }}>
            Driver du en krog, en gästhamn eller ett rederi och ser något som är fel eller gammalt på Svalla – öppettider, säsong, kontakt – skicka en länk till din egen webbplats eller prislista så rättar vi. Det är gratis och kopplas aldrig till ett samarbete.
          </p>
          <a href={mailto('Rätta uppgifter på Svalla', 'Hej!\n\nSidan på Svalla:\n\nDet här stämmer inte:\n\nLänk till vår egen uppgift:\n\n')} style={{ fontSize: 14, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none' }}>
            Skicka en rättelse →
          </a>
        </section>

        <section>
          <h2 style={H2}>Det här gör vi inte</h2>
          <ul style={{ ...LEAD, paddingLeft: 20, display: 'grid', gap: 8 }}>
            <li>Inga programmatiska annonser eller banners.</li>
            <li>Ingen betalning för att påverka en bedömning eller ett omdöme.</li>
            <li>Inga publiksiffror vi inte kan visa underlag för.</li>
          </ul>
        </section>

        <section>
          <h2 style={H2}>Vanliga frågor</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {FRAGOR.map(({ q, a }) => (
              <div key={q} style={CARD}>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>{q}</div>
                <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.7, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ textAlign: 'center' }}>
          <h2 style={{ ...H2, textWrap: 'balance' }}>Berätta om din verksamhet</h2>
          <p style={{ ...LEAD, margin: '0 auto 22px' }}>Skriv några rader om vad ni gör och vad ni vill uppnå, så återkommer vi med ett förslag.</p>
          <a href={mailto('Samarbete med Svalla', 'Hej!\n\nVår verksamhet:\n\nVad vi vill uppnå:\n\n')} style={{ display: 'inline-block', padding: '14px 30px', background: 'var(--sea)', color: '#fff', borderRadius: 12, textDecoration: 'none', fontSize: 15, fontWeight: 800 }}>
            Maila {MAIL}
          </a>
          <p style={{ fontSize: 14, color: 'var(--txt3)', marginTop: 28 }}>
            Vill du se hur Svalla arbetar med källor? <Link href="/guider" style={{ color: 'var(--sea)', fontWeight: 600 }}>Läs guiderna</Link>
          </p>
        </section>
      </main>
    </div>
  )
}
