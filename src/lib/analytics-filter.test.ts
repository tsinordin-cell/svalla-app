import { describe, it, expect } from 'vitest'
import { agentSessioner, arAgentUserAgent, baraManniskor } from './analytics-filter'

const MAC = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36'
const CLAUDE = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Claude/2.2553.1 Chrome/152.0.7977.76 Safari/537.36'
const IPHONE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.7 Mobile/15E148 Safari/604.1'

function pv(session_id: string, n: number, country_code: string, user_agent: string) {
  return Array.from({ length: n }, () => ({ session_id, event_name: 'page_viewed', country_code, user_agent }))
}

describe('arAgentUserAgent', () => {
  it('känner igen Claude, headless och crawlers', () => {
    expect(arAgentUserAgent(CLAUDE)).toBe(true)
    expect(arAgentUserAgent('Mozilla/5.0 HeadlessChrome/120')).toBe(true)
    expect(arAgentUserAgent('Googlebot/2.1 (+http://www.google.com/bot.html)')).toBe(true)
  })
  it('släpper igenom vanliga webbläsare — "Mobile" innehåller inte bot', () => {
    expect(arAgentUserAgent(MAC)).toBe(false)
    expect(arAgentUserAgent(IPHONE)).toBe(false)
    expect(arAgentUserAgent(null)).toBe(false)
  })
})

describe('agentSessioner', () => {
  it('räknar bort USA-sessioner med ≥10 sidvisningar men behåller korta', () => {
    const rader = [...pv('a', 27, 'US', MAC), ...pv('b', 3, 'US', IPHONE), ...pv('c', 40, 'SE', MAC)]
    const bort = agentSessioner(rader)
    expect(bort.has('a')).toBe(true)
    expect(bort.has('b')).toBe(false)
    expect(bort.has('c')).toBe(false)
  })
  it('räknar bort Claude-sessioner oavsett land och längd', () => {
    const bort = agentSessioner(pv('x', 1, 'SE', CLAUDE))
    expect(bort.has('x')).toBe(true)
  })
  it('baraManniskor behåller rader utan session_id', () => {
    const rader = [{ session_id: null, event_name: 'user_signup' }, ...pv('a', 12, 'US', MAC)]
    expect(baraManniskor(rader)).toHaveLength(1)
  })
})
