import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: Record<string, string>
  try {
    body = (await request.json()) as Record<string, string>
  } catch {
    return NextResponse.json({ error: 'Ogiltig request' }, { status: 400 })
  }

  const business_name = body.business_name?.trim()
  const email = body.email?.trim().toLowerCase()
  if (!business_name || !email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Verksamhetsnamn och giltig e-post krävs' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.from('partner_inquiries').insert({
    business_name,
    contact_name: body.contact_name?.trim() || null,
    email,
    phone: body.phone?.trim() || null,
    category: body.category?.trim() || null,
    island_slug: body.island_slug?.trim() || null,
    tier: body.tier?.trim() || null,
    message: body.message?.trim() || null,
    source: 'partner-page',
    status: 'new',
  })

  if (error) {
    console.error('[partner-inquiry] insert failed', error)
    return NextResponse.json({ error: 'Kunde inte spara — försök igen' }, { status: 500 })
  }

  // TODO: skicka mail till Tom via Resend när konfigurerat
  // await resend.emails.send({ to: 'tsinordin@gmail.com', subject: `Ny partner-inquiry: ${business_name}`, html: ... })

  return NextResponse.json({ ok: true })
}
