/**
 * GET /api/affiliate/click
 *
 * Server-side klick-tracker. Loggar i affiliate_clicks och 302-redirectar
 * användaren till affiliate-destinationen.
 *
 * Query params:
 *   p  = programId  (måste finnas i PROGRAMS-katalogen)
 *   l  = linkId     (intern identifierare per länk-placering)
 *   pl = placement  ('tur_gear', 'plats_book', 'guide_recommend', etc.)
 *   to = destination (final-URL — måste vara HTTPS, ingen open-redirect)
 *
 * Anti-fraud: vi hashar IP med en daglig salt (HMAC-SHA256) så vi kan räkna
 * unika besökare per dag utan att lagra rå IP. Ingen IP når DB:n eller logs.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { PROGRAMS, type ProgramId } from '@/lib/affiliate'
import crypto from 'crypto'

// Service-role klient — bypassar RLS för att skriva till affiliate_clicks
function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  )
}

// Daglig HMAC-salt — byts varje dygn så historiska hashar inte kan
// reverseras till samma IP via rainbow tables.
function dailyIpHash(ip: string): string {
  const dailySalt = `${process.env.CRON_SECRET ?? 'svalla'}_${new Date().toISOString().slice(0, 10)}`
  return crypto.createHmac('sha256', dailySalt).update(ip).digest('hex').slice(0, 16)
}

// Tillåtna destinations-domäner — måste matcha en av PROGRAMS.brand eller
// en känd affiliate-trackingdomän. Förhindrar open-redirect.
const TRACKING_DOMAINS = ['track.adtraction.com', 'www.awin1.com', 'awin1.com']

function isAllowedDestination(rawUrl: string): boolean {
  try {
    const u = new URL(rawUrl)
    if (u.protocol !== 'https:') return false
    const host = u.hostname.toLowerCase()
    if (TRACKING_DOMAINS.includes(host)) return true
    // Tillåt om host matchar någon brand i PROGRAMS (t.ex. "watski.se" matchar host "watski.se" eller "www.watski.se")
    return Object.values(PROGRAMS).some(p => host === p.brand || host.endsWith(`.${p.brand}`))
  } catch {
    return false
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const programId = searchParams.get('p') as ProgramId | null
  const linkId = searchParams.get('l')
  const placement = searchParams.get('pl')
  const destination = searchParams.get('to')

  // Validering — 400 hellre än tyst redirect till skumt
  if (!programId || !linkId || !placement || !destination) {
    return NextResponse.json({ error: 'Missing required params' }, { status: 400 })
  }
  if (!PROGRAMS[programId]) {
    return NextResponse.json({ error: 'Unknown program' }, { status: 400 })
  }
  if (!isAllowedDestination(destination)) {
    return NextResponse.json({ error: 'Disallowed destination' }, { status: 400 })
  }

  // Hämta user (om inloggad — failar gracefully för utloggade)
  let userId: string | null = null
  try {
    const { createServerSupabaseClient } = await import('@/lib/supabase-server')
    const supa = await createServerSupabaseClient()
    const { data } = await supa.auth.getUser()
    userId = data.user?.id ?? null
  } catch {
    // Tysta — utloggade ska inte blockera klicket
  }

  // Hash IP — Vercel proxy sätter x-forwarded-for. Fall back till en konstant
  // så hash inte blir tom (gör räkningen meningslös för bots utan headers).
  const rawIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const ipHash = dailyIpHash(rawIp)

  // Insert click — failar TYST om DB är nere så användaren ändå redirectas.
  // Affiliate-intäkt > vår analytics.
  try {
    const supa = adminClient()
    await supa.from('affiliate_clicks').insert({
      user_id: userId,
      network: PROGRAMS[programId].network,
      program_id: programId,
      link_id: linkId,
      placement,
      source_url: req.headers.get('referer') ?? null,
      destination,
      ip_hash: ipHash,
      user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null,
    })
  } catch (e) {
    console.error('[affiliate/click] insert failed:', e)
  }

  // 302 — temporary så browsern följer URL:en framåt nästa gång
  // (vi vill att varje klick går igenom oss för tracking)
  return NextResponse.redirect(destination, 302)
}
