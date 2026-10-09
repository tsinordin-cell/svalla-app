import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import PartnerForm from './PartnerForm'
import SvallaLogo from '@/components/SvallaLogo'
import Icon, { type IconName } from '@/components/Icon'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { getAdminClient } from '@/lib/supabase-admin'

/**
 * /partner: för krogar, hamnar, boenden och upplevelser på öarna.
 *
 * 2026-10-08: priserna (290/590/990 kr), Stripe-knappen och siffrorna
 * "2 500+ båtägare", "1 000+ rutter", "470+ verifierade" är borttagna. Det
 * finns ingen betald nivå (Pro är parkerad) och siffrorna saknade underlag.
 * Siffrorna nedan räknas ur sajtens egen data. Lägg inte till publiksiffror
 * här förrän de är mätta, samma regel som på /partner-sida.
 */
export const revalidate = 3600

export const metadata: Metadata = {
  title: { absolute: 'Er verksamhet på Svalla, utan kostnad | Krogar, hamnar och boenden' },
  description: 'Driver du en krog, gästhamn, ett boende eller en upplevelse i skärgården? Det kostar ingenting att finnas på Svalla, och ni bestämmer vad som står om er.',
  keywords: ['skärgård restaurang synas', 'gästhamn synas online', 'svalla partner', 'skärgård verksamhet'],
  openGraph: {
    title: 'Er verksamhet på Svalla, utan kostnad',
    description: 'Det kostar ingenting att finnas på Svalla, och ni bestämmer vad som står om er.',
    url: 'https://svalla.se/partner',
  },
  alternates: { canonical: 'https://svalla.se/partner' },
}

const fmt = (n: number) => n.toLocaleString('sv-SE')

async function antalPlatser(): Promise<number | null> {
  try {
    const { count, error } = await getAdminClient().from('restaurants').select('*', { count: 'exact', head: true })
    return error ? null : count ?? null
  } catch {
    return null
  }
}

const BENEFITS: Array<{ icon: IconName; title: string; body: string }> = [
  { icon: 'pin',        title: 'En egen sida om er',        body: 'Adress, kontaktuppgifter, länk till er webbplats och bokning, samlat på en sida som går att hitta på Google.' },
  { icon: 'target',     title: 'Där gästerna planerar',     body: 'Er sida visas på ösidan, där folk läser på innan de åker ut. Ni syns för den som redan funderar på att komma.' },
  { icon: 'handshake',  title: 'Ni bestämmer vad som står', body: 'Är något fel eller saknas? Skicka rätt uppgifter så ändrar vi. Vill ni inte finnas med tar vi bort sidan.' },
]

const HOW_IT_WORKS = [
  { step: '1', title: 'Skicka formuläret', body: 'Namn på verksamheten, var ni finns och hur vi når er. Det tar ett par minuter.' },
  { step: '2', title: 'Vi hör av oss', body: 'Vi svarar via mejl och frågar efter det som saknas, till exempel bilder eller öppettider.' },
  { step: '3', title: 'Er sida är uppe', body: 'Vi lägger upp eller rättar er sida. Ni kan alltid be oss ändra något senare.' },
]

const FAQ: Array<{ q: string; a: React.ReactNode }> = [
  {
    q: 'Vad kostar det?',
    a: 'Ingenting. Det kostar inget att finnas på Svalla och inget att be oss rätta era uppgifter. Ni skriver inte på något avtal.',
  },
  {
    q: 'Vi finns redan med. Hur ändrar vi något?',
    a: <>Skriv till <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)', fontWeight: 600, textDecoration: 'none' }}>info@svalla.se</a> och berätta vad som ska ändras, eller använd formuläret nedan. Ni kan söka fram er sida under <Link href="/upptack" style={{ color: 'var(--sea)', fontWeight: 600, textDecoration: 'none' }}>Upptäck</Link>.</>,
  },
  {
    q: 'Kan vi bli borttagna?',
    a: <>Ja. Skriv till <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)', fontWeight: 600, textDecoration: 'none' }}>info@svalla.se</a> så tar vi bort sidan. Läs mer i vår <Link href="/integritetspolicy" style={{ color: 'var(--sea)', fontWeight: 600, textDecoration: 'none' }}>integritetspolicy</Link>.</>,
  },
  {
    q: 'Vilka verksamheter passar?',
    a: 'Krogar, kaféer, gästhamnar, boenden, butiker, uthyrning och upplevelser på öarna och längs kusten.',
  },
]

