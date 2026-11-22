'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

type Props = {
  /** Har kontot ett lösenord? */
  medLosenord: boolean
  /** Har kontot Google kopplat? */
  medGoogle: boolean
  /** Är inloggningen högst tio minuter gammal? Då behövs ingen mer bekräftelse. */
  nyssInloggad: boolean
  epost: string | null
}

/**
 * Bekräftelse (2026-11-22, lib/kontoBekraftelse.ts): en färsk inloggning
 * räcker; annars lösenordet eller en ny inloggning med Google. Sista steget
 * är en egen fråga i formuläret i stället för webbläsarens ruta.
 */
export default function DeleteAccountForm({ medLosenord, medGoogle, nyssInloggad, epost }: Props) {
  const router = useRouter()
  const [confirm, setConfirm] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [oppnarGoogle, setOppnarGoogle] = useState(false)
  const [sistaSteget, setSistaSteget] = useState(false)

  const bekraftad = nyssInloggad || (medLosenord && password.length >= 6)
  const ready = confirm.trim().toUpperCase() === 'RADERA' && bekraftad && !loading

  // Logga in igen med Google och kom tillbaka hit. Samma väg som vanlig inloggning.
  async function loggaInIgen() {
    setError('')
    setOppnarGoogle(true)
    const tillbaka = new URL(`${location.origin}/auth/callback`)
    tillbaka.searchParams.set('next', '/profil/installningar/radera')
    const { error: fel } = await createClient().auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: tillbaka.toString(), queryParams: { prompt: 'select_account' } },
    })
    if (fel) {
      setError('Det gick inte att öppna Google. Försök igen.')
      setOppnarGoogle(false)
    }
  }

  function forsta(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (ready) setSistaSteget(true)
  }

  async function radera() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/account/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(!nyssInloggad && password ? { confirm: 'RADERA', password } : { confirm: 'RADERA' }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'Något gick fel')
        setLoading(false)
        setSistaSteget(false)
        return
      }
      // revision 2026-10-02: logga ut även i webbläsarklienten, så att
      // komponenter som lyssnar på onAuthStateChange (Nav m.fl.) får
      // SIGNED_OUT. Servern har redan tagit bort sessionens cookies, så det
      // blir normalt inget nätverksanrop. Fel får inte stoppa omdirigeringen.
      try {
        await createClient().auth.signOut({ scope: 'local' })
      } catch {
        // ignoreras
      }
      router.replace('/goodbye')
    } catch {
      setError('Nätverksfel: försök igen')
      setLoading(false)
      setSistaSteget(false)
    }
  }

  return (
    <form onSubmit={forsta} style={{
      background: 'var(--card-bg, #fff)',
      borderRadius: 18,
      border: '1px solid var(--border, rgba(10,31,43,0.08))',
      boxShadow: '0 8px 28px rgba(10,31,43,0.08)',
      padding: '22px',
    }}>
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 18, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px',
      }}>
        Bekräfta
      </h2>
      {epost && (
        <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--txt3)', lineHeight: 1.5 }}>
          Kontot som raderas: <strong style={{ color: 'var(--txt)', fontWeight: 600 }}>{epost}</strong>
        </p>
      )}

      <label htmlFor="radera-ord" style={etikett}>Skriv RADERA</label>
      <input
        id="radera-ord"
        type="text"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
        autoComplete="off"
        autoCapitalize="characters"
        placeholder="RADERA"
        style={{ ...falt, letterSpacing: '0.08em', marginBottom: 18 }}
      />

      <div style={{ marginBottom: 18 }}>
        <span style={etikett}>Bekräfta att det är du</span>
        {nyssInloggad ? (
          <p style={{
            margin: 0, padding: '11px 14px', borderRadius: 12, fontSize: 13, lineHeight: 1.5,
            background: 'rgba(10,123,140,0.07)', color: 'var(--txt2)',
          }}>
            Du loggade in nyss, så det räcker. Bekräftelsen gäller i tio minuter efter inloggningen.
          </p>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {medGoogle && (
              <button type="button" onClick={loggaInIgen} disabled={oppnarGoogle} style={sekundar}>
                {oppnarGoogle ? 'Öppnar Google…' : 'Bekräfta med Google'}
              </button>
            )}
            {medGoogle && medLosenord && (
              <div aria-hidden="true" style={{ textAlign: 'center', fontSize: 12, color: 'var(--txt3)' }}>eller</div>
            )}
            {medLosenord && (
              <input
                type="password"
                aria-label="Ditt lösenord"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Ditt lösenord"
                style={falt}
              />
            )}
            {!medGoogle && !medLosenord && (
              <p style={{ margin: 0, fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>
                Logga ut och in igen, så kommer du tillbaka hit och kan radera kontot.
              </p>
            )}
          </div>
        )}
      </div>

      {error && (
        <div role="alert" style={{
          padding: '10px 14px', borderRadius: 12, marginBottom: 14,
          background: 'rgba(185,28,28,0.07)', color: '#b91c1c', fontSize: 13, fontWeight: 600,
        }}>
          {error}
        </div>
      )}

      {sistaSteget ? (
        <div style={{
          padding: 16, borderRadius: 14, background: 'rgba(185,28,28,0.05)',
          border: '1px solid rgba(185,28,28,0.18)',
        }}>
          <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--txt)', lineHeight: 1.5 }}>
            Sista steget. Allt raderas nu och går inte att få tillbaka.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" onClick={() => setSistaSteget(false)} disabled={loading} style={{ ...sekundar, flex: 1, minWidth: 120 }}>
              Avbryt
            </button>
            <button type="button" onClick={radera} disabled={loading} style={{ ...farlig(true), flex: 1.4, minWidth: 160 }}>
              {loading ? 'Raderar…' : 'Ja, radera kontot'}
            </button>
          </div>
        </div>
      ) : (
        <button type="submit" disabled={!ready} style={farlig(ready)}>
          Radera mitt konto
        </button>
      )}
    </form>
  )
}

const etikett: React.CSSProperties = {
  display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--txt)', marginBottom: 8,
}

const falt: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box', minHeight: 46,
  padding: '12px 14px', borderRadius: 12,
  border: '1px solid rgba(10,31,43,0.14)',
  background: 'var(--white, #fff)',
  fontSize: 15, color: 'var(--txt)', fontFamily: 'inherit',
}

const sekundar: React.CSSProperties = {
  width: '100%', minHeight: 46, padding: '12px 16px', borderRadius: 12,
  border: '1px solid rgba(10,31,43,0.14)', background: 'var(--white, #fff)',
  fontSize: 14, fontWeight: 600, color: 'var(--txt)', fontFamily: 'inherit', cursor: 'pointer',
}

function farlig(aktiv: boolean): React.CSSProperties {
  return {
    width: '100%', minHeight: 48, padding: '13px 20px', borderRadius: 12, border: 'none',
    background: aktiv ? '#b91c1c' : 'rgba(185,28,28,0.14)',
    color: aktiv ? '#fff' : 'rgba(185,28,28,0.55)',
    fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
    cursor: aktiv ? 'pointer' : 'default',
    boxShadow: aktiv ? '0 6px 18px rgba(185,28,28,0.25)' : 'none',
    transition: 'background 0.15s, box-shadow 0.15s',
  }
}
