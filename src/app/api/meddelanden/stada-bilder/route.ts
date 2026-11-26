/**
 * Nattstädning av chattbilder som blivit över (2026-11-26).
 * Vad som tas bort står i src/lib/dmBilderRensning.ts (rensaOverblivnaDmBilder).
 *
 * Tar bort filer, så den kräver CRON_SECRET och släpps aldrig in på
 * User-Agent (se src/lib/cronAuth.ts). Saknas CRON_SECRET gör den ingenting.
 */
import { NextResponse } from 'next/server'
import { cronBehorig } from '@/lib/cronAuth'
import { getAdminClient } from '@/lib/supabase-admin'
import { rensaOverblivnaDmBilder } from '@/lib/dmBilderRensning'
import { logger } from '@/lib/logger'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function GET(req: Request) {
  if (!process.env.CRON_SECRET) {
    logger.error('dm-stadning', 'CRON_SECRET saknas, städningen körs inte')
    return NextResponse.json({ error: 'Inte konfigurerad' }, { status: 503 })
  }
  if (!cronBehorig(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const resultat = await rensaOverblivnaDmBilder(getAdminClient())
    return NextResponse.json({ ok: true, ...resultat })
  } catch (e) {
    logger.error('dm-stadning', 'städningen avbröts', { e: String(e) })
    return NextResponse.json({ error: 'Avbröts' }, { status: 500 })
  }
}
