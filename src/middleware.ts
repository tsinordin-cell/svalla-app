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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

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
