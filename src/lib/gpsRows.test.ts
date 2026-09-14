import { describe, it, expect, vi } from 'vitest'
import { toGpsRow, withoutRawColumns, isMissingRawColumnError, insertGpsRows, fetchAllGpsPoints, type GpsRow } from './gpsRows'
import type { GpsPoint } from './gps'

const pt: GpsPoint = {
  lat: 59.3300001, lng: 18.0700001, speedKnots: 5.126, heading: 90, accuracy: 4.2,
  recordedAt: '2026-09-06T10:00:00.000Z',
  rawLat: 59.3300456, rawLng: 18.0699877, deviceSpeedKnots: 5.9871,
}

describe('toGpsRow — rådata skrivs vid sidan av det utjämnade läget', () => {
  it('lägger rå lat/lng med full precision och enhetsfart avrundad till 2 dec', () => {
    const r = toGpsRow('trip-1', pt)
    expect(r.latitude).toBe(59.3300001)
    expect(r.raw_latitude).toBe(59.3300456)
    expect(r.raw_longitude).toBe(18.0699877)
    expect(r.device_speed_knots).toBe(5.99)
    expect(r.speed_knots).toBe(5.13)
    expect(r.recorded_at).toBe(pt.recordedAt)
  })

  it('punkt utan rådata (GPX-import, gammal snapshot) ger null, inte undefined', () => {
    const { rawLat, rawLng, deviceSpeedKnots, ...bare } = pt
    void rawLat; void rawLng; void deviceSpeedKnots
    const r = toGpsRow('t', bare)
    expect(r.raw_latitude).toBeNull()
    expect(r.raw_longitude).toBeNull()
    expect(r.device_speed_knots).toBeNull()
  })

  it('negativ enhetsfart (iOS ger -1 när farten saknas) klipps till 0', () => {
    expect(toGpsRow('t', { ...pt, deviceSpeedKnots: -1 }).device_speed_knots).toBe(0)
  })
})

describe('withoutRawColumns', () => {
  it('tar bort exakt de tre rådata-kolumnerna och rör inget annat', () => {
    const rows = withoutRawColumns([toGpsRow('t', pt)])
    expect(Object.keys(rows[0]!).sort()).toEqual(
      ['accuracy', 'heading', 'latitude', 'longitude', 'recorded_at', 'speed_knots', 'trip_id'])
  })
})

describe('isMissingRawColumnError', () => {
  it('känner igen PostgREST PGRST204 och Postgres 42703', () => {
    expect(isMissingRawColumnError({ code: 'PGRST204', message: "Could not find the 'raw_latitude' column of 'gps_points' in the schema cache" })).toBe(true)
    expect(isMissingRawColumnError({ code: '42703', message: 'column "raw_latitude" does not exist' })).toBe(true)
  })
  it('släpper igenom andra fel (RLS, nät)', () => {
    expect(isMissingRawColumnError({ code: '42501', message: 'new row violates row-level security policy' })).toBe(false)
    expect(isMissingRawColumnError(null)).toBe(false)
  })
})

describe('insertGpsRows — turen får aldrig gå förlorad för att migrationen saknas', () => {
  const rows: GpsRow[] = [toGpsRow('t', pt)]

  it('lyckad skrivning: en insert, rådata kvar', async () => {
    const insert = vi.fn(async (_rows: GpsRow[]) => ({ error: null }))
    const res = await insertGpsRows(insert, rows)
    expect(res).toEqual({ error: null, rawDropped: false })
    expect(insert).toHaveBeenCalledTimes(1)
    expect(insert.mock.calls[0]![0][0]).toHaveProperty('raw_latitude')
  })

  it('saknad kolumn: skriver om utan rådata och flaggar rawDropped', async () => {
    const insert = vi.fn<(rows: GpsRow[]) => Promise<{ error: { code?: string; message: string } | null }>>()
      .mockResolvedValueOnce({ error: { code: 'PGRST204', message: "Could not find the 'raw_latitude' column" } })
      .mockResolvedValueOnce({ error: null })
    const res = await insertGpsRows(insert, rows)
    expect(res).toEqual({ error: null, rawDropped: true })
    expect(insert).toHaveBeenCalledTimes(2)
    expect(insert.mock.calls[1]![0][0]).not.toHaveProperty('raw_latitude')
    expect(insert.mock.calls[1]![0][0]).toHaveProperty('latitude', pt.lat)
  })

  it('annat fel: ingen omskrivning, felet returneras som det är', async () => {
    const rls = { code: '42501', message: 'row-level security' }
    const insert = vi.fn(async (_rows: GpsRow[]) => ({ error: rls }))
    const res = await insertGpsRows(insert, rows)
    expect(res).toEqual({ error: rls, rawDropped: false })
    expect(insert).toHaveBeenCalledTimes(1)
  })
})

describe('fetchAllGpsPoints — sidindelning förbi PostgREST-taket på 1 000', () => {
  function fakeClient(total: number, pageSize: number, failAt?: number) {
    const calls: [number, number][] = []
    const client = { from: () => ({ select: () => ({ eq: () => ({ order: () => ({ order: () => ({
      range: async (from: number, to: number) => {
        calls.push([from, to])
        if (failAt != null && from >= failAt) return { data: null, error: { message: 'boom' } }
        const rows = []
        for (let i = from; i <= Math.min(to, total - 1); i++) rows.push({ i })
        return { data: rows, error: null }
      },
    }) }) }) }) }) }
    return { client, calls, pageSize }
  }
  it('1 081 rader hämtas i två sidor (det som stympades på tur 828d8cbc)', async () => {
    const { client, calls } = fakeClient(1081, 1000)
    const rows = await fetchAllGpsPoints(client, 't', '*', 1000)
    expect(rows.length).toBe(1081)
    expect(calls).toEqual([[0, 999], [1000, 1999]])
  })
  it('exakt en full sida ger en extra tom fråga och stannar', async () => {
    const { client, calls } = fakeClient(1000, 1000)
    expect((await fetchAllGpsPoints(client, 't', '*', 1000)).length).toBe(1000)
    expect(calls.length).toBe(2)
  })
  it('14 400 rader (fyra timmar vid 1 Hz) hämtas komplett', async () => {
    const { client } = fakeClient(14_400, 1000)
    expect((await fetchAllGpsPoints(client, 't', '*', 1000)).length).toBe(14_400)
  })
  it('tom tur ger tom lista', async () => {
    const { client } = fakeClient(0, 1000)
    expect(await fetchAllGpsPoints(client, 't', '*', 1000)).toEqual([])
  })
  it('databasfel kastas — inte en tyst stympad lista', async () => {
    const { client } = fakeClient(5000, 1000, 2000)
    await expect(fetchAllGpsPoints(client, 't', '*', 1000)).rejects.toThrow('boom')
  })
})
