/**
 * planner-client.ts — client-safe subset of planner.ts
 *
 * No seaPathfinder / landMask / swedish-coastline.json dependency.
 * Import from here in 'use client' components.
 */

export type Interest = 'krog' | 'bastu' | 'bad' | 'brygga' | 'natur' | 'bensin'

export type Departure = {
  id: string
  name: string
  lat: number
  lng: number
  region: string
  emoji: string
}

const DEG_TO_RAD = Math.PI / 180
const EARTH_R_KM = 6371

function toRad(deg: number) { return deg * DEG_TO_RAD }

export function haversineKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_R_KM * Math.asin(Math.sqrt(a))
}

/**
 * Avgångshamnar — omarbetad lista maj 2026.
 *
 * Tidigare lista hade 25 hamnar och saknade Mälaren-sidan helt + flera
 * vanliga seglarstartpunkter (Saltsjöbaden, Bosön, Ingmarsö, Trosa m.fl.).
 *
 * Regions-grupperna används som rubriker i UI:
 *   - Mälaren        — Stockholm väst + Mälarens öar
 *   - Stockholm      — central + Saltsjön nära staden
 *   - Lidingö        — Lidingö-hamnar
 *   - Innerskärgård  — Vaxholm-Boo-Saltsjöbaden
 *   - Mellanskärgård — Möja, Sandhamn-bältet
 *   - Södra          — Dalarö och söderöver
 *   - Norra          — Norrtälje + Roslagskusten
 *
 * Koordinater verifierade mot Google Maps. Avrundade till 4 decimaler
 * (~11m precision) — räcker som startpunkt för rutt-planering.
 */
