import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import Script from 'next/script'
import SvallaLogo from '@/components/SvallaLogo'
import EmailSignup from '@/components/EmailSignup'
import Icon from '@/components/Icon'
import { SAT_SECTIONS, SAT_TOTAL_KM, SAT_SUM_KM, SAT_ISLANDS, SAT_URL, type SatDifficulty } from './sat-data'

export const metadata: Metadata = {
  title: 'Stockholm Archipelago Trail — alla 22 etapper, längd och svårighet | Svalla',
  description:
    'Hela Stockholm Archipelago Trail: 270 km vandringsled över 20 öar från Arholma till Landsort. Etapp för etapp med längd, svårighetsgrad och hur du tar dig dit.',
  keywords: [
    'stockholm archipelago trail',
    'stockholm archipelago trail etapper',
    'vandringsled stockholms skärgård',
    'vandra Arholma Landsort',
    'skärgårdsled 270 km',
    'vandra mellan öar stockholm',
    'ledvandring skärgården',
  ],
  alternates: { canonical: 'https://svalla.se/stockholm-archipelago-trail' },
  openGraph: {
    title: 'Stockholm Archipelago Trail — alla 22 etapper',
    description:
      '270 km över 20 öar, från Arholma i norr till Landsort i söder. Varje etapp nås med reguljär skärgårdstrafik.',
    url: 'https://svalla.se/stockholm-archipelago-trail',
  },
}

// ─── Innehåll ────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'Vad är Stockholm Archipelago Trail?',
    // KÄLLA: stockholmarchipelagotrail.com (läst 2026-09-17)
    a: 'Stockholm Archipelago Trail är en 270 kilometer lång vandringsled fördelad över 20 öar i Stockholms skärgård, från Arholma i norr till Landsort i söder. Leden är uppdelad i 22 etapper och samtliga nås med reguljär skärgårdstrafik. Den är samfinansierad av Tillväxtverket och EU.',
  },
  {
    q: 'Måste man gå hela leden?',
    a: 'Nej, och de flesta gör det inte. Leden är inte sammanhängande på land — varje ö är en egen etapp som du når med båt. Det gör att den fungerar lika bra som en enskild dagsvandring som ett längre projekt över flera säsonger.',
  },
  {
    q: 'Vilken etapp är längst?',
    // KÄLLA: stockholmarchipelagotrail.com/section (läst 2026-09-17)
    a: 'Ornö med 34,1 km är den överlägset längsta etappen. Därefter kommer Yxlan med 24 km och Runmarö med 18,5 km. Kortast är Brottö på 1 km och roddbåtssträckan mellan Finnhamn och Ingmarsö på 400 meter.',
  },
  {
    q: 'Vilken etapp är svårast?',
    // KÄLLA: stockholmarchipelagotrail.com/section (läst 2026-09-17)
    a: 'Tre etapper klassas som krävande: Utö (18,4 km), Ålö (13,2 km) och Nåttarö (9,5 km). Notera att Nåttarö är kort men ändå krävande — längd och svårighet följs inte åt på den här leden. Svartsö är tvärtom 17,9 km och klassas som lätt.',
  },
  {
    q: 'Vad är roddbåtarna mellan Finnhamn och Ingmarsö?',
    // KÄLLA: stockholmarchipelagotrail.com/section/rowboats-finnhamn-ingmarso (läst 2026-09-17)
    a: 'Vid det smala sundet mellan Finnhamn och Ingmarsö ligger roddbåtar på båda sidor. Du ror själv över de 400 meterna. Seden är att den som kommer sist drar med sig en extra båt tillbaka, så att det alltid finns en båt på var sida till nästa vandrare.',
  },
  {
    q: 'Är någon del av leden avstängd?',
    // KÄLLA: stockholmarchipelagotrail.com/news/the-north-end-of-rano-closed-until-2027 (publicerad 2026-08-18, läst 2026-09-17)
    a: 'Ja. Den norra delen av Rånö är avstängd på grund av skogsarbete, från början av september 2026 till slutet av 2026, och området uppges vara påverkat till 2027. Kontrollera alltid ledens egen nyhetssida innan du åker — avstängningar och omledningar tillkommer löpande.',
  },
  {
    q: 'Finns det något vandringspass?',
    // KÄLLA: stockholmarchipelagotrail.com/news/the-sat-hiking-passport (publicerad 2026-06-01, läst 2026-09-17)
    a: 'Ja. Sedan den 5 juni 2026 finns ett vandringspass för leden. Det fungerar som en samlingsbok där du kan dokumentera vilka etapper du gått.',
  },
  {
    q: 'När på året går det att vandra leden?',
    // KÄLLA: stockholmarchipelagotrail.com/news/the-off-season-in-the-stockholm-archipelago (publicerad 2025-10-20, läst 2026-09-17)
    a: 'Leden går att vandra året runt, men lågsäsongen blir gradvis mer krävande. Skärgårdstrafiken glesas ut kraftigt utanför sommarsäsongen och service på öarna stänger. Maj–juni och september är de bekvämaste månaderna: framkomlig trafik, öppna kaféer och varken mygg eller trängsel.',
  },
  {
    q: 'Hur tar jag mig till etapperna?',
    a: 'Med reguljär skärgårdstrafik. Waxholmsbolaget trafikerar merparten av mellersta och norra skärgården. Till de södra öarna — Utö, Nåttarö och Landsort — tar du pendeltåg till Nynäshamn och därefter pendelbåt. Kontrollera alltid sista avgången hem innan du börjar gå.',
  },
]

