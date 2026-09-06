import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { tripCacheTag } from '@/lib/trip-cache'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * POST /api/revalidate-feed
 * Body (valfri): { tripId?: string }
 *
 * Tömmer /feed. Skickas tripId töms även tursidans datacache (tagg
 * trip:<id>, se src/lib/trip-cache.ts). Anropas efter spara, redigera,
 * radera och synlighetsbyte — det är det som gör att den cachade publika
 * tursidan alltid är färsk utan tidsbaserad ISR.
 *
 * Kräver inloggning. Taggen töms bara om den inloggade äger turen — annars
 * kunde vem som helst tömma andras cache i en loop.
 */
export async function POST(req: Request) {
  let userId: string
  let supabase
  try {
    supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    userId = user.id
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let tripId: string | undefined
  try {
    const body = await req.json() as { tripId?: unknown }
    if (typeof body?.tripId === 'string' && UUID.test(body.tripId)) tripId = body.tripId
  } catch { /* tom body är ok — bara feed */ }

  revalidatePath('/feed')

  let tripRevalidated = false
  if (tripId) {
    // RLS: ägaren ser sin egen tur även om den är privat eller nyss raderad
    // (deleted_at filtreras inte här — annars kan raderingen inte tömmas).
    const { data } = await supabase.from('trips').select('user_id').eq('id', tripId).maybeSingle()
    if (data?.user_id === userId) {
      revalidateTag(tripCacheTag(tripId))
      tripRevalidated = true
    }
  }

  return NextResponse.json({ revalidated: true, tripRevalidated })
}
