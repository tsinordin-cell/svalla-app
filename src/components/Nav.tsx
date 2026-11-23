'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import NotificationBell from '@/components/NotificationBell'
import MessageBell from '@/components/MessageBell'
import SvallaLogo from '@/components/SvallaLogo'
import Icon from '@/components/Icon'
import { TOPPKNAPP_STIL } from '@/components/toppradStil'
import { countUnreadMessages } from '@/lib/dm'
import { prefetchFor as prefetchUtloggad } from '@/lib/inloggningsrutter'
import { visaGlobalaKlockor } from '@/lib/klockor'

export default function Nav() {
  const path = usePathname()
  const [username, setUsername] = useState<string | null>(null)
  const [avatar,   setAvatar]   = useState<string | null>(null)
  const [userId,   setUserId]   = useState<string | null>(null)
  const channelRef = useRef<ReturnType<ReturnType<typeof createClient>['channel']> | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // onAuthStateChange firar INITIAL_SESSION på mount + alla senare auth-ändringar.
    // Räcker ensamt — tidigare fanns även en getUser()-gren som gjorde samma users-query.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        setUsername(null)
        setAvatar(null)
        setUserId(null)
        if (channelRef.current) { supabase.removeChannel(channelRef.current); channelRef.current = null }
        return
      }
      // Aliaset kommer från users-raden. Saknas raden (post-signup har inte
      // hunnit skapa den vid första sessionen) försöker vi en gång till efter
      // två sekunder. Tidigare föll vi tillbaka på e-postens lokaldel, vilket
      // visade början av mejladressen i navigeringen ("claes.da" för en
      // användare med alias "claes", 2026-11-16). E-posten ska inte synas.
      const hamtaProfil = (forsok: number) => {
        supabase
          .from('users')
          .select('username, avatar')
          .eq('id', session.user.id)
          .maybeSingle()
          .then(({ data }) => {
            if (data?.username) {
              setUsername(data.username)
              setAvatar(data.avatar ?? null)
            } else if (forsok < 1) {
              setTimeout(() => hamtaProfil(forsok + 1), 2000)
            } else {
              setUsername('')
              setAvatar(null)
            }
          })
      }
      setUserId(session.user.id)
      hamtaProfil(0)
    })

    return () => {
      subscription.unsubscribe()
      if (channelRef.current) { supabase.removeChannel(channelRef.current); channelRef.current = null }
    }
  }, [])

  // Visa bara bottom nav på app-sidor — INTE på informationssidor, ö-sidor eller öar-listan
  // 2026-11-22 (beslut 3, Toms ja): inloggade sidor har alltid appmenyn. /insikter och
  // /min-skargard är bara för inloggade men saknade den; /insikter hade i stället
  // startsidans meny och två tillbakaknappar. /check-in är gömd (404) och står inte här. /onboarding står medvetet
  // utanför: ett flöde man ska gå igenom utan att ledas bort.
  const APP_PATHS = ['/platser', '/rutter', '/feed', '/profil', '/spara', '/sparade', '/sok', '/tur/', '/u/', '/topplista', '/notiser', '/tagg/', '/upptack', '/planera', '/guide/', '/forum', '/loppis', '/insikter', '/min-skargard']
  const EXACT_PATHS = ['/logga', '/meddelanden']

  /**
   * Matchningen går på segmentgräns, inte på ren teckenprefix.
   *
   * Med `path.startsWith(p)` räckte det att en helt annan sida råkade börja på
   * samma bokstäver för att den skulle få app-skalet. `/planera-tur` — en
   * marknadssida vars egen kod säger "markerar sidan som hemsida, inte app" —
   * fick app-navigationen ovanpå sin egen, med två SVALLA-loggor och två menyer
   * på samma skärm, enbart för att den börjar på `/planera`. `/sparade` fick
   * den av samma slump; den hör hemma här, så den står nu utskriven i listan
   * i stället för att komma in bakvägen via `/spara`.
   *
   * Poster som slutar på `/` är avsiktliga prefix (`/tur/`, `/u/`, `/tagg/`,
   * `/guide/`) och matchas som förut.
   */
  const matchar = (p: string) =>
    p.endsWith('/') ? path.startsWith(p) : path === p || path.startsWith(p + '/')

  // Dölj nav i enskilda chattrum (/meddelanden/[id]) — input-fältet tar hela skärmen
  const showNav = (APP_PATHS.some(matchar) || EXACT_PATHS.includes(path)) &&
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

  // 2026-11-23 (menyförslaget): på desktop (från 1024 px) ligger Meddelanden och
  // Notiser i sidomenyn med räknare, i stället för ikonraden uppe till höger.
  // Räknarna hämtas bara på desktop och när sidan byts, inte i realtid; ikonerna
  // i topprader på mobil har kvar sin egen realtidsräkning.
  const [olastaMedd, setOlastaMedd] = useState(0)
  const [olastaNotiser, setOlastaNotiser] = useState(0)
  useEffect(() => {
    if (!userId || !showNav) return
    if (typeof window === 'undefined' || !window.matchMedia('(min-width: 1024px)').matches) return
    let aktiv = true
    const supabase = createClient()
    countUnreadMessages(supabase, userId).then(n => { if (aktiv) setOlastaMedd(n) }).catch(() => {})
    supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('read', false)
      // Tom 2026-11-23: meddelanden har egen ikon med räknare, så de visas inte bland notiserna.
      .neq('type', 'message')
      .then(({ count }) => { if (aktiv) setOlastaNotiser(count ?? 0) })
    return () => { aktiv = false }
  }, [userId, showNav, path])

  // Beräknas här (före early return) så att hooks alltid körs i samma ordning.
  const klockorAktiva = visaGlobalaKlockor(path, username !== null)
  // Klockorna göms när man skrollar nedåt och kommer tillbaka när man skrollar
  // uppåt (som sidhuvuden i Instagram och Strava), så de aldrig ligger över text.
  const [klockorDolda, setKlockorDolda] = useState(false)
  useEffect(() => {
    setKlockorDolda(false)   // ny sida: visa klockorna igen tills man skrollar
    if (!klockorAktiva) return
    let senast = window.scrollY, ack = 0
    const onScroll = () => {
      const y = window.scrollY, d = y - senast
      senast = y
      if (y < 24) { ack = 0; setKlockorDolda(false); return }
      ack = (ack > 0) === (d > 0) ? ack + d : d
      if (ack > 24) setKlockorDolda(true)
      else if (ack < -12) setKlockorDolda(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [klockorAktiva, path])
  if (!showNav) return null

  const tabs = [
    {
      href: '/upptack',
      label: 'Utforska',
      exact: false,
      matchPaths: ['/upptack'],
      icon: (active: boolean) => (
        <Icon name="compass" size={22} stroke={active ? 2.2 : 1.75} />
      ),
    },
    {
      href: '/planera',
      label: 'Planera',
      exact: false,
      // Rutter är en flik inne i Planera (Planera, Rutter, Öar, Färjor).
      matchPaths: ['/planera', '/rutter'],
      icon: (active: boolean) => (
        <Icon name="route" size={22} stroke={active ? 2.2 : 1.75} />
      ),
    },
    { href: '/logga', label: '', fab: true },
    {
      href: '/feed',
      label: 'Flöde',
      exact: false,
      // Forum och Topplista är flikar inne i Flöde (menyförslaget 2026-11-23).
      matchPaths: ['/feed', '/forum', '/topplista'],
      icon: (active: boolean) => (
        <Icon name="home" size={22} stroke={active ? 2.2 : 1.75} />
      ),
    },
    {
      href: '/profil',
      // Hela aliaset; span-elementet nedan kortar med … när det inte får plats.
      // Hårdkapningen till åtta tecken (till 2026-11-16) klippte "claes.da" utan …
      label: username || 'Profil',
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
            <Icon name="user" size={22} stroke={active ? 2.2 : 1.75} />
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
  // /upptack har fullskärms-karta + BookmarkButton i top-right — klockorna krockar
  // Regeln ligger i src/lib/klockor.ts så att den kan testas utan React:
  // /planera/[id] har avståndsbadgen i hörnet (2026-10-21) och /tur/[id] har
  // dela- och mer-knapparna (2026-10-26); där visas klockorna inte alls.
  const showGlobalBell = visaGlobalaKlockor(path, username !== null)

  // revision 2026-10-02: Planera, Logga tur, Flöde och Profil kräver inloggning.
  // För utloggade blev varje prefetch av flikarna en 307 till /logga-in (se
  // src/lib/inloggningsrutter.ts). Inloggade (username satt) prefetchar som förut.
  const prefetchFor = (href: string) => (username === null ? prefetchUtloggad(href) : undefined)

  return (
    <>
      {showGlobalBell && (
        <div className="nav-klockor" style={{
          position: 'fixed', top: 'calc(env(safe-area-inset-top, 0px) + 8px)', right: 12, zIndex: 901,
          display: 'flex', gap: 4, alignItems: 'center',
          transform: klockorDolda ? 'translateY(-72px)' : 'translateY(0)',
          opacity: klockorDolda ? 0 : 1,
          transition: 'transform 0.22s ease, opacity 0.18s ease',
          pointerEvents: klockorDolda ? 'none' : 'auto',
        }}>
          {/* 2026-11-23 (menyförslaget): sök i stället för huset. Huset ledde till flödet
              (beslut 3) men såg ut som en länk till startsidan. Samma knappar som i AppTopBar.
              Hela raden döljs från 1024 px, där sidomenyn har Sök, Meddelanden och Notiser. */}
          <Link href="/sok" aria-label="Sök" className="press-feedback" style={{ ...TOPPKNAPP_STIL, textDecoration: 'none' }}>
            <Icon name="search" size={20} stroke={2} />
          </Link>
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
      {/* Desktop: SVALLA-logotyp längst upp i sidebaren. 2026-11-23 (menyförslaget):
          inloggad går den till flödet, appens hem. Utloggad går den till startsidan. */}
      <div className="nav-logo-wrap">
        <Link href={username !== null ? '/feed' : '/'} aria-label={username !== null ? 'Svalla, till flödet' : 'Till startsidan'} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
          <SvallaLogo height={24} color="var(--sea)" />
        </Link>
      </div>

      {/* Tab-lista — row på mobil/tablet, column på desktop via CSS */}
      <div className="nav-inner" style={{ display: 'flex', alignItems: 'stretch', width: '100%', maxWidth: 640 }}>
      {[...tabs.slice(0, -1), 'desktop-extra' as const, tabs[tabs.length - 1]!].map((tab) => {
        // 2026-11-23 (menyförslaget): Sök, Meddelanden och Notiser i sidomenyn på
        // desktop, med räknare. Raden finns bara från 1024 px (nav-desktop-extra i
        // globals.css); på mobil ligger de i toppraden. Profilen ligger kvar sist.
        if (tab === 'desktop-extra') {
          const rader: { href: string; label: string; ikon: 'search' | 'messageCircle' | 'bell'; antal: number; inloggad: boolean }[] = [
            { href: '/sok', label: 'Sök', ikon: 'search', antal: 0, inloggad: false },
            { href: '/meddelanden', label: 'Meddelanden', ikon: 'messageCircle', antal: olastaMedd, inloggad: true },
            { href: '/notiser', label: 'Notiser', ikon: 'bell', antal: olastaNotiser, inloggad: true },
          ]
          return (
            <div key="desktop-extra" className="nav-desktop-extra">
              {rader.filter(r => !r.inloggad || username !== null).map(r => {
                const aktiv = path === r.href || path.startsWith(r.href + '/')
                return (
                  <Link key={r.href} href={r.href} aria-current={aktiv ? 'page' : undefined}
                    aria-label={r.antal > 0 ? `${r.label}, ${r.antal} olästa` : r.label}
                    className="nav-tab-link press-feedback"
                    style={{
                      display: 'flex', alignItems: 'center', textDecoration: 'none', position: 'relative',
                      color: aktiv ? 'var(--sea)' : 'var(--txt3)', minHeight: 44,
                    }}>
                    <Icon name={r.ikon} size={20} stroke={aktiv ? 2.2 : 1.75} />
                    <span style={{ flex: 1 }}>{r.label}</span>
                    {r.antal > 0 && (
                      <span className="nav-raknare">{r.antal > 99 ? '99+' : r.antal}</span>
                    )}
                    {aktiv && <span className="nav-active-bar" style={{ background: 'var(--sea)' }} />}
                  </Link>
                )
              })}
            </div>
          )
        }
        const active = tab.exact
          ? path === tab.href
          : (tab.matchPaths ?? [tab.href]).some(p => path.startsWith(p))

        if (tab.fab) {
          return (
            <Link
              key={tab.href}
              href={tab.href}
              prefetch={prefetchFor(tab.href)}
              aria-label="Logga tur"
              className="press-feedback nav-fab-wrap"
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}
            >
              <span className="nav-fab-mobile">
                <Icon name="plus" size={22} stroke={2.4} style={{ color: '#fff' }} />
              </span>
              <span className="nav-fab-label">Logga tur</span>
              <span className="nav-fab-desktop">
                <Icon name="plus" size={18} stroke={2.2} style={{ color: '#fff' }} />
                Logga tur
              </span>
            </Link>
          )
        }

        return (
          <Link key={tab.href} href={tab.href} prefetch={prefetchFor(tab.href)} aria-current={active ? 'page' : undefined}
            aria-label={`Gå till ${tab.label}`}
            className="nav-tab-link press-feedback"
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 2,
              textDecoration: 'none',
              // 2026-11-23 (menyförslaget): aktiv flik i --sea (8,0:1 mot vitt) med fet text
              // och tonad bakgrund bakom ikonen. Förut --teal (4,4:1) och halvfet.
              color: active ? 'var(--sea)' : 'var(--txt3)',
              fontSize: 11, fontWeight: active ? 700 : 500,
              position: 'relative',
              WebkitTapHighlightColor: 'transparent',
              minHeight: 44,
            }}>
            <span className="nav-tab-ikon" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 52, height: 30, borderRadius: 15,
              background: active ? 'var(--teal-12)' : 'transparent',
              transition: 'background 0.14s ease',
            }}>
              {tab.icon?.(active)}
            </span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 64 }}>
              {tab.label}
            </span>
            {active && (
              <span className="nav-active-bar" style={{
                position: 'absolute', top: 0, left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--sea)', width: 24, height: 3, borderRadius: '0 0 2px 2px',
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
