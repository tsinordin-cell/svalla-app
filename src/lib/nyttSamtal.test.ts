import { describe, expect, it } from 'vitest'
import { etikettFor, samtalPerPerson } from './nyttSamtal'

const JAG = 'jag'

describe('samtalPerPerson', () => {
  it('väljer det senaste samtalet med varje person och hoppar över mig själv', () => {
    const karta = samtalPerPerson(
      [
        { conversation_id: 'a', user_id: JAG },
        { conversation_id: 'a', user_id: 'anna' },
        { conversation_id: 'b', user_id: 'anna' },
        { conversation_id: 'c', user_id: 'bo' },
      ],
      [
        { id: 'a', status: 'request', created_by: JAG, last_message_at: '2026-11-01T10:00:00Z' },
        { id: 'b', status: 'active', created_by: 'anna', last_message_at: '2026-11-20T10:00:00Z' },
        { id: 'c', status: 'declined', created_by: JAG, last_message_at: null },
      ],
      JAG,
    )
    expect(karta.has(JAG)).toBe(false)
    expect(karta.get('anna')?.status).toBe('active')
    expect(karta.get('bo')?.status).toBe('declined')
  })

  it('räknar inte samtal som saknas i samtalslistan (grupper filtreras bort där)', () => {
    const karta = samtalPerPerson([{ conversation_id: 'g', user_id: 'anna' }], [], JAG)
    expect(karta.size).toBe(0)
  })
})

describe('etikettFor', () => {
  it('säger inte förfrågan när ett aktivt samtal redan finns', () => {
    expect(etikettFor({ status: 'active', created_by: 'anna', last_message_at: null }, false, JAG))
      .toEqual({ text: 'Ni har ett samtal', ton: 'neutral' })
  })
  it('visar skickad förfrågan för den som skickade den', () => {
    expect(etikettFor({ status: 'request', created_by: JAG, last_message_at: null }, false, JAG)?.text)
      .toBe('Förfrågan skickad')
  })
  it('visar att den andra vill skriva när förfrågan kom till mig', () => {
    expect(etikettFor({ status: 'request', created_by: 'anna', last_message_at: null }, false, JAG)?.text)
      .toBe('Vill skriva till dig')
  })
  it('avslöjar inte ett nej för avsändaren', () => {
    expect(etikettFor({ status: 'declined', created_by: JAG, last_message_at: null }, false, JAG)?.text)
      .toBe('Förfrågan skickad')
  })
  it('utan samtal: förfrågan om de inte följer tillbaka, annars ingen text', () => {
    expect(etikettFor(undefined, false, JAG)?.text).toBe('Skickas som förfrågan')
    expect(etikettFor(undefined, true, JAG)).toBeNull()
  })
})
