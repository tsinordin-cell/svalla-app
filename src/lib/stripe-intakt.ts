/**
 * stripe-intakt — faktisk intäkt senaste 12 månaderna, direkt från Stripe.
 *
 * Ersätter den hårdkodade REVENUE_YEARLY_SEK (som stod på 0) på /team och
 * /admin/malet (2026-10-10). Räknar Stripes saldotransaktioner: betalningar
 * plus återbetalningar (som är negativa), brutto i kontots valuta. Avgifter
 * dras inte av — det är omsättning, samma mått som exit-briefen använder.
 *
 * Cachas sex timmar. Saknas nyckeln eller svarar inte Stripe returneras null,
 * och sidan faller tillbaka på den manuella siffran i config.ts.
 */
import Stripe from 'stripe'
import { unstable_cache } from 'next/cache'

const INTAKTSTYPER = new Set(['charge', 'payment', 'refund', 'payment_refund'])

export type StripeIntakt = { kronor: number; antalBetalningar: number; valuta: string }

/** Summerar saldotransaktioner till kronor. Exporteras för test. */
export function summera(tx: { type: string; amount: number; currency: string }[]): StripeIntakt {
  let ore = 0
  let antal = 0
  let valuta = 'sek'
  for (const t of tx) {
    if (!INTAKTSTYPER.has(t.type)) continue
    ore += t.amount
    if (t.type === 'charge' || t.type === 'payment') antal++
    valuta = t.currency
  }
  return { kronor: Math.round(ore / 100), antalBetalningar: antal, valuta }
}

async function hamta(): Promise<StripeIntakt> {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY saknas')
  const stripe = new Stripe(key)
  const sedan = Math.floor(Date.now() / 1000) - 365 * 24 * 3600
  const tx: { type: string; amount: number; currency: string }[] = []
  for await (const t of stripe.balanceTransactions.list({ created: { gte: sedan }, limit: 100 })) {
    tx.push({ type: t.type, amount: t.amount, currency: t.currency })
    if (tx.length >= 20_000) break
  }
  return summera(tx)
}

const cachad = unstable_cache(hamta, ['stripe-intakt-12m-v1'], { revalidate: 6 * 3600, tags: ['stripe-intakt'] })

export async function getStripeIntakt(): Promise<StripeIntakt | null> {
  try {
    return await cachad()
  } catch (e) {
    console.error('[stripe-intakt]', (e as Error).message)
    return null
  }
}
