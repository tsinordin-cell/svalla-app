/**
 * PATCH /api/forum/threads/[id]/listing
 *
 * Uppdaterar titel, body och listing_data på en Loppis-annons. Bara ägaren
 * får redigera. Validerar samma fält som POST /api/forum/threads.
 *
 * Bevarar bilder, status och boosted_until från befintliga listing_data —
 * bilder ändras via /listing-images, status via /listing-status, boost
 * via /boost.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const ALLOWED_CONDITIONS = ['Nyskick', 'Mycket bra', 'Bra', 'Acceptabelt', 'Renoveringsobjekt']
const ALLOWED_CATEGORIES = ['Båt', 'Motor', 'Tillbehör', 'Säkerhet', 'Övrigt']

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  let body: {
    title?: unknown
    body?: unknown
    listingData?: unknown
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig JSON.' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Inte inloggad.' }, { status: 401 })

  const { data: thread, error: fetchErr } = await supabase
    .from('forum_threads')
    .select('id, user_id, category_id, listing_data')
    .eq('id', id)
    .single()
  if (fetchErr || !thread) {
    return NextResponse.json({ error: 'Annonsen hittades inte.' }, { status: 404 })
  }
  if (thread.user_id !== user.id) {
    return NextResponse.json({ error: 'Du är inte ägare.' }, { status: 403 })
  }
  if (thread.category_id !== 'loppis') {
    return NextResponse.json({ error: 'Endast Loppis-trådar har listing_data.' }, { status: 400 })
  }

  // Validering
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  if (title.length < 5 || title.length > 200) {
    return NextResponse.json({ error: 'Rubrik måste vara 5–200 tecken.' }, { status: 400 })
  }
  const bodyText = typeof body.body === 'string' ? body.body.trim() : ''
  if (bodyText.length > 10000) {
    return NextResponse.json({ error: 'Beskrivning för lång (max 10 000 tecken).' }, { status: 400 })
  }

  const ld = (body.listingData ?? {}) as Record<string, unknown>
  const price = typeof ld.price === 'number' ? ld.price : null
  if (price !== null && (price < 0 || price > 100_000_000)) {
    return NextResponse.json({ error: 'Ogiltigt pris.' }, { status: 400 })
  }

  const specs = Array.isArray(ld.specs)
    ? (ld.specs as unknown[])
        .filter((s): s is { label: string; value: string } =>
          !!s && typeof s === 'object'
          && typeof (s as { label?: unknown }).label === 'string'
          && typeof (s as { value?: unknown }).value === 'string')
        .map(s => ({ label: s.label.slice(0, 40), value: s.value.slice(0, 200) }))
        .filter(s => s.label.trim() && s.value.trim())
        .slice(0, 12)
    : []

  // Bevarar images, status och boosted_until från existing listing_data
  const existing = (thread.listing_data ?? {}) as Record<string, unknown>
  const updatedListing = {
    ...existing,
    price,
    currency:      'SEK',
    condition:     typeof ld.condition === 'string' && ALLOWED_CONDITIONS.includes(ld.condition) ? ld.condition : (existing.condition ?? null),
    category:      typeof ld.category === 'string' && ALLOWED_CATEGORIES.includes(ld.category) ? ld.category : (existing.category ?? 'Övrigt'),
    specs,
    location:      typeof ld.location === 'string' ? ld.location.trim().slice(0, 80) || null : null,
    external_link: typeof ld.external_link === 'string' && /^https?:\/\//i.test(ld.external_link) ? ld.external_link.slice(0, 500) : null,
    // images, status och boosted_until rörs INTE här
  }

  const { error: updateErr } = await supabase
    .from('forum_threads')
    .update({
      title,
      body: bodyText || ' ',
      listing_data: updatedListing,
    })
    .eq('id', id)

  if (updateErr) {
    console.error('[listing] update failed:', updateErr)
    return NextResponse.json({ error: 'Kunde inte spara.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
