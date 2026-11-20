'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

type Props = {
  /** Har kontot ett lösenord? Annars bekräftas raderingen med en färsk inloggning. */
  medLosenord: boolean
  /** Är inloggningen högst tio minuter gammal (bara relevant utan lösenord)? */
  nyssInloggad: boolean
  epost: string | null
}

export default function DeleteAccountForm({ medLosenord, nyssInloggad, epost }: Props) {
  const router = useRouter()
  const [confirm, setConfirm] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [oppnarGoogle, setOppnarGoogle] = useState(false)

  const bekraftad = medLosenord ? password.length >= 6 : nyssInloggad
  const ready = confirm === 'RADERA' && bekraftad && !loading

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!ready) return
    if (!confirm.length) {
      setError('Skriv RADERA för att bekräfta')
      return
    }

    const finalConfirm = window.confirm(
      'Är du säker? Detta tar bort allt permanent. Klicka OK för att fortsätta.'
    )
    if (!finalConfirm) return

    setLoading(true)
    try {
      const res = await fetch('/api/account/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medLosenord ? { confirm, password } : { confirm }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'Något gick fel')
        setLoading(false)
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
      // Redirect till goodbye-sida
      router.replace('/goodbye')
    } catch {
      setError('Nätverksfel: försök igen')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'var(--card-bg, #fff)',
      borderRadius: 16,
      border: '1px solid var(--border, rgba(10,123,140,0.10))',
      padding: '20px 22px',
      boxShadow: '0 2px 12px rgba(10,31,43,0.06)',
    }}>
      {epost && (
        <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>
          Kontot som raderas: <strong style={{ color: 'var(--txt)' }}>{epost}</strong>
        </p>
      )}

      <label style={{ display: 'block', marginBottom: 16 }}>
        <span style={{
          display: 'block', fontSize: 13, fontWeight: 700,
          color: 'var(--txt)', marginBottom: 6,
        }}>
          Skriv <code style={{ background: 'rgba(239,68,68,0.10)', color: '#dc2626', padding: '1px 6px', borderRadius: 4, fontFamily: 'monospace' }}>RADERA</code> för att bekräfta
        </span>
        <input
          type="text"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          autoComplete="off"
          placeholder="RADERA"
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '11px 14px', borderRadius: 10,
            border: '1.5px solid rgba(10,123,140,0.15)',
            background: 'rgba(10,123,140,0.02)',
            fontSize: 15, color: 'var(--txt)',
            fontFamily: 'monospace', outline: 'none',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--sea)'; e.target.style.boxShadow = '0 0 0 3px rgba(10,123,140,0.10)' }}
          onBlur={e => { e.target.style.borderColor = 'rgba(10,123,140,0.15)'; e.target.style.boxShadow = 'none' }}
        />
      </label>

      {medLosenord ? (
      <label style={{ display: 'block', marginBottom: 18 }}>
        <span style={{
          display: 'block', fontSize: 13, fontWeight: 700,
          color: 'var(--txt)', marginBottom: 6,
        }}>
          Bekräfta med ditt lösenord
        </span>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="Ditt nuvarande lösenord"
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '11px 14px', borderRadius: 10,
            border: '1.5px solid rgba(10,123,140,0.15)',
            background: 'rgba(10,123,140,0.02)',
            fontSize: 15, color: 'var(--txt)', outline: 'none',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--sea)'; e.target.style.boxShadow = '0 0 0 3px rgba(10,123,140,0.10)' }}
          onBlur={e => { e.target.style.borderColor = 'rgba(10,123,140,0.15)'; e.target.style.boxShadow = 'none' }}
        />
      </label>
      ) : (
        <div style={{ marginBottom: 18 }}>
          <span style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>
            Bekräfta att det är du
          </span>
          {nyssInloggad ? (
            <p style={{ margin: 0, fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>
              Du har nyss loggat in med Google. Bekräftelsen gäller i tio minuter.
            </p>
          ) : (
            <>
              <p style={{ margin: '0 0 10px', fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>
                Ditt konto har inget lösenord. Logga in igen med Google, så kommer du tillbaka hit och kan radera kontot.
              </p>
              <button
                type="button"
                onClick={loggaInIgen}
                disabled={oppnarGoogle}
                style={{
                  width: '100%', minHeight: 44, padding: '11px 14px', borderRadius: 10,
                  border: '1.5px solid rgba(10,123,140,0.15)', background: 'var(--white)',
                  fontSize: 14, fontWeight: 600, color: 'var(--txt)', fontFamily: 'inherit',
                  cursor: oppnarGoogle ? 'default' : 'pointer',
                }}
              >
                {oppnarGoogle ? 'Öppnar Google…' : 'Logga in igen med Google'}
              </button>
            </>
          )}
        </div>
      )}

      {error && (
        <div style={{
          padding: '10px 14px', borderRadius: 10,
          background: 'rgba(239,68,68,0.08)',
          color: '#dc2626', fontSize: 13, fontWeight: 600,
          marginBottom: 14,
        }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!ready}
        style={{
          width: '100%',
          padding: '13px 20px',
          background: ready ? '#dc2626' : 'rgba(239,68,68,0.18)',
          color: ready ? '#fff' : 'rgba(220,38,38,0.5)',
          borderRadius: 12,
          border: 'none',
          fontSize: 14,
          fontWeight: 700,
          cursor: ready ? 'pointer' : 'default',
          transition: 'all 0.15s',
          letterSpacing: '0.02em',
          boxShadow: ready ? '0 3px 12px rgba(220,38,38,0.30)' : 'none',
          fontFamily: 'inherit',
        }}
      >
        {loading ? 'Raderar konto…' : 'Radera mitt konto permanent'}
      </button>
    </form>
  )
}
