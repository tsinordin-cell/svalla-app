import { afterEach, describe, expect, it, vi } from 'vitest'
import { _aterstallRutor, efterCookievalOchTid, paLedig, paRutsida, slappRuta, taRuta } from './forstaRutor'

afterEach(() => { _aterstallRutor(); vi.useRealTimers() })

describe('taRuta / slappRuta', () => {
  it('bara en ruta i taget', () => {
    expect(taRuta('installera')).toBe(true)
    expect(taRuta('notiser')).toBe(false)
    expect(taRuta('installera')).toBe(true)
  })

  it('nästa ruta får platsen när den förra släpps, och lyssnare får veta', () => {
    const ledig = vi.fn()
    const sluta = paLedig(ledig)
    taRuta('installera')
    slappRuta('notiser') // fel namn släpper inget
    expect(ledig).not.toHaveBeenCalled()
    slappRuta('installera')
    expect(ledig).toHaveBeenCalledTimes(1)
    expect(taRuta('notiser')).toBe(true)
    sluta()
  })
})

describe('efterCookievalOchTid', () => {
  it('väntar på cookievalet och sedan på tiden', () => {
    vi.useFakeTimers()
    let valGjort: (() => void) | null = null
    const klar = vi.fn()
    efterCookievalOchTid(15000, klar, {
      cookieval: () => false,
      vantaPaCookieval: k => { valGjort = k; return () => {} },
    })
    vi.advanceTimersByTime(60000)
    expect(klar).not.toHaveBeenCalled()
    valGjort!()
    vi.advanceTimersByTime(14999)
    expect(klar).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(klar).toHaveBeenCalledTimes(1)
  })

  it('startar direkt om valet redan är gjort, och städas bort', () => {
    vi.useFakeTimers()
    const klar = vi.fn()
    const sluta = efterCookievalOchTid(5000, klar, { cookieval: () => true })
    sluta()
    vi.advanceTimersByTime(10000)
    expect(klar).not.toHaveBeenCalled()
  })
})

describe('paRutsida', () => {
  it('visar rutor på vanliga app-sidor', () => {
    expect(paRutsida('/feed')).toBe(true)
    expect(paRutsida('/topplista')).toBe(true)
    expect(paRutsida('/u/someone')).toBe(true)
  })

  it('inga rutor medan man loggar eller sparar en tur', () => {
    expect(paRutsida('/logga')).toBe(false)
    expect(paRutsida('/logga/manuell')).toBe(false)
    expect(paRutsida('/spara')).toBe(false)
    expect(paRutsida(null)).toBe(false)
  })
})
