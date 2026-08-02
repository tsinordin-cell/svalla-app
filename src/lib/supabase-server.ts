import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

/**
 * Publik server-klient — läser INTE cookies.
 *
 * Varför den finns (2026-08-02): `cookies()` gör en sida dynamisk i Next.js.
 * En sida som anropar createServerSupabaseClient kan därför aldrig cachas,
 * oavsett vad `export const revalidate` säger — den byggs om vid varje besök.
 * Det gällde /upptack/[id] (699 sidor) trots att sidan inte använder auth
 * över huvud taget, och är samma sak som tvingade /o/[slug] (824 sidor) till
 * force-dynamic.
 *
 * Använd den här på publika sidor som bara läser data med publik läspolicy
 * (restaurants, trips, place_photos, reviews m.fl. har alla
 * `for select using (true)`). Då fungerar ISR och sidorna serveras från CDN.
 *
 * Använd INTE den när sidan behöver veta vem som är inloggad, eller läser
 * något som RLS skyddar per användare — då krävs createServerSupabaseClient.
 */
export function createPublicSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  )
}

/**
 * Server-side Supabase client — läser auth från cookies.
 * Använd i server components, route handlers och server actions.
 * Exporterar bara createClient (samma namn som browser-versionen) för enkel drop-in.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server component — kan inte sätta cookies, ignorera
          }
        },
      },
    }
  )
}
