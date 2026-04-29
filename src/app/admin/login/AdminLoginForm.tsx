'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AdminLoginForm() {
  const router = useRouter()
  const search = useSearchParams()
  const returnTo = search.get('returnTo') || '/admin'

  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading' || !password) return
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j.error || 'Fel lösenord')
        setStatus('error')
        return
      }
      // Cookien är satt — gå till destinationen
      router.replace(returnTo)
    } catch {
      setError('Nätverksfel — försök igen')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Lösenord"
        autoFocus
        autoComplete="current-password"
        style={{
          padding: '12px 14px',
          borderRadius: 10,
          border: '1.5px solid #d8d2c2',
          fontSize: 15,
          fontFamily: 'inherit',
          outline: 'none',
        }}
      />

      <button
        type="submit"
        disabled={status === 'loading' || !password}
        style={{
          padding: '12px 20px', borderRadius: 10,
          background: status === 'loading' || !password ? '#7da7be' : '#1e5c82',
          color: '#fff', fontSize: 14, fontWeight: 700,
          border: 'none',
          cursor: status === 'loading' ? 'wait' : (!password ? 'not-allowed' : 'pointer'),
        }}
      >
        {status === 'loading' ? 'Verifierar…' : 'Logga in'}
      </button>

      {error && (
        <div role="alert" style={{
          fontSize: 13, color: '#d44d4d',
          textAlign: 'center', padding: '8px',
          background: 'rgba(212,77,77,0.08)',
          borderRadius: 8,
        }}>
          {error}
        </div>
      )}
    </form>
  )
}
