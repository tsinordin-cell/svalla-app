export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { logger } from '@/lib/logger'
// TODO: wrap handlers with withSentrySimple(handler, 'forum/upload-image') — se src/lib/api-handler.ts

/**
 * POST /api/forum/upload-image
 *
 * Multipart/form-data: file = bild
 * Returnerar { url } — public URL från Supabase Storage bucket "forum-images".
 *
 * Begränsningar:
 *  - Endast inloggade
 *  - Max 8 MB
 *  - Endast image/* MIME
 *  - Rate limit: 10 uppladdningar per 5 min
 *
 * Setup-krav (en gång): kör migration-forum-images-bucket.sql i Supabase.
 */

const MAX_BYTES = 8 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic'])

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs: { name: string; value: string; options?: object }[]) =>
          cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options ?? {})),
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Inte inloggad' }, { status: 401 })
  }

  // Rate limit
  const { checkRateLimit } = await import('@/lib/rateLimit')
  if (!(await checkRateLimit(`forum-upload:${user.id}`, 10, 5 * 60_000))) {
    return NextResponse.json({ error: 'För många uppladdningar — vänta en stund.' }, { status: 429 })
  }

  let file: File | null = null
  try {
    const fd = await req.formData()
    const f = fd.get('file')
    if (f instanceof File) file = f
  } catch {
    return NextResponse.json({ error: 'Ogiltig form-data' }, { status: 400 })
  }

  if (!file) {
    return NextResponse.json({ error: 'Ingen fil bifogad' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: 'Endast jpeg, png, webp, gif, heic stöds' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Bilden är för stor (max 8 MB)' }, { status: 400 })
  }

  const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase().slice(0, 5)
  const filename = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { data: upload, error: upErr } = await supabase.storage
    .from('forum-images')
    .upload(filename, file, {
      upsert: false,
      contentType: file.type,
      cacheControl: '31536000',
    })

  if (upErr || !upload) {
    logger.error('forum-upload', 'upload failed', { error: upErr?.message, userId: user.id })
    return NextResponse.json({ error: upErr?.message ?? 'Uppladdning misslyckades' }, { status: 500 })
  }

  const { data: { publicUrl } } = supabase.storage.from('forum-images').getPublicUrl(upload.path)

  logger.info('forum-upload', 'uploaded', { userId: user.id, path: upload.path, size: file.size })
  return NextResponse.json({ url: publicUrl })
}
