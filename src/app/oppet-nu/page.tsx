/**
 * /oppet-nu — "Vad är öppet i skärgården just nu?"
 *
 * Dynamisk sida som läser aktuell månad + filtrerar öar efter seasonal.months.
 * Visar: Högsäsong → Öppet → Begränsad service → (ingen off-lista).
 *
 * SEO: naturlig för "vad är öppet i skärgården", "skärgård öppet nu", "skärgård [månadsnamn]".
 * Newsletter: starkt CTA eftersom sidan är timely — "Få uppdateringar automatiskt".
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { ALL_ISLANDS } from '../o/island-data'
import EmailSignup from '@/components/EmailSignup'

export const dynamic = 'force-dynamic' // uppdatera vid varje request (månads-byte)

const MONTH_NAMES_SV = [
  'Januari','Februari','Mars','April','Maj','Juni',
  'Juli','Augusti','September','Oktober','November','December',
]
const MONTH_NAMES_SV_GENITIVE = [
  'Januaris','Februaris','Mars','Aprils','Majs','Junis',
  'Julis','Augustis','Septembers','Oktobers','Novembers','Decembers',
]
// Index 0 = Jan, 11 = Dec
const STATUS_ORDER = ['peak', 'open', 'limited'] as const
type Status = typeof STATUS_ORDER[number]

const STATUS_LABEL: Record<Status, string> = {
  peak: 'Högsäsong',
  open: 'Öppet',
  limited: 'Begränsad service',
}
const STATUS_COLOR: Record<Status, string> = {
  peak: '#0a7b8c',
  open: '#2d8a50',
  limited: '#b07d20',
}
const STATUS_BG: Record<Status, string> = {
  peak: 'rgba(10,123,140,0.08)',
  open: 'rgba(45,138,80,0.08)',
  limited: 'rgba(176,125,32,0.08)',
}
const STATUS_EMOJI: Record<Status, string> = {
  peak: '🔥',
  open: '✅',
  limited: '⚡',
}

export async function generateMetadata(): Promise<Metadata> {
  const month = new Date().getMonth()
  const monthName = MONTH_NAMES_SV[month]
  return {
    title: `Öppet i skärgården i ${monthName} – vilka öar kan du besöka?`,
    description: `Se vilka öar i Stockholms skärgård och Bohuslän som är öppna i ${monthName} 2026 — med restauranger, gästhamnar och service. Uppdateras varje månad.`,
    alternates: { canonical: 'https://svalla.se/oppet-nu' },
    openGraph: {
      title: `Vad är öppet i skärgården i ${monthName}?`,
      description: `Uppdaterad guide till öppna öar i skärgården — högsäsong, fullt öppet och begränsad service i ${monthName}.`,
      url: 'https://svalla.se/oppet-nu',
      type: 'website',
    },
  }
}

export default function OppetNuPage() {
  const now = new Date()
  const month = now.getMonth() // 0–11
  const monthName = MONTH_NAMES_SV[month]
  const year = now.getFullYear()

  // Samla öar per status
  const grouped: Record<Status, typeof ALL_ISLANDS> = { peak: [], open: [], limited: [] }

  for (const island of ALL_ISLANDS) {
    const seasonal = island.seasonal
    if (!seasonal?.months) continue
    const status = seasonal.months[month] as string
    if (status === 'peak' || status === 'open' || status === 'limited') {
      grouped[status as Status].push(island)
    }
  }

  const totalOpen = grouped.peak.length + grouped.open.length + grouped.limited.length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #0a3d52 0%, #1a7585 100%)',
        padding: '64px 20px 48px',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 20,
            padding: '6px 16px',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: 16,
          }}>
            Uppdaterat {monthName} {year}
          </div>
          <h1 style={{
            fontSize: 'clamp(26px, 4.5vw, 42px)',
            fontWeight: 800,
            color: '#fff',
            margin: '0 0 14px',
            lineHeight: 1.2,
          }}>
            Vad är öppet i skärgården i {monthName}?
          </h1>
          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.75)',
            margin: '0 0 8px',
            lineHeight: 1.6,
            maxWidth: 520,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {totalOpen} öar med säsongsdata — se vad som är högsäsong, öppet och vad som har begränsad service just nu.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px 0' }}>

        {/* Statistik-rad */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 12,
          marginBottom: 36,
        }}>
          {STATUS_ORDER.filter(status => grouped[status].length > 0).map(status => (
            <div key={status} style={{
              background: 'var(--white)',
              borderRadius: 14,
              padding: '16px 18px',
              border: `1px solid ${STATUS_COLOR[status]}22`,
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{STATUS_EMOJI[status]}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: STATUS_COLOR[status] }}>
                {grouped[status].length}
              </div>
              <div style={{ fontSize: 12, color: 'var(--txt3)', fontWeight: 600 }}>
                {STATUS_LABEL[status]}
              </div>
            </div>
          ))}
        </div>

        {/* Öar per status */}
        {STATUS_ORDER.map(status => {
          const islands = grouped[status]
          if (islands.length === 0) return null
          return (
            <section key={status} style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 20 }}>{STATUS_EMOJI[status]}</span>
                <h2 style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--txt)',
                  margin: 0,
                }}>
                  {STATUS_LABEL[status]}
                </h2>
                <span style={{
                  background: STATUS_BG[status],
                  color: STATUS_COLOR[status],
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                }}>
                  {islands.length} öar
                </span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 10,
              }}>
                {islands.map(island => (
                  <Link
                    key={island.slug}
                    href={`/o/${island.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{
                      background: 'var(--white)',
                      borderRadius: 14,
                      padding: '16px 18px',
                      border: `1px solid ${STATUS_COLOR[status]}18`,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      transition: 'box-shadow .15s',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--txt)' }}>
                          {island.name}
                        </div>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: STATUS_COLOR[status],
                          background: STATUS_BG[status],
                          borderRadius: 20,
                          padding: '2px 8px',
                        }}>
                          {island.seasonal?.best ? `Bäst: ${island.seasonal.best.split(' ')[0]}` : STATUS_LABEL[status]}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--txt3)' }}>
                        {island.regionLabel ?? island.region}
                      </div>
                      {island.seasonal?.bestReason && (
                        <div style={{
                          fontSize: 12,
                          color: 'var(--txt2)',
                          lineHeight: 1.5,
                          borderTop: '1px solid rgba(0,0,0,0.05)',
                          paddingTop: 8,
                          marginTop: 2,
                        }}>
                          {island.seasonal.bestReason.length > 90
                            ? island.seasonal.bestReason.slice(0, 87) + '…'
                            : island.seasonal.bestReason}
                        </div>
                      )}
                      {island.seasonal?.warning && (
                        <div style={{
                          fontSize: 11,
                          color: '#b07d20',
                          background: 'rgba(176,125,32,0.08)',
                          borderRadius: 6,
                          padding: '5px 8px',
                          lineHeight: 1.45,
                        }}>
                          ⚠️ {island.seasonal.warning.length > 80
                            ? island.seasonal.warning.slice(0, 77) + '…'
                            : island.seasonal.warning}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}

        {/* Newsletter CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #0d3f5a 0%, #1a5f7a 100%)',
          borderRadius: 20,
          padding: '32px 28px',
          marginBottom: 32,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📬</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 10px' }}>
            Få uppdateringen automatiskt varje månad
          </h3>
          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.75)',
            margin: '0 auto 24px',
            lineHeight: 1.6,
            maxWidth: 420,
          }}>
            Svallanyheter skickas varannan tisdag. Öppna öar, insider-tips och säsongsguider direkt i inkorgen. Gratis, inga annonser.
          </p>
          <div style={{ maxWidth: 420, margin: '0 auto' }}>
            <EmailSignup
              variant="footer"
              source="oppet-nu"
              title=""
              description=""
              buttonLabel="Prenumerera gratis →"
            />
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 12 }}>
            Avregistrera när du vill.
          </p>
        </div>

        {/* Länk till ostlistan */}
        <div style={{
          background: 'var(--white)',
          borderRadius: 16,
          padding: '20px 24px',
          border: '1px solid rgba(10,123,140,0.08)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--txt)', marginBottom: 4 }}>
              🏝 Hitta din ö — kuraterade listor
            </div>
            <div style={{ fontSize: 13, color: 'var(--txt2)' }}>
              Barnvänliga, romantiska, seglarfavoriter och mer — handplockade rekommendationer.
            </div>
          </div>
          <Link href="/ostlistan" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '10px 18px',
            borderRadius: 999,
            background: 'var(--sea, #1e5c82)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 13,
            textDecoration: 'none',
            flexShrink: 0,
          }}>
            Se ölistorna →
          </Link>
        </div>

      </div>
    </div>
  )
}
