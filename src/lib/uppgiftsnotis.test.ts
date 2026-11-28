import { describe, it, expect } from 'vitest'
import { skaNotifiera, sakerTitel, uppgiftPush, uppgiftLank } from './uppgiftsnotis'

describe('uppgiftsnotis', () => {
  it('skickar aldrig till sig själv eller till ingen', () => {
    expect(skaNotifiera('a', 'b')).toBe(true)
    expect(skaNotifiera('a', 'a')).toBe(false)
    expect(skaNotifiera('a', null)).toBe(false)
    expect(skaNotifiera('a', undefined)).toBe(false)
  })

  it('tar bort tecken som kan bli HTML eller markdown i mejlet', () => {
    expect(sakerTitel('<script>alert(1)</script> Fixa [länk](http://x) **nu**'))
      .toBe('scriptalert(1)/script Fixa länk(http://x) nu')
    expect(sakerTitel('A & B')).toBe('A och B')
    expect(sakerTitel('rad ett\nrad två')).toBe('rad ett rad två')
    expect(sakerTitel('{{avreg_url}}')).toBe('avregurl')
  })

  it('kortar lång titel och ersätter tom', () => {
    expect(sakerTitel('x'.repeat(200), 20)).toHaveLength(20)
    expect(sakerTitel('   ')).toBe('Uppgift utan titel')
  })

  it('pushen leder till uppgiften på /team', () => {
    const p = uppgiftPush('Tom', 'Skriv gästblogginlägg', 'abc-123')
    expect(p).toEqual({ title: 'Tom gav dig en uppgift', body: 'Skriv gästblogginlägg', url: '/team?uppgift=abc-123' })
    expect(uppgiftLank('a b')).toBe('/team?uppgift=a%20b')
  })
})

describe('mejlet uppgift_delegerad', () => {
  it('har ämne, titel och länk till uppgiften', async () => {
    const { renderEmail } = await import('./email')
    const r = renderEmail('uppgift_delegerad', {
      avsandare: 'Tom', titel: sakerTitel('Skriv <b>gästblogg</b>'), lank: 'https://svalla.se/team?uppgift=abc',
    })
    expect(r.ok).toBe(true)
    expect(r.subject).toBe('Tom gav dig en uppgift: Skriv bgästblogg/b')
    expect(r.html).toContain('href="https://svalla.se/team?uppgift=abc"')
    expect(r.html).toContain('Öppna uppgiften')
    expect(r.html).not.toContain('<b>gästblogg')
  })
})
