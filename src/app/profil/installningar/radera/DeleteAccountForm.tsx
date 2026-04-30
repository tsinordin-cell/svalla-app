'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteAccountForm() {
  const router = useRouter()
  const [confirm, setConfirm] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const ready = confirm === 'RADERA' && password.length >= 6 && !loading

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
        body: JSON.stringify({ confirm, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'Något gick fel')
        setLoading(false)
        return
      }
      // Redirect till goodbye-sida
      router.replace('/goodbye')
    } catch {
      setError('Nätverksfel — försök igen')
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
