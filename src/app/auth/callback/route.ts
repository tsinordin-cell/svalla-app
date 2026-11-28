import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { appensTillbakaLank, sakerNasta } from '@/lib/appInloggning'
import { arGiltigVillkorsversion } from '@/lib/villkor'
import { HAR_KONTO_KAKA, NY_REGISTRERING_KAKA, franSokvag } from '@/lib/kontoLage'
import { tillGuiden } from '@/lib/guidenForst'

/**
 * Sidan Safari visar när Google-inloggningen startades i appen: skickar
 * vidare till appen (se lib/appInloggning.ts). Ingen kod körs, bara en
 * meta-omdirigering och en knapp om iOS frågar först.
 */
function tillbakaTillAppen(lank: string): NextResponse {
  const esc = lank.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  const html = `<!doctype html><html lang="sv"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0;url=${esc}">
<title>Tillbaka till Svalla</title></head>
<body style="font-family:-apple-system,system-ui,sans-serif;text-align:center;padding:64px 24px;color:#162d3a">
<h1 style="font-size:20px;margin:0 0 12px">Du är nästan inloggad</h1>
<p style="font-size:15px;margin:0 0 24px;color:#4a6272">Öppna Svalla-appen för att slutföra inloggningen.</p>
<a href="${esc}" style="display:inline-block;padding:14px 24px;border-radius:14px;background:#1e5c82;color:#fff;font-weight:600;text-decoration:none">Öppna Svalla</a>
</body></html>`
  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

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

  // Startad i appen: vi är i Safari och saknar appens PKCE-verifierare.
  // Växla inte här, skicka koden (eller felet) vidare till appen.
  if (searchParams.get('app') === '1') {
    return tillbakaTillAppen(appensTillbakaLank(searchParams))
  }

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
          setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      let nyRegistrering: string | null = null
      let forstaInloggning = false
      // Trigga välkomstmail för nyligen skapade konton (icke-blockerande, fail-silent).
      // post-signup-endpointen är idempotent och rate-limitad (1/dygn) + verifierar 5-min-fönster.
      try {
        const { data: { user } } = await supabase.auth.getUser()
        // Nytt konto via Google efter texten "Genom att fortsätta godkänner du
        // användarvillkoren": spara versionen på kontot (samma fält som
        // e-postregistreringen sätter), om den inte redan finns.
        const villkor = searchParams.get('villkor')
        const nyttKonto = !!user && (Date.now() - new Date(user.created_at).getTime()) < 5 * 60_000
        forstaInloggning = nyttKonto
        // Kontotratten (2026-11-23): markera ny registrering så att nästa sida
        // kan skicka user_signup med samtycke (lib/nyRegistrering.ts).
        if (user && nyttKonto) {
          const provider = user.app_metadata?.provider === 'apple' ? 'apple' : user.app_metadata?.provider === 'google' ? 'google' : 'oauth'
          nyRegistrering = `${provider}|${franSokvag(sakerNasta(next)) ?? ''}`
        }
        if (user && nyttKonto && arGiltigVillkorsversion(villkor) && !user.user_metadata?.villkor_version) {
          await supabase.auth.updateUser({
            data: { villkor_version: villkor, villkor_godkanda: new Date().toISOString() },
          }).catch(() => {})
        }
        if (user) {
          const ageMin = (Date.now() - new Date(user.created_at).getTime()) / 60_000
          if (ageMin < 5) {
            // Fire-and-forget — vi väntar inte på svar
            const cookieHeader = cookieStore.getAll()
              .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
              .join('; ')
            fetch(`${origin}/api/auth/post-signup`, {
              method: 'POST',
              headers: { Cookie: cookieHeader },
            }).catch(() => {})
          }
        }
      } catch { /* fail-silent */ }

      // Säkerhetskontroll: tillåt bara interna sökvägar
      const safeNext = sakerNasta(next)
      // Nytt konto: guiden först, sedan sidan personen var på väg till (2026-11-28).
      // Har kontot redan gått igenom guiden skickar /onboarding vidare direkt.
      const mal = forstaInloggning ? tillGuiden(safeNext) : safeNext
      const svar = NextResponse.redirect(`${origin}${mal}`)
      // Webbläsaren har nu ett konto: /logga-in visar inloggning nästa gång.
      svar.cookies.set(HAR_KONTO_KAKA, '1', { maxAge: 60 * 60 * 24 * 365, path: '/', sameSite: 'lax', secure: true })
      if (nyRegistrering) {
        svar.cookies.set(NY_REGISTRERING_KAKA, encodeURIComponent(nyRegistrering), { maxAge: 60 * 60, path: '/', sameSite: 'lax', secure: true })
      }
      return svar
    }

    console.error('[auth/callback] exchangeCodeForSession error:', error.message)
  }

  // Autentiseringen misslyckades — skicka tillbaka till inlogg med felindikator
  return NextResponse.redirect(`${origin}/logga-in?error=oauth_failed`)
}
