import type { Metadata } from 'next'
import Link from 'next/link'
import IslandWeather from '@/components/IslandWeather'

export const metadata: Metadata = {
  title: 'Dagsupplägg i skärgården — vad gör man idag? | Svalla',
  description: 'Kurerade dagsupplägg för Stockholms skärgård — familj, par, seglare och nybörjare. Aktuellt väder och direktlänkar till öarna.',
  openGraph: {
    title: 'Dagsupplägg i skärgården | Svalla',
    description: 'Vad gör man idag i skärgården? Kurerade upplägg för alla typer av utflykter.',
    url: 'https://svalla.se/dag',
  },
  alternates: { canonical: 'https://svalla.se/dag' },
}

// ─── Kuraterade dagsupplägg ───────────────────────────────────────────────────
// Varje upplägg är redaktionellt valt — inte algoritmgenererat.
// weatherTag: editorial bedömning av när detta upplägg funkar bäst.

type DagUpplägg = {
  slug: string
  name: string
  tagline: string
  desc: string
  tags: string[]
  duration: string
  distance: string
  weatherTag: 'alltid-bra' | 'lugnt-vatten' | 'vind-ok' | 'soligt'
  href: string
}

const UPPLÄGG: DagUpplägg[] = [
  {
    slug: 'fjaderholmarna',
    name: 'Fjäderholmarna',
    tagline: 'Närmaste skärgården — 25 minuter från Slussen',
    desc: 'Rökeriet, Fjäderholmarnas Krog, hantverksby och klippbad. Perfekt för en spontan halvdag utan planering. Waxholmsbåt avgår varje timme.',
    tags: ['Familj', 'Nybörjare', 'Halvdag'],
    duration: '3–5 timmar',
    distance: '~4 NM från Slussen',
    weatherTag: 'alltid-bra',
    href: '/o/fjaderholmarna',
  },
  {
    slug: 'vaxholm',
    name: 'Vaxholm',
    tagline: 'Levande hamnstad med Kastellet och hamnkrog',
    desc: 'Hamnpromenaden, Kastellet, Hamnkrogen Vaxholm och egna butiker. Bra för barnfamiljer och de som vill ha samhälle och mat utan att segla långt.',
    tags: ['Familj', 'Par', 'Halvdag'],
    duration: '4–6 timmar',
    distance: '~15 NM från Stockholm',
    weatherTag: 'alltid-bra',
    href: '/o/vaxholm',
  },
  {
    slug: 'grinda',
    name: 'Grinda',
    tagline: 'Naturreservat, Grinda Wärdshus och toppenbrygga',
    desc: 'En av skärgårdens vackraste öar — bilfri, grön och med ett värdshus som kräver förhandsbokning. Bra bad och naturvandringar. Boka bord tidigt.',
    tags: ['Par', 'Familj', 'Heldag'],
    duration: '6–8 timmar',
    distance: '~25 NM från Stockholm',
    weatherTag: 'lugnt-vatten',
    href: '/o/grinda',
  },
  {
    slug: 'sandhamn',
    name: 'Sandhamn',
    tagline: 'Seglingscentrum i ytterskärgården',
    desc: 'Sandhamns Värdshus, Seglarhotellet, KSSS och havsutsikt. Bäst för par och seglare som vill ha full skärgårdskänsla. Trångt i juli — kom tidigt.',
    tags: ['Par', 'Seglare', 'Heldag'],
    duration: '8–10 timmar eller övernattning',
    distance: '~40 NM från Stockholm',
    weatherTag: 'vind-ok',
    href: '/o/sandhamn',
  },
  {
    slug: 'finnhamn',
    name: 'Finnhamn',
    tagline: 'Klippbad, bastu i klippan och riktig natur',
    desc: 'En av norra skärgårdens pärlor. Finnhamns Krog, vandringsstigar med utsiktspunkter och en bastu som sitter direkt i berget ovanför havet. Bra parval.',
    tags: ['Par', 'Äventyrare', 'Heldag'],
    duration: '7–9 timmar',
    distance: '~35 NM från Stockholm',
    weatherTag: 'lugnt-vatten',
    href: '/o/finnhamn',
  },
  {
    slug: 'moja',
    name: 'Möja',
    tagline: 'Bilfri ö med äkta skärgårdsstämning',
    desc: 'Möja Värdshus och Bageri, inga bilar, inga turismytor. En av de mest autentiska öarna i Stockholms skärgård. Passa på att fika vid bryggan.',
    tags: ['Par', 'Lugnt', 'Heldag'],
    duration: '7–9 timmar',
    distance: '~40 NM från Stockholm',
    weatherTag: 'lugnt-vatten',
    href: '/o/moja',
  },
  {
    slug: 'namdo',
    name: 'Nämdö',
    tagline: 'Pittoreskt och lugnt — Nämdö Krog väntar',
    desc: 'Lantlig stämning, liten befolkning och en krog som serverar husmanskost med råvaror från ön. Bra från Stavsnäs eller med egna båt från söder.',
    tags: ['Par', 'Lugnt', 'Halvdag'],
    duration: '5–7 timmar',
    distance: '~18 NM från Stavsnäs',
    weatherTag: 'lugnt-vatten',
    href: '/o/namdo',
  },
  {
    slug: 'runmaro',
    name: 'Runmarö',
    tagline: 'Avskilt och vackert — få turister',
    desc: 'En av södra skärgårdens dolda pärlor. Bra naturhamnar, klippor och lite folk. Inget värdshus att boka — ta med matsäck och njut av tystnaden.',
    tags: ['Par', 'Natur', 'Halvdag'],
    duration: '5–7 timmar',
    distance: '~12 NM från Stavsnäs',
    weatherTag: 'lugnt-vatten',
    href: '/o/runmaro',
  },
  {
    slug: 'nattaro',
    name: 'Nåttarö',
    tagline: 'Skärgårdens enda riktiga sandstrand',
    desc: 'Nåttarö Krog, snorkelspår och en sandstrand som är unik för Stockholms skärgård. Perfekt familjdag — ta Waxholmsbåten från Nynäshamn.',
    tags: ['Familj', 'Bad', 'Heldag'],
    duration: '6–8 timmar',
    distance: '~7 NM från Nynäshamn',
    weatherTag: 'soligt',
    href: '/o/nattaro',
  },
  {
    slug: 'uto',
    name: 'Utö',
    tagline: 'Cykel, klippbad och Utö Värdshus',
    desc: 'Hyra cykel och cykla runt ön, bada från klippor och avsluta med middag på Utö Värdshus. Boka bord i förväg — alltid. Gruvor och historia ingår gratis.',
    tags: ['Par', 'Äventyrare', 'Heldag'],
    duration: '8–10 timmar eller övernattning',
    distance: '~15 NM från Nynäshamn',
    weatherTag: 'soligt',
    href: '/o/uto',
  },
]

