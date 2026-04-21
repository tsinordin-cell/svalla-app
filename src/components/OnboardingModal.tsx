'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

type Screen = 0 | 1 | 2

export default function OnboardingModal() {
  const [screen, setScreen] = useState<Screen>(0)
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if onboarded before
    const hasSeenOnboard = typeof window !== 'undefined' 
      ? localStorage.getItem('svalla_onboarded')
      : null
    
    if (!hasSeenOnboard) {
      setShowModal(true)
    }
  }, [])

  if (!mounted || !showModal) return null

  const handleComplete = () => {
    localStorage.setItem('svalla_onboarded', '1')
    setShowModal(false)
  }

  const handleNext = () => {
    if (screen < 2) {
      setScreen((screen + 1) as Screen)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #0d2a3e 0%, #1e5c82 50%, #2d7d8a 100%)',
      zIndex: 1100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'env(safe-area-inset-top, 0px) 24px env(safe-area-inset-bottom, 0px)',
      overflow: 'hidden',
    }}>
      {/* Animated screens */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 320,
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Screen 0: Welcome */}
        <div style={{
          position: 'absolute',
          width: '100%',
          textAlign: 'center',
          opacity: screen === 0 ? 1 : 0,
          transform: screen === 0 ? 'translateX(0)' : screen > 0 ? 'translateX(-100%)' : 'translateX(100%)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          pointerEvents: screen === 0 ? 'auto' : 'none',
        }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>⚓</div>
          <h1 style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#fff',
            margin: '0 0 16px',
            letterSpacing: '-0.5px',
          }}>
            Välkommen till Svalla
          </h1>
          <p style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.8)',
            marginBottom: 28,
            lineHeight: 1.7,
          }}>
            Logga dina turer, utforska 69 öar och följ andra seglare.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>📍</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Hitta öar</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Utforska restauranger & bryggor</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>🛥️</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Logga turer</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Spåra GPS & dela med vänner</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>👥</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Följ seglare</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Inspireras av andras äventyr</div>
              </div>
            </div>
          </div>
        </div>

        {/* Screen 1: Log trips */}
        <div style={{
          position: 'absolute',
          width: '100%',
          textAlign: 'center',
          opacity: screen === 1 ? 1 : 0,
          transform: screen === 1 ? 'translateX(0)' : screen < 1 ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          pointerEvents: screen === 1 ? 'auto' : 'none',
        }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>🛥️</div>
          <h2 style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#fff',
            margin: '0 0 12px',
            letterSpacing: '-0.5px',
          }}>
            Logga din första tur
          </h2>
          <p style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.8)',
            marginBottom: 32,
            lineHeight: 1.7,
          }}>
            Spåra GPS, fota din tur och se statistik från ditt äventyr.
          </p>
          
          {/* Simple route illustration */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            backdropFilter: 'blur(8px)',
          }}>
            <svg viewBox="0 0 200 120" style={{ width: '100%', height: 'auto' }}>
              {/* Water background */}
              <rect width="200" height="120" fill="rgba(30,92,130,0.2)" />
              
              {/* Route path */}
              <path
                d="M 30 80 Q 80 40, 120 60 T 180 40"
                fill="none"
                stroke="rgba(34,197,94,0.6)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* Start marker */}
              <circle cx="30" cy="80" r="6" fill="#22c55e" />
              <text x="30" y="105" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10">
                Start
              </text>
              
              {/* End marker */}
              <circle cx="180" cy="40" r="6" fill="#c96e2a" />
              <text x="180" y="65" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10">
                Slut
              </text>
              
              {/* Distance label */}
              <text x="100" y="30" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="11">
                12.5 NM
              </text>
            </svg>
          </div>

          <p style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.6)',
          }}>
            Du kan börja när som helst och pausera mellan stopp
          </p>
        </div>

        {/* Screen 2: Explore */}
        <div style={{
          position: 'absolute',
          width: '100%',
          textAlign: 'center',
          opacity: screen === 2 ? 1 : 0,
          transform: screen === 2 ? 'translateX(0)' : screen < 2 ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          pointerEvents: screen === 2 ? 'auto' : 'none',
        }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>🏝️</div>
          <h2 style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#fff',
            margin: '0 0 12px',
            letterSpacing: '-0.5px',
          }}>
            69 öar att utforska
          </h2>
          <p style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.8)',
            marginBottom: 32,
            lineHeight: 1.7,
          }}>
            Från Sandhamn till Vaxholm — komplett med restauranger, tips och resevägar.
          </p>

          {/* Island cards preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {[
              { emoji: '⛵', name: 'Sandhamn', desc: 'Seglarhuvudstad' },
              { emoji: '🍽', name: 'Vaxholm', desc: 'Mat & kultur' },
              { emoji: '🏖', name: 'Manskär', desc: 'Strandparadis' },
            ].map((island, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: '12px 16px',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <span style={{ fontSize: 24 }}>{island.emoji}</span>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{island.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{island.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div style={{
        display: 'flex',
        gap: 6,
        marginTop: 36,
        marginBottom: 24,
      }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: screen === i ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: screen === i ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      {/* Action buttons */}
      <div style={{
        display: 'flex',
        gap: 10,
        width: '100%',
        maxWidth: 320,
      }}>
        {screen === 2 ? (
          <>
            <Link href="/platser"
              onClick={handleComplete}
              style={{
                flex: 1,
                padding: '14px 24px',
                borderRadius: 14,
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(34,197,94,0.4)',
              }}>
              Börja utforska →
            </Link>
            <button
              onClick={handleSkip}
              style={{
                padding: '14px 24px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
              }}
            >
              Hoppa över
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleNext}
              style={{
                flex: 1,
                padding: '14px 24px',
                borderRadius: 14,
                background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(30,92,130,0.4)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(30,92,130,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(30,92,130,0.4)'
              }}
            >
              Kom igång →
            </button>
            <button
              onClick={handleSkip}
              style={{
                padding: '14px 24px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 600,
                fontSize: 14,
                border: '1px solid rgba(255,255,255,0.15)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              }}
            >
              Hoppa över
            </button>
          </>
        )}
      </div>
    </div>
  )
}
