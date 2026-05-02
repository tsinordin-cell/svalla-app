/**
 * GET /api/saves
 *
 * Returnerar inloggad användares sparade platser, sorterat på senast tillagt först.
 * Används av /sparade-sidan och av UpptackClient för att visa "redan sparat"-status.
 */

export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ saves: [] })

  const { data, error } = await supabase
    .from('place_saves')
    .select('id, place_slug, place_name, place_type, lat, lng, image_url, island, notes, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) {
    return NextResponse.json({ error: 'Kunde inte hämta sparade' }, { status: 500 })
  }

  return NextResponse.json({ saves: data ?? [] })
}
