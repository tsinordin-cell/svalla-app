import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import PartnerForm from './PartnerForm'
import SvallaLogo from '@/components/SvallaLogo'
import Icon, { type IconName } from '@/components/Icon'

export const metadata: Metadata = {
  title: 'Partner — Synas på Svalla | För restauranger, hamnar och upplevelser',
  description: 'Sätt din verksamhet i karta över skärgården. 200+ platser, 84 ösidor, växande organisk trafik. Från 500 kr/mån.',
  keywords: ['skärgård restaurang marknadsföring', 'gästhamn synas online', 'svalla partner', 'skärgård annonsering'],
  openGraph: {
    title: 'Partner med Svalla — för restauranger, hamnar och upplevelser',
    description: 'Sätt din verksamhet i karta över skärgården.',
    url: 'https://svalla.se/partner',
  },
  alternates: { canonical: 'https://svalla.se/partner' },
}

const TIERS = [
  {
    name: 'Bas',
    price: 290,
    cta: 'Kom igång',
    color: 'var(--sea)',
    features: [
      'Premium-placering i sökresultat',
      'Bokningsknapp på er sida',
      'Bilder & beskrivning',
      'Statistik på besökare',
    ],
  },
  {
    name: 'Standard',
    price: 590,
    cta: 'Mest populär',
    color: 'var(--acc)',
    highlight: true,
    features: [
      'Allt i Bas, plus:',
      'Featured i ö-toppar',
      'Foto-galleri (upp till 8 bilder)',
      'Väder-info på er sida',
      'Månatlig statistik via mail',
    ],
  },
  {
    name: 'Premium',
    price: 990,
    cta: 'Mest synlighet',
    color: 'var(--green, #2a6e50)',
    features: [
      'Allt i Standard, plus:',
      'Sponsrade rutter direkt till er',
      'Push-notiser till båtfolk i området',
      'Thorkel rekommenderar er',
      'Personlig kontakt + content-stöd',
    ],
  },
]

const STATS = [
  { num: '2 500+', label: 'Båtägare aktiva på Svalla' },
  { num: '1 000+', label: 'Planerade rutter senaste veckan' },
  { num: '470+', label: 'Verifierade restauranger & hamnar' },
  { num: 'Maj–Sept', label: 'Säsong med högtrafik' },
]

const BENEFITS: Array<{ icon: IconName; title: string; body: string }> = [
  { icon: 'target',     title: 'Kvalificerad trafik',  body: 'Folk som besöker en ösida är redo att åka. De är inte slumpmässiga sökare — de planerar en konkret tur.' },
  { icon: 'pin',        title: 'Geografisk relevans',  body: 'Du syns när någon planerar att åka just till din ö. Inga slumpmässiga visningar i fel del av Sverige.' },
  { icon: 'trendingUp', title: 'Växande sökmotor',     body: 'Svallas ösidor rankar i topp på Google för "sandhamn restaurang", "möja gästhamn" osv. Du ärver av oss.' },
  { icon: 'handshake',  title: 'Mätbar effekt',        body: 'Statistik på klick, samtal och besök. Du ser exakt vilken effekt din listning har över säsongen.' },
]

