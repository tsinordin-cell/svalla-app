import { describe, expect, it } from 'vitest'
import { cronBehorig } from './cronAuth'

const req = (h: Record<string, string>) => new Request('https://svalla.se/api/email/cron', { headers: h })

describe('cronBehorig', () => {
  it('med CRON_SECRET räcker inte User-Agent', () => {
    expect(cronBehorig(req({ 'user-agent': 'vercel-cron/1.0' }), 'hemligt')).toBe(false)
  })
  it('med CRON_SECRET släpps rätt Bearer in', () => {
    expect(cronBehorig(req({ authorization: 'Bearer hemligt' }), 'hemligt')).toBe(true)
    expect(cronBehorig(req({ authorization: 'Bearer fel' }), 'hemligt')).toBe(false)
  })
  it('utan CRON_SECRET: gamla beteendet (User-Agent) ligger kvar', () => {
    expect(cronBehorig(req({ 'user-agent': 'vercel-cron/1.0' }), undefined)).toBe(true)
    expect(cronBehorig(req({}), undefined)).toBe(false)
  })
})
