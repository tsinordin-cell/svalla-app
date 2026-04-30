import type { Metadata } from 'next'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'
import EmailSignup from '@/components/EmailSignup'
import PublicFooter from '@/components/PublicFooter'
import { ALL_ISLANDS } from '../o/island-data'
import { DEPARTURES } from './utflykt-data'
import UtflyktClient from './UtflyktClient'

export const metadata: Metadata = {
  title: 'Planera din utflykt — välj ö, få allt du behöver | Svalla',
  description: 'Smart utflyktsplanerare för skärgården. Välj startpunkt och ö — få restid, packlista, krogar och tips på en sida.',
  alternates: { canonical: 'https://svalla.se/utflykt' },
  openGraph: {
    title: 'Planera din utflykt — Svalla',
    description: 'Välj ö, få allt du behöver för en dagsutflykt.',
    url: 'https://svalla.se/utflykt',
  },
}

export default function UtflyktPage() {
  // Skicka bara nödvändigt data till client
  const islands = ALL_ISLANDS.map(i => ({
    slug: i.slug,
    name: i.name,
    region: i.region,
    regionLabel: i.regionLabel,
    tagline: i.tagline,
    lat: i.lat,
    lng: i.lng,
    travel_time: i.facts.travel_time,
    season: i.facts.season,
    character: i.facts.character,
    best_for: i.facts.best_for,
    tags: i.tags,
    tips: i.tips.slice(0, 3),
    restaurants: i.restaurants.slice(0, 3).map(r => ({ name: r.name, type: r.type, desc: r.desc })),
    accommodation: i.accommodation.slice(0, 2).map(a => ({ name: a.name, type: a.type })),
    activities: i.activities.slice(0, 4).map(a => ({ name: a.name, desc: a.desc })),
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
            Utflyktsplanerare
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Vart vill du åka?
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.55, marginTop: 12, maxWidth: 640, opacity: 0.92 }}>
            Välj startpunkt och ö — vi visar restid, packlista, krogar och lokala tips på en sida.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>
        <UtflyktClient
          islands={islands}
          departures={DEPARTURES}
        />

        <div style={{ marginTop: 28 }}>
          <EmailSignup
            variant="card"
            source="utflykt"
            title="Få fler utflyktstips"
            description="2 mail i månaden — säsong, evenemang och nya öar att utforska."
          />
        </div>
      </main>
      <PublicFooter />
    </div>
  )
}
