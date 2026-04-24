import type { Metadata } from 'next'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'
import { SEED_FERRY_ROUTES, fetchDepartures, type FerryDeparture } from '@/lib/ferries'

export const metadata: Metadata = {
  title: 'Färjetider — Svalla',
  description: 'Färjetider för Stockholms skärgård. Waxholmsbolaget och Cinderellabåtarna — linjer, bryggor och avgångar.',
  keywords: ['waxholmsbolaget tidtabell', 'skärgårdsbåt', 'cinderella sandhamn', 'färjetider stockholm'],
  openGraph: {
    title: 'Färjetider — Svalla',
    description: 'Färjetider för Stockholms skärgård.',
    url: 'https://svalla.se/farjor',
  },
}

export const revalidate = 600

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
      {/* HERO */}
      <div style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
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
