/**
 * PATCH /api/forum/threads/[id]/listing-images
 *
 * Uppdaterar listing_data.images på en Loppis-annons. Bara ägaren får
 * göra det. Validerar att alla URL:er är från Supabase Storage så vi
 * inte tar in extern bild-spam.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const ALLOWED_HOST_SUFFIX = '.supabase.co'
const MAX_IMAGES = 8

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  let body: { images?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig JSON.' }, { status: 400 })
  }

  if (!Array.isArray(body.images)) {
    return NextResponse.json({ error: 'images måste vara en array.' }, { status: 400 })
  }

  const images = body.images
    .filter((u): u is string => typeof u === 'string')
    .map(u => u.trim())
    .filter(u => {
      try {
        const parsed = new URL(u)
        return parsed.protocol === 'https:' && parsed.hostname.endsWith(ALLOWED_HOST_SUFFIX)
      } catch { return false }
    })
    .slice(0, MAX_IMAGES)

  if (images.length !== body.images.length) {
    return NextResponse.json({
      error: `Ogiltiga bild-URL:er — endast Supabase Storage tillåts (max ${MAX_IMAGES}).`,
    }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Inte inloggad.' }, { status: 401 })
  }

  // Hämta tråden + verifiera ägarskap
  const { data: thread, error: fetchErr } = await supabase
    .from('forum_threads')
    .select('id, user_id, category_id, listing_data')
    .eq('id', id)
    .single()

  if (fetchErr || !thread) {
    return NextResponse.json({ error: 'Annonsen hittades inte.' }, { status: 404 })
  }
  if (thread.user_id !== user.id) {
    return NextResponse.json({ error: 'Du är inte ägare till denna annons.' }, { status: 403 })
  }
  if (thread.category_id !== 'loppis') {
    return NextResponse.json({ error: 'Endast Loppis-trådar kan ha bilder via detta API.' }, { status: 400 })
  }

  const currentListing = (thread.listing_data ?? {}) as Record<string, unknown>
  const updatedListing = { ...currentListing, images }

  const { error: updateErr } = await supabase
    .from('forum_threads')
    .update({ listing_data: updatedListing })
    .eq('id', id)

  if (updateErr) {
    console.error('[listing-images] update failed:', updateErr)
    return NextResponse.json({ error: 'Kunde inte spara bilder.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, images })
}
