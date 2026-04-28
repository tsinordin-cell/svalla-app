import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * OAuth callback-route för Supabase.
 * Google (och andra providers) redirectar hit efter autentisering.
 * Vi växlar authorization code mot en session och redirectar vidare.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // "next" kan skickas med från signInWithOAuth via redirectTo-parametern
  const next = searchParams.get('next') ?? '/feed'

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Säkerhetskontroll: tillåt bara interna sökvägar
      const safeNext = next.startsWith('/') && !next.startsWith('//') ? next : '/feed'
      return NextResponse.redirect(`${origin}${safeNext}`)
    }

    console.error('[auth/callback] exchangeCodeForSession error:', error.message)
  }

  // Autentiseringen misslyckades — skicka tillbaka till inlogg med felindikator
  return NextResponse.redirect(`${origin}/logga-in?error=oauth_failed`)
}
