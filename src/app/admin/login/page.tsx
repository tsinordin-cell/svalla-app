import type { Metadata } from 'next'
import { Suspense } from 'react'
import AdminLoginForm from './AdminLoginForm'

export const metadata: Metadata = {
  title: 'Admin — logga in | Svalla',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '40px 36px',
        maxWidth: 400,
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 16,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 style={{
            fontSize: 22, fontWeight: 700,
            color: '#1e5c82',
            margin: 0,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Svalla Admin
          </h1>
          <p style={{ fontSize: 13, color: '#6b8087', margin: '6px 0 0' }}>
            Skyddad zon — ange lösenord
          </p>
        </div>

        <Suspense fallback={null}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  )
}
