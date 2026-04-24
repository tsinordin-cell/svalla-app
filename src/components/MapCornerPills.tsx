'use client'
// Glass-pills som läggs över Upptäck-kartan i högra hörnet.
//
// • WeatherPill   — temp, vind, områdesnamn för (lat,lng). Debouncas externt.
// • DestinationPill — vald destination + avstånd & bäring från kartcentrum.
//
// Båda är rent presentationskomponenter: state och map-hooks ligger i
// UpptackClient.tsx, som uppdaterar props vid moveend/zoomend.

import { useEffect, useRef, useState } from 'react'
import {
  fetchWeatherAt,
  fetchPlaceName,
  weatherDesc,
  windDirLabel,
  haversineNM,
  bearingDeg,
  type WeatherPoint,
} from '@/lib/weatherGrid'

// ── Shared pill-container ────────────────────────────────────────────────────
function PillShell({
  children, onClick, ariaLabel, onClose,
}: {
  children: React.ReactNode
  onClick?: () => void
  ariaLabel?: string
  onClose?: () => void
}) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        pointerEvents: 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        paddingRight: onClose ? 6 : 12,
        border: '1px solid rgba(10,45,60,0.12)',
        borderRadius: 999,
        background: 'var(--glass-96, rgba(255,255,255,0.94))',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 2px 6px rgba(0,45,60,0.10), 0 8px 20px rgba(0,45,60,0.08)',
        color: 'var(--txt, #0a2d3c)',
        fontFamily: 'inherit',
        cursor: onClick ? 'pointer' : 'default',
        WebkitTapHighlightColor: 'transparent',
        minHeight: 40,
        maxWidth: 260,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
        {children}
      </span>
      {onClose && (
        <span
          role="button"
          tabIndex={0}
          aria-label="Stäng"
          onClick={e => { e.stopPropagation(); onClose() }}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); onClose() } }}
          style={{
            width: 26, height: 26, flexShrink: 0, marginLeft: 4,
            borderRadius: '50%',
            background: 'rgba(10,45,60,0.08)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--txt2, #5a7a8a)',
            cursor: 'pointer',
          }}
        >
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </span>
      )}
    </Tag>
  )
}

// ── Weather pill ─────────────────────────────────────────────────────────────
export function WeatherPill({ lat, lng }: { lat: number; lng: number }) {
  const [data,  setData]  = useState<WeatherPoint | null>(null)
  const [place, setPlace] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const placeAbortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl

    fetchWeatherAt(lat, lng, ctrl.signal)
      .then(w => { if (!ctrl.signal.aborted) setData(w) })
      .catch(() => { /* aborted — ignore */ })

    return () => ctrl.abort()
  }, [lat, lng])

  useEffect(() => {
    placeAbortRef.current?.abort()
    const ctrl = new AbortController()
    placeAbortRef.current = ctrl

    fetchPlaceName(lat, lng, ctrl.signal)
      .then(n => { if (!ctrl.signal.aborted) setPlace(n) })
      .catch(() => { /* aborted — ignore */ })

    return () => ctrl.abort()
  }, [lat, lng])

  if (!data) {
    return (
      <PillShell ariaLabel="Laddar väder">
        <span
          aria-hidden="true"
          style={{
            width: 14, height: 14, borderRadius: '50%',
            border: '2px solid rgba(10,45,60,0.2)', borderTopColor: 'var(--sea, #1e5c82)',
            animation: 'svalla-spin 0.9s linear infinite',
          }}
        />
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2, #5a7a8a)' }}>
          Laddar väder…
        </span>
        <style>{`@keyframes svalla-spin { to { transform: rotate(360deg) } }`}</style>
      </PillShell>
    )
  }

  const desc = weatherDesc(data.weatherCode, data.isDay)

  return (
    <PillShell ariaLabel={`Väder: ${data.temp}°, ${data.windSpeed} m/s ${windDirLabel(data.windDir)}${place ? ', ' + place : ''}`}>
      {/* Väderdata — rad 1 */}
      <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {/* Temp + ikon */}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 16, lineHeight: 1 }}>{desc.emoji}</span>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px' }}>{data.temp}°</span>
          </span>
          <span aria-hidden="true" style={{ width: 1, height: 16, background: 'rgba(10,45,60,0.14)', flexShrink: 0 }} />
          {/* Vind */}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--sea, #1e5c82)' }}>
              <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
              <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
              <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
            </svg>
            <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '-0.1px' }}>
              {data.windSpeed.toFixed(1)} m/s {windDirLabel(data.windDir)}
            </span>
          </span>
        </span>

        {/* Område — rad 2 (visas bara när place finns) */}
        {place && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--acc, #c96e2a)', flexShrink: 0 }}>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span style={{
              fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
              color: 'var(--txt2, #5a7a8a)',
              overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {place}
            </span>
          </span>
        )}
      </span>
    </PillShell>
  )
}

// ── Destination pill ─────────────────────────────────────────────────────────
export function DestinationPill({
  destination, mapCenter, onGo, onClear,
}: {
  destination: { name: string; lat: number; lng: number; label?: string }
  mapCenter:   { lat: number; lng: number }
  onGo:        () => void
  onClear:     () => void
}) {
  const distNM = haversineNM(mapCenter, destination)
  const brg    = bearingDeg(mapCenter, destination)
  const distStr = distNM >= 10 ? distNM.toFixed(0) : distNM.toFixed(1)

  return (
    <PillShell
      onClick={onGo}
      onClose={onClear}
      ariaLabel={`Destination ${destination.name}, ${distStr} nautiska mil, klick zoomar dit`}
    >
      <span
        aria-hidden="true"
        style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: 'var(--grad-sea)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(30,92,130,0.25)',
        }}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </span>
      <span style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        overflow: 'hidden', textAlign: 'left', minWidth: 0, lineHeight: 1.15,
      }}>
        {destination.label && (
          <span style={{
            fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
            color: 'var(--txt3, #8a9aa7)',
          }}>
            {destination.label}
          </span>
        )}
        <span style={{
          fontSize: 13, fontWeight: 700, color: 'var(--txt, #0a2d3c)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          marginTop: destination.label ? 1 : 0,
        }}>
          {destination.name}
        </span>
        <span style={{
          fontSize: 11, fontWeight: 600, color: 'var(--txt2, #5a7a8a)',
          display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 1,
        }}>
          <svg
            viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor"
            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            style={{ transform: `rotate(${brg}deg)`, transformOrigin: '50% 50%', color: 'var(--acc, #c96e2a)' }}
          >
            <path d="M12 2v20" />
            <path d="M5 9l7-7 7 7" />
          </svg>
          {distStr} NM · {windDirLabel(brg)}
        </span>
      </span>
    </PillShell>
  )
}
