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
  if (document.readyState === 'complete') simuleraNotch()
  else window.addEventListener('load', () => { simuleraNotch() })
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

// ?notch=59 : byter env(safe-area-inset-top) mot 59px i sidans riktiga CSS
// (länkade filer, <style> och inline-stilar) och lägger en ritad statusrad
// med Dynamic Island överst, som på en iPhone med notch. Bara testgrenen.
const SAFE = /env\(\s*safe-area-inset-top\s*(,[^()]*(\([^()]*\))?[^()]*)?\)/g
let notchKord = false
export async function simuleraNotch(): Promise<void> {
  if (typeof window === 'undefined' || notchKord) return
  const n = Number(new URLSearchParams(window.location.search).get('notch') ?? '')
  if (!n) return
  notchKord = true
  const byt = (t: string) => t.replace(SAFE, n + 'px')
  for (const l of Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))) {
    try {
      const t = await (await fetch(l.href)).text()
      const s = document.createElement('style'); s.textContent = byt(t)
      l.after(s); l.disabled = true
    } catch {}
  }
  for (const s of Array.from(document.querySelectorAll('style'))) {
    if (s.textContent && SAFE.test(s.textContent)) s.textContent = byt(s.textContent)
    SAFE.lastIndex = 0
  }
  const fixaInline = () => {
    for (const el of Array.from(document.querySelectorAll<HTMLElement>('[style*="safe-area-inset-top"]'))) {
      el.setAttribute('style', byt(el.getAttribute('style') ?? ''))
    }
  }
  fixaInline()
  new MutationObserver(fixaInline).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['style'] })
  const bar = document.createElement('div')
  bar.setAttribute('aria-hidden', 'true')
  bar.style.cssText = `position:fixed;inset:0 0 auto 0;height:${n}px;z-index:2147483647;pointer-events:none;font:600 16px -apple-system,system-ui,sans-serif;color:#fff;mix-blend-mode:difference`
  // Klockan och batteriet ritas som vita block på sina platser i statusraden.
  bar.innerHTML = `<span style="position:absolute;left:36px;top:${Math.round(n / 2) - 8}px;width:44px;height:16px;border-radius:4px;background:#fff"></span><span style="position:absolute;right:28px;top:${Math.round(n / 2) - 7}px;width:70px;height:14px;border-radius:4px;background:#fff"></span>`
  const o = document.createElement('div')
  o.setAttribute('aria-hidden', 'true')
  o.style.cssText = `position:fixed;left:50%;top:11px;width:126px;height:37px;margin-left:-63px;border-radius:20px;background:#000;z-index:2147483647;pointer-events:none`
  document.body.append(bar, o)
}
