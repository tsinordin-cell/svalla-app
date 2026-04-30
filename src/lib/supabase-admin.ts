/**
 * supabase-admin.ts
 * Singleton service-role Supabase-klient för server-side admin-operationer.
 *
 * Denna klient kringgår RLS och ska ALDRIG exponeras klientsidan.
 * Använd bara i Route Handlers, Server Actions och lib-funktioner som körs server-side.
 *
 * Singleton-mönstret: i Vercel Lambda-processer överlever modul-level variabler
 * mellan anrop (warm starts), vilket undviker onödig klient-instansiering per request.
 *
 * OBS: Appen använder Supabase JS-klienten (HTTP/REST), inte direkta PostgreSQL-connections.
 * Traditionell pgBouncer-pooling gäller inte här. Om direkta pg-connections tillkommer,
 * konfigurera pooler-URL (port 6543, transaction mode) i Supabase Dashboard → Settings → Database.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _adminClient: SupabaseClient | null = null

export function getAdminClient(): SupabaseClient {
  if (_adminClient) return _adminClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('[supabase-admin] NEXT_PUBLIC_SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY saknas')
  }

  _adminClient = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return _adminClient
}
