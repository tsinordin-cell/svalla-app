/**
 * POST /api/admin/komprimera-platsbilder?offset=0[&dry=1][&limit=N]
 *
 * Komprimerar om de tunga originalen i storage-bucketen images/places.
 *
 * BAKGRUND (2026-08-12)
 * Bucketen innehåller 1 706 platsfoton, 888 MB, snitt 534 kB och 127 objekt
 * över 1 MB — kopior av Google Places-foton i onödig fullstorlek. Storage-
 * kvoten på Free-planen är 1 GB och låg på 98 %: uppladdningar var dagar
 * från att börja faila. Bilderna visas aldrig bredare än ~1200 px, så
 * originalen bär 5–10× mer data än sidorna någonsin använder.
 *
 * VAD JOBBET GÖR per objekt över tröskeln:
 *   1. Laddar ner originalet.
 *   2. sharp: max 1600 px bredd (förstoras aldrig), JPEG kvalitet 78 mozjpeg.
 *      Konservativt — visuellt förlustfritt i de storlekar sajten visar.
 *   3. Laddar upp med upsert på SAMMA sökväg — inga URL:er ändras — och med
 *      cacheControl 30 dagar. Originalen laddades upp med felaktig no-cache
 *      (grundorsaken bakom egressläckan, se PR #96), så omskrivningen rättar
 *      även det per objekt.
 *   4. Skriver bara om ifall vinsten är >10 % — annars lämnas objektet orört.
 *
 * SÄKERHET: förstör aldrig data oåterkalleligt i meningen "fel innehåll" —
 * samma bild, mindre fil. Men originalupplösningen går inte att återskapa,
 * därför dry=1 som default-rekommendation första körningen och en hård
 * kvalitetsregel i stället för aggressiv komprimering.
 *
 * Anrop (samma auth-mönster som refresh-place-photos, plus admin-session):
 *   curl -X POST ".../api/admin/komprimera-platsbilder?offset=0&dry=1" \
 *     -H "Authorization: Bearer $CRON_SECRET"
 *   eller inloggad som admin i webbläsaren:
 *     fetch('/api/admin/komprimera-platsbilder?offset=0', { method: 'POST' })
 *
 * Kör i batchar; fortsätt med nästa offset tills `done: true`.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import sharp from 'sharp'
import { getAdminClient } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

const BUCKET = 'images'
const PREFIX = 'places/'
/** Objekt mindre än så här lämnas orörda. */
const TROSKEL_BYTES = 400_000
const MAX_BREDD = 1600
const JPEG_KVALITET = 78
const BATCH = 12

async function arAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false
    const { data } = await supabase.from('users').select('is_admin').eq('id', user.id).single()
    return !!data?.is_admin
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const bearer = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  const cronOk = !!process.env.CRON_SECRET && bearer === process.env.CRON_SECRET
  if (!cronOk && !(await arAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const offset = Math.max(0, parseInt(req.nextUrl.searchParams.get('offset') ?? '0', 10) || 0)
  const limit = Math.min(BATCH, Math.max(1, parseInt(req.nextUrl.searchParams.get('limit') ?? String(BATCH), 10) || BATCH))
  const dry = req.nextUrl.searchParams.get('dry') === '1'

  const admin = getAdminClient()

  // Objektlistan läses ur storage.objects direkt — list()-API:t är inte
  // rekursivt och kan inte sortera på storlek. Service-rollen får läsa schemat.
  const { data: objekt, error: listFel } = await admin
    .schema('storage')
    .from('objects')
    .select('name, metadata')
    .eq('bucket_id', BUCKET)
    .like('name', `${PREFIX}%`)
    .gt('metadata->size', TROSKEL_BYTES)
    .order('metadata->size', { ascending: false })
    .range(offset, offset + limit - 1)

  if (listFel) {
    return NextResponse.json({ error: `Kunde inte lista objekt: ${listFel.message}` }, { status: 500 })
  }
  if (!objekt || objekt.length === 0) {
    return NextResponse.json({ done: true, offset, behandlade: 0 })
  }

  const rapport: Array<Record<string, unknown>> = []
  let sparadeBytes = 0

  for (const o of objekt) {
    const namn = o.name as string
    const foreBytes = Number((o.metadata as { size?: number })?.size ?? 0)
    try {
      const { data: blob, error: dlFel } = await admin.storage.from(BUCKET).download(namn)
      if (dlFel || !blob) { rapport.push({ namn, status: 'nedladdning misslyckades' }); continue }

      const buf = Buffer.from(await blob.arrayBuffer())
      const ny = await sharp(buf)
        .rotate() // respektera EXIF-orientering innan den strippas
        .resize({ width: MAX_BREDD, withoutEnlargement: true })
        .jpeg({ quality: JPEG_KVALITET, mozjpeg: true })
        .toBuffer()

      const vinst = 1 - ny.length / foreBytes
      if (vinst < 0.1) { rapport.push({ namn, foreBytes, efterBytes: ny.length, status: 'lämnad — vinst under 10 %' }); continue }

      if (!dry) {
        const { error: upFel } = await admin.storage.from(BUCKET).upload(namn, ny, {
          upsert: true,
          contentType: 'image/jpeg',
          cacheControl: '2592000', // 30 dagar — rättar även no-cache-arvet
        })
        if (upFel) { rapport.push({ namn, status: `uppladdning misslyckades: ${upFel.message}` }); continue }
      }
      sparadeBytes += foreBytes - ny.length
      rapport.push({ namn, foreBytes, efterBytes: ny.length, vinstProcent: Math.round(vinst * 100), status: dry ? 'dry' : 'omskriven' })
    } catch (e) {
      rapport.push({ namn, status: `fel: ${e instanceof Error ? e.message : String(e)}` })
    }
  }

  return NextResponse.json({
    done: objekt.length < limit,
    nastaOffset: offset + objekt.length,
    behandlade: objekt.length,
    sparadeMB: Math.round(sparadeBytes / 1024 / 102.4) / 10,
    dry,
    rapport,
  })
}
