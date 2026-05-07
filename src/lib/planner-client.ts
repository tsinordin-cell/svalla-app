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
  { id: 'malarhojden',    name: 'Mälarhöjden',       lat: 59.2940, lng: 17.9580, region: 'Mälaren', emoji: '' },
  { id: 'grondal',        name: 'Gröndal',           lat: 59.3128, lng: 18.0010, region: 'Mälaren', emoji: '' },
  { id: 'lambaro',        name: 'Lambarö',           lat: 59.3470, lng: 17.8770, region: 'Mälaren', emoji: '' },
  { id: 'lovo',           name: 'Lovö',              lat: 59.3308, lng: 17.8500, region: 'Mälaren', emoji: '' },
  { id: 'tappstrom',      name: 'Tappström',         lat: 59.2780, lng: 17.8050, region: 'Mälaren', emoji: '' },
  { id: 'ekero',          name: 'Ekerö',             lat: 59.2820, lng: 17.8260, region: 'Mälaren', emoji: '' },
  { id: 'slagsta',        name: 'Slagsta',           lat: 59.2475, lng: 17.8350, region: 'Mälaren', emoji: '' },
  { id: 'maelaren-skarven', name: 'Färentuna (Skarven)', lat: 59.4023, lng: 17.7870, region: 'Mälaren', emoji: '' },

  // ── Stockholm (central + Saltsjön) ────────────────────────────────────────
  { id: 'stromkajen',     name: 'Strömkajen',        lat: 59.3238, lng: 18.0776, region: 'Stockholm', emoji: '' },
  { id: 'saltsjoqvarn',   name: 'Saltsjöqvarn',      lat: 59.3157, lng: 18.1080, region: 'Stockholm', emoji: '' },
  { id: 'hammarby-sjostad', name: 'Hammarby Sjöstad', lat: 59.3047, lng: 18.1058, region: 'Stockholm', emoji: '' },
  { id: 'frihamnen',      name: 'Frihamnen',         lat: 59.3490, lng: 18.1090, region: 'Stockholm', emoji: '' },
  { id: 'vartahamnen',    name: 'Värtahamnen',       lat: 59.3520, lng: 18.1180, region: 'Stockholm', emoji: '' },
  { id: 'nacka-strand',   name: 'Nacka Strand',      lat: 59.3195, lng: 18.1454, region: 'Stockholm', emoji: '' },
  { id: 'gustavsberg',    name: 'Gustavsberg',       lat: 59.3283, lng: 18.3820, region: 'Stockholm', emoji: '' },

  // ── Lidingö ───────────────────────────────────────────────────────────────
  { id: 'boson',          name: 'Bosön',             lat: 59.3640, lng: 18.1830, region: 'Lidingö', emoji: '' },
  { id: 'kappala',        name: 'Käppala',           lat: 59.3563, lng: 18.2450, region: 'Lidingö', emoji: '' },
  { id: 'gashaga',        name: 'Gåshaga',           lat: 59.3460, lng: 18.2330, region: 'Lidingö', emoji: '' },

  // ── Innerskärgård (Vaxholm – Saltsjöbaden) ────────────────────────────────
  { id: 'saltsjobaden',   name: 'Saltsjöbaden',      lat: 59.2860, lng: 18.3100, region: 'Innerskärgård', emoji: '' },
  { id: 'boo',            name: 'Boo',               lat: 59.3140, lng: 18.2780, region: 'Innerskärgård', emoji: '' },
  { id: 'vaxholm',        name: 'Vaxholm',           lat: 59.4024, lng: 18.3512, region: 'Innerskärgård', emoji: '' },
  { id: 'resaroe',        name: 'Resarö',            lat: 59.4333, lng: 18.3833, region: 'Innerskärgård', emoji: '' },
  { id: 'rindo',          name: 'Rindö',             lat: 59.3833, lng: 18.4000, region: 'Innerskärgård', emoji: '' },
  { id: 'ljustero',       name: 'Ljusterö',          lat: 59.5540, lng: 18.6870, region: 'Innerskärgård', emoji: '' },
  { id: 'svartso',        name: 'Svartsö',           lat: 59.4730, lng: 18.7250, region: 'Innerskärgård', emoji: '' },
  { id: 'ingmarso',       name: 'Ingmarsö',          lat: 59.4982, lng: 18.7820, region: 'Innerskärgård', emoji: '' },
  { id: 'grinda',         name: 'Grinda',            lat: 59.4602, lng: 18.7167, region: 'Innerskärgård', emoji: '' },
  { id: 'finnhamn',       name: 'Finnhamn',          lat: 59.5430, lng: 18.8240, region: 'Innerskärgård', emoji: '' },

  // ── Mellanskärgård (Möja, Sandhamn-bältet) ────────────────────────────────
  { id: 'ingaro',         name: 'Ingarö',            lat: 59.2472, lng: 18.5861, region: 'Mellanskärgård', emoji: '' },
  { id: 'stavsnäs',       name: 'Stavsnäs',          lat: 59.1895, lng: 18.6823, region: 'Mellanskärgård', emoji: '' },
  { id: 'runmaro',        name: 'Runmarö',           lat: 59.2615, lng: 18.7847, region: 'Mellanskärgård', emoji: '' },
  { id: 'namdo',          name: 'Nämdö',             lat: 59.1500, lng: 18.6970, region: 'Mellanskärgård', emoji: '' },
  { id: 'husaro',         name: 'Husarö',            lat: 59.5195, lng: 18.9840, region: 'Mellanskärgård', emoji: '' },
  { id: 'möja',           name: 'Möja',              lat: 59.4545, lng: 18.9110, region: 'Mellanskärgård', emoji: '' },
  { id: 'ramsmora',       name: 'Ramsmora (Möja)',   lat: 59.4830, lng: 18.9230, region: 'Mellanskärgård', emoji: '' },
  { id: 'sandhamn',       name: 'Sandhamn',          lat: 59.2820, lng: 18.9130, region: 'Mellanskärgård', emoji: '' },

  // ── Södra (Dalarö och söder) ──────────────────────────────────────────────
  { id: 'smadalaroe',     name: 'Smådalarö',         lat: 59.1283, lng: 18.3783, region: 'Södra', emoji: '' },
  { id: 'dalaroe',        name: 'Dalarö',            lat: 59.1298, lng: 18.4003, region: 'Södra', emoji: '' },
  { id: 'galo',           name: 'Gålö',              lat: 59.0167, lng: 17.9833, region: 'Södra', emoji: '' },
  { id: 'orno',           name: 'Ornö',              lat: 58.9773, lng: 18.4550, region: 'Södra', emoji: '' },
  { id: 'uto',            name: 'Utö',               lat: 58.9590, lng: 18.3017, region: 'Södra', emoji: '' },
  { id: 'fjardlang',      name: 'Fjärdlång',         lat: 58.9333, lng: 17.8833, region: 'Södra', emoji: '' },
  { id: 'nynashamn',      name: 'Nynäshamn',         lat: 58.9038, lng: 17.9475, region: 'Södra', emoji: '' },
  { id: 'nattaro',        name: 'Nåttarö',           lat: 58.8455, lng: 17.8742, region: 'Södra', emoji: '' },
  { id: 'haringe',        name: 'Häringe (Sorunda)', lat: 58.9870, lng: 17.9890, region: 'Södra', emoji: '' },
  { id: 'ankarudden',     name: 'Ankarudden (Torö)', lat: 58.7920, lng: 17.7800, region: 'Södra', emoji: '' },
  { id: 'landsort',       name: 'Landsort',          lat: 58.7440, lng: 17.8640, region: 'Södra', emoji: '' },
  { id: 'morko',          name: 'Mörkö',             lat: 59.0050, lng: 17.6400, region: 'Södra', emoji: '' },
  { id: 'trosa',          name: 'Trosa',             lat: 58.8970, lng: 17.5500, region: 'Södra', emoji: '' },

  // ── Norra (Roslagen) ──────────────────────────────────────────────────────
  { id: 'sollenkroka',    name: 'Sollenkroka',       lat: 59.7050, lng: 18.8090, region: 'Norra', emoji: '' },
  { id: 'norrtälje',      name: 'Norrtälje',         lat: 59.7579, lng: 18.7077, region: 'Norra', emoji: '' },
  { id: 'graddo',         name: 'Gräddö',            lat: 59.6700, lng: 18.7100, region: 'Norra', emoji: '' },
  { id: 'furusund',       name: 'Furusund',          lat: 59.6653, lng: 18.9217, region: 'Norra', emoji: '' },
  { id: 'blido',          name: 'Blidö',             lat: 59.6200, lng: 18.8700, region: 'Norra', emoji: '' },
  { id: 'yxlan',          name: 'Yxlan',             lat: 59.6240, lng: 18.8000, region: 'Norra', emoji: '' },
  { id: 'lido',           name: 'Lidö',              lat: 59.5410, lng: 18.9410, region: 'Norra', emoji: '' },
  { id: 'tjocko',         name: 'Tjockö',            lat: 59.7100, lng: 18.9700, region: 'Norra', emoji: '' },
  { id: 'rodloga',        name: 'Rödlöga',           lat: 59.8180, lng: 19.0650, region: 'Norra', emoji: '' },
  { id: 'kapellskar',     name: 'Kapellskär',        lat: 59.7245, lng: 19.0740, region: 'Norra', emoji: '' },
  { id: 'arholma',        name: 'Arholma',           lat: 59.8532, lng: 19.1345, region: 'Norra', emoji: '' },
  { id: 'singo',          name: 'Singö',             lat: 59.7500, lng: 18.7333, region: 'Norra', emoji: '' },
  { id: 'grisslehamn',    name: 'Grisslehamn',       lat: 60.1080, lng: 18.8260, region: 'Norra', emoji: '' },
  { id: 'soderarm',       name: 'Söderarm fyr',      lat: 59.7480, lng: 19.4200, region: 'Norra', emoji: '' },
]
