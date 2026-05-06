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

/**
 * Verifiera magic bytes (filsignatur) för att skydda mot MIME-spoofing.
 * Klienten kan ljuga om Content-Type i form-data, men de första bytes
 * kan inte fakas utan att förstöra själva bilden.
 *
 * Stöder: JPEG, PNG, WebP, GIF, HEIC.
 * Returnerar true om signaturen matchar någon av våra tillåtna typer.
 */
async function isValidImageMagic(file: File): Promise<boolean> {
  const buf = new Uint8Array(await file.slice(0, 12).arrayBuffer())
  if (buf.length < 4) return false

  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return true
  // PNG: 89 50 4E 47
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true
  // GIF: 47 49 46 38 (GIF8)
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return true
  // WebP: 52 49 46 46 ... 57 45 42 50 (RIFF....WEBP)
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46
      && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return true
  // HEIC: ftypheic, ftypheix, ftypmif1, ftypmsf1 — alla har 'ftyp' på offset 4
  if (buf[4] === 0x66 && buf[5] === 0x74 && buf[6] === 0x79 && buf[7] === 0x70) return true

  return false
}

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
  // Magic-byte-verifiering — skyddar mot Content-Type-spoofing där klient
  // ljuger om filtypen för att få igenom .exe/.html etc.
  if (!(await isValidImageMagic(file))) {
    return NextResponse.json({ error: 'Filen är inte en giltig bildfil' }, { status: 400 })
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
