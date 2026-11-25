// ENDAST FÖR TESTGRENEN test-inloggad-profil. Får aldrig nå main.
// Låtsas att en påhittad användare är inloggad i webbläsaren, så att
// inloggat läge kan fotas utan riktig inloggning. Alla skrivningar mot
// databasen stoppas här, så inget kan ändras i produktionsdata.
export const TESTANVANDARE = {
  id: '00000000-0000-4000-8000-00000000test'.replace('test', '0001'),
  aud: 'authenticated',
  role: 'authenticated',
  email: 'test@example.invalid',
  app_metadata: {},
  user_metadata: {},
  created_at: '2026-01-01T00:00:00Z',
}

let installerad = false
export function installeraTestInloggning(auth: any): void {
  if (typeof window === 'undefined') return
  auth.getUser = async () => ({ data: { user: TESTANVANDARE }, error: null })
  auth.getSession = async () => ({
    data: { session: { user: TESTANVANDARE, access_token: 'test', token_type: 'bearer', expires_in: 3600, refresh_token: 'test' } },
    error: null,
  })
  if (installerad) return
  installerad = true
  const foljer = new URLSearchParams(window.location.search).get('foljer') === '1'
  const orig = window.fetch.bind(window)
  window.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
    const metod = (init?.method ?? (input instanceof Request ? input.method : 'GET')).toUpperCase()
    if (url.includes('.supabase.co/')) {
      if (metod !== 'GET' && metod !== 'HEAD') {
        return new Response('[]', { status: 200, headers: { 'content-type': 'application/json' } })
      }
      if (foljer && url.includes('/rest/v1/follows') && url.includes('follower_id=eq.' + TESTANVANDARE.id)) {
        return new Response(JSON.stringify({ id: 'test' }), { status: 200, headers: { 'content-type': 'application/json' } })
      }
    }
    return orig(input as any, init)
  }) as typeof window.fetch
}
