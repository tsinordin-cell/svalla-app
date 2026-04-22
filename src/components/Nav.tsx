'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import NotificationBell from '@/components/NotificationBell'
import MessageBell from '@/components/MessageBell'
import SvallaLogo from '@/components/SvallaLogo'

export default function Nav() {
  const path = usePathname()
  const [username, setUsername] = useState<string | null>(null)
  const [avatar,   setAvatar]   = useState<string | null>(null)
  const channelRef = useRef<ReturnType<ReturnType<typeof createClient>['channel']> | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // Lyssna på auth-ändringar — uppdatera username direkt vid login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        setUsername(null)
        setAvatar(null)
        if (channelRef.current) { supabase.removeChannel(channelRef.current); channelRef.current = null }
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

    return () => {
      subscription.unsubscribe()
      if (channelRef.current) { supabase.removeChannel(channelRef.current); channelRef.current = null }
    }
  }, [])

  // Visa bara bottom nav på app-sidor — INTE på informationssidor, ö-sidor eller öar-listan
  const APP_PATHS = ['/platser', '/rutter', '/feed', '/profil', '/spara', '/sok', '/tur/', '/u/', '/topplista', '/notiser', '/tagg/', '/upptack']
  const EXACT_PATHS = ['/logga', '/meddelanden']
  // Dölj nav i enskilda chattrum (/meddelanden/[id]) — input-fältet tar hela skärmen
  const showNav = (APP_PATHS.some(p => path.startsWith(p)) || EXACT_PATHS.includes(path)) &&
    !path.match(/^\/meddelanden\/.+/)

  // Lägg till/ta bort body-klass för desktop sidebar-offset
  useEffect(() => {
    if (showNav) {
      document.body.classList.add('has-app-nav')
    } else {
      document.body.classList.remove('has-app-nav')
    }
    return () => document.body.classList.remove('has-app-nav')
  }, [showNav])

  if (!showNav) return null

  const tabs = [
    {
      href: '/upptack',
      label: 'Upptäck',
      exact: false,
      icon: (active: boolean) => (
        // Kompassikon — tydligt "utforska/hitta"
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={active ? 2.25 : 1.8} stroke="currentColor" style={{ width: 22, height: 22 }}>
          <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
        </svg>
      ),
    },
    {
      href: '/rutter',
      label: 'Turer',
      exact: false,
      icon: (active: boolean) => (
        // Ruttikon — böjd path med start/stopp-punkter
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={active ? 2.25 : 1.8} stroke="currentColor" style={{ width: 22, height: 22 }}>
          <circle cx="5" cy="6" r="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="19" cy="18" r="2" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 8c0 5 6 3 9 8" />
        </svg>
      ),
    },
    { href: '/logga', label: '', fab: true },
    {
      href: '/feed',
      label: 'Flöde',
      exact: false,
      icon: (active: boolean) => (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={active ? 2.5 : 1.8} stroke="currentColor" style={{ width: 22, height: 22 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
              fontSize: 11, fontWeight: 600,
              color: active ? '#fff' : 'var(--sea)',
              border: active ? '2px solid var(--sea)' : '2px solid transparent',
              transition: 'all 0.2s',
              overflow: 'hidden',
              flexShrink: 0,
            }}>
              {avatar
                ? <Image src={avatar} alt="" width={26} height={26} style={{ objectFit: 'cover', borderRadius: '50%', width: '100%', height: '100%' }} />
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
              background: 'var(--green)',
              border: '1.5px solid var(--glass-96)',
            }} />
          )}
        </div>
      ),
    },
  ]

  // Visa bells på alla app-sidor UTOM /feed (som har egna bells i sin header)
  // och chatt-sidor (där input-fältet dominerar top-rymden)
  const showGlobalBell = username !== null && !path.startsWith('/feed') && !path.match(/^\/meddelanden/)

  return (
    <>
      {showGlobalBell && (
        <div style={{
          position: 'fixed', top: 'calc(env(safe-area-inset-top, 0px) + 10px)', right: 14, zIndex: 901,
          display: 'flex', gap: 6,
        }}>
          <MessageBell />
          <NotificationBell />
        </div>
      )}
    <nav aria-label="Navigering" className="svalla-nav" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px))',
      background: 'var(--glass-92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(10,123,140,0.12)',
      display: 'flex', alignItems: 'stretch', justifyContent: 'center',
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
      {/* Desktop: SVALLA-logotyp längst upp i sidebaren */}
      <div className="nav-logo-wrap">
        <SvallaLogo height={24} color="var(--sea)" />
      </div>

      {/* Tab-lista — row på mobil/tablet, column på desktop via CSS */}
      <div className="nav-inner" style={{ display: 'flex', alignItems: 'stretch', width: '100%', maxWidth: 640 }}>
      {tabs.map((tab) => {
        const active = tab.exact ? path === tab.href : path.startsWith(tab.href)

        if (tab.fab) {
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label="Logga tur"
              className="press-feedback nav-fab-wrap"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span className="nav-fab-mobile">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 24, height: 24 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </span>
              <span className="nav-fab-desktop">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.25} style={{ width: 18, height: 18 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Logga tur
              </span>
            </Link>
          )
        }

        return (
          <Link key={tab.href} href={tab.href} aria-current={active ? 'page' : undefined}
            aria-label={`Gå till ${tab.label}`}
            className="nav-tab-link press-feedback"
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 2,
              textDecoration: 'none',
              color: active ? 'var(--sea)' : 'var(--txt3)',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.3px',
              textTransform: 'uppercase', position: 'relative',
              WebkitTapHighlightColor: 'transparent',
              minHeight: 44,
            }}>
            {tab.icon?.(active)}
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 64 }}>
              {tab.label}
            </span>
            {active && (
              <span className="nav-active-bar" style={{
                position: 'absolute', bottom: 6, left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--sea)', width: 18, height: 3, borderRadius: '2px 2px 0 0',
              }} />
            )}
          </Link>
        )
      })}
      </div>
    </nav>
    </>
  )
}
