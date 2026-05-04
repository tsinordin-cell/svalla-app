export const dynamic = 'force-dynamic'

/**
 * POST /api/stripe/loppis-boost-checkout
 *
 * Skapar en Stripe Checkout Session för att boosta en Loppis-annons
 * (visas först i grid med Sponsored-badge i 7 dagar). Bara ägaren får
 * boosta egna annonser.
 *
 * Body: { threadId: string }
 *
 * Metadata på sessionen: { kind: 'loppis_boost', threadId, days }.
 * Webhook (route.ts) plockar upp checkout.session.completed → sätter
 * listing_data.boosted_until.
 */
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { checkRateLimit } from '@/lib/rateLimit'

const BOOST_DAYS = 7

export async function POST(req: Request) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Inte inloggad.' }, { status: 401 })

  if (!(await checkRateLimit(`loppis-boost-checkout:${user.id}`, 5, 60_000))) {
    return NextResponse.json({ error: 'För många försök. Vänta en stund.' }, { status: 429 })
  }

  const priceId = process.env.STRIPE_PRICE_LOPPIS_BOOST_7D
  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!priceId || !stripeKey) {
    return NextResponse.json({
      error: 'Boost-betalning är inte konfigurerad än. Ange STRIPE_PRICE_LOPPIS_BOOST_7D + STRIPE_SECRET_KEY i Vercel-env.',
    }, { status: 503 })
  }

  let body: { threadId?: unknown }
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltig JSON.' }, { status: 400 })
  }
  const threadId = typeof body.threadId === 'string' ? body.threadId : ''
  if (!threadId) return NextResponse.json({ error: 'threadId krävs.' }, { status: 400 })

  // Verifiera ägarskap
  const { data: thread } = await supabase
    .from('forum_threads')
    .select('id, user_id, category_id, title')
    .eq('id', threadId)
    .single()
  if (!thread) return NextResponse.json({ error: 'Annonsen hittades inte.' }, { status: 404 })
  if (thread.user_id !== user.id) {
    return NextResponse.json({ error: 'Du är inte ägare till denna annons.' }, { status: 403 })
  }
  if (thread.category_id !== 'loppis') {
    return NextResponse.json({ error: 'Endast Loppis-annonser kan boostas.' }, { status: 400 })
  }

  const stripe = new Stripe(stripeKey)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://svalla.se'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/forum/loppis/${threadId}?boost=success`,
      cancel_url:  `${baseUrl}/forum/loppis/${threadId}?boost=cancelled`,
      metadata: {
        kind:     'loppis_boost',
        threadId,
        userId:   user.id,
        days:     String(BOOST_DAYS),
      },
    })

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe gav ingen checkout-URL.' }, { status: 500 })
    }
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[loppis-boost-checkout] stripe error:', err)
    return NextResponse.json({ error: 'Stripe-fel — försök igen.' }, { status: 500 })
  }
}
