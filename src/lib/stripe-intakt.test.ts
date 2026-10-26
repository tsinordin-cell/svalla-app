import { describe, it, expect, vi } from 'vitest'

vi.mock('next/cache', () => ({ unstable_cache: (fn: unknown) => fn }))

import { summera } from './stripe-intakt'

describe('summera', () => {
  it('räknar betalningar minus återbetalningar, ignorerar avgifter och utbetalningar', () => {
    const r = summera([
      { type: 'charge', amount: 600000, currency: 'sek' },
      { type: 'payment', amount: 9900, currency: 'sek' },
      { type: 'refund', amount: -9900, currency: 'sek' },
      { type: 'stripe_fee', amount: -1500, currency: 'sek' },
      { type: 'payout', amount: -500000, currency: 'sek' },
    ])
    expect(r.kronor).toBe(6000)
    expect(r.antalBetalningar).toBe(2)
  })
  it('tom lista ger noll', () => {
    expect(summera([]).kronor).toBe(0)
  })
})
