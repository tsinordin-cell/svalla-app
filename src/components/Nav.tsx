'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import NotificationBell from '@/components/NotificationBell'
import MessageBell from '@/components/MessageBell'
import SvallaLogo from '@/components/SvallaLogo'
import { IconCompass, IconForum, IconHome, IconUser, IconPlus } from '@/components/ui/icons'

export default function Nav() {
  const path = usePathname()
  const [username, setUsername] = useState<string | null>(null)
  const [avatar,   setAvatar]   = useState<string | null>(null)
  const channelRef = useRef<ReturnType<ReturnType<typeof createClient>['channel']> | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // onAuthStateChange firar INITIAL_SESSION på mount + alla senare auth-ändringar.
    // Räcker ensamt — tidigare fanns även en getUser()-gren som gjorde samma users-query.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        setUsername(null)
        setAvatar(null)
        if (channelRef.current) { supabase.removeChannel(channelRef.current); channelRef.current = null }
        return
      }
      supabase
        .from('users')
        .select('username, avatar')
        .eq('id', session.user.id)
        .single()
        .then(({ data }) => {
          setUsername(data?.username ?? session.user.email?.split('@')[0] ?? null)
          setAvatar(data?.avatar ?? null)
        })
    })

    return () => {
      subscription.unsubscribe()
      if (channelRef.current) { supabase.removeChannel(channelRef.current); channelRef.current = null }
    }
  }, [])

  // Visa bara bottom nav på app-sidor — INTE på informationssidor, ö-sidor eller öar-listan
  const APP_PATHS = ['/platser', '/rutter', '/feed', '/profil', '/spara', '/sok', '/tur/', '/u/', '/topplista', '/notiser', '/tagg/', '/upptack', '/planera', '/guide', '/forum']
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
        <IconCompass size={22} stroke={active ? 2 : 1.75} />
      ),
    },
    {
      href: '/forum',
      label: 'Forum',
      exact: false,
      matchPaths: ['/forum'],
      icon: (active: boolean) => (
        <IconForum size={22} stroke={active ? 2 : 1.75} />
      ),
    },
    { href: '/logga', label: '', fab: true },
    {
      href: '/feed',
      label: 'Flöde',
      exact: false,
      icon: (active: boolean) => (
        <IconHome size={22} stroke={active ? 2 : 1.75} />
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
                ? 'var(--grad-sea)'
                : 'var(--teal-15)',
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
                : username[0]!.toUpperCase()
              }
            </div>
          ) : (
            <IconUser size={22} stroke={active ? 2 : 1.75} />
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

  // Visa bells bara på sidor som INTE har egen header med bells
  // /feed, /rutter, /platser, /profil har egna — chatt-sidor lämnar toppen ren
  // /upptack har fullskärms-karta där Leaflet-kontroller bor top-right
  const PAGES_WITH_OWN_BELLS = ['/feed', '/rutter', '/platser', '/profil', '/forum']
  const showGlobalBell = username !== null
    && !PAGES_WITH_OWN_BELLS.some(p => path.startsWith(p))
    && !path.match(/^\/meddelanden/)

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
      background: 'var(--nav-bg)',
      backdropFilter: 'saturate(1.4) blur(20px)',
      WebkitBackdropFilter: 'saturate(1.4) blur(20px)',
      borderTop: '1px solid var(--nav-border)',
      display: 'flex', alignItems: 'stretch', justifyContent: 'center',
      overflow: 'visible',
      zIndex: 900,
      boxShadow: 'var(--nav-shadow)',
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
        const active = tab.exact
          ? path === tab.href
          : (tab.matchPaths ?? [tab.href]).some(p => path.startsWith(p))

        if (tab.fab) {
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label="Logga tur"
              className="press-feedback nav-fab-wrap"
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}
            >
              <span className="nav-fab-mobile">
                <IconPlus size={26} stroke={2.4} color="white" />
              </span>
              <span className="nav-fab-label">Logga tur</span>
              <span className="nav-fab-desktop">
                <IconPlus size={18} stroke={2.2} color="white" />
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
              color: active ? 'var(--teal, #0a7b8c)' : 'var(--txt3)',
              fontSize: 11, fontWeight: active ? 600 : 500,
              position: 'relative',
              WebkitTapHighlightColor: 'transparent',
              minHeight: 44,
            }}>
            {tab.icon?.(active)}
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 64 }}>
              {tab.label}
            </span>
            {active && (
              <span className="nav-active-bar" style={{
                position: 'absolute', bottom: 4, left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--teal, #0a7b8c)', width: 4, height: 4, borderRadius: '50%',
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