// Väderetikett → text + färg
const WEATHER_TAG: Record<DagUpplägg['weatherTag'], { label: string; color: string; bg: string }> = {
  'alltid-bra':   { label: 'Alltid bra',       color: '#15803d', bg: 'rgba(34,197,94,0.10)' },
  'lugnt-vatten': { label: 'Bäst i lugnt väder', color: '#1d4ed8', bg: 'rgba(59,130,246,0.10)' },
  'vind-ok':      { label: 'Klarar vind bra',  color: '#c05010', bg: 'rgba(217,119,6,0.10)' },
  'soligt':       { label: 'Bäst i sol',        color: '#a16207', bg: 'rgba(234,179,8,0.10)' },
}

// Dag-tag → färg
function tagColor(tag: string): { color: string; bg: string } {
  if (tag === 'Familj')     return { color: '#1e5c82', bg: 'rgba(30,92,130,0.10)' }
  if (tag === 'Par')        return { color: '#7c3aed', bg: 'rgba(124,58,237,0.09)' }
  if (tag === 'Seglare')    return { color: '#0369a1', bg: 'rgba(3,105,161,0.09)' }
  if (tag === 'Nybörjare')  return { color: '#15803d', bg: 'rgba(21,128,61,0.09)' }
  if (tag === 'Äventyrare') return { color: '#c05010', bg: 'rgba(192,80,16,0.09)' }
  if (tag === 'Halvdag')    return { color: '#666', bg: 'rgba(0,0,0,0.06)' }
  if (tag === 'Heldag')     return { color: '#444', bg: 'rgba(0,0,0,0.07)' }
  if (tag === 'Bad')        return { color: '#0e7490', bg: 'rgba(14,116,144,0.09)' }
  if (tag === 'Natur')      return { color: '#166534', bg: 'rgba(22,101,52,0.09)' }
  if (tag === 'Lugnt')      return { color: '#6b7280', bg: 'rgba(107,114,128,0.09)' }
  return { color: '#555', bg: 'rgba(0,0,0,0.06)' }
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
                href={u.href}
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
