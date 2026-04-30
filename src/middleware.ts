import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PROTECTED_ROUTES = ['/feed', '/profil', '/spara', '/logga', '/notiser', '/sok', '/topplista', '/rutter']

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── 1. /admin/* — admin-cookie-gate (ovanpå Supabase-auth) ──
  if (isAdminRoute(pathname)) {
    const adminCookie = request.cookies.get('svalla_admin')?.value
    if (adminCookie !== 'ok') {
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
