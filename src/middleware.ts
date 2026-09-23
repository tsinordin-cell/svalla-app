import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { verifyAdminToken } from '@/lib/adminToken'

// Defense-in-depth: middleware-baserad auth-gate. Varje page har också egen
// auth-check, men listan här fångar om någon framtida sida glömmer redirect.
const PROTECTED_ROUTES = [
  '/feed', '/profil', '/spara', '/logga', '/notiser',
  '/planera', '/sparade', '/meddelanden', '/min-skargard',
  '/onboarding', '/check-in', '/loppis/sparat', '/loppis/mina-annonser',
]

// Routes som har en publik version för utloggade besökare —
// de redirectar till den publika sidan istället för /logga-in.
const PUBLIC_FALLBACK: Record<string, string> = {
  '/rutter': '/oar',
}

// /admin/* kräver dessutom ett separat admin-lösenord (cookie-gate ovanpå Supabase-auth).
// /admin/login är publik (formuläret som sätter cookien). /api/admin/auth tar emot POST.
function isAdminRoute(pathname: string): boolean {
  if (!pathname.startsWith('/admin')) return false
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) return false
  if (pathname.startsWith('/api/admin/auth')) return false
  return true
}

// Permanent 308-redirects för URL:er som ändrats — Google uppdaterar sin index
// och gamla länkar fortsätter fungera.
const PERMANENT_REDIRECTS: Record<string, string> = {
  '/forum/nybörjare': '/forum/nyborjare',
  // URL-encoded version (det Google faktiskt försökte)
  '/forum/nyb%C3%B6rjare': '/forum/nyborjare',
  // Sydkoster är en del av Kosterhavet i vår data — redirect så GSC-juicen behålls
  '/o/sydkoster': '/o/kosterhavet',
  '/o/sydkoster/': '/o/kosterhavet',
}

// ── Dolda platser med Google-trafik → permanent omdirigering ──
// Mätt i Search Console 2026-09-23 (3 mån): flera dolda platser hade klick,
// t.ex. alice-foodtruck-skarhamn 96, furusund-cafe-kiosk 59, blido-sommarcafe 44.
// Utan omdirigering får de besökarna en 404. Regel: dubblett → den riktiga
// platsen (samma verksamhet); post som inte fanns → öns sida, som handlar om
// samma ort. Ingen omdirigering till något som inte svarar på samma fråga.
const DOLD_PLATS_REDIRECT: Record<string, string> = {
  // Dubbletter: samma verksamhet finns under annan slug
  'furusund-cafe-kiosk': '/upptack/furusunds-brygga-restaurang',
  'waxholms-camping-servering': '/upptack/vaxholm-waxholms-camping',
  'gasthamn-gratis-kommunala-gastplatser': '/upptack/norrbergshamnen',
  'sandhamns-vardshus': '/upptack/sandhamn-sandhamns-vardshus',
  'marstrands-vardshus': '/upptack/marstrand-vardshus',
  'marstrand-gasthamn': '/upptack/marstrands-gasthamn',
  'hono-klava-gasthamn': '/upptack/hono-gasthamn',
  'hamburgsund-gasthamn': '/upptack/hamburgsunds-gasthamn',
  'astol-hamnkrog': '/upptack/astols-rokeri-bohuslan',
  'nickstabadet-mini': '/upptack/nickstabadet',
  'rokeriet-pa-fjaderholmarna': '/upptack/rokeriet-fjaderholmarna',
  'namndö-restaurang': '/upptack/namndo-krog',
  'uto-bakficka': '/upptack/bakfickan-uto',
  'seglarrestaurangen-sandhamn': '/upptack/seglarhotellet-sandhamn',
  'motorverkstan-djuro': '/upptack/motorverkstan-bistro-bar',
  'orno-krog': '/upptack/kyrkviken-bar-bistro',
  'orno-naturhamn': '/upptack/orno-gasthamn-och-stugor',
  'vrango-naturhamn': '/upptack/vrango-gasthamn',
  'fjallbacka-vardshus': '/upptack/stora-hotellet-fjallbacka',
  'smogen-brygghus': '/upptack/smogenbryggar-ns-olhall',
  'klintan-sjöstation': '/upptack/circle-k-klintsundet',
  'toro-ankarudden': '/upptack/sjoboden-toro-ankarudden',
  'salt-sill': '/upptack/salt-och-sill-hotell-konferens-och-restaurang-bohuslan',
  // Poster som inte motsvarade en verklig verksamhet → öns sida
  'alice-foodtruck-skarhamn': '/o/tjorn',
  'blido-sommarcafe': '/o/blido',
  'flatons-krog': '/o/orust',
  'styrso-skaret': '/o/styrso',
  'singo-battaxi': '/o/singo',
  'fjallbacka-bensinstation': '/o/fjallbacka',
  'norrora-krog': '/o/norrora',
  'langviks-yttre-gasthamn': '/o/moja',
}

