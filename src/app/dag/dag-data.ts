// ─── Kuraterade dagsupplägg ───────────────────────────────────────────────────
// Varje upplägg är redaktionellt valt — inte algoritmgenererat.
// weatherTag: editorial bedömning av när detta upplägg funkar bäst.

export type DagUpplägg = {
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

export const UPPLÄGG: DagUpplägg[] = [
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
    desc: 'En av norra skärgårdens pärlor. Finnhamns Krog, vandrarhem i 100-årig villa och vandringsstigar till Paradisviken — en av skärgårdens finaste naturhamnar. Bra parval.',
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
    desc: 'Möja Värdshus & Bageri, Roland Svensson-museet och inga bilar — en av de mest autentiska öarna i Stockholms skärgård. Nybakt bröd från 7:00 och mat med utsikt. Passa på att fika vid bryggan i Berg.',
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
    desc: 'Naturreservat med vild klippnatur och klart vatten. Nåttarö Krog och fantastiska klippbad. Perfekt för seglare och de som vill ha riktig ytterskärgård utan turister — ta Utö Express från Nynäshamn.',
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
export const WEATHER_TAG: Record<DagUpplägg['weatherTag'], { label: string; color: string; bg: string }> = {
  'alltid-bra':   { label: 'Alltid bra',          color: '#15803d', bg: 'rgba(34,197,94,0.10)' },
  'lugnt-vatten': { label: 'Bäst i lugnt väder',  color: '#1d4ed8', bg: 'rgba(59,130,246,0.10)' },
  'vind-ok':      { label: 'Klarar vind bra',     color: '#c05010', bg: 'rgba(217,119,6,0.10)' },
  'soligt':       { label: 'Bäst i sol',           color: '#a16207', bg: 'rgba(234,179,8,0.10)' },
}

// Dag-tag → färg
export function tagColor(tag: string): { color: string; bg: string } {
  if (tag === 'Familj')     return { color: '#1e5c82', bg: 'rgba(30,92,130,0.10)' }
  if (tag === 'Par')        return { color: '#7c3aed', bg: 'rgba(124,58,237,0.09)' }
  if (tag === 'Seglare')    return { color: '#0369a1', bg: 'rgba(3,105,161,0.09)' }
  if (tag === 'Nybörjare')  return { color: '#15803d', bg: 'rgba(21,128,61,0.09)' }
  if (tag === 'Äventyrare') return { color: '#c05010', bg: 'rgba(192,80,16,0.09)' }
  if (tag === 'Halvdag')    return { color: '#666',    bg: 'rgba(0,0,0,0.06)' }
  if (tag === 'Heldag')     return { color: '#444',    bg: 'rgba(0,0,0,0.07)' }
  if (tag === 'Bad')        return { color: '#0e7490', bg: 'rgba(14,116,144,0.09)' }
  if (tag === 'Natur')      return { color: '#166534', bg: 'rgba(22,101,52,0.09)' }
  if (tag === 'Lugnt')      return { color: '#6b7280', bg: 'rgba(107,114,128,0.09)' }
  return { color: '#555', bg: 'rgba(0,0,0,0.06)' }
}
