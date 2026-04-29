/**
 * Reseplanerar-data — startpunkter och ruttning till öar.
 * Används av /utflykt för att räkna restid + visa relevanta tips.
 */

export type Departure = {
  slug: string
  name: string
  shortName: string
  lat: number
  lng: number
  description: string
  /** Vilka öar når man enklast härifrån (slug-array) */
  primaryDestinations: string[]
}

export const DEPARTURES: Departure[] = [
  {
    slug: 'strömkajen',
    name: 'Strömkajen, Stockholm',
    shortName: 'Strömkajen',
    lat: 59.3287,
    lng: 18.0791,
    description: 'Waxholmsbolagets centralhamn — startpunkt för långsamma båtar in mot mellersta och norra skärgården.',
    primaryDestinations: ['vaxholm', 'grinda', 'finnhamn', 'sandhamn', 'moja', 'svartso', 'ingmarso', 'gallno'],
  },
  {
    slug: 'stavsnäs',
    name: 'Stavsnäs vinterhamn',
    shortName: 'Stavsnäs',
    lat: 59.2747,
    lng: 18.6925,
    description: 'Snabbaste vägen ut till Sandhamn, Möja och de östra öarna. Buss eller bil från Stockholm (~1 h).',
    primaryDestinations: ['sandhamn', 'moja', 'harö', 'runmaro', 'gallno', 'svartso'],
  },
  {
    slug: 'nynäshamn',
    name: 'Nynäshamn',
    shortName: 'Nynäshamn',
    lat: 58.9031,
    lng: 17.9467,
    description: 'Söderport till skärgården. Pendeltåg från Stockholm (~1 h). Färjor till Utö, Nåttarö, Ornö.',
    primaryDestinations: ['uto', 'nattaro', 'orno', 'arsta-havsbad', 'fjardlang'],
  },
  {
    slug: 'vaxholm',
    name: 'Vaxholm hamn',
    shortName: 'Vaxholm',
    lat: 59.4022,
    lng: 18.3283,
    description: 'Skärgårdens portal. Bilfärja och pendelbåtar in mot inre och mellersta skärgården.',
    primaryDestinations: ['rindo', 'tynningö', 'ramsmora', 'grinda', 'svartso', 'ingmarso'],
  },
  {
    slug: 'arholma',
    name: 'Simpnäs / Räfsnäs',
    shortName: 'Norra ingången',
    lat: 59.8400,
    lng: 19.0500,
    description: 'Norra skärgården — Arholma, Tjockö, Söderarm. Bil till Norrtälje + 30 min.',
    primaryDestinations: ['arholma', 'tjocko', 'soderarm', 'rodloga', 'fejan'],
  },
  {
    slug: 'göteborg',
    name: 'Saltholmen, Göteborg',
    shortName: 'Saltholmen',
    lat: 57.6740,
    lng: 11.8500,
    description: 'Bohusläns sydligaste ingång — färjor till Brännö, Styrsö, Vrångö och Donsö.',
    primaryDestinations: ['donsö', 'styrsö', 'brännö', 'vrångö'],
  },
  {
    slug: 'lysekil',
    name: 'Lysekil',
    shortName: 'Lysekil',
    lat: 58.2725,
    lng: 11.4344,
    description: 'Mellersta Bohusläns hjärta. Färjor till Skaftö, Smögen och norra Bohusläns ytterskärgård.',
    primaryDestinations: ['lysekil', 'smogen', 'grundsund', 'fiskebackskil', 'kungshamn'],
  },
]

export function getDeparture(slug: string): Departure | undefined {
  return DEPARTURES.find(d => d.slug === slug)
}

/**
 * Approximerad restid med Haversine-distans (lat/lng) → min med 22 knop snitt.
 * Returnerar null om ön saknar koordinater.
 */
export function approximateTravelMinutes(
  fromLat: number, fromLng: number,
  toLat: number | undefined, toLng: number | undefined
): number | null {
  if (toLat == null || toLng == null) return null
  const R = 6371 // km
  const toRad = (deg: number) => deg * Math.PI / 180
  const dLat = toRad(toLat - fromLat)
  const dLng = toRad(toLng - fromLng)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(fromLat)) * Math.cos(toRad(toLat)) * Math.sin(dLng / 2) ** 2
  const distanceKm = 2 * R * Math.asin(Math.sqrt(a))
  // Båtsnitt: 22 knop = ~40 km/h. Ger en GROVT uppskattat tid (verklig tid varierar med stoppmönster).
  const hours = distanceKm / 40
  return Math.round(hours * 60)
}

/**
 * Säsong-baserad packlista — vad behövs vid den här tiden på året.
 */
export function packingForSeason(month: number): string[] {
  // Vinter
  if (month <= 2 || month === 12) {
    return [
      'Ordentliga vinterkängor + termobyxor',
      'Mössa + halsduk + vantar (det blåser ute på sjön)',
      'Termoflaska med varmt',
      'Stark ficklampa — det blir mörkt 15:30',
      'Reservbatteri till mobilen (kyla tar batteri)',
      'Boka boende inomhus — inte alla öar har vinteröppet',
    ]
  }
  // Tidig vår
  if (month >= 3 && month <= 4) {
    return [
      'Vindtät jacka + lager (temperaturen kan svänga 10°C)',
      'Vattentät kängor — leriga stigar',
      'Solglasögon (vårsolen är bländande)',
      'Termoflaska med varmt — ute är det fortfarande svalt',
      'Kolla färjetiderna — många avgångar är glesare än sommartid',
    ]
  }
  // Sommar
  if (month >= 5 && month <= 8) {
    return [
      'Solkräm SPF 30+ (vatten reflekterar)',
      'Solglasögon + keps/hatt',
      'Badkläder + handduk',
      'Vattenflaska (1 L per person)',
      'Myggmedel (juli–augusti)',
      'Lättare regnjacka — vädret kan slå om',
      'Bekväma skor som tål klippor',
    ]
  }
  // Höst
  return [
    'Vindtät + regnjacka',
    'Vatten- och vindtäta skor',
    'Lager du kan ta av (lufttemperaturen växlar)',
    'Termos med varmt',
    'Pannlampa — det skymmer tidigt',
    'Boka — många restauranger stänger efter september',
  ]
}

export function seasonLabel(month: number): string {
  if (month <= 2 || month === 12) return 'Vinter'
  if (month >= 3 && month <= 4) return 'Tidig vår'
  if (month >= 5 && month <= 8) return 'Sommar'
  return 'Höst'
}
