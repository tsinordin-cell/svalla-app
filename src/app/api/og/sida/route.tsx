import { ritaOgKort } from '../_mall/kort'

export const runtime = 'nodejs'
export const revalidate = 86400

/**
 * Delningsbild för sidor utan egen bild (/karta, /oar, /guider, regionsidor …):
 * standardmallen med sidans egen rubrik och beskrivning. Ny 2026-11-19.
 *
 * Texten hämtas ur sidans egna metataggar (og:title, og:description) på
 * svalla.se, aldrig ur adressen. Då kan ingen rita en Svalla-bild med valfri
 * text genom att ändra parametrarna. Går sidan inte att läsa blir det
 * standardbilden.
 */

const ETIKETT: Record<string, string> = {
  oar: 'Öar', guider: 'Guider', guide: 'Guide', aktivitet: 'Aktiviteter', aktiviteter: 'Aktiviteter',
  boende: 'Boende', 'krogar-och-mat': 'Krogar och mat', sasong: 'Säsong', julkalender: 'Julkalender',
  u: 'Profil', forum: 'Forum', rutter: 'Rutter', segelrutter: 'Rutter', karta: 'Karta',
  aland: 'Åland', bohuslan: 'Bohuslän', gotland: 'Gotland', goteborg: 'Göteborgs skärgård',
  'goteborg-skargard': 'Göteborgs skärgård', halland: 'Halland', 'hoga-kusten': 'Höga kusten',
  oland: 'Öland', 'blekinge-skargard': 'Blekinge skärgård', malaren: 'Mälaren',
  'stockholms-skargard': 'Stockholms skärgård', farjor: 'Båtar och färjor', 'ta-dig-till': 'Ta dig till',
  vintertidtabeller: 'Båtar och färjor', 'hyra-bat': 'Hyra båt', segelkurs: 'Segelkurs',
  naturhamnar: 'Naturhamnar', 'hamnar-och-bryggor': 'Hamnar', teambuilding: 'Teambuilding',
  resetips: 'Resetips', upplevelser: 'Upplevelser', faq: 'Frågor och svar', om: 'Om Svalla',
}

function avkoda(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
}

function meta(html: string, egenskap: string): string | null {
  const m = html.match(new RegExp(`<meta[^>]+(?:property|name)="${egenskap}"[^>]+content="([^"]*)"`, 'i'))
    ?? html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:property|name)="${egenskap}"`, 'i'))
  return m ? avkoda(m[1]!) : null
}

const STANDARD = { rubrik: 'Planera din skärgårdsvistelse', ingress: 'Öar, krogar, badplatser och båttider, samlat på ett ställe.' }

export async function GET(req: Request) {
  const p = new URL(req.url).searchParams.get('p') ?? ''
  if (!/^\/[^/]/.test(p) || p.length > 300 || p.startsWith('/api/') || /[\s<>"]/.test(p)) {
    return ritaOgKort(STANDARD)
  }

  let html = ''
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 6000)
    const res = await fetch(`https://svalla.se${p}`, { signal: ctrl.signal, next: { revalidate: 86400 } })
    clearTimeout(t)
    if (res.ok) html = await res.text()
  } catch { /* standardbilden nedan */ }

  const titel = meta(html, 'og:title') ?? (html.match(/<title>([^<]*)<\/title>/i)?.[1] ? avkoda(html.match(/<title>([^<]*)<\/title>/i)![1]!) : null)
  if (!titel) return ritaOgKort(STANDARD)

  // "Karta över Stockholms skärgård | Svalla" → "Karta över Stockholms skärgård"
  const rubrik = titel.replace(/\s*[|–—-]\s*Svalla.*$/i, '').trim() || STANDARD.rubrik
  const segment = decodeURIComponent(p.split('/')[1] ?? '')
  return ritaOgKort({
    etikett: ETIKETT[segment] ?? null,
    rubrik,
    ingress: meta(html, 'og:description') ?? meta(html, 'description'),
    adress: `svalla.se${p}`.length <= 38 ? `svalla.se${p}` : 'svalla.se',
  })
}
