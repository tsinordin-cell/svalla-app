/**
 * POST /api/saves/toggle
 *
 * Toggle "spara plats" för inloggad användare.
 * Om platsen redan finns på listan → ta bort den.
 * Annars → lägg till.
 *
 * Body: { placeSlug?, placeName, placeType?, lat, lng, imageUrl?, island? }
 */

export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { checkRateLimit } from '@/lib/rateLimit'
import { logger } from '@/lib/logger'

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Inte inloggad' }, { status: 401 })

  // Rate limit: 60 toggles/min per användare
  if (!(await checkRateLimit(`saves-toggle:${user.id}`, 60, 60_000))) {
    return NextResponse.json({ error: 'För många förfrågningar' }, { status: 429 })
  }

  let payload: Record<string, unknown>
  try { payload = await req.json() }
  catch { return NextResponse.json({ error: 'Ogiltig JSON' }, { status: 400 }) }

  const placeSlug = typeof payload.placeSlug === 'string' ? payload.placeSlug.slice(0, 200) : null
  const placeName = typeof payload.placeName === 'string' ? payload.placeName.trim().slice(0, 200) : ''
  const placeType = typeof payload.placeType === 'string' ? payload.placeType.slice(0, 50) : null
  const lat = typeof payload.lat === 'number' ? payload.lat : NaN
  const lng = typeof payload.lng === 'number' ? payload.lng : NaN
  const imageUrl = typeof payload.imageUrl === 'string' ? payload.imageUrl.slice(0, 500) : null
  const island = typeof payload.island === 'string' ? payload.island.slice(0, 100) : null

  if (!placeName || Number.isNaN(lat) || Number.isNaN(lng)) {
    return NextResponse.json({ error: 'placeName, lat och lng krävs' }, { status: 400 })
  }

  // Hitta existerande save (per slug om finns, annars per koordinat)
  const query = supabase.from('place_saves').select('id').eq('user_id', user.id)
  const { data: existing } = placeSlug
    ? await query.eq('place_slug', placeSlug).maybeSingle()
    : await query.eq('place_name', placeName).eq('lat', lat).eq('lng', lng).maybeSingle()

  if (existing) {
    const { error } = await supabase.from('place_saves').delete().eq('id', existing.id).eq('user_id', user.id)
    if (error) {
      logger.error('saves-toggle', 'delete failed', { e: error.message })
      return NextResponse.json({ error: 'Kunde inte ta bort' }, { status: 500 })
    }
    return NextResponse.json({ ok: true, saved: false })
  }

  const { error } = await supabase.from('place_saves').insert({
    user_id: user.id,
    place_slug: placeSlug,
    place_name: placeName,
    place_type: placeType,
    lat, lng,
    image_url: imageUrl,
    island,
  })
  if (error) {
    logger.error('saves-toggle', 'insert failed', { e: error.message })
    return NextResponse.json({ error: 'Kunde inte spara' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, saved: true })
}
