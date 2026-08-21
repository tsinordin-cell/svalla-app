/**
 * tripFields.test.ts — låser sparreglerna. Fälttestbugg 21/8 i första testet.
 */
import { describe, it, expect } from 'vitest'
import { buildTripFields, type TripSaveInput } from './tripFields'

const bas: TripSaveInput = {
  userId: 'u1', boatType: 'Motorbåt', distanceNM: 12.345, elapsedSeconds: 3600,
  avgKnots: 5.67, maxKnots: 8.91, uploadedUrls: [], startedAt: '2026-08-21T10:00:00Z',
  endedAt: '2026-08-21T11:00:00Z', pinnar: 0, caption: '', locationName: '',
  routePoints: [], isPrivate: false,
}

describe('buildTripFields', () => {
  it('tur utan foto: image null, images null (fälttestbugg 21/8)', () => {
    const f = buildTripFields(bas)
    expect(f.image).toBeNull()
    expect(f.images).toBeNull()
  })
  it('första fotot blir image, resten images', () => {
    const f = buildTripFields({ ...bas, uploadedUrls: ['a.jpg', 'b.jpg', 'c.jpg'] })
    expect(f.image).toBe('a.jpg')
    expect(f.images).toEqual(['b.jpg', 'c.jpg'])
  })
  it('ett enda foto: images null, inte tom array', () => {
    expect(buildTripFields({ ...bas, uploadedUrls: ['a.jpg'] }).images).toBeNull()
  })
  it('duration är MINUTER, avrundat', () => {
    expect(buildTripFields({ ...bas, elapsedSeconds: 3600 }).duration).toBe(60)
    expect(buildTripFields({ ...bas, elapsedSeconds: 89 }).duration).toBe(1)
    expect(buildTripFields({ ...bas, elapsedSeconds: 90 }).duration).toBe(2)
  })
  it('avstånd 2 decimaler, fart 1 decimal', () => {
    const f = buildTripFields(bas)
    expect(f.distance).toBe(12.35)
    expect(f.average_speed_knots).toBe(5.7)
    expect(f.max_speed_knots).toBe(8.9)
  })
  it('tomma texter blir null, inte tomma strängar', () => {
    const f = buildTripFields({ ...bas, caption: '   ', locationName: '' })
    expect(f.caption).toBeNull()
    expect(f.location_name).toBeNull()
  })
  it('texter trimmas', () => {
    const f = buildTripFields({ ...bas, caption: ' hej ', locationName: ' Grinda ' })
    expect(f.caption).toBe('hej')
    expect(f.location_name).toBe('Grinda')
  })
  it('pinnar 0 blir null', () => {
    expect(buildTripFields(bas).pinnar_rating).toBeNull()
    expect(buildTripFields({ ...bas, pinnar: 3 }).pinnar_rating).toBe(3)
  })
  it('privat tur får visibility private, annars public', () => {
    expect(buildTripFields(bas).visibility).toBe('public')
    expect(buildTripFields({ ...bas, isPrivate: true }).visibility).toBe('private')
    expect(buildTripFields(bas).status).toBe('done')
  })
})
