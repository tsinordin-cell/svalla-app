export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { checkRateLimit } from '@/lib/rateLimit'

/**
 * Partner-checkout — anonym (icke-inloggad) flöde för restauranger/hamnar
 * som vill bli betalande partners.
 *
 * Flow:
 * 1. POST { tier, businessName, email, phone, islandSlug, category, message }
 * 2. Spara som partner_inquiries-row med status='new', tier=X
 * 3. Skapa Stripe customer + checkout session
 * 4. Returnera checkout-URL
 * 5. Webhook (separat route) uppdaterar partner_inquiries.status='active' efter betalning
 */

const TIERS = ['bas', 'standard', 'premium'] as const
type Tier = typeof TIERS[number]

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  const PARTNER_PRICES: Record<Tier, string | undefined> = {
    bas: process.env.STRIPE_PRICE_PARTNER_BAS,
    standard: process.env.STRIPE_PRICE_PARTNER_STANDARD,
    premium: process.env.STRIPE_PRICE_PARTNER_PREMIUM,
  }

  // Anti-spam: max 3 anrop per timme per IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown'
  if (!(await checkRateLimit(`partner-checkout:${ip}`, 3, 60 * 60 * 1000))) {
    return NextResponse.json({ error: 'För många försök. Vänta en stund.' }, { status: 429 })
  }

  let body: {
    tier?: string
    businessName?: string
    contactName?: string
    email?: string
    phone?: string
    islandSlug?: string
    category?: string
    message?: string
  }
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltigt JSON' }, { status: 400 })
  }

  const tier = (body.tier ?? '').toLowerCase()
  if (!TIERS.includes(tier as Tier)) {
    return NextResponse.json({ error: 'Ogiltig tier' }, { status: 400 })
  }
  const priceId = PARTNER_PRICES[tier as Tier]
  if (!priceId) {
    return NextResponse.json({ error: 'Tier inte konfigurerad i Stripe (saknar STRIPE_PRICE_PARTNER_*)' }, { status: 503 })
  }

  // Validera grunddata
  const businessName = (body.businessName ?? '').trim().slice(0, 200)
  const email = (body.email ?? '').trim().toLowerCase().slice(0, 200)
  if (!businessName || !email || !email.includes('@')) {
    return NextResponse.json({ error: 'businessName och email krävs' }, { status: 400 })
  }

  // Spara inquiry (service-role för att kringgå RLS)
  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: inquiry, error: insertError } = await service
    .from('partner_inquiries')
    .insert({
      business_name: businessName,
      contact_name: body.contactName?.trim().slice(0, 100) || null,
      email,
      phone: body.phone?.trim().slice(0, 50) || null,
      category: body.category?.trim().slice(0, 50) || null,
      island_slug: body.islandSlug?.trim().slice(0, 50) || null,
      tier,
      message: body.message?.trim().slice(0, 2000) || null,
      status: 'new',
      source: 'partner-checkout',
    })
    .select('id')
    .single()

  if (insertError) {
    console.error('[partner-checkout] insert error', insertError)
    return NextResponse.json({ error: 'Kunde inte spara — försök igen' }, { status: 500 })
  }

  // Skapa Stripe customer
  const customer = await stripe.customers.create({
    email,
    name: businessName,
    phone: body.phone || undefined,
    metadata: {
      partner_inquiry_id: inquiry.id,
      tier,
      island_slug: body.islandSlug || '',
    },
  })

  const origin = req.headers.get('origin') ?? 'https://svalla.se'

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/partner/tack?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/partner`,
    subscription_data: {
      metadata: {
        partner_inquiry_id: inquiry.id,
        tier,
      },
    },
    // Allow promotional codes om Tom vill köra kampanjer
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: session.url, inquiryId: inquiry.id })
}
