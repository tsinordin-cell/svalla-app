import { describe, it, expect } from 'vitest'
import { platsKategori } from './platskategori'

describe('platsKategori', () => {
  it('låter typen restaurang vinna över hamnstopp-etiketten', () => {
    expect(platsKategori({ name: 'Finnhamns Krog', type: 'restaurant', categories: ['restaurant', 'harbor_stop'] })).toBe('krog')
  })
  it('låter typen kafé vinna över ordet gästhamn i beskrivningen', () => {
    expect(platsKategori({ type: 'cafe', categories: ['cafe'], description: 'Nära gästhamnen' })).toBe('krog')
  })
  it('visar gästhamn som gästhamn även om beskrivningen nämner diesel', () => {
    expect(platsKategori({ type: 'harbor', categories: ['gasthamn'], description: 'Diesel finns vid bryggan' })).toBe('hamn')
  })
  it('visar krog med drivmedel som krog', () => {
    expect(platsKategori({ type: 'restaurant', categories: ['restaurant', 'fuel'] })).toBe('krog')
  })
  it('visar värdshus med hotelletikett som boende', () => {
    expect(platsKategori({ type: 'restaurant', categories: ['restaurant', 'accommodation', 'hotel'] })).toBe('boende')
  })
  it('visar sevärdhet med kaféetikett som sevärdhet', () => {
    expect(platsKategori({ name: 'Långe Erik', type: 'attraction', categories: ['cafe'] })).toBe('sevardhet')
  })
  it('visar naturreservat med kaféetikett som annat', () => {
    expect(platsKategori({ name: 'Hoburgen', type: 'nature', categories: ['cafe'] })).toBe('annat')
  })
  it('visar brygga som brygga, inte som gästhamn', () => {
    expect(platsKategori({ name: 'Berg brygga', type: 'pier', categories: [] })).toBe('brygga')
    expect(platsKategori({ name: 'Berg brygga', type: 'pier', categories: ['harbor_stop'] })).toBe('brygga')
  })
  it('visar typen shop som butik', () => {
    expect(platsKategori({ name: 'Rånö Livs', type: 'shop', categories: ['shop'] })).toBe('butik')
  })
  it('visar tömning och service under annat', () => {
    expect(platsKategori({ type: 'pumpout' })).toBe('annat')
    expect(platsKategori({ type: 'service' })).toBe('annat')
  })
  it('behåller badplats för naturreservat', () => {
    expect(platsKategori({ name: 'Naturreservat', type: 'nature', categories: ['beach'] })).toBe('bad')
  })
  it('gissar från etiketter när typ saknas', () => {
    expect(platsKategori({ type: null, categories: ['harbor_stop'] })).toBe('hamn')
    expect(platsKategori({ type: null, categories: [] })).toBe('annat')
  })
  it('bastu och bensin efter typ', () => {
    expect(platsKategori({ type: 'sauna' })).toBe('bastu')
    expect(platsKategori({ type: 'fuel_station' })).toBe('bensin')
  })
  it('visar café med etiketten shop som butik', () => {
    expect(platsKategori({ name: 'Coop Ingmarsö', type: 'cafe', categories: ['cafe', 'provisions', 'kiosk', 'shop'] })).toBe('butik')
  })
  it('café med proviant men utan shop förblir krog', () => {
    expect(platsKategori({ name: 'Grinda Lanthandel & Café', type: 'cafe', categories: ['cafe', 'provisions'] })).toBe('krog')
  })
  it('bensinstation med shop förblir bensin', () => {
    expect(platsKategori({ name: 'Fjällbacka Bensinstation', type: 'fuel_station', categories: ['fuel', 'shop'] })).toBe('bensin')
  })
})
