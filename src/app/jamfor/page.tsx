import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jämför öar i skärgården — vilken passar dig? | Svalla',
  description: 'Sandhamn eller Grinda? Möja eller Utö? Jämför öar i Stockholms skärgård sida vid sida — fakta, bästa-för, hur man tar sig dit.',
  keywords: ['jämför skärgårdsöar', 'sandhamn eller grinda', 'utö eller möja', 'vilken ö stockholms skärgård'],
  openGraph: {
    title: 'Jämför öar i Stockholms skärgård',
    description: 'Sida vid sida — fakta, restider, bästa-för.',
    url: 'https://svalla.se/jamfor',
  },
  alternates: { canonical: 'https://svalla.se/jamfor' },
}

const COMPARISONS = [
  { a: 'sandhamn', b: 'grinda',  hook: 'Klassikern mot familjevänligt' },
  { a: 'sandhamn', b: 'moja',    hook: 'Festligt mot autentiskt' },
  { a: 'grinda',   b: 'finnhamn',hook: 'Närhet mot avskildhet' },
  { a: 'uto',      b: 'sandhamn',hook: 'Söderläge mot mellanskärgård' },
  { a: 'moja',     b: 'svartso', hook: 'Större hamn mot lugnare granne' },
  { a: 'finnhamn', b: 'rodloga', hook: 'Mellanskärgård mot ytterskärgård' },
  { a: 'arholma',  b: 'rodloga', hook: 'Norra mot östra ytterskärgård' },
  { a: 'vaxholm',  b: 'fjaderholmarna', hook: 'Skärgårdens port mot 25 minuter från Slussen' },
  { a: 'uto',      b: 'orno',    hook: 'Cykelö mot lugnt boendeläge' },
  { a: 'namdo',    b: 'runmaro',  hook: 'Stillhet mot konstnärsby' },
]

export default function JamforIndex() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f5f4ef)', paddingBottom: 80 }}>
      <header style={{
        background: 'linear-gradient(165deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '50px 24px', color: '#fff',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, textDecoration: 'none' }}>
            ← Tillbaka
          </Link>
          <h1 style={{
            fontSize: 38, fontWeight: 700, margin: '14px 0 10px',
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Jämför öar
          </h1>
          <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 560 }}>
            Står du och väljer mellan två destinationer? Här är 10 jämförelser för att hjälpa
            dig fatta beslutet — fakta sida vid sida, ärligt.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 760, margin: '24px auto 0', padding: '0 16px' }}>
        <div style={{ display: 'grid', gap: 12 }}>
          {COMPARISONS.map(c => (
            <Link
              key={`${c.a}-${c.b}`}
              href={`/jamfor/${c.a}-vs-${c.b}`}
              style={{
                display: 'block', padding: '18px 20px',
                background: '#fff', borderRadius: 14,
                border: '1px solid rgba(0,0,0,0.08)',
                textDecoration: 'none',
                transition: 'transform .15s, box-shadow .15s',
              }}
            >
              <div style={{
                fontSize: 18, fontWeight: 700,
                color: 'var(--txt, #1a2530)',
                fontFamily: "'Playfair Display', Georgia, serif",
              }}>
                {capitalize(c.a)} <span style={{ color: 'var(--txt2, rgba(0,0,0,0.45))' }}>vs</span> {capitalize(c.b)}
              </div>
              <div style={{ fontSize: 13, color: 'var(--txt2, rgba(0,0,0,0.6))', marginTop: 4 }}>
                {c.hook} →
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: '20px 22px', background: '#fff', borderRadius: 14, border: '1px solid rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Saknas en jämförelse?</h2>
          <p style={{ fontSize: 13, color: 'var(--txt2, rgba(0,0,0,0.65))', lineHeight: 1.55 }}>
            Vi lägger till fler hela tiden. Vill du se "Lidö vs Husarö" eller någon annan kombo?
            Mejla <a href="mailto:hello@svalla.se" style={{ color: 'var(--sea)' }}>hello@svalla.se</a>.
          </p>
        </div>
      </main>
    </div>
  )
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')
}
