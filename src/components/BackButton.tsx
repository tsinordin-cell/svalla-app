'use client'
import { useRouter } from 'next/navigation'

export default function BackButton({ fallback = '/feed' }: { fallback?: string }) {
  const router = useRouter()

  function goBack() {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(fallback)
    }
  }

  return (
    <button
      onClick={goBack}
      aria-label="Gå tillbaka"
      className="press-feedback"
      style={{
        position: 'absolute', top: 16, left: 16,
        width: 40, height: 40, borderRadius: '50%',
        background: 'var(--glass-88)', backdropFilter: 'blur(8px)',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea, #1e5c82)" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  )
}
