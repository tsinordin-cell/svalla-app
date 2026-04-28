import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig request' }, { status: 400 })
  }

  const { email, source, preferences } = body as {
    email?: string
    source?: string
    preferences?: Record<string, unknown>
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Ogiltig e-postadress' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()

  // Knyt till user_id om inloggad
  const { data: { user } } = await supabase.auth.getUser()

  // Insert med ON CONFLICT — om e-posten redan finns, ignorera tyst
  const { error } = await supabase.from('email_subscribers').insert({
    email: email.toLowerCase().trim(),
    source: source ?? 'unknown',
    preferences: preferences ?? { weekly_tips: true, season_alerts: true },
    user_id: user?.id ?? null,
  })

  // Duplicate (unique constraint) → returnera framgång ändå (bra UX, ingen läckage)
  if (error && !error.message.toLowerCase().includes('duplicate')) {
    console.error('[subscribe] insert failed', error)
    return NextResponse.json({ error: 'Kunde inte spara — försök igen' }, { status: 500 })
  }

  // TODO: trigga Resend confirmation email här när du satt upp det
  // För nu: lämna confirmed=false, du markerar manuellt eller via webhook senare

  return NextResponse.json({ ok: true })
}