export const DEPARTURES: Departure[] = [
  // ── Mälaren (helt nytt — saknades innan) ──────────────────────────────────
  { id: 'stadshuskajen',  name: 'Stadshuskajen',     lat: 59.3275, lng: 18.0537, region: 'Mälaren', emoji: '' },
  { id: 'riddarholmen',   name: 'Riddarholmen',      lat: 59.3238, lng: 18.0666, region: 'Mälaren', emoji: '' },
  { id: 'malarhojden',    name: 'Mälarhöjden',       lat: 59.3, lng: 17.95, region: 'Mälaren', emoji: '' },
  { id: 'grondal',        name: 'Gröndal',           lat: 59.3128, lng: 18.0010, region: 'Mälaren', emoji: '' },
  { id: 'lambaro',        name: 'Lambarö',           lat: 59.3645, lng: 17.8056, region: 'Mälaren', emoji: '' },
  { id: 'lovo',           name: 'Lovö',              lat: 59.3308, lng: 17.8500, region: 'Mälaren', emoji: '' },
  { id: 'tappstrom',      name: 'Tappström',         lat: 59.2925, lng: 17.8115, region: 'Mälaren', emoji: '' },
  { id: 'ekero',          name: 'Ekerö',             lat: 59.2798, lng: 17.7902, region: 'Mälaren', emoji: '' },
  { id: 'slagsta',        name: 'Slagsta',           lat: 59.2597, lng: 17.848, region: 'Mälaren', emoji: '' },
  { id: 'maelaren-skarven', name: 'Färentuna (Skarven)', lat: 59.3933, lng: 17.6624, region: 'Mälaren', emoji: '' },

  // ── Stockholm (central + Saltsjön) ────────────────────────────────────────
  { id: 'stromkajen',     name: 'Strömkajen',        lat: 59.3289, lng: 18.0761, region: 'Stockholm', emoji: '' },
  { id: 'saltsjoqvarn',   name: 'Saltsjöqvarn',      lat: 59.3157, lng: 18.1080, region: 'Stockholm', emoji: '' },
  { id: 'hammarby-sjostad', name: 'Hammarby Sjöstad', lat: 59.3047, lng: 18.1058, region: 'Stockholm', emoji: '' },
  { id: 'frihamnen',      name: 'Frihamnen',         lat: 59.3434, lng: 18.119, region: 'Stockholm', emoji: '' },
  { id: 'vartahamnen',    name: 'Värtahamnen',       lat: 59.3520, lng: 18.1180, region: 'Stockholm', emoji: '' },
  { id: 'nacka-strand',   name: 'Nacka Strand',      lat: 59.3183, lng: 18.1601, region: 'Stockholm', emoji: '' },
  { id: 'gustavsberg',    name: 'Gustavsberg',       lat: 59.3144, lng: 18.3985, region: 'Stockholm', emoji: '' },

  // ── Lidingö ───────────────────────────────────────────────────────────────
  { id: 'boson',          name: 'Bosön',             lat: 59.3808, lng: 18.177, region: 'Lidingö', emoji: '' },
  { id: 'kappala',        name: 'Käppala',           lat: 59.3529, lng: 18.2183, region: 'Lidingö', emoji: '' },
  { id: 'gashaga',        name: 'Gåshaga',           lat: 59.3571, lng: 18.2296, region: 'Lidingö', emoji: '' },

  // ── Innerskärgård (Vaxholm – Saltsjöbaden) ────────────────────────────────
  { id: 'saltsjobaden',   name: 'Saltsjöbaden',      lat: 59.2787, lng: 18.3111, region: 'Innerskärgård', emoji: '' },
  { id: 'boo',            name: 'Boo',               lat: 59.3307, lng: 18.2867, region: 'Innerskärgård', emoji: '' },
  { id: 'vaxholm',        name: 'Vaxholm',           lat: 59.4033, lng: 18.3264, region: 'Innerskärgård', emoji: '' },
  { id: 'resaroe',        name: 'Resarö',            lat: 59.4288, lng: 18.3356, region: 'Innerskärgård', emoji: '' },
  { id: 'rindo',          name: 'Rindö',             lat: 59.3961, lng: 18.4009, region: 'Innerskärgård', emoji: '' },
  { id: 'ljustero',       name: 'Ljusterö',          lat: 59.5061, lng: 18.5969, region: 'Innerskärgård', emoji: '' },
  { id: 'svartso',        name: 'Svartsö',           lat: 59.4531, lng: 18.6842, region: 'Innerskärgård', emoji: '' },
  { id: 'ingmarso',       name: 'Ingmarsö',          lat: 59.4737, lng: 18.7694, region: 'Innerskärgård', emoji: '' },
  { id: 'grinda',         name: 'Grinda',            lat: 59.4111, lng: 18.563, region: 'Innerskärgård', emoji: '' },
  { id: 'finnhamn',       name: 'Finnhamn',          lat: 59.4775, lng: 18.8156, region: 'Innerskärgård', emoji: '' },

  // ── Mellanskärgård (Möja, Sandhamn-bältet) ────────────────────────────────
  { id: 'ingaro',         name: 'Ingarö',            lat: 59.2552, lng: 18.4777, region: 'Mellanskärgård', emoji: '' },
  { id: 'stavsnäs',       name: 'Stavsnäs',          lat: 59.2912, lng: 18.6905, region: 'Mellanskärgård', emoji: '' },
  { id: 'runmaro',        name: 'Runmarö',           lat: 59.2769, lng: 18.7743, region: 'Mellanskärgård', emoji: '' },
  { id: 'namdo',          name: 'Nämdö',             lat: 59.1833, lng: 18.6833, region: 'Mellanskärgård', emoji: '' },
  { id: 'husaro',         name: 'Husarö',            lat: 59.5067, lng: 18.8472, region: 'Mellanskärgård', emoji: '' },
  { id: 'möja',           name: 'Möja',              lat: 59.4266, lng: 18.8861, region: 'Mellanskärgård', emoji: '' },
  { id: 'ramsmora',       name: 'Ramsmora (Möja)',   lat: 59.4269, lng: 18.9094, region: 'Mellanskärgård', emoji: '' },
  { id: 'sandhamn',       name: 'Sandhamn',          lat: 59.2879, lng: 18.9108, region: 'Mellanskärgård', emoji: '' },

  // ── Södra (Dalarö och söder) ──────────────────────────────────────────────
  { id: 'smadalaroe',     name: 'Smådalarö',         lat: 59.1619, lng: 18.4446, region: 'Södra', emoji: '' },
  { id: 'dalaroe',        name: 'Dalarö',            lat: 59.1353, lng: 18.4106, region: 'Södra', emoji: '' },
  { id: 'galo',           name: 'Gålö',              lat: 59.0914, lng: 18.2814, region: 'Södra', emoji: '' },
  { id: 'orno',           name: 'Ornö',              lat: 59.0582, lng: 18.4006, region: 'Södra', emoji: '' },
  { id: 'uto',            name: 'Utö',               lat: 58.9361, lng: 18.2503, region: 'Södra', emoji: '' },
  { id: 'fjardlang',      name: 'Fjärdlång',         lat: 59.0371, lng: 18.5233, region: 'Södra', emoji: '' },
  { id: 'nynashamn',      name: 'Nynäshamn',         lat: 58.9038, lng: 17.9475, region: 'Södra', emoji: '' },
  { id: 'nattaro',        name: 'Nåttarö',           lat: 58.8717, lng: 18.1203, region: 'Södra', emoji: '' },
  { id: 'haringe',        name: 'Häringe (Sorunda)', lat: 59.0393, lng: 18.0142, region: 'Södra', emoji: '' },
  { id: 'ankarudden',     name: 'Ankarudden (Torö)', lat: 58.8019, lng: 17.8356, region: 'Södra', emoji: '' },
  { id: 'landsort',       name: 'Landsort',          lat: 58.7440, lng: 17.8640, region: 'Södra', emoji: '' },
  { id: 'morko',          name: 'Mörkö',             lat: 59.0050, lng: 17.6400, region: 'Södra', emoji: '' },
  { id: 'trosa',          name: 'Trosa',             lat: 58.9027, lng: 17.5495, region: 'Södra', emoji: '' },

  // ── Norra (Roslagen) ──────────────────────────────────────────────────────
  { id: 'sollenkroka',    name: 'Sollenkroka',       lat: 59.3706, lng: 18.6984, region: 'Norra', emoji: '' },
  { id: 'norrtälje',      name: 'Norrtälje',         lat: 59.7579, lng: 18.7077, region: 'Norra', emoji: '' },
  { id: 'graddo',         name: 'Gräddö',            lat: 59.7625, lng: 19.0366, region: 'Norra', emoji: '' },
  { id: 'furusund',       name: 'Furusund',          lat: 59.6653, lng: 18.9217, region: 'Norra', emoji: '' },
  { id: 'blido',          name: 'Blidö',             lat: 59.6183, lng: 18.9096, region: 'Norra', emoji: '' },
  { id: 'yxlan',          name: 'Yxlan',             lat: 59.6126, lng: 18.8472, region: 'Norra', emoji: '' },
  { id: 'lido',           name: 'Lidö',              lat: 59.7786, lng: 19.0744, region: 'Norra', emoji: '' },
  { id: 'tjocko',         name: 'Tjockö',            lat: 59.7482, lng: 19.1314, region: 'Norra', emoji: '' },
  { id: 'rodloga',        name: 'Rödlöga',           lat: 59.592, lng: 19.1654, region: 'Norra', emoji: '' },
  { id: 'kapellskar',     name: 'Kapellskär',        lat: 59.7189, lng: 19.0658, region: 'Norra', emoji: '' },
  { id: 'arholma',        name: 'Arholma',           lat: 59.8532, lng: 19.1345, region: 'Norra', emoji: '' },
  { id: 'singo',          name: 'Singö',             lat: 60.1768, lng: 18.7548, region: 'Norra', emoji: '' },
  { id: 'grisslehamn',    name: 'Grisslehamn',       lat: 60.0961, lng: 18.8058, region: 'Norra', emoji: '' },
  { id: 'soderarm',       name: 'Söderarm fyr',      lat: 59.7527, lng: 19.1274, region: 'Norra', emoji: '' },
]
