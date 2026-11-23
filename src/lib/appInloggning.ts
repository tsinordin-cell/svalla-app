/**
 * Inloggning med Google i Svalla-appen (2026-11-22).
 *
 * Appen är ett Capacitor-skal runt svalla.se. Capacitor öppnar varje
 * navigering till en annan värd i Safari (WebViewDelegationHandler i
 * @capacitor/ios 8.3.1), så Google-inloggningen sker i Safari. PKCE-
 * verifieraren ligger däremot i appens webbvy. Utan den här vägen landade
 * Safari på /auth/callback utan verifierare och appen förblev utloggad.
 *
 * Vägen nu:
 *  1. Appen startar inloggningen med redirectTo /auth/callback?app=1.
 *  2. Safari kommer tillbaka till /auth/callback?app=1&code=…, som INTE
 *     växlar koden utan skickar den vidare till se.svalla.app://auth/callback.
 *  3. Appen fångar länken (AppLankLyssnare) och laddar
 *     https://svalla.se/auth/callback?code=… i webbvyn, där verifieraren finns.
 *
 * Koden är värdelös utan verifieraren (PKCE), så det är ofarligt att den
 * passerar via appens länkschema.
 */

/** Appens eget länkschema. Registrerat i Info.plist och AndroidManifest.xml. */
export const APP_SCHEMA = 'se.svalla.app'

/** Bara interna sökvägar, aldrig //annan-värd. */
export function sakerNasta(next: string | null | undefined, fallback = '/feed'): string {
  return next && next.startsWith('/') && !next.startsWith('//') ? next : fallback
}

/**
 * Bygger adressen som Safari skickas till efter Google: appens schema med
 * samma frågeparametrar som Supabase gav callbacken, utom app=1.
 */
export function appensTillbakaLank(params: URLSearchParams): string {
  const vidare = new URLSearchParams()
  for (const [k, v] of params) {
    if (k === 'app') continue
    if (k === 'next') { vidare.set('next', sakerNasta(v)); continue }
    vidare.append(k, v)
  }
  const q = vidare.toString()
  return `${APP_SCHEMA}://auth/callback${q ? `?${q}` : ''}`
}

/**
 * Tolkar en länk som öppnade appen. Returnerar sökvägen (med frågedel) som
 * webbvyn ska ladda på svalla.se, eller null om länken inte är vår.
 */
export function webbvagForAppLank(url: string): string | null {
  let u: URL
  try { u = new URL(url) } catch { return null }
  if (u.protocol !== `${APP_SCHEMA}:`) return null
  // se.svalla.app://auth/callback → host "auth", pathname "/callback"
  const vag = `/${u.host}${u.pathname}`.replace(/\/+$/, '')
  if (vag !== '/auth/callback') return null
  const params = new URLSearchParams(u.search)
  params.delete('app')
  const next = params.get('next')
  if (next !== null) params.set('next', sakerNasta(next))
  const q = params.toString()
  return `/auth/callback${q ? `?${q}` : ''}`
}

/** Körs sidan inne i Svalla-appen (iOS eller Android)? */
export async function arIApp(): Promise<boolean> {
  if (typeof window === 'undefined') return false
  try {
    const { Capacitor } = await import('@capacitor/core')
    return Capacitor.isNativePlatform()
  } catch {
    return false
  }
}

/** Körs sidan inne i iOS-appen? */
export async function arIIosApp(): Promise<boolean> {
  if (typeof window === 'undefined') return false
  try {
    const { Capacitor } = await import('@capacitor/core')
    return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios'
  } catch {
    return false
  }
}

/**
 * Adressen Google ska skicka tillbaka till. I appen läggs app=1 till, se ovan.
 * villkor: versionen användaren godkände, sparas på kontot i callbacken.
 */
export function oauthTillbakaUrl(origin: string, opts: { next: string; iApp: boolean; villkor?: string }): string {
  const u = new URL(`${origin}/auth/callback`)
  u.searchParams.set('next', sakerNasta(opts.next))
  if (opts.villkor) u.searchParams.set('villkor', opts.villkor)
  if (opts.iApp) u.searchParams.set('app', '1')
  return u.toString()
}

export type OAuthLeverantor = 'google' | 'apple'

/** Logga in med Apple visas först när Apple och Supabase är inställda och flaggan är på. */
export function appleInloggningPa(): boolean {
  return process.env.NEXT_PUBLIC_APPLE_INLOGGNING === 'true'
}

type OAuthKlient = {
  auth: {
    signInWithOAuth: (args: {
      provider: OAuthLeverantor
      options: { redirectTo: string; queryParams?: Record<string, string> }
    }) => Promise<{ error: { message: string } | null }>
  }
}

/**
 * Startar inloggning med Google eller Apple, på webben som förut och i appen
 * via Safari. Returnerar felet (om något) och om vi är i appen: där lämnar
 * sidan webbvyn till Safari och knappen ska inte snurra kvar när man kommer tillbaka.
 */
export async function startaOAuthInloggning(
  supabase: OAuthKlient,
  provider: OAuthLeverantor,
  opts: { next: string; villkor?: string; queryParams?: Record<string, string> },
): Promise<{ error: { message: string } | null; iApp: boolean }> {
  const iApp = await arIApp()
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: oauthTillbakaUrl(location.origin, { next: opts.next, iApp, villkor: opts.villkor }),
      ...(opts.queryParams ? { queryParams: opts.queryParams } : {}),
    },
  })
  return { error, iApp }
}

/** Google-inloggning, se startaOAuthInloggning. */
export function startaGoogleInloggning(
  supabase: OAuthKlient,
  opts: { next: string; villkor?: string; queryParams?: Record<string, string> },
): Promise<{ error: { message: string } | null; iApp: boolean }> {
  return startaOAuthInloggning(supabase, 'google', opts)
}