// ── Riktig 404 för okända och dolda platser (/upptack/<slug|uuid>) ──
// Uppmätt 2026-09-23: /upptack/<okänd-slug> och alla dolda platser (65 st vid mätningen) svarade
// HTTP 200 med noindex och texten "Platsen kunde inte hittas" (soft-404), både
// live och i lokalt produktionsbygge, även med Googlebot-UA. Orsaken är samma
// som för /o (se kommentaren vid dynamicParams där): ISR-rutten serveras via
// ett förbyggt skal med status 200 innan sidkoden kör, så notFound() i
// generateMetadata/sidan hinner inte sätta statusen. Testat utan effekt:
// ta bort loading.tsx (båda nivåerna), ta bort [id]/not-found.tsx,
// htmlLimitedBots. dynamicParams=false går inte här — nya platser måste
// kunna visas utan ny deploy.
// Lösning: slå upp platsen här, före skalet. Anon-nyckeln + RLS
// (hidden_at IS NULL) gör att dolda platser också räknas som saknade.
// Omskrivning till en sökväg utan route ger Next.js vanliga 404 med status 404.
// Fel eller timeout mot Supabase => släpp igenom (samma beteende som förut).
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const PLATS_CACHE = new Map<string, { finns: boolean; t: number }>()
const PLATS_TTL_MS = 10 * 60 * 1000

