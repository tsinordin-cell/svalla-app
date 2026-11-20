'use client'
/**
 * Välj nytt lösenord: dit länken i återställningsmejlet leder.
 *
 * VARFÖR (2026-11-20): /glomt-losenord skickade länken till
 * https://svalla.se/nytt-losenord, men sidan fanns inte (404). Ingen kod satte
 * ett nytt lösenord, så den som glömt sitt lösenord kom aldrig in igen.
 *
 * Länken kan komma i tre former, beroende på Supabase-inställningar och mall:
 * - ?code=…  (PKCE, standard i @supabase/ssr). Växlas mot en session med
 *   kodverifieraren som sparades i webbläsaren när länken begärdes. Öppnas
 *   länken i en annan webbläsare (t.ex. mejlappens egen) finns ingen
 *   verifierare, och då säger sidan det rakt ut.
 * - ?token_hash=…&type=recovery  (om mejlmallen byts till token_hash; fungerar
 *   i alla webbläsare). Verifieras med verifyOtp.
 * - #access_token=…&type=recovery  (äldre implicit flöde). Klienten läser det själv.
 * - ?error=…/#error=…  (utgången eller redan använd länk).
 * När det finns en session byts lösenordet med auth.updateUser({ password }).
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { sessionKommerFranLank } from '@/lib/aterstallningsSession'

type Lage = 'kontrollerar' | 'formular' | 'ogiltig' | 'klar'

function felText(m: string): string {
  const s = m.toLowerCase()
  if (s.includes('should be different') || s.includes('same_password')) return 'Välj ett annat lösenord än det du hade.'
  if (s.includes('at least') || s.includes('weak')) return 'Lösenordet måste vara minst 6 tecken.'
  if (s.includes('session') || s.includes('jwt') || s.includes('expired')) return 'Länken har gått ut. Begär en ny länk och försök igen.'
  return 'Det gick inte att byta lösenord. Försök igen, eller begär en ny länk.'
}

export default function NyttLosenordPage() {
  const router = useRouter()
  const [supabase] = useState(() => createClient())
  const [lage, setLage] = useState<Lage>('kontrollerar')
  const [orsak, setOrsak] = useState('')
  const [losen, setLosen] = useState('')
  const [igen, setIgen] = useState('')
  const [visa, setVisa] = useState(false)
  const [sparar, setSparar] = useState(false)
  const [fel, setFel] = useState('')

  useEffect(() => {
    let avbruten = false
    async function kontrollera() {
      const url = new URL(window.location.href)
      const hash = new URLSearchParams(url.hash.replace(/^#/, ''))
      const felParam = url.searchParams.get('error_description') ?? hash.get('error_description')
      if (felParam) {
        if (!avbruten) { setOrsak('Länken har gått ut eller har redan använts.'); setLage('ogiltig') }
        return
      }

      const tokenHash = url.searchParams.get('token_hash')
      const typ = url.searchParams.get('type')
      const kod = url.searchParams.get('code')
      try {
        if (tokenHash && typ === 'recovery') {
          await supabase.auth.verifyOtp({ type: 'recovery', token_hash: tokenHash })
        }
        // Klienten växlar ?code själv när den startar (detectSessionInUrl).
        // getSession väntar in det; finns ingen session efteråt provar vi själva.
        let { data: { session } } = await supabase.auth.getSession()
        if (!session && kod) {
          await supabase.auth.exchangeCodeForSession(kod)
          ;({ data: { session } } = await supabase.auth.getSession())
        }
        // RÄTTAT 2026-11-20 (mätt i loggarna): länken begärdes på datorn och
        // öppnades på telefonen. Koden gick inte att växla där, men telefonen
        // hade en gammal, redan utloggad session sparad. Sidan nöjde sig med
        // den, visade formuläret, och sparandet föll med "Länken har gått ut".
        // Nu krävs att sessionen kommer från länken (lib/aterstallningsSession)
        // och att servern känner igen den.
        if (session && !sessionKommerFranLank(session.access_token)) session = null
        if (session) {
          const { data: { user }, error } = await supabase.auth.getUser()
          if (error || !user) session = null
        }
        if (avbruten) return
        if (session) {
          // Ta bort koden ur adressen så att en omladdning inte försöker växla den igen.
          window.history.replaceState(null, '', '/nytt-losenord')
          setLage('formular')
        } else {
          setOrsak(kod
            ? 'Länken måste öppnas i samma webbläsare och på samma enhet som du begärde den i. Begär en ny länk här, så fungerar den.'
            : 'Den här sidan öppnas via länken i återställningsmejlet.')
          setLage('ogiltig')
        }
      } catch {
        if (!avbruten) {
          setOrsak('Länken gick inte att använda. Öppna den i samma webbläsare som du begärde den i, eller begär en ny.')
          setLage('ogiltig')
        }
      }
    }
    kontrollera()
    return () => { avbruten = true }
  }, [supabase])

  async function spara(e: React.FormEvent) {
    e.preventDefault()
    setFel('')
    if (losen.length < 6) { setFel('Lösenordet måste vara minst 6 tecken.'); return }
    if (losen !== igen) { setFel('Lösenorden matchar inte.'); return }
    setSparar(true)
    const { error } = await supabase.auth.updateUser({ password: losen })
    setSparar(false)
    if (error) { setFel(felText(error.message)); return }
    setLage('klar')
  }

  const falt: React.CSSProperties = {
    width: '100%', padding: '14px 16px', borderRadius: 16, boxSizing: 'border-box',
    background: 'rgba(10,123,140,0.06)', border: '1.5px solid rgba(10,123,140,0.15)',
    fontSize: 15, color: 'var(--txt)', outline: 'none', fontFamily: 'inherit',
  }
  const knapp: React.CSSProperties = {
    display: 'block', width: '100%', textAlign: 'center', padding: '15px 0', borderRadius: 16, border: 'none',
    cursor: 'pointer', background: 'var(--grad-sea)', color: '#fff', fontSize: 16, fontWeight: 600,
    boxShadow: '0 4px 20px rgba(30,92,130,0.35)', textDecoration: 'none',
  }

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(180deg, #0e3d52 0%, #1e5c82 50%, #f7fbfc 100%)',
    }}>
      <div style={{ flex: '0 0 auto', padding: '48px 24px 36px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
          Välj nytt lösenord
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          Sedan loggar du in som vanligt
        </p>
      </div>

      <div style={{ flex: 1, background: 'var(--bg)', borderRadius: '28px 28px 0 0', padding: '32px 24px', boxShadow: '0 -8px 32px rgba(0,30,50,0.15)' }}>
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          {lage === 'kontrollerar' && (
            <p role="status" style={{ textAlign: 'center', color: 'var(--txt3)', fontSize: 14 }}>Kontrollerar länken…</p>
          )}

          {lage === 'ogiltig' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>Länken fungerar inte</h2>
              <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, margin: 0 }}>{orsak}</p>
              <Link href="/glomt-losenord" style={knapp}>Begär en ny länk</Link>
            </div>
          )}

          {lage === 'formular' && (
            <form onSubmit={spara} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label htmlFor="nytt-losen" style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt2)' }}>Nytt lösenord (minst 6 tecken)</label>
              <input id="nytt-losen" type={visa ? 'text' : 'password'} autoComplete="new-password" minLength={6} required
                value={losen} onChange={e => setLosen(e.target.value)} style={falt} />
              <label htmlFor="nytt-losen-igen" style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt2)' }}>Skriv lösenordet igen</label>
              <input id="nytt-losen-igen" type={visa ? 'text' : 'password'} autoComplete="new-password" minLength={6} required
                value={igen} onChange={e => setIgen(e.target.value)} style={falt} />
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--txt2)' }}>
                <input type="checkbox" checked={visa} onChange={e => setVisa(e.target.checked)} /> Visa lösenord
              </label>
              {fel && (
                <p role="alert" style={{ fontSize: 13, color: 'var(--red)', background: '#fdeaea', borderRadius: 12, padding: '10px 14px', margin: 0, textAlign: 'center' }}>{fel}</p>
              )}
              <button type="submit" className="press-feedback" disabled={sparar} style={{ ...knapp, opacity: sparar ? 0.65 : 1 }}>
                {sparar ? 'Sparar…' : 'Spara nytt lösenord'}
              </button>
            </form>
          )}

          {lage === 'klar' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'center' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>Lösenordet är bytt</h2>
              <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, margin: 0 }}>
                Du är inloggad. Nästa gång loggar du in med ditt nya lösenord.
              </p>
              <button type="button" className="press-feedback" onClick={() => router.push('/feed')} style={knapp}>Fortsätt till Svalla</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
