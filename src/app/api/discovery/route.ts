export const dynamic = 'force-dynamic'

import { getAdminClient } from '@/lib/supabase-admin'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { hamtaPlatslista, type Plats } from '@/lib/platslista'


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
    // Samma rader som /upptack renderar på servern – se src/lib/platslista.ts
    // (projektionen och varför google_photo_refs inte skickas med).
    let projected: Plats[]
    try {
      projected = await hamtaPlatslista(supabase)
    } catch (e) {
      return NextResponse.json({ error: e instanceof Error ? e.message : 'Fel' }, { status: 500 })
    }

    // POI-listan uppdateras bara via /admin → aggressiv cache är säker.
    //
    // BUGG (hittad 2026-08-02): headern var tidigare
    // `private, s-maxage=3600, stale-while-revalidate=86400`. `private`
    // förbjuder delade cachar, vilket gör både s-maxage och SWR verkningslösa —
    // Vercel svarade `x-vercel-cache: MISS` på VARJE anrop och hela listan
    // (587 kB) byggdes om från databasen för varje besökare på kartan.
    // Kommentaren påstod "aggressiv cache är säker" medan koden gjorde tvärtom.
    //
    // max-age=60 (revision 2026-10-02, P1-3): /upptack preloadar det här svaret
    // från HTML:en. Med max-age=0 räknar webbläsaren det förladdade svaret som
    // gammalt och hämtar om det när fetch() körs – två nedladdningar i stället
    // för en (provat i Chromium 2026-10-03: max-age=0 → 2 anrop, max-age=60 → 1).
    // Listan ändras bara via /admin och ligger ändå en timme i CDN:en.
    return NextResponse.json(projected, {
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400' },
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