async function platsFinns(idOrSlug: string): Promise<boolean | null> {
  const cached = PLATS_CACHE.get(idOrSlug)
  if (cached && Date.now() - cached.t < PLATS_TTL_MS) return cached.finns
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!base || !key) return null
  const col = UUID_RE.test(idOrSlug) ? 'id' : 'slug'
  try {
    const res = await fetch(
      `${base}/rest/v1/restaurants?select=id&limit=1&${col}=eq.${encodeURIComponent(idOrSlug)}`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(1500) },
    )
    if (!res.ok) return null
    const rows = (await res.json()) as unknown[]
    const finns = Array.isArray(rows) && rows.length > 0
    if (PLATS_CACHE.size > 5000) PLATS_CACHE.clear()
    PLATS_CACHE.set(idOrSlug, { finns, t: Date.now() })
    return finns
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Okänd eller dold plats → riktig 404 (se platsFinns ovan) ──
  const platsMatch = /^\/upptack\/([^/]+)\/?$/.exec(pathname)
  if (platsMatch) {
    let seg = platsMatch[1] ?? ''
    try { seg = decodeURIComponent(seg) } catch { /* ogiltig kodning: slå upp som den är */ }
    const omdirigering = DOLD_PLATS_REDIRECT[seg]
    if (omdirigering) {
      const url = request.nextUrl.clone()
      url.pathname = omdirigering
      url.search = ''
      return NextResponse.redirect(url, 308)
    }
    if (await platsFinns(seg) === false) {
      const url = request.nextUrl.clone()
      url.pathname = '/_plats-saknas'
      url.search = ''
      return NextResponse.rewrite(url)
    }
  }

  // ── 0. Permanent redirects (URL-rename) ──
  const decodedPath = decodeURIComponent(pathname)
  const redirectTo = PERMANENT_REDIRECTS[pathname] ?? PERMANENT_REDIRECTS[decodedPath]
  if (redirectTo) {
    const url = request.nextUrl.clone()
    url.pathname = redirectTo
    return NextResponse.redirect(url, 308)
  }

  // ── 1. /admin/* — admin-cookie-gate (ovanpå Supabase-auth) ──
  // Cookievärdet är ett HMAC-SHA256-token — kan inte förfalskas utan ADMIN_PASSWORD-env.
  if (isAdminRoute(pathname)) {
    const adminCookie = request.cookies.get('svalla_admin')?.value
    const adminPassword = process.env.ADMIN_PASSWORD
    const valid = adminCookie && adminPassword
      ? await verifyAdminToken(adminCookie, adminPassword)
      : false
    if (!valid) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('returnTo', pathname)
      return NextResponse.redirect(url)
    }
  }

  let isProtected = false
  for (const route of PROTECTED_ROUTES) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      isProtected = true
      break
    }
  }

  // /planera/ny och /planera/<id> är PUBLIKA — hela den anonyma tratten är
  // byggd för det: create-API:t tillåter user_id null ("för att undvika
  // RLS-problem med anonyma användare"), RLS-policyn heter ordagrant
  // "published routes viewable by anyone", SaveRouteCTA visar claim-länkar
  // för utloggade, /api/planera/claim knyter rutten till kontot efteråt,
  // och robots.txt fick "Allow: /planera/" 2026-07-28 för att delbara
  // rutter ska kunna indexeras. Skyddet av hela /planera-trädet bröt allt
  // detta: uppmätt 2026-08-12 — en utloggad besökare kunde slutföra alla
  // tre stegen i guiden, rutten SPARADES, och personen dumpades ändå på
  // "Skapa konto" utan ett ord om att rutten fanns. Det såg ut som att
  // arbetet försvann. Bara ruttlistan (exakt /planera) förblir skyddad —
  // den visar DINA rutter och kräver rimligen inloggning.
  if (pathname === '/planera/ny' || /^\/planera\/[0-9a-f-]{36}$/.test(pathname)) {
    isProtected = false
  }

  if (!isProtected) return NextResponse.next()

  // Skapa en delad response-referens som setAll kan uppdatera.
  // Kritiskt: setAll måste sätta cookies på SAMMA response som returneras —
  // annars försvinner refreshade access-tokens och inloggning misslyckas.
  let supabaseResponse = NextResponse.next({ request })

  let authenticated = false
  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet: Array<{ name: string; value: string; options?: object }>) {
            // Sätt cookies på request (för downstream server components)
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            // Bygg om den delade response-referensen med uppdaterade cookies
            supabaseResponse = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options ?? {})
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    authenticated = !!user
  } catch (err) {
    console.error('[middleware] auth check failed:', err)
    authenticated = false
  }

  if (!authenticated) {
    const url = request.nextUrl.clone()
    const fallback = Object.entries(PUBLIC_FALLBACK).find(([prefix]) =>
      pathname === prefix || pathname.startsWith(prefix + '/')
    )?.[1]
    if (fallback) {
      url.pathname = fallback
      url.search = ''
      return NextResponse.redirect(url)
    }
    url.pathname = '/logga-in'
    url.searchParams.set('returnTo', pathname)
    url.searchParams.set('mode', 'ny')
    return NextResponse.redirect(url)
  }

  // Returnera supabaseResponse — inte NextResponse.next() — så att
  // refreshade session-cookies faktiskt når webbläsaren.
  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/|manifest.json|opengraph-image|og-image.jpg|apple-touch-icon.png|icon-.*\\.png).*)',
  ],
}
