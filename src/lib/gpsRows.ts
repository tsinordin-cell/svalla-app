// Skrivning av gps_points-rader — EN plats för radformatet.
//
// Bakgrund (2026-09-06): /spara skrev rader på två ställen (strömning under
// turen och hela spåret vid Spara) med varsin kopia av objektet. När rådata-
// kolumnerna kom till behövde båda ändras — nu bor formatet här.
//
// Rådatan (raw_latitude, raw_longitude, device_speed_knots) kräver att
// migrationen 20260906000001_gps_points_raw.sql är körd i Supabase. Är den
// inte det svarar PostgREST med PGRST204 ("Could not find the 'raw_latitude'
// column"). Då får INTE turen gå förlorad: insertGpsRows tar bort rådata-
// kolumnerna och skriver om — spåret sparas, rådatan blir null, och anropet
// säger ifrån (rawDropped) så att det syns i loggen. Ordningen "kod först,
// migration sen" är alltså ofarlig; det omvända (migration först) också.

import type { GpsPoint } from './gps'

export type GpsRow = {
  trip_id: string
  latitude: number
  longitude: number
  speed_knots: number
  heading: number | null
  accuracy: number | null
  recorded_at: string
  raw_latitude?: number | null
  raw_longitude?: number | null
  device_speed_knots?: number | null
}

const RAW_COLUMNS = ['raw_latitude', 'raw_longitude', 'device_speed_knots'] as const

function round2(n: number): number {
  return parseFloat(n.toFixed(2))
}

/** Bygg en gps_points-rad ur en punkt. Rådata skrivs med full precision. */
export function toGpsRow(tripId: string, p: GpsPoint): GpsRow {
  return {
    trip_id:     tripId,
    latitude:    p.lat,
    longitude:   p.lng,
    speed_knots: round2(p.speedKnots),
    heading:     p.heading,
    accuracy:    p.accuracy,
    recorded_at: p.recordedAt,
    raw_latitude:  p.rawLat ?? null,
    raw_longitude: p.rawLng ?? null,
    device_speed_knots:
      p.deviceSpeedKnots == null ? null : round2(Math.max(0, p.deviceSpeedKnots)),
  }
}

/** Samma rader utan rådata-kolumnerna (för databaser utan migrationen). */
export function withoutRawColumns(rows: GpsRow[]): GpsRow[] {
  return rows.map(r => {
    const copy: GpsRow = { ...r }
    for (const c of RAW_COLUMNS) delete copy[c]
    return copy
  })
}

/**
 * Är felet "kolumnen finns inte"? PostgREST: code PGRST204 och ett
 * meddelande som nämner kolumnen. Postgres direkt: 42703 (undefined_column).
 */
export function isMissingRawColumnError(err: { code?: string; message?: string } | null): boolean {
  if (!err) return false
  if (err.code === '42703') return true
  const msg = (err.message ?? '').toLowerCase()
  return err.code === 'PGRST204' || RAW_COLUMNS.some(c => msg.includes(c))
}

type InsertError = { code?: string; message: string }
// PromiseLike: supabase-js returnerar en thenable builder, inte en Promise.
type InsertFn = (rows: GpsRow[]) => PromiseLike<{ error: InsertError | null }>

/**
 * Skriv rader; saknas rådata-kolumnerna i databasen skrivs raderna om
 * utan dem. rawDropped=true betyder att spåret sparades men rådatan inte.
 */
export async function insertGpsRows(
  insert: InsertFn,
  rows: GpsRow[],
): Promise<{ error: InsertError | null; rawDropped: boolean }> {
  const first = await insert(rows)
  if (!first.error) return { error: null, rawDropped: false }
  if (!isMissingRawColumnError(first.error)) return { error: first.error, rawDropped: false }
  const second = await insert(withoutRawColumns(rows))
  return { error: second.error, rawDropped: true }
}

// ── Läsning: ALLA punkter för en tur ──────────────────────────────────────────
//
// Fynd 2026-09-11 (Toms 12 NM-tur, 1 081 punkter): PostgREST svarar med högst
// 1 000 rader per fråga, tyst. Varje läsning av gps_points utan sidindelning
// (tursidan, GPX, uppspelning, kraschåterställning) stympade alltså turer
// längre än ~17 minuter vid 1 Hz — utan fel. En fyratimmarssegling är
// 14 400 rader. Därför EN läsfunktion som hämtar sida för sida.

export const GPS_PAGE_SIZE = 1000
/** Hård gräns: 100 000 rader ≈ 28 timmar vid 1 Hz. Längre än så är ett fel, inte en tur. */
export const GPS_MAX_ROWS = 100_000

/** Det lilla av Supabase-klienten som behövs — så funktionen går att testa utan nätverk. */
export type GpsPointsQuery = {
  from(table: 'gps_points'): {
    select(columns: string): {
      eq(col: 'trip_id', v: string): {
        order(col: 'recorded_at', o: { ascending: boolean }): {
          order(col: 'id', o: { ascending: boolean }): {
            range(from: number, to: number): PromiseLike<{ data: unknown[] | null; error: { message: string } | null }>
          }
        }
      }
    }
  }
}

/**
 * Hämtar alla gps_points för en tur, i tidsordning (id som tiebreak så att
 * två punkter med samma recorded_at inte kan hamna på två sidor i fel ordning).
 * Kastar vid databasfel. Stannar vid GPS_MAX_ROWS.
 */
export async function fetchAllGpsPoints<Row>(
  // `object`, inte GpsPointsQuery: Supabase typade klienter ger "Type
  // instantiation is excessively deep" vid strukturell jämförelse. Castas här.
  supabaseClient: object, tripId: string, columns: string, pageSize = GPS_PAGE_SIZE,
): Promise<Row[]> {
  const client = supabaseClient as GpsPointsQuery
  const out: Row[] = []
  for (let from = 0; from < GPS_MAX_ROWS; from += pageSize) {
    const { data, error } = await client
      .from('gps_points').select(columns).eq('trip_id', tripId)
      .order('recorded_at', { ascending: true }).order('id', { ascending: true })
      .range(from, from + pageSize - 1)
    if (error) throw new Error(error.message)
    const rows = (data ?? []) as Row[]
    out.push(...rows)
    if (rows.length < pageSize) break
  }
  return out
}
