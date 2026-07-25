import type { Metadata } from 'next'
import Link from 'next/link'
import IslandWeather from '@/components/IslandWeather'
import { UPPLÄGG, WEATHER_TAG, tagColor } from './dag-data'

export const metadata: Metadata = {
  title: { absolute: 'Dagsupplägg i skärgården — vad gör man idag? | Svalla' },
  description: 'Kurerade dagsupplägg för Stockholms skärgård — familj, par, seglare och nybörjare. Aktuellt väder och direktlänkar till öarna.',
  openGraph: {
    title: 'Dagsupplägg i skärgården | Svalla',
    description: 'Vad gör man idag i skärgården? Kurerade upplägg för alla typer av utflykter.',
    url: 'https://svalla.se/dag',
  },
  alternates: { canonical: 'https://svalla.se/dag' },
}


export default function DagPage() {
  // Koordinater för Stockholms inre skärgård (Fjäderholmarna-hållet)
  // Open-Meteo ger ett representativt väder för hela innerskärgården
  const STOCKHOLM_LAT = 59.32
  const STOCKHOLM_LNG = 18.20

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>

      {/* ── HERO med väder ─────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(160deg, #1a3a5c 0%, #1e5c82 60%, #2d7d8a 100%)',
        padding: '48px 20px 40px',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 10,
          }}>
            Svalla · Dagsupplägg
          </div>
          <h1 style={{
            fontSize: 32, fontWeight: 900, color: '#fff',
            margin: '0 0 8px', lineHeight: 1.15, letterSpacing: -0.5,
          }}>
            Vad gör man idag?
          </h1>
          <p style={{
            fontSize: 15, color: 'rgba(255,255,255,0.75)',
            margin: '0 0 16px', lineHeight: 1.55, maxWidth: 520,
          }}>
            Tio kurerade dagsupplägg för alla typer av utflykter — barnfamiljer,
            seglare, par och nybörjare.
          </p>

          {/* Väderwidget — hämtar live från Open-Meteo, ingen API-nyckel */}
          <IslandWeather lat={STOCKHOLM_LAT} lng={STOCKHOLM_LNG} />
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px 0' }}>

        {/* ── Ingress ────────────────────────────────────────────────────── */}
        <p style={{
          fontSize: 14, color: 'var(--txt2)', lineHeight: 1.7,
          margin: '0 0 28px', maxWidth: 620,
        }}>
          Upplägg för dagstur från Stockholm — med Waxholmsbåten, egna båten eller
          hyrbåt. Alla avstånd är sjömil från Stockholm om inget annat anges.
          Vädret ovan gäller innerskärgården just nu.
        </p>

        {/* ── Dagsupplägg-kort ───────────────────────────────────────────── */}
        <div style={{ display: 'grid', gap: 16 }}>
          {UPPLÄGG.map((u) => {
            const wt = WEATHER_TAG[u.weatherTag]
            return (
              <Link
                key={u.slug}
                href={`/dag/${u.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: 'var(--white)',
                  borderRadius: 16,
                  padding: '20px 22px',
                  border: '1px solid var(--surface-3)',
                  transition: 'box-shadow 140ms ease, transform 140ms ease',
                  cursor: 'pointer',
                }}>
                  {/* Rubrik + väder-etikett */}
                  <div style={{
                    display: 'flex', alignItems: 'flex-start',
                    justifyContent: 'space-between', gap: 12, marginBottom: 6,
                  }}>
                    <div>
                      <h2 style={{
                        fontSize: 18, fontWeight: 800, color: 'var(--txt)',
                        margin: '0 0 2px', lineHeight: 1.2,
                      }}>
                        {u.name}
                      </h2>
                      <p style={{
                        fontSize: 13, color: 'var(--sea)', fontWeight: 600,
                        margin: 0, lineHeight: 1.3,
                      }}>
                        {u.tagline}
                      </p>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      padding: '4px 10px', borderRadius: 999,
                      background: wt.bg, color: wt.color,
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      {wt.label}
                    </span>
                  </div>

                  {/* Beskrivning */}
                  <p style={{
                    fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6,
                    margin: '10px 0 14px',
                  }}>
                    {u.desc}
                  </p>

                  {/* Footer: taggar + distans */}
                  <div style={{
                    display: 'flex', flexWrap: 'wrap',
                    alignItems: 'center', gap: 6,
                  }}>
                    {u.tags.map(tag => {
                      const tc = tagColor(tag)
                      return (
                        <span key={tag} style={{
                          fontSize: 11, fontWeight: 700,
                          padding: '3px 9px', borderRadius: 999,
                          background: tc.bg, color: tc.color,
                        }}>
                          {tag}
                        </span>
                      )
                    })}
                    <span style={{
                      marginLeft: 'auto', fontSize: 12,
                      color: 'var(--txt3)', fontWeight: 500,
                    }}>
                      {u.distance} · {u.duration}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* ── Thorkel-länk ───────────────────────────────────────────────── */}
        <div style={{
          marginTop: 32,
          background: 'rgba(10,123,140,0.05)',
          border: '1px solid rgba(10,123,140,0.12)',
          borderRadius: 16, padding: '20px 22px',
        }}>
          <div style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--sea)', marginBottom: 6,
          }}>
            Vill du ha ett personligt förslag?
          </div>
          <p style={{
            fontSize: 14, color: 'var(--txt2)', margin: '0 0 14px', lineHeight: 1.6,
          }}>
            Thorkel är skeppare från Möja. Berätta vad du vill göra — barnfamilj,
            romantisk kväll, segling från Ingarö — så svarar han konkret.
          </p>
          <Link href="/guide" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 22px', borderRadius: 50,
            background: 'var(--sea)', color: '#fff',
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
          }}>
            Fråga Thorkel →
          </Link>
        </div>

        {/* ── Planera vidare ─────────────────────────────────────────────── */}
        <div style={{
          marginTop: 12,
          background: 'rgba(10,123,140,0.04)',
          border: '1px solid rgba(10,123,140,0.10)',
          borderRadius: 16, padding: '16px 22px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>
              Planera en rutt
            </div>
            <div style={{ fontSize: 12, color: 'var(--txt3)', lineHeight: 1.4 }}>
              Välj start, mål och intressen — Svalla hittar stopp längs vägen.
            </div>
          </div>
          <Link href="/planera/ny" style={{
            fontSize: 12, fontWeight: 700, color: 'var(--sea)',
            textDecoration: 'none', padding: '7px 14px',
            borderRadius: 20, background: 'rgba(10,123,140,0.10)',
            flexShrink: 0,
          }}>
            Planera →
          </Link>
        </div>

        {/* ── Färjor ─────────────────────────────────────────────────────── */}
        <div style={{
          marginTop: 12,
          background: 'rgba(10,123,140,0.04)',
          border: '1px solid rgba(10,123,140,0.10)',
          borderRadius: 16, padding: '16px 22px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>
              Nästa avgång
            </div>
            <div style={{ fontSize: 12, color: 'var(--txt3)', lineHeight: 1.4 }}>
              Waxholmsbolaget och Cinderellabåtarna — tidtabeller och linjer.
            </div>
          </div>
          <Link href="/farjor" style={{
            fontSize: 12, fontWeight: 700, color: 'var(--sea)',
            textDecoration: 'none', padding: '7px 14px',
            borderRadius: 20, background: 'rgba(10,123,140,0.10)',
            flexShrink: 0,
          }}>
            Färjor →
          </Link>
        </div>

      </div>
    </div>
  )
}
