import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Intern Claude-endpoint — läser team_tasks
// Auth: Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>
export async function GET(req: NextRequest) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const auth = req.headers.get('authorization')
  if (!auth || auth !== `Bearer ${key}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key)
  const { data, error } = await sb
    .from('team_tasks')
    .select('id, title, status, priority, description, assignee_id, due_date, color')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json(data)
}
