/**
 * Delningsmallar för en tur (2026-10-26, Thomas: "jagar samma kvalité" som Stravas delning).
 *
 * Två sorters bilder ur /api/og/share/tur/[id]?style=<id>:
 * - kort: hel 9:16-bild (bild, karta), som förut.
 * - klistermärke: genomskinlig PNG (rutt, tal, rutt-tal, delstrackor) som läggs
 *   ovanpå användarens egen bild i Instagram-storyn.
 *
 * Ren logik utan React, så att den går att testa och delas av API-rutten och
 * delningsrutan (TripShareModal).
 */

export type StilId = 'photo' | 'map' | 'rutt' | 'tal' | 'rutt-tal' | 'delstrackor'

/**
 * Höj när bildernas utseende ändras i kod. Ingår i serverns cachenyckel
 * (route.tsx) och i bildernas URL från delningsrutan, så att varken Vercels
 * datacache eller webbläsarens cache (max-age 3600) visar ett gammalt kort.
 * 2026-10-26: efter #500 visade Thomas Chrome det gamla kartkortet i en timme.
 */
export const BILD_VERSION = '2026-10-27a'

export type Stil = {
  id: StilId
  namn: string
  /** Kort förklaring i delningsrutan */
  beskrivning: string
  bredd: number
  hojd: number
  /** Genomskinlig bakgrund: läggs ovanpå egen bild */
  klistermarke: boolean
  /** Vad turen måste ha för att mallen ska finnas */
  kraver: 'inget' | 'bild' | 'rutt' | 'punkter'
}

export const STILAR: Stil[] = [
  { id: 'photo',       namn: 'Bild',         beskrivning: 'Din bild med plats och tal.',            bredd: 1080, hojd: 1920, klistermarke: false, kraver: 'bild' },
  { id: 'map',         namn: 'Karta',        beskrivning: 'Kartan med rutten, plats och tal.',      bredd: 1080, hojd: 1920, klistermarke: false, kraver: 'rutt' },
  { id: 'rutt',        namn: 'Rutt',         beskrivning: 'Bara rutten, på din egen bild.',         bredd: 1080, hojd: 1080, klistermarke: true,  kraver: 'rutt' },
  { id: 'tal',         namn: 'Tal',          beskrivning: 'Distans, tid och fart, på din egen bild.', bredd: 1080, hojd: 1080, klistermarke: true,  kraver: 'inget' },
  { id: 'rutt-tal',    namn: 'Rutt + tal',   beskrivning: 'Plats, rutt och tal, på din egen bild.', bredd: 1080, hojd: 1350, klistermarke: true,  kraver: 'rutt' },
  { id: 'delstrackor', namn: 'Delsträckor',  beskrivning: 'Snittfart per sjömil, på din egen bild.', bredd: 1080, hojd: 1350, klistermarke: true,  kraver: 'punkter' },
]

export function arStil(s: string | null | undefined): s is StilId {
  return !!s && STILAR.some(x => x.id === s)
}

export function stil(id: StilId): Stil {
  return STILAR.find(x => x.id === id)!
}

/**
 * Vilka mallar som går att göra för en tur. `agare` styr delsträckorna: GPS-
 * punkterna läses bara av ägaren (RLS gps_select_own), så andra får inte den.
 */
export function tillgangligaStilar(t: { harBild: boolean; harRutt: boolean; agare: boolean; harPunkter?: boolean }): Stil[] {
  return STILAR.filter(s => {
    if (s.kraver === 'bild') return t.harBild
    if (s.kraver === 'rutt') return t.harRutt
    if (s.kraver === 'punkter') return t.agare && t.harRutt && t.harPunkter !== false
    return true
  })
}

/** Förvald mall: bild om det finns, annars karta, annars tal. En tur utan bild får inget Bild-kort (2026-10-26). */
export function forvaldStil(t: { harBild: boolean; harRutt: boolean }): StilId {
  if (t.harBild) return 'photo'
  if (t.harRutt) return 'map'
  return 'tal'
}

export type Punkt = { lat: number; lng: number }

