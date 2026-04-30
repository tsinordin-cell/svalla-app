import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'

const VALID_STATUSES = ['new', 'contacted', 'closed', 'lost'] as const
type Status = typeof VALID_STATUSES[number]

export async function POST(req: NextRequest) {
  // Auth-check via session
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: userRow } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()
  if (!userRow?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  // Parse + validate
  let body: { id?: string; status?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const { id, status } = body
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }
  if (!status || !VALID_STATUSES.includes(status as Status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  // Update via service-role (RLS hindrar normal user)
  const service = getAdminClient()

  const update: { status: string; contacted_at?: string } = { status }
  if (status === 'contacted') update.contacted_at = new Date().toISOString()

  const { error } = await service
    .from('partner_inquiries')
    .update(update)
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
