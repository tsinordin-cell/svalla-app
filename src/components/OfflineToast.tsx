'use client'
/**
 * OfflineToast
 * Lyssnar på browser online/offline-events och visar ett diskret
 * banner längst ner när anslutningen tappas.
 */
import { useEffect, useState } from 'react'

export default function OfflineToast() {
  const [offline, setOffline] = useState(false)
  const [justBack, setJustBack] = useState(false)

  useEffect(() => {
    function handleOffline() { setOffline(true); setJustBack(false) }
    function handleOnline() {
      setJustBack(true)
      setOffline(false)
      // Dölj "tillbaka online"-meddelandet efter 3 s
      setTimeout(() => setJustBack(false), 3_000)
    }

    window.addEventListener('offline', handleOffline)
    window.addEventListener('online',  handleOnline)
    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online',  handleOnline)
    }
  }, [])

  if (!offline && !justBack) return null

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 80, // ovanför bottom-nav
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 500,
        padding: '10px 20px',
        borderRadius: 24,
        fontSize: 13,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        transition: 'all .25s',
        ...(offline
          ? {
              background: 'rgba(40,40,40,0.92)',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
            }
          : {
              background: 'rgba(30,130,100,0.92)',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(30,130,100,0.35)',
            }
        ),
      }}
    >
      {offline ? '📵 Ingen internetanslutning' : '✓ Anslutning återupprättad'}
    </div>
  )
}