export default function PartnerPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--txt)' }}>
      {/* NAV */}
      <nav style={{
        background: 'linear-gradient(160deg, var(--sea-l, #1e5c82) 0%, var(--sea, #2d7d8a) 100%)',
        padding: '18px 24px 16px', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, textDecoration: 'none' }}>
            ← Tillbaka
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(170deg, var(--sea-l, #1e5c82) 0%, var(--sea, #2d7d8a) 60%, #1a9ab0 100%)',
        padding: '60px 24px 80px', color: '#fff',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: 1.4, opacity: 0.85, textTransform: 'uppercase', marginBottom: 12 }}>
            För restauranger · gästhamnar · upplevelser
          </div>
          <h1 style={{
            fontSize: 44, fontWeight: 700, lineHeight: 1.15, margin: '0 0 16px',
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Bli synlig för Sveriges båtfolk
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, opacity: 0.9, maxWidth: 560, margin: '0 auto 28px' }}>
            Svalla är den plats där båtfolk i Stockholms skärgård och Bohuslän planerar sina rutter.
            Tusentals besökare varje månad söker restauranger, hamnar och upplevelser.
            Från 290 kr/mån.
          </p>
          <a href="#kontakt" style={{
            display: 'inline-flex', gap: 8, alignItems: 'center',
            padding: '14px 28px',
            background: '#fff', color: 'var(--sea-l, #1e5c82)',
            fontSize: 15, fontWeight: 700, borderRadius: 999,
            textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          }}>
            Få mer information <Icon name="arrowRight" size={16} stroke={2.2} />
          </a>
        </div>
      </section>

      {/* STATS */}
      <section style={{
        maxWidth: 900, margin: '-40px auto 0', padding: '0 16px', position: 'relative',
      }}>
        <div style={{
          background: 'var(--white)', border: '1px solid var(--surface-3)',
          borderRadius: 16, padding: '20px 16px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--sea)', fontFamily: "'Playfair Display', Georgia, serif" }}>
                {s.num}
              </div>
              <div style={{ fontSize: 12, color: 'var(--txt2)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY SVALLA */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 24px' }}>
        <h2 style={{
          fontSize: 28, fontWeight: 700, marginBottom: 18, color: 'var(--txt)',
          fontFamily: "'Playfair Display', Georgia, serif",
        }}>
          Vad du får
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
          {BENEFITS.map(b => (
            <div key={b.title} style={{
              background: 'var(--white)', padding: '22px 20px', borderRadius: 14,
              border: '1px solid var(--surface-3)',
            }}>
              <div style={{ marginBottom: 10, color: 'var(--sea)' }}>
                <Icon name={b.icon} size={28} stroke={2} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: 'var(--txt)' }}>
                {b.title}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--txt2)' }}>
                {b.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIERS */}
      <section id="tiers" style={{ maxWidth: 1000, margin: '40px auto 0', padding: '0 16px' }}>
        <h2 style={{
          fontSize: 28, fontWeight: 700, marginBottom: 6, color: 'var(--txt)',
          fontFamily: "'Playfair Display', Georgia, serif", textAlign: 'center',
        }}>
          Tre nivåer — välj efter behov
        </h2>
        <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--txt2)', marginBottom: 30 }}>
          Inga bindningstider. Säg upp när som helst.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {TIERS.map(t => (
            <div key={t.name} style={{
              background: 'var(--white)',
              border: t.highlight ? `2px solid ${t.color}` : '1px solid var(--surface-3)',
              borderRadius: 16, padding: '28px 22px',
              position: 'relative',
              boxShadow: t.highlight ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex', flexDirection: 'column',
            }}>
              {t.highlight && (
                <div style={{
                  position: 'absolute', top: -12, left: 22,
                  background: t.color, color: '#fff',
                  fontSize: 11, fontWeight: 700, padding: '4px 10px',
                  borderRadius: 999, textTransform: 'uppercase', letterSpacing: 1,
                }}>
                  {t.cta}
                </div>
              )}
              <div style={{ fontSize: 14, fontWeight: 600, color: t.color, marginBottom: 6 }}>
                {t.name}
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 4, color: 'var(--txt)', fontFamily: "'Playfair Display', Georgia, serif" }}>
                {t.price} <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt2)' }}>kr/mån</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--txt2)', marginBottom: 18 }}>
                exkl. moms
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 auto', fontSize: 13.5, lineHeight: 1.65 }}>
                {t.features.map(f => (
                  <li key={f} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: t.color, marginTop: 2 }}>
                      <Icon name="check" size={14} stroke={2.4} />
                    </span>
                    <span style={{ color: 'var(--txt)' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={`?tier=${t.name.toLowerCase()}#kontakt`} style={{
                marginTop: 18, display: 'inline-flex', gap: 6, alignItems: 'center',
                padding: '12px 18px', borderRadius: 999,
                background: t.color, color: '#fff',
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
                textAlign: 'center', justifyContent: 'center',
                transition: 'opacity 0.2s',
              }}>
                Välj denna plan <Icon name="arrowRight" size={14} stroke={2.4} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 720, margin: '60px auto 0', padding: '0 24px' }}>
        <h2 style={{
          fontSize: 26, fontWeight: 700, marginBottom: 24, color: 'var(--txt)',
          fontFamily: "'Playfair Display', Georgia, serif", textAlign: 'center',
        }}>
          Vanliga frågor
        </h2>
        <div style={{ display: 'grid', gap: 14 }}>
          <details style={{ background: 'var(--white)', padding: '16px 20px', borderRadius: 12, border: '1px solid var(--surface-3)', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 700, color: 'var(--txt)', fontSize: 15, userSelect: 'none' }}>
              Hur länge är bindningstiden?
            </summary>
            <p style={{ margin: '12px 0 0', color: 'var(--txt2)', fontSize: 14, lineHeight: 1.55 }}>
              Ingen bindningstid. Du betalar månad för månad och kan säga upp när som helst. Inga dolda avgifter.
            </p>
          </details>
          <details style={{ background: 'var(--white)', padding: '16px 20px', borderRadius: 12, border: '1px solid var(--surface-3)', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 700, color: 'var(--txt)', fontSize: 15, userSelect: 'none' }}>
              Får jag mer trafik?
            </summary>
            <p style={{ margin: '12px 0 0', color: 'var(--txt2)', fontSize: 14, lineHeight: 1.55 }}>
              Svalla har 2 500+ aktiva båtägare som planerar rutter varje månad. Vi kan inte garantera siffror, men du syns för rätt personer på rätt tid.
            </p>
          </details>
          <details style={{ background: 'var(--white)', padding: '16px 20px', borderRadius: 12, border: '1px solid var(--surface-3)', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 700, color: 'var(--txt)', fontSize: 15, userSelect: 'none' }}>
              Vad händer efter betalning?
            </summary>
            <p style={{ margin: '12px 0 0', color: 'var(--txt2)', fontSize: 14, lineHeight: 1.55 }}>
              Vi kontaktar er inom 24 timmar för att samla material (foton, beskrivning, öppettider). Ni är synliga på Svalla inom 48 timmar.
            </p>
          </details>
          <details style={{ background: 'var(--white)', padding: '16px 20px', borderRadius: 12, border: '1px solid var(--surface-3)', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 700, color: 'var(--txt)', fontSize: 15, userSelect: 'none' }}>
              Kan jag prova gratis?
            </summary>
            <p style={{ margin: '12px 0 0', color: 'var(--txt2)', fontSize: 14, lineHeight: 1.55 }}>
              Ja. Kontakta <Link href="mailto:tom@svalla.se" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>tom@svalla.se</Link> för 30 dagar gratis test av Standard-paketet.
            </p>
          </details>
        </div>
      </section>

      {/* FORM */}
      <section id="kontakt" style={{
        maxWidth: 720, margin: '60px auto 0', padding: '40px 24px 80px',
      }}>
        <h2 style={{
          fontSize: 26, fontWeight: 700, marginBottom: 8, color: 'var(--txt)',
          fontFamily: "'Playfair Display', Georgia, serif", textAlign: 'center',
        }}>
          Kontakta oss
        </h2>
        <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--txt2)', marginBottom: 24 }}>
          Vi hör av oss inom 1–2 arbetsdagar med ett konkret förslag.
        </p>
        <Suspense fallback={<div style={{ minHeight: 320 }} />}>
          <PartnerForm />
        </Suspense>
        <p style={{ marginTop: 18, fontSize: 12, color: 'var(--txt3)', textAlign: 'center' }}>
          Genom att skicka godkänner du att vi sparar dina kontaktuppgifter för att svara på din förfrågan.
        </p>
      </section>
    </div>
  )
}
