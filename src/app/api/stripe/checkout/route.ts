export const dynamic = 'force-dynamic'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { checkRateLimit } from '@/lib/rateLimit'

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const PRICES: Record<string, string> = {
    month: process.env.STRIPE_PRICE_MONTH!,
    year: process.env.STRIPE_PRICE_YEAR!,
  }
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs: { name: string; value: string; options?: object }[]) =>
          cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options ?? {})),
      },
    },
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Stripe checkout-rate limit: max 5 sessioner per timme per användare.
  // Stripe debiterar ingenting förrän kunden bekräftar, men endpointen skapar
  // customer-objekt och loggar metadata — varje anrop kostar serverresurser
  // och kan användas för att förorena kundregistret.
  if (!checkRateLimit(`stripe-checkout:${user.id}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'För många försök. Vänta en stund.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltigt JSON' }, { status: 400 })
  }

  const plan = (body.plan as string) ?? 'month'
  const priceId = PRICES[plan]
  if (!priceId) return NextResponse.json({ error: 'Ogiltigt plan' }, { status: 400 })

  const { data: userRow } = await supabase
    .from('users')
    .select('stripe_customer_id, email')
    .eq('id', user.id)
    .single()

  let customerId = userRow?.stripe_customer_id as string | undefined

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: userRow?.email ?? user.email ?? undefined,
      metadata: { supabase_user_id: user.id },
    })
    customerId = customer.id
    await supabase
      .from('users')
      .update({ stripe_customer_id: customerId })
      .eq('id', user.id)
  }

  const origin = req.headers.get('origin') ?? 'https://svalla.se'

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/pro?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pro`,
    subscription_data: {
      metadata: { supabase_user_id: user.id },
    },
  })

  return NextResponse.json({ url: session.url })
}
