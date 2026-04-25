import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PROTECTED_ROUTES = ['/feed', '/profil', '/spara', '/logga', '/notiser', '/sok', '/topplista']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  let isProtected = false
  for (const route of PROTECTED_ROUTES) {
    if (pathname === route || pathname.startsWith(route + '/')) {
      isProtected = true
      break
    }
  }

  if (!isProtected) return NextResponse.next()

  let authenticated = false
  try {
    const cookieStore = request.cookies
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
           
          setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
            const response = NextResponse.next()
            for (const { name, value, options } of cookiesToSet) {
              response.cookies.set(name, value, options)
            }
            return response
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()
    authenticated = !!user
  } catch (err) {
    // Log so errors surface in Vercel function logs — don't silently swallow them
    console.error('[middleware] auth check failed:', err)
    authenticated = false
  }

  if (!authenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/logga-in'
    url.searchParams.set('returnTo', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/|manifest.json|opengraph-image|og-image.jpg|apple-touch-icon.png|icon-.*\\.png).*)',
  ],
}