/** Avstånd i meter mellan två punkter (haversine). */
export function avstandM(a: Punkt, b: Punkt): number {
  const R = 6371000
  const dLat = (b.lat - a.lat) * Math.PI / 180, dLng = (b.lng - a.lng) * Math.PI / 180
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

/**
 * Duger rutten att visa? Minst två punkter och minst `minM` meter mellan
 * ytterpunkterna. 2026-10-26: Thomas provade en story med en testtur där start
 * och stopp låg på samma plats; kortet ritade då en gatukarta i kvartersskala
 * med en ensam prick. En sådan tur får kort utan karta och inga ruttmallar.
 */
export function ruttArAnvandbar(pts: Punkt[] | null | undefined, minM = 150): pts is Punkt[] {
  if (!Array.isArray(pts) || pts.length < 2) return false
  const lats = pts.map(p => p.lat), lngs = pts.map(p => p.lng)
  const sw = { lat: Math.min(...lats), lng: Math.min(...lngs) }
  const ne = { lat: Math.max(...lats), lng: Math.max(...lngs) }
  return avstandM(sw, ne) >= minM
}

/** "25 oktober 2026" i svensk tid, eller null om datumet saknas eller är trasigt. */
export function datumLang(iso: string | null | undefined): string | null {
  if (!iso) return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  return new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Stockholm' }).format(d)
}

/** Rubrik på kortet när turen saknar platsnamn. */
export function turRubrik(boatType: string | null | undefined): string {
  if (boatType === 'Segelbåt') return 'Segeltur'
  if (boatType === 'Kajak') return 'Paddeltur'
  if (boatType === 'Motorbåt') return 'Båttur'
  return 'Tur på sjön'
}

/**
 * SVG-path för rutten inom en ruta W×H med marginalen pad (andel av sidan).
 * Proportionerna behålls: en lång smal rutt blir inte uttänjd. Latitud
 * korrigeras med cos(lat) så att nord–syd och öst–väst får samma skala.
 */
export function ruttPath(pts: Punkt[], W: number, H: number, pad = 0.12, maxPunkter = 200): string {
  if (pts.length < 2) return ''
  const lat0 = pts.reduce((s, p) => s + p.lat, 0) / pts.length
  const kx = Math.cos(lat0 * Math.PI / 180)
  const xs = pts.map(p => p.lng * kx), ys = pts.map(p => p.lat)
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys), maxY = Math.max(...ys)
  const spanX = maxX - minX || 1e-6, spanY = maxY - minY || 1e-6
  const iw = W * (1 - 2 * pad), ih = H * (1 - 2 * pad)
  const skala = Math.min(iw / spanX, ih / spanY)
  const ox = (W - spanX * skala) / 2, oy = (H - spanY * skala) / 2
  const steg = Math.max(1, Math.floor(pts.length / maxPunkter))
  const urval = pts.filter((_, i) => i % steg === 0 || i === pts.length - 1)
  return urval.map((p, i) => {
    const x = ox + (p.lng * kx - minX) * skala
    const y = H - (oy + (p.lat - minY) * skala)
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
}

export function ruttStartSlut(pts: Punkt[], W: number, H: number, pad = 0.12): { start: [number, number]; slut: [number, number] } | null {
  if (pts.length < 2) return null
  const d = ruttPath([pts[0]!, ...pts.slice(1)], W, H, pad, pts.length)
  const delar = d.split(' ')
  // "M x y L x y ... L x y"
  const start: [number, number] = [parseFloat(delar[1]!), parseFloat(delar[2]!)]
  const slut: [number, number] = [parseFloat(delar[delar.length - 2]!), parseFloat(delar[delar.length - 1]!)]
  return { start, slut }
}

/** "12 min", "1 h 5 min", "47 s" */
export function formatTid(sekunder: number): string {
  const s = Math.max(0, Math.round(sekunder))
  if (s < 60) return `${s} s`
  const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60)
  if (h > 0) return m > 0 ? `${h} h ${m} min` : `${h} h`
  return `${m} min`
}

/** "2:43" för en delsträcka (m:ss), "1:02:03" över en timme */
export function formatDelTid(sekunder: number): string {
  const s = Math.max(0, Math.round(sekunder))
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}` : `${m}:${String(r).padStart(2, '0')}`
}

export type Stapel = { etikett: string; tid: string; fart: string; andel: number }

/** Staplar för delsträcksmallen: bredden i andel av den snabbaste. Högst 12 staplar. */
export function delstrackStaplar(splits: { index: number; distanceNM: number; seconds: number; avgKnots: number }[], max = 12): Stapel[] {
  const urval = splits.slice(0, max)
  const topp = Math.max(0.1, ...urval.map(s => s.avgKnots))
  return urval.map(s => ({
    etikett: s.distanceNM < 0.995 ? `${s.index} (${s.distanceNM.toFixed(2).replace('.', ',')})` : String(s.index),
    tid: formatDelTid(s.seconds),
    fart: `${s.avgKnots.toFixed(1)} kn`,
    andel: Math.max(0.06, s.avgKnots / topp),
  }))
}

/** Talen som visas på klistermärkena, i den ordning de har plats. */
export function talRutor(t: { distanceNM: number | null; sekunder: number | null; toppKn: number | null; snittKn: number | null }): { val: string; enhet: string; etikett: string }[] {
  const ut: { val: string; enhet: string; etikett: string }[] = []
  if (t.distanceNM !== null && t.distanceNM >= 0.1) ut.push({ val: t.distanceNM.toFixed(1), enhet: 'NM', etikett: 'DISTANS' })
  if (t.sekunder !== null && t.sekunder >= 60) ut.push({ val: formatTid(t.sekunder), enhet: '', etikett: 'TID' })
  if (t.toppKn !== null && t.toppKn >= 0.1) ut.push({ val: t.toppKn.toFixed(1), enhet: 'kn', etikett: 'TOPPFART' })
  else if (t.snittKn !== null && t.snittKn >= 0.1) ut.push({ val: t.snittKn.toFixed(1), enhet: 'kn', etikett: 'SNITTFART' })
  return ut
}