export default async function PartnerPage() {
  const platser = await antalPlatser()
  const STATS = [
    { num: fmt(ALL_ISLANDS.length), label: 'öar med egen sida' },
    ...(platser ? [{ num: fmt(platser), label: 'platser på kartan' }] : []),
    { num: 'Gratis', label: 'att finnas med' },
  ]

  const h2: React.CSSProperties = {
    fontSize: 28, fontWeight: 700, marginBottom: 18, color: 'var(--txt)',
    fontFamily: "'Playfair Display', Georgia, serif",
  }

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
            För krogar · hamnar · boenden · upplevelser
          </div>
          <h1 style={{
            fontSize: 44, fontWeight: 700, lineHeight: 1.15, margin: '0 0 16px',
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Er verksamhet på Svalla, utan kostnad
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, opacity: 0.9, maxWidth: 560, margin: '0 auto 28px' }}>
            Svalla samlar skärgårdens öar, krogar, hamnar och boenden på ett ställe.
            Det kostar ingenting att finnas med, och ni bestämmer vad som står om er.
          </p>
          <a href="#kontakt" style={{
            display: 'inline-flex', gap: 8, alignItems: 'center',
            padding: '14px 28px',
            background: '#fff', color: 'var(--sea-l, #1e5c82)',
            fontSize: 15, fontWeight: 700, borderRadius: 999,
            textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          }}>
            Kom med eller rätta er sida <Icon name="arrowRight" size={16} stroke={2.2} />
          </a>
        </div>
      </section>

      {/* STATS: räknas ur sajtens egen data */}
      <section style={{ maxWidth: 900, margin: '-40px auto 0', padding: '0 16px', position: 'relative' }}>
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

      {/* VAD NI FÅR */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 24px' }}>
        <h2 style={h2}>Vad ni får</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
          {BENEFITS.map(b => (
            <div key={b.title} style={{
              background: 'var(--white)', padding: '22px 20px', borderRadius: 14,
              border: '1px solid var(--surface-3)',
            }}>
              <div style={{ marginBottom: 10, color: 'var(--sea)' }}>
                <Icon name={b.icon} size={28} stroke={2} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: 'var(--txt)' }}>{b.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--txt2)' }}>{b.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SÅ FUNGERAR DET */}
      <section style={{ maxWidth: 720, margin: '48px auto 0', padding: '0 24px' }}>
        <h2 style={h2}>Så fungerar det</h2>
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
        <h2 style={h2}>Vanliga frågor</h2>
        <div style={{ display: 'grid', gap: 14 }}>
          {FAQ.map(f => (
            <details key={f.q} style={{ background: 'var(--white)', padding: '16px 20px', borderRadius: 12, border: '1px solid var(--surface-3)', cursor: 'pointer' }}>
              <summary style={{ fontWeight: 700, color: 'var(--txt)', fontSize: 15, userSelect: 'none' }}>{f.q}</summary>
              <p style={{ margin: '12px 0 0', color: 'var(--txt2)', fontSize: 14, lineHeight: 1.55 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FORMULÄR */}
      <section id="kontakt" style={{ maxWidth: 720, margin: '60px auto 0', padding: '40px 24px 80px' }}>
        <h2 style={{ ...h2, textAlign: 'center', marginBottom: 8 }}>Hör av er</h2>
        <p style={{ textAlign: 'center', fontSize: 15, color: 'var(--txt2)', marginBottom: 24 }}>
          Berätta vilken verksamhet det gäller, så återkommer vi via mejl.
        </p>
        <Suspense fallback={<div style={{ minHeight: 320 }} />}>
          <PartnerForm />
        </Suspense>
        <p style={{ marginTop: 18, fontSize: 12, color: 'var(--txt3)', textAlign: 'center' }}>
          Vi sparar era kontaktuppgifter för att kunna svara. Läs mer i vår{' '}
          <Link href="/integritetspolicy" style={{ color: 'var(--txt3)' }}>integritetspolicy</Link>.
        </p>
      </section>
    </div>
  )
}
