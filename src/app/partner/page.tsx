import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import PartnerForm from './PartnerForm'
import SvallaLogo from '@/components/SvallaLogo'
import Icon, { type IconName } from '@/components/Icon'

export const metadata: Metadata = {
  title: 'Lista din verksamhet gratis på Svalla | För restauranger, hamnar och upplevelser',
  description: 'Syns för tusentals båtfolk som planerar skärgårdsresor. Lista din restaurang, gästhamn eller upplevelse gratis på Svalla.',
  keywords: ['skärgård restaurang lista gratis', 'gästhamn synas online', 'svalla partner', 'skärgård verksamhet'],
  openGraph: {
    title: 'Lista din verksamhet gratis på Svalla',
    description: 'Syns för tusentals båtfolk som planerar skärgårdsresor. Gratis att komma igång.',
    url: 'https://svalla.se/partner',
  },
  alternates: { canonical: 'https://svalla.se/partner' },
}

const STATS = [
  { num: '2 500+', label: 'Båtägare aktiva på Svalla' },
  { num: '1 000+', label: 'Planerade rutter senaste veckan' },
  { num: '470+', label: 'Verifierade restauranger & hamnar' },
  { num: 'Maj–Sept', label: 'Säsong med högtrafik' },
]

const BENEFITS: Array<{ icon: IconName; title: string; body: string }> = [
  { icon: 'target',     title: 'Rätt besökare',       body: 'Folk som besöker en ösida planerar en konkret tur. De är inte slumpmässiga sökare — de är på väg.' },
  { icon: 'pin',        title: 'Geografisk precision', body: 'Du syns när någon planerar att åka just till din ö. Inga visningar i fel del av Sverige.' },
  { icon: 'trendingUp', title: 'Växande synlighet',    body: 'Svallas ösidor rankar högt på Google för "sandhamn restaurang", "möja gästhamn" och liknande sökningar.' },
  { icon: 'handshake',  title: 'Enkelt att komma igång', body: 'Fyll i formuläret nedan. Vi hör av oss inom 24 timmar, samlar material och listar er på Svalla.' },
]

const HOW_IT_WORKS = [
  { step: '1', title: 'Skicka formuläret', body: 'Namn, typ av verksamhet och kontaktuppgifter. Tar 2 minuter.' },
  { step: '2', title: 'Vi hör av oss', body: 'Inom 24 timmar — vi samlar foton, beskrivning och öppettider.' },
  { step: '3', title: 'Ni syns på Svalla', body: 'Er verksamhet är listade på rätt öprofil och dyker upp i ruttplaneraren.' },
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
            Lista er verksamhet gratis
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, opacity: 0.9, maxWidth: 560, margin: '0 auto 8px' }}>
            Svalla är platsen där båtfolk planerar sina skärgårdsresor.
            Restauranger, gästhamnar och upplevelser syns direkt i ruttplaneraren —
            för tusentals besökare varje månad.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.5, opacity: 0.75, maxWidth: 480, margin: '0 auto 32px' }}>
            Gratis att komma igång. Inga avtal.
          </p>
          <a href="#kontakt" style={{
            display: 'inline-flex', gap: 8, alignItems: 'center',
            padding: '14px 28px',
            background: '#fff', color: 'var(--sea-l, #1e5c82)',
            fontSize: 15, fontWeight: 700, borderRadius: 999,
            textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          }}>
            Lista er gratis <Icon name="arrowRight" size={16} stroke={2.2} />
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
          Varför Svalla?
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

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 720, margin: '48px auto 0', padding: '0 24px' }}>
        <h2 style={{
          fontSize: 26, fontWeight: 700, marginBottom: 28, color: 'var(--txt)',
          fontFamily: "'Playfair Display', Georgia, serif",
        }}>
          Så fungerar det
        </h2>
        <div style={{ display: 'grid', gap: 16 }}>
          {HOW_IT_WORKS.map(h => (
            <div key={h.step} style={{
              display: 'flex', gap: 18, alignItems: 'flex-start',
              background: 'var(--white)', padding: '20px 22px', borderRadius: 14,
              border: '1px solid var(--surface-3)',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--sea)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 800, flexShrink: 0,
              }}>
                {h.step}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 4 }}>{h.title}</div>
                <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55 }}>{h.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 720, margin: '56px auto 0', padding: '0 24px' }}>
        <h2 style={{
          fontSize: 26, fontWeight: 700, marginBottom: 24, color: 'var(--txt)',
          fontFamily: "'Playfair Display', Georgia, serif",
        }}>
          Vanliga frågor
        </h2>
        <div style={{ display: 'grid', gap: 14 }}>
          <details style={{ background: 'var(--white)', padding: '16px 20px', borderRadius: 12, border: '1px solid var(--surface-3)', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 700, color: 'var(--txt)', fontSize: 15, userSelect: 'none' }}>
              Vad kostar det?
            </summary>
            <p style={{ margin: '12px 0 0', color: 'var(--txt2)', fontSize: 14, lineHeight: 1.55 }}>
              Gratis. Vi listar er verksamhet utan kostnad och inga avtal behöver skrivas på.
            </p>
          </details>
          <details style={{ background: 'var(--white)', padding: '16px 20px', borderRadius: 12, border: '1px solid var(--surface-3)', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 700, color: 'var(--txt)', fontSize: 15, userSelect: 'none' }}>
              Vilka verksamheter passar?
            </summary>
            <p style={{ margin: '12px 0 0', color: 'var(--txt2)', fontSize: 14, lineHeight: 1.55 }}>
              Restauranger, kaféer, gästhamnar, marinas, stugor och boende, upplevelsebolag, båtuthyrning — alla verksamheter som riktar sig mot båtfolk och skärgårdsbesökare.
            </p>
          </details>
          <details style={{ background: 'var(--white)', padding: '16px 20px', borderRadius: 12, border: '1px solid var(--surface-3)', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 700, color: 'var(--txt)', fontSize: 15, userSelect: 'none' }}>
              Hur snabbt syns vi?
            </summary>
            <p style={{ margin: '12px 0 0', color: 'var(--txt2)', fontSize: 14, lineHeight: 1.55 }}>
              Vi hör av oss inom 24 timmar. När vi fått foton och beskrivning är ni live inom 48 timmar.
            </p>
          </details>
          <details style={{ background: 'var(--white)', padding: '16px 20px', borderRadius: 12, border: '1px solid var(--surface-3)', cursor: 'pointer' }}>
            <summary style={{ fontWeight: 700, color: 'var(--txt)', fontSize: 15, userSelect: 'none' }}>
              Kan vi uppdatera info och öppettider?
            </summary>
            <p style={{ margin: '12px 0 0', color: 'var(--txt2)', fontSize: 14, lineHeight: 1.55 }}>
              Ja. Skicka uppdaterad info till <Link href="mailto:info@svalla.se" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>info@svalla.se</Link> så fixar vi det inom ett dygn.
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
          Kom igång idag
        </h2>
        <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--txt2)', marginBottom: 24 }}>
          Fyll i formuläret — vi hör av oss inom 24 timmar.
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
