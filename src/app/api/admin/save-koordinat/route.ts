import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  // 1. Verifiera att inloggad användare är admin
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Ej inloggad' }, { status: 401 })
  }

  const { data: userRow } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!userRow?.is_admin) {
    return NextResponse.json({ error: 'Ej admin' }, { status: 403 })
  }

  // 2. Läs body
  const body = await request.json()
  const { id, latitude, longitude, table } = body as {
    id: string
    latitude: number
    longitude: number
    table?: string
  }

  if (!id || typeof latitude !== 'number' || typeof longitude !== 'number') {
    return NextResponse.json({ error: 'Ogiltiga parametrar' }, { status: 400 })
  }

  // 3. Använd service-role-klient för att kringgå RLS
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return NextResponse.json({ error: 'SERVICE_ROLE_KEY saknas' }, { status: 500 })
  }

  const admin = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey
  )

  // 4. Spara i rätt tabell (default: restaurants)
  const targetTable = table ?? 'restaurants'
  const { error, count } = await admin
    .from(targetTable)
    .update({ latitude, longitude })
    .eq('id', id)
    .select('id', { count: 'exact' })

  if (error) {
    console.error('[save-koordinat] DB error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!count || count === 0) {
    return NextResponse.json({ error: `Ingen rad med id ${id} hittades i ${targetTable}` }, { status: 404 })
  }

  return NextResponse.json({ ok: true, id, latitude, longitude })
}
