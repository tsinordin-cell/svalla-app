export const dynamic = 'force-dynamic'

import { getAdminClient } from '@/lib/supabase-admin'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') ?? 'poi'

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
    },
  )

  // Auth krävs BARA för heatmapen. Den bygger på användarnas GPS-spår och är
  // känslig data. `poi` och `routes` returnerar samma publika platsdata som
  // redan visas på /upptack/*-sidorna — där finns inget att skydda, och
  // auth-kravet hindrade dessutom all delad cachning (se nedan).
  //
  // PRESTANDA (2026-08-02): `auth.getUser()` är ett nätverksanrop mot Supabase.
  // Att hoppa över det för poi/routes tar bort ett helt led från svarstiden.
  if (type === 'heat') {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (type === 'heat') {
    const minLat = parseFloat(searchParams.get('min_lat') ?? '55')
    const minLng = parseFloat(searchParams.get('min_lng') ?? '14')
    const maxLat = parseFloat(searchParams.get('max_lat') ?? '60')
    const maxLng = parseFloat(searchParams.get('max_lng') ?? '20')
    const zoom   = parseInt(searchParams.get('zoom') ?? '10', 10)

    const admin = getAdminClient()
    const { data, error } = await admin.rpc('gps_heat', {
      min_lat: minLat,
      min_lng: minLng,
      max_lat: maxLat,
      max_lng: maxLng,
      zoom,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'private, s-maxage=3600, stale-while-revalidate=300' },
    })
  }

  if (type === 'poi') {
    const { data, error } = await supabase
      .from('restaurants')
      .select('id, name, latitude, longitude, type, categories, description, image_url, slug, island, archipelago_region, google_photo_refs')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Projicera image_url så Google-foton används automatiskt om de finns.
    // Då slipper UpptackExplorer ha någon special-logik — den använder bara image_url.
    // Bygger thumbnail-storlek (w=400) för list-kort/markers.
    type RawRow = {
      id: string; name: string; latitude: number; longitude: number;
      type: string | null; categories: string[] | null; description: string | null;
      image_url: string | null; slug: string | null; island: string | null;
      archipelago_region: string | null;
      google_photo_refs: { reference: string }[] | null;
    }
    const projected = (data as RawRow[] | null ?? []).map((r) => {
      let imageUrl = r.image_url
      const ref = r.google_photo_refs?.[0]?.reference
      if (ref) {
        const encoded = Buffer.from(ref, 'utf-8').toString('base64url')
        imageUrl = `/api/places/photo/${encoded}?w=400`
      }
      // Skicka inte med tunga google_photo_refs i list-svaret (kan vara ~3KB per plats × 288 = 1MB)
      return {
        id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude,
        type: r.type, categories: r.categories,
        // Beskrivningen klipps till två rader med CSS i UpptackExplorer, så
        // allt över ~300 tecken syns aldrig. Den var den
        // enskilt tyngsta posten i svaret (699 platser × full text).
        // Sökningen matchar fortfarande mot den korta texten.
        description: r.description ? r.description.slice(0, 300) : null,
        image_url: imageUrl, slug: r.slug, island: r.island,
        archipelago_region: r.archipelago_region,
      }
    })

    // POI-listan uppdateras bara via /admin → aggressiv cache är säker.
    //
    // BUGG (hittad 2026-08-02): headern var tidigare
    // `private, s-maxage=3600, stale-while-revalidate=86400`. `private`
    // förbjuder delade cachar, vilket gör både s-maxage och SWR verkningslösa —
    // Vercel svarade `x-vercel-cache: MISS` på VARJE anrop och hela listan
    // (587 kB) byggdes om från databasen för varje besökare på kartan.
    // Kommentaren påstod "aggressiv cache är säker" medan koden gjorde tvärtom.
    return NextResponse.json(projected, {
      headers: { 'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
    })
  }

  if (type === 'routes') {
    const { data, error } = await supabase
      .from('routes')
      .select('id, name, description, distance, difficulty, waypoints')
      .order('distance', { ascending: false })
      .limit(20)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    // Samma sak här: `private` gjorde s-maxage verkningslös. Se kommentaren ovan.
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=60' },
    })
  }

  return NextResponse.json({ error: 'Okänd typ' }, { status: 400 })
}
