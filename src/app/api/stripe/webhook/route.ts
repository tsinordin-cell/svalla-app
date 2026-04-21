export const dynamic = 'force-dynamic'

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

function getStripe() { return new Stripe(process.env.STRIPE_SECRET_KEY!) }
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

async function upsertSubscription(sub: Stripe.Subscription) {
  const supabaseAdmin = getSupabaseAdmin()
  const userId = sub.metadata?.supabase_user_id
  if (!userId) return

  const item = sub.items.data[0]
  const plan = item?.price?.recurring?.interval === 'year' ? 'year' : 'month'

  await supabaseAdmin.from('subscriptions').upsert(
    {
      user_id: userId,
      stripe_customer_id: sub.customer as string,
      stripe_subscription_id: sub.id,
      status: sub.status,
      plan,
      current_period_end: new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  )
}

async function deleteSubscription(sub: Stripe.Subscription) {
  const supabaseAdmin = getSupabaseAdmin()
  const userId = sub.metadata?.supabase_user_id
  if (!userId) return
  await supabaseAdmin
    .from('subscriptions')
    .update({ status: 'canceled', updated_at: new Date().toISOString() })
    .eq('user_id', userId)
}

export async function POST(req: Request) {
  const stripe = getStripe()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) return NextResponse.json({ error: 'Signatur saknas' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Ogiltig signatur' }, { status: 400 })
  }

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await upsertSubscription(event.data.object as Stripe.Subscription)
      break
    case 'customer.subscription.deleted':
      await deleteSubscription(event.data.object as Stripe.Subscription)
      break
    default:
      break
  }

  return NextResponse.json({ received: true })
}
