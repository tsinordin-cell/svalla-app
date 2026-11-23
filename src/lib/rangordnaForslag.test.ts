import { describe, it, expect } from 'vitest'
import { rangordnaForslag } from './rangordnaForslag'

const f = (id: string, home_port: string | null, boat_type: string | null = null, van = false) => ({ id, home_port, boat_type, van })

describe('rangordnaForslag', () => {
  it('lägger samma hemmahamn först, oavsett skiftläge och mellanslag', () => {
    const ut = rangordnaForslag([f('a', 'Sandhamn'), f('b', ' vaxholm '), f('c', null)], 'Vaxholm', null)
    expect(ut.map(x => x.id)).toEqual(['b', 'a', 'c'])
  })
  it('samma båttyp före övriga, hamn väger tyngre än båttyp', () => {
    const ut = rangordnaForslag([f('a', null, 'Motorbåt'), f('b', null, 'Segelbåt'), f('c', 'Vaxholm', 'Motorbåt')], 'Vaxholm', 'Segelbåt')
    expect(ut.map(x => x.id)).toEqual(['c', 'b', 'a'])
  })
  it('vännen står alltid först', () => {
    const ut = rangordnaForslag([f('a', 'Vaxholm', 'Segelbåt'), f('v', null, null, true)], 'Vaxholm', 'Segelbåt')
    expect(ut[0]!.id).toBe('v')
  })
  it('behåller serverns ordning utan val, och Charter matchar ingen båttyp', () => {
    const lista = [f('a', null, 'Charter'), f('b', null), f('c', null)]
    expect(rangordnaForslag(lista, '', 'Charter').map(x => x.id)).toEqual(['a', 'b', 'c'])
  })
})