const difficultyColor: Record<SatDifficulty, string> = {
  'Lätt': '#3f9d5a',
  'Medel': '#d6a318',
  'Krävande': '#c4462f',
}

// ─── Sida ─────────────────────────────────────────────────────────────────────

export default function StockholmArchipelagoTrailPage() {
  const withIsland = SAT_SECTIONS.filter(s => s.island !== null).length
  const longest = SAT_SECTIONS.reduce((a, b) => (b.km > a.km ? b : a))

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Stockholm Archipelago Trail — alla etapper',
    url: 'https://svalla.se/stockholm-archipelago-trail',
    numberOfItems: SAT_SECTIONS.length,
    itemListElement: SAT_SECTIONS.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${s.name} — ${s.km} km`,
      ...(s.island ? { url: `https://svalla.se/o/${s.island}` } : {}),
    })),
  }

  return (
    <>
      <Script
        id="sat-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="sat-itemlist-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* ── Nav ── */}
        <nav style={{
          background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
          padding: '18px 24px 16px',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <SvallaLogo height={24} color="#ffffff" />
            </Link>
            <Link
              href="/aktivitet/vandring"
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none' }}
            >
              ← All vandring
            </Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <header style={{
          background: 'linear-gradient(170deg, #1e5c82 0%, #2d7d8a 100%)',
          padding: '40px 24px 56px',
          color: '#fff',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{
              fontSize: 11, opacity: 0.8,
              letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8,
            }}>
              Vandring · Stockholms skärgård
            </div>
            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 700, margin: '0 0 12px',
              fontFamily: "'Playfair Display', Georgia, serif",
              lineHeight: 1.2,
            }}>
              Stockholm Archipelago Trail
            </h1>
            <p style={{
              fontSize: 16, lineHeight: 1.6,
              maxWidth: 640, opacity: 0.92, margin: '0 0 20px',
            }}>
              {SAT_TOTAL_KM} kilometer över {SAT_ISLANDS} öar, från Arholma i norr till Landsort
              i söder. Ingen av etapperna sitter ihop på land — varje ö är sin egen vandring, och
              båten är det som binder ihop dem.
            </p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { n: `${SAT_TOTAL_KM} km`, l: 'total längd' },
                { n: SAT_SECTIONS.length, l: 'etapper' },
                { n: SAT_ISLANDS, l: 'öar' },
                { n: `${longest.km} km`, l: `längst (${longest.name})` },
              ].map(stat => (
                <div key={stat.l}>
                  <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>{stat.n}</div>
                  <div style={{ fontSize: 11, opacity: 0.75 }}>{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 80px' }}>

          {/* ── Aktuellt ── */}
          {/* KÄLLA: stockholmarchipelagotrail.com/news/the-north-end-of-rano-closed-until-2027 (2026-08-18) */}
          <div style={{
            background: 'var(--acc-l)', border: '1px solid var(--acc-15)',
            borderRadius: 12, padding: '14px 18px', marginBottom: 28,
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <span style={{ flexShrink: 0, marginTop: 2, color: 'var(--acc)' }} aria-hidden>
              <Icon name="warning" size={16} stroke={2} />
            </span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', marginBottom: 3 }}>
                Norra Rånö är avstängt
              </div>
              <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, margin: 0 }}>
                Skogsarbete stänger den norra delen av Rånö från början av september 2026 och
                området uppges vara påverkat till 2027. Kontrollera alltid{' '}
                <a href={`${SAT_URL}/news/`} target="_blank" rel="noopener noreferrer"
                   style={{ color: 'var(--sea)' }}>
                  ledens egen nyhetssida
                </a>{' '}
                innan du åker.
              </p>
            </div>
          </div>

          {/* ── Etapperna ── */}
          <section style={{ marginBottom: 44 }}>
            <h2 style={{
              fontSize: 24, fontWeight: 700, color: 'var(--txt)',
              fontFamily: "'Playfair Display', Georgia, serif",
              margin: '0 0 4px',
            }}>
              Alla {SAT_SECTIONS.length} etapper
            </h2>
            <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 16px' }}>
              Norr till söder. {withIsland} av etapperna har en ösida på Svalla med hamnar,
              boende, mat och hur du tar dig dit.
            </p>

            <div style={{ display: 'grid', gap: 8 }}>
              {SAT_SECTIONS.map(s => {
                const inner = (
                  <>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>
                        {s.name}
                      </div>
                      {s.note && (
                        <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.45 }}>
                          {s.note}
                        </div>
                      )}
                    </div>
                    <div style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'flex-end', gap: 3, flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 12, color: 'var(--txt3)', fontWeight: 700 }}>
                        {s.km} km
                      </span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4,
                        color: difficultyColor[s.difficulty],
                      }}>
                        {s.difficulty}
                      </span>
                    </div>
                    {s.island && <span style={{ color: 'var(--sea)', fontSize: 16, flexShrink: 0 }}>→</span>}
                  </>
                )

                const style: React.CSSProperties = {
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'var(--white)', border: '1px solid var(--surface-3)',
                  borderRadius: 10, padding: '12px 16px',
                  textDecoration: 'none', color: 'inherit',
                }

                return s.island ? (
                  <Link key={s.name} href={`/o/${s.island}`} style={style}>{inner}</Link>
                ) : (
                  <div key={s.name} style={{ ...style, opacity: 0.75 }}>{inner}</div>
                )
              })}
            </div>
          </section>

          {/* ── Så funkar leden ── */}
          <section style={{ marginBottom: 44 }}>
            <h2 style={{
              fontSize: 24, fontWeight: 700, color: 'var(--txt)',
              fontFamily: "'Playfair Display', Georgia, serif",
              margin: '0 0 16px',
            }}>
              Tre saker som gör den här leden annorlunda
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {[
                {
                  t: 'Båten är en del av vandringen',
                  b: 'Etapperna sitter inte ihop. Du går en ö, tar båten, går nästa. Det betyder att tidtabellen styr dagen lika mycket som benen gör — och att sista avgången hem är det första du ska kontrollera, inte det sista.',
                },
                {
                  t: 'Längd och svårighet följs inte åt',
                  b: 'Svartsö är 17,9 km och klassas som lätt. Nåttarö är 9,5 km och klassas som krävande. Titta på svårighetsgraden, inte bara på kilometrarna, när du planerar.',
                },
                {
                  t: 'Du ror själv mellan Finnhamn och Ingmarsö',
                  b: 'Fyrahundra meter av leden går över vatten i roddbåt. Båtar ligger på båda sidor, och den som kommer sist drar med sig en extra tillbaka så att nästa vandrare hittar en båt där den ska vara.',
                },
              ].map(card => (
                <div key={card.t} style={{
                  background: 'var(--white)', border: '1px solid var(--surface-3)',
                  borderRadius: 12, padding: '16px 18px',
                }}>
                  <h3 style={{
                    fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px',
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}>
                    {card.t}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.7, margin: 0 }}>
                    {card.b}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Thorkel ── */}
          <section style={{
            background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
            borderRadius: 14, padding: '26px 24px', marginBottom: 44, color: '#fff',
          }}>
            <h2 style={{
              fontSize: 20, fontWeight: 700, margin: '0 0 8px',
              fontFamily: "'Playfair Display', Georgia, serif",
            }}>
              Vilken etapp passar dig?
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.92, margin: '0 0 18px', maxWidth: 560 }}>
              Berätta hur lång tid du har, om du vill bada längs vägen och om du behöver kunna
              äta på ön. Thorkel föreslår etapp, båttider och vad du ska packa.
            </p>
            <Link
              href="/thorkel"
              style={{
                display: 'inline-block', padding: '12px 24px',
                background: '#fff', color: '#1e5c82',
                borderRadius: 8, textDecoration: 'none',
                fontWeight: 700, fontSize: 14,
              }}
            >
              Planera min etapp med Thorkel →
            </Link>
          </section>

          {/* ── FAQ ── */}
          <section style={{ marginBottom: 44 }}>
            <h2 style={{
              fontSize: 24, fontWeight: 700, color: 'var(--txt)',
              fontFamily: "'Playfair Display', Georgia, serif",
              margin: '0 0 16px',
            }}>
              Vanliga frågor om Stockholm Archipelago Trail
            </h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} style={{
                  background: 'var(--white)', border: '1px solid var(--surface-3)',
                  borderRadius: 12, padding: '16px 18px',
                }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
                    {item.q}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.7, margin: 0 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Källa ── */}
          <div style={{
            background: 'var(--surface-2)', border: '1px solid var(--surface-3)',
            borderRadius: 12, padding: '14px 18px', marginBottom: 24,
          }}>
            <p style={{ fontSize: 12, color: 'var(--txt3)', lineHeight: 1.6, margin: '0 0 8px' }}>
              Etapplängder och svårighetsgrader kommer från ledens officiella webbplats,{' '}
              <a href={SAT_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sea)' }}>
                stockholmarchipelagotrail.com
              </a>
              . Vi har kontrollerat samtliga 22 etapper mot respektive etapps egen sida den
              18 september 2026 — alla stämde.
            </p>
            <p style={{ fontSize: 12, color: 'var(--txt3)', lineHeight: 1.6, margin: '0 0 8px' }}>
              En detalj värd att nämna: lägger man ihop de 22 etapperna blir summan {SAT_SUM_KM} km,
              inte {SAT_TOTAL_KM}. Vi anger {SAT_TOTAL_KM} km eftersom det är ledens egen siffra.
              Skillnaden beror sannolikt på avrundning, eller på att förbindelseetapperna inte
              räknas in i huvudsiffran.
            </p>
            <p style={{ fontSize: 12, color: 'var(--txt3)', lineHeight: 1.6, margin: 0 }}>
              Leden drivs inte av Svalla. Kontrollera alltid aktuella avstängningar och
              tidtabeller före avfärd.
            </p>
          </div>

          {/* ── Internlänkar ── */}
          <div style={{
            background: 'var(--white)', border: '1px solid var(--surface-3)',
            borderRadius: 14, padding: '20px 22px', marginBottom: 24,
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Utforska mer på Svalla
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                { label: 'All vandring', href: '/aktivitet/vandring' },
                { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
                { label: 'Alla öar', href: '/oar' },
                { label: 'Planera resan', href: '/planera' },
                { label: 'Kajakpaddling', href: '/aktivitet/kajak' },
                { label: 'Guider', href: '/guider' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '7px 14px', borderRadius: 999,
                    background: 'var(--surface-2)', color: 'var(--sea)',
                    textDecoration: 'none', fontSize: 13, fontWeight: 500,
                  }}
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <EmailSignup
              variant="card"
              source="stockholm-archipelago-trail"
              title="Vandrar du leden?"
              description="Nya etappguider, säsongstips och avstängningar direkt i inkorgen. Varannan tisdag."
            />
          </div>

        </main>
      </div>
    </>
  )
}
