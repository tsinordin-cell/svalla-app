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

export const DEPARTURES: Departure[] = [
  // Stockholm / Innerskärgård
  { id: 'stromkajen', name: 'Strömkajen', lat: 59.3238, lng: 18.0776, region: 'Stockholm', emoji: '🏙️' },
  { id: 'nacka-strand', name: 'Nacka Strand', lat: 59.3195, lng: 18.1454, region: 'Stockholm', emoji: '🌊' },
  { id: 'gustavsberg', name: 'Gustavsberg', lat: 59.3283, lng: 18.3820, region: 'Stockholm', emoji: '⛵' },
  { id: 'vaxholm', name: 'Vaxholm', lat: 59.4024, lng: 18.3512, region: 'Innerskärgård', emoji: '🏰' },
  { id: 'ljustero', name: 'Ljusterö', lat: 59.5540, lng: 18.6870, region: 'Innerskärgård', emoji: '🌿' },
  { id: 'grinda', name: 'Grinda', lat: 59.4602, lng: 18.7167, region: 'Innerskärgård', emoji: '⚓' },
  { id: 'svartso', name: 'Svartsö', lat: 59.4730, lng: 18.7250, region: 'Innerskärgård', emoji: '🪨' },
  { id: 'finnhamn', name: 'Finnhamn', lat: 59.5430, lng: 18.8240, region: 'Innerskärgård', emoji: '🏕️' },
  // Mellersta
  { id: 'ingaro', name: 'Ingarö', lat: 59.2472, lng: 18.5861, region: 'Mellersta', emoji: '🌲' },
  { id: 'stavsnäs', name: 'Stavsnäs', lat: 59.1895, lng: 18.6823, region: 'Mellersta', emoji: '⛴️' },
  { id: 'husaro', name: 'Husarö', lat: 59.5195, lng: 18.9840, region: 'Mellersta', emoji: '🏝️' },
  { id: 'möja', name: 'Möja', lat: 59.4545, lng: 18.9110, region: 'Mellersta', emoji: '⛵' },
  { id: 'sandhamn', name: 'Sandhamn', lat: 59.2820, lng: 18.9130, region: 'Mellersta', emoji: '🏆' },
  // Södra
  { id: 'dalaroe', name: 'Dalarö', lat: 59.1298, lng: 18.4003, region: 'Södra', emoji: '⚓' },
  { id: 'orno', name: 'Ornö', lat: 58.9773, lng: 18.4550, region: 'Södra', emoji: '🌿' },
  { id: 'nattaro', name: 'Nåttarö', lat: 58.8455, lng: 17.8742, region: 'Södra', emoji: '🏝️' },
  { id: 'uto', name: 'Utö', lat: 58.9590, lng: 18.3017, region: 'Södra', emoji: '⚓' },
  { id: 'nynashamn', name: 'Nynäshamn', lat: 58.9038, lng: 17.9475, region: 'Södra', emoji: '⛴️' },
  { id: 'landsort', name: 'Landsort', lat: 58.7440, lng: 17.8640, region: 'Södra', emoji: '🗼' },
  // Norra
  { id: 'sollenkroka', name: 'Sollenkroka', lat: 59.7050, lng: 18.8090, region: 'Norra', emoji: '🧭' },
  { id: 'norrtälje', name: 'Norrtälje', lat: 59.7579, lng: 18.7077, region: 'Norra', emoji: '🏘️' },
  { id: 'furusund', name: 'Furusund', lat: 59.6653, lng: 18.9217, region: 'Norra', emoji: '⚓' },
  { id: 'blido', name: 'Blidö', lat: 59.6200, lng: 18.8700, region: 'Norra', emoji: '🏡' },
  { id: 'rodloga', name: 'Rödlöga', lat: 59.8180, lng: 19.0650, region: 'Norra', emoji: '🏝️' },
  { id: 'kapellskar', name: 'Kapellskär', lat: 59.7245, lng: 19.0740, region: 'Norra', emoji: '⛴️' },
  { id: 'arholma', name: 'Arholma', lat: 59.8532, lng: 19.1345, region: 'Norra', emoji: '🌊' },
]
