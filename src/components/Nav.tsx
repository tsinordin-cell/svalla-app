'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import NotificationBell from '@/components/NotificationBell'

export default function Nav() {
  const path = usePathname()
  const [username, setUsername] = useState<string | null>(null)
  const [avatar,   setAvatar]   = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from('users')
          .select('username, avatar')
          .eq('id', user.id)
          .single()
          .then(({ data }) => {
            setUsername(data?.username ?? null)
            setAvatar(data?.avatar ?? null)
          })
      } else {
        setUsername(null)
        setAvatar(null)
      }
    })
    // Lyssna på auth-ändringar — uppdatera username direkt vid login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        setUsername(null)
        setAvatar(null)
      } else if (session.user) {
        supabase
          .from('users')
          .select('username, avatar')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            setUsername(data?.username ?? session.user.email?.split('@')[0] ?? null)
            setAvatar(data?.avatar ?? null)
          })
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  // Visa bara bottom nav på app-sidor — INTE på informationssidor, ö-sidor eller öar-listan
  const APP_PATHS = ['/platser', '/rutter', '/feed', '/profil', '/spara', '/sok', '/tur/', '/u/', '/topplista', '/notiser']
  const EXACT_PATHS = ['/logga']
  const showNav = APP_PATHS.some(p => path.startsWith(p)) || EXACT_PATHS.includes(path)
  if (!showNav) return null

  const tabs = [
    {
      href: '/platser',
      label: 'Utforska',
      exact: false,
      icon: (active: boolean) => (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={active ? 2.5 : 1.8} stroke="currentColor" style={{ width: 22, height: 22 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      href: '/rutter',
      label: 'Rutter',
      icon: (active: boolean) => (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={active ? 2.5 : 1.8} stroke="currentColor" style={{ width: 22, height: 22 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
    },
    { href: '/logga', label: '', fab: true },
    {
      href: '/feed',
      label: 'Feed',
      icon: (active: boolean) => (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={active ? 2.5 : 1.8} stroke="currentColor" style={{ width: 22, height: 22 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      ),
    },
    {
      href: '/profil',
      label: username ? username.slice(0, 8) : 'Profil',
      icon: (active: boolean) => (
        <div style={{ position: 'relative' }}>
          {username ? (
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: active
                ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)'
                : 'rgba(10,123,140,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 800,
              color: active ? '#fff' : 'var(--sea)',
              border: active ? '2px solid var(--sea)' : '2px solid transparent',
              transition: 'all 0.2s',
              overflow: 'hidden',
              flexShrink: 0,
            }}>
              {avatar
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                : username[0].toUpperCase()
              }
            </div>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={active ? 2.5 : 1.8} stroke="currentColor" style={{ width: 22, height: 22 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          )}
          {/* Online dot when logged in */}
          {username && (
            <span style={{
              position: 'absolute', bottom: -1, right: -1,
              width: 8, height: 8, borderRadius: '50%',
              background: '#22c55e',
              border: '1.5px solid var(--glass-96)',
            }} />
          )}
        </div>
      ),
    },
  ]

  // Feed har redan en notis-klocka i sin header.
  // Tur-sidan och logga-sidorna har egna knappar i top-right — lägg inte på klockn där.
  const showGlobalBell =
    path !== '/' &&
    path !== '/feed' &&
    path !== '/rutter' &&
    path !== '/profil' &&
    !path.startsWith('/tur/') &&
    !path.startsWith('/rutter/') &&
    !path.startsWith('/logga') &&
    !path.startsWith('/spara')

  return (
    <>
      {showGlobalBell && (
        <div style={{
          position: 'fixed', top: 12, right: 16, zIndex: 901,
        }}>
          <NotificationBell />
        </div>
      )}
    <nav aria-label="Navigering" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px))',
      background: 'var(--glass-92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(10,123,140,0.12)',
      display: 'flex', alignItems: 'stretch',
      overflow: 'visible',
      zIndex: 900,
      boxShadow: '0 -1px 0 rgba(10,123,140,0.08), 0 -4px 24px rgba(0,45,60,0.08)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      /* Force GPU compositing — prevents iOS Safari from dropping fixed layer during scroll */
      transform: 'translateZ(0)',
      WebkitTransform: 'translateZ(0)',
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
    }}>
      {tabs.map((tab) => {
        const active = tab.exact ? path === tab.href : path.startsWith(tab.href)

        if (tab.fab) {
          return (
            <Link key={tab.href} href={tab.href} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'linear-gradient(135deg,var(--acc),#e07828)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(201,110,42,0.5)',
                marginBottom: 20,
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 24, height: 24 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </Link>
          )
        }

        return (
          <Link key={tab.href} href={tab.href} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 3,
            textDecoration: 'none',
            color: active ? 'var(--sea)' : 'var(--txt3)',
            fontSize: 9, fontWeight: 600, letterSpacing: '0.3px',
            textTransform: 'uppercase', position: 'relative',
            WebkitTapHighlightColor: 'transparent',
            minHeight: 44,  // touch target
          }}>
            {tab.icon?.(active)}
            <span style={{ maxWidth: 52, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {tab.label}
            </span>
            {active && (
              <span style={{
                position: 'absolute', bottom: 6, left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--sea)', width: 18, height: 3, borderRadius: 2,
              }} />
            )}
          </Link>
        )
      })}
    </nav>
    </>
  )
}
