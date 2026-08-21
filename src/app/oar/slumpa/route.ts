/**
 * GET /oar/slumpa — skickar besökaren till en slumpmässig ö.
 *
 * Gjord som route handler i stället för klientkomponent: då fungerar den utan
 * JavaScript, kan länkas till från vilken sida som helst med en vanlig <Link>,
 * och delas som URL. Ingen state, ingen hydrering.
 *
 * force-dynamic + no-store krävs — annars cachar Vercel den FÖRSTA slumpade ön
 * och alla får samma "slump" tills cachen går ut.
 */
import { NextResponse } from 'next/server'
import { ALL_ISLANDS } from '@/app/o/island-data'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export function GET(req: Request) {
  const kandidater = ALL_ISLANDS.filter(i => i.slug)
  if (kandidater.length === 0) {
    return NextResponse.redirect(new URL('/oar', req.url))
  }

  // Undvik att skicka besökaren tillbaka till ön hen just kom ifrån.
  const referer = req.headers.get('referer') ?? ''
  const nuvarande = referer.match(/\/o\/([a-z0-9-]+)/i)?.[1]
  const utanNuvarande = nuvarande
    ? kandidater.filter(i => i.slug !== nuvarande)
    : kandidater
  const lista = utanNuvarande.length > 0 ? utanNuvarande : kandidater

  const vald = lista[Math.floor(Math.random() * lista.length)]!
  return NextResponse.redirect(new URL(`/o/${vald.slug}`, req.url), {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}
