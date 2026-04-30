#!/usr/bin/env node
/**
 * create-stripe-products.mjs
 *
 * Skapar de 3 partner-produkterna i Stripe + month-priser.
 * Skriver ut price_id:s du klistrar in i Vercel env.
 *
 * Förkrav: Stripe-konto skapat, STRIPE_SECRET_KEY i din lokala env eller
 * .env.local. Du hittar nyckeln på dashboard.stripe.com/apikeys.
 *
 * Kör:
 *   STRIPE_SECRET_KEY=sk_live_... node scripts/create-stripe-products.mjs
 *
 * För TEST-läge använd test-nyckeln (sk_test_...).
 *
 * Idempotent: kollar om produkten med samma name redan finns innan den
 * skapar en ny, så du kan köra scriptet flera gånger utan att duplicera.
 */

import Stripe from 'stripe'

const SECRET = process.env.STRIPE_SECRET_KEY
if (!SECRET) {
  console.error('FEL: STRIPE_SECRET_KEY saknas i env.')
  console.error('Hämta nyckeln från https://dashboard.stripe.com/apikeys')
  console.error('Kör: STRIPE_SECRET_KEY=sk_live_... node scripts/create-stripe-products.mjs')
  process.exit(1)
}

const stripe = new Stripe(SECRET)

const TIERS = [
  {
    name: 'Svalla Partner Bas',
    description: 'Premium-placering i sökresultat, bokningsknapp, bilder, statistik',
    amount: 29000,  // 290 kr i öre
    envVar: 'STRIPE_PRICE_PARTNER_BAS',
  },
  {
    name: 'Svalla Partner Standard',
    description: 'Allt i Bas + featured i ö-toppar, foto-galleri (8 bilder), väder-info, månatlig statistik',
    amount: 59000,  // 590 kr
    envVar: 'STRIPE_PRICE_PARTNER_STANDARD',
  },
  {
    name: 'Svalla Partner Premium',
    description: 'Allt i Standard + sponsrade rutter, push-notiser, Thorkel rekommenderar er, personlig kontakt',
    amount: 99000,  // 990 kr
    envVar: 'STRIPE_PRICE_PARTNER_PREMIUM',
  },
]

console.log('Söker existerande produkter...\n')

// Lista alla produkter (max 100 räcker)
const existing = await stripe.products.list({ limit: 100, active: true })
const byName = new Map(existing.data.map(p => [p.name, p]))

const results = []

for (const tier of TIERS) {
  let product = byName.get(tier.name)

  if (product) {
    console.log(`✓ Produkt "${tier.name}" finns redan (${product.id})`)
  } else {
    console.log(`Skapar produkt "${tier.name}"...`)
    product = await stripe.products.create({
      name: tier.name,
      description: tier.description,
      metadata: { tier: tier.name.split(' ').pop().toLowerCase(), source: 'svalla-partner' },
    })
    console.log(`  → ${product.id}`)
  }

  // Hitta eller skapa pris (290/590/990 kr/månad)
  const prices = await stripe.prices.list({ product: product.id, active: true, limit: 10 })
  let price = prices.data.find(p =>
    p.recurring?.interval === 'month' &&
    p.unit_amount === tier.amount &&
    p.currency === 'sek'
  )

  if (price) {
    console.log(`  ✓ Pris ${tier.amount / 100} kr/mån finns (${price.id})`)
  } else {
    console.log(`  Skapar pris ${tier.amount / 100} kr/mån...`)
    price = await stripe.prices.create({
      product: product.id,
      currency: 'sek',
      unit_amount: tier.amount,
      recurring: { interval: 'month' },
      metadata: { tier: tier.name.split(' ').pop().toLowerCase() },
    })
    console.log(`  → ${price.id}`)
  }

  results.push({ envVar: tier.envVar, priceId: price.id, name: tier.name })
}

console.log('\n──────────────────────────────────────────────────')
console.log('KLAR. Lägg in följande i Vercel → Environment Variables:')
console.log('──────────────────────────────────────────────────\n')

for (const r of results) {
  console.log(`${r.envVar}=${r.priceId}`)
}

console.log('\n──────────────────────────────────────────────────')
console.log('NÄSTA STEG:')
console.log('1. Gå till https://vercel.com/tsinordin-3802s-projects/svalla-app/settings/environment-variables')
console.log('2. Lägg in alla 3 variabler för Production')
console.log('3. Redeploy senaste deployen så env vars laddas')
console.log('4. Testa /partner med ett testkort 4242 4242 4242 4242 i Stripe-checkout')
console.log('──────────────────────────────────────────────────\n')
