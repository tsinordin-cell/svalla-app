import type { Metadata } from 'next'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'
import EmailSignup from '@/components/EmailSignup'
import { ACTIVITY_LIST, islandsForActivity } from './activity-data'

export const metadata: Metadata = {
  title: 'Aktiviteter i skärgården — segling, cykling, bad, vandring, mat | Svalla',
  description: 'Hitta segling, cykling, bad, vandring och bra mat i Stockholms skärgård och Bohuslän. Vägledning per aktivitet och ö — vad du ska packa, bästa säsong och vilka öar som passar.',
  alternates: { canonical: 'https://svalla.se/aktivitet' },
  openGraph: {
    title: 'Aktiviteter i skärgården',
    description: 'Segling, cykling, bad, vandring och mat — guide per aktivitet och ö.',
    url: 'https://svalla.se/aktivitet',
  },
}

export default function ActivityIndexPage() {
  const activities = ACTIVITY_LIST.map(a => ({
    ...a,
    count: islandsForActivity(a.slug).length,
  }))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '18px 24px 16px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none' }}>
            ← Hem
          </Link>
        </div>
      </nav>

      <header style={{
        background: 'linear-gradient(170deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '40px 24px 56px', color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
            Vad vill du göra i skärgården?
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Aktiviteter i skärgården
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.55, marginTop: 12, maxWidth: 640, opacity: 0.92 }}>
            Välj aktivitet — vi visar vilka öar som passar bäst, vad du behöver packa och när det är bästa säsong.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>
        <div style={{ display: 'grid', gap: 14 }}>
          {activities.map(a => (
            <Link
              key={a.slug}
              href={`/aktivitet/${a.slug}`}
              style={{
                background: 'var(--white)',
                border: '1px solid var(--surface-3)',
                borderRadius: 16,
                padding: '22px 24px',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                transition: 'transform .15s, box-shadow .15s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--sea)', margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {a.name}
                </h2>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  padding: '3px 10px', borderRadius: 999,
                  background: 'var(--surface-2)', color: 'var(--txt2)',
                }}>
                  {a.count} öar
                </span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--sea)', fontWeight: 600, marginBottom: 8 }}>
                {a.hero}
              </div>
              <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, margin: 0 }}>
                {a.description}
              </p>
              <div style={{
                marginTop: 12, fontSize: 12, color: 'var(--acc)',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                Utforska {a.shortName.toLowerCase()} →
              </div>
            </Link>
          ))}
        </div>

        <div style={{
          marginTop: 32, padding: '20px 22px',
          background: 'var(--white)', borderRadius: 14,
          border: '1px solid var(--surface-3)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Eller utforska allt</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 14 }}>
            <Link href="/rutter" style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Alla öar →</Link>
            <Link href="/upptack" style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Upptäck-kartan →</Link>
            <Link href="/planera" style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Reseplaneraren →</Link>
            <Link href="/jamfor" style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Jämför öar →</Link>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <EmailSignup
            variant="card"
            source="aktivitet-index"
            title="Få veckans skärgårdstips"
            description="2 mail i månaden — bästa krogarna, evenemang och nya guider. Inget spam, lätt att avregistrera."
          />
        </div>
      </main>
    </div>
  )
}
