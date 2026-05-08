'use client'
/**
 * ThorkelRouteCard — strukturerad rutt-visning i Thorkel-chatten.
 *
 * Renderas när Thorkel använt `get_transit_to_island`-toolet och servern
 * har returnerat riktiga avgångar från Trafiklab. Visar tre nästa resor
 * med tider, byten och båt-badge — samma data-shape som DepartureWidget
 * på ösidor.
 *
 * Designval — skiljer sig från DepartureWidget:
 *  - Inline i chat-bubbla istället för fullbredd hero-section
 *  - Ljus bakgrund (chat-stil) istället för mörk gradient
 *  - Klick öppnar SL.se reseplaneraren förifylld
 *  - Klickbart "Spara som plan" via befintlig planera-flow lämnas till
 *    overlay-komponenten — det här kortet är read-only.
 */
import type { TransitData } from '@/app/api/guide/route'

interface Props {
  data: TransitData
}

export default function ThorkelRouteCard({ data }: Props) {
  const trips = data.trips.slice(0, 3)
  if (trips.length === 0) return null

  return (
    <div
      role="region"
      aria-label={`Avgångar till ${data.destName}`}
      style={{
        marginTop: 10,
        background: 'var(--white, #ffffff)',
        border: '1.5px solid rgba(10,123,140,0.18)',
        borderLeft: '4px solid var(--sea, #1e5c82)',
        borderRadius: 14,
        padding: '14px 16px',
        boxShadow: '0 2px 8px rgba(0,30,45,0.06)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        <strong style={{ fontSize: 13, color: 'var(--sea, #1e5c82)' }}>
          Nästa avgångar till {data.destName.replace(/\s+brygga$/i, '')}
        </strong>
        <span
          style={{
            background: 'rgba(74, 222, 128, 0.15)',
            color: '#0a7b3c',
            fontSize: 9, fontWeight: 800, letterSpacing: 0.6,
            padding: '2px 7px', borderRadius: 999,
            border: '1px solid rgba(74, 222, 128, 0.30)',
            textTransform: 'uppercase',
          }}
        >
          Live · Trafiklab
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {trips.map((t, i) => (
          <TripRow key={i} trip={t} originName={data.originName} destName={data.destName} />
        ))}
      </div>

      <div style={{
        marginTop: 10, paddingTop: 8,
        borderTop: '1px solid rgba(10,123,140,0.10)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 11, color: 'var(--txt3, #6b7c93)', flexWrap: 'wrap', gap: 6,
      }}>
        <span>Från {data.originName}</span>
        <a
          href={`https://sl.se/sv/reseplaneraren#/sok-resa?Origin.Name=${encodeURIComponent(data.originName)}&Destination.Name=${encodeURIComponent(data.destName)}`}
          target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--sea, #1e5c82)', fontWeight: 700, textDecoration: 'none' }}
        >
          Se alla avgångar →
        </a>
      </div>
    </div>
  )
}

function TripRow({ trip, originName, destName }: { trip: TransitData['trips'][number]; originName: string; destName: string }) {
  const operatorList = [...new Set(trip.legs.map(l => l.operator).filter(Boolean))].join(' · ') || 'Kollektivt'
  const hasFerry = trip.legs.some(l => l.category.toLowerCase().includes('färja'))
  const tripUrl = `https://sl.se/sv/reseplaneraren#/sok-resa?Origin.Name=${encodeURIComponent(originName)}&Destination.Name=${encodeURIComponent(destName)}&Date=${trip.startDate}&Time=${trip.startTime}`
  const dur = formatDuration(trip.durationMin)

  return (
    <a
      href={tripUrl}
      target="_blank" rel="noopener noreferrer"
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '8px 10px',
        background: 'rgba(10,123,140,0.04)',
        border: '1px solid rgba(10,123,140,0.10)',
        borderRadius: 10,
        color: 'var(--txt, #2b3e56)',
        textDecoration: 'none',
        transition: 'background 120ms ease',
      }}
    >
      <div style={{ flexShrink: 0, minWidth: 78 }}>
        <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
          {trip.startTime}
        </div>
        <div style={{ fontSize: 10, color: 'var(--txt3, #6b7c93)', marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>
          → {trip.endTime}
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 12, fontWeight: 600, color: 'var(--txt, #2b3e56)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {operatorList}
        </div>
        <div style={{ fontSize: 10.5, color: 'var(--txt3, #6b7c93)' }}>
          {dur} · {trip.changes === 0 ? 'inga byten' : `${trip.changes} ${trip.changes === 1 ? 'byte' : 'byten'}`}
          {hasFerry && <span style={{ marginLeft: 5, color: '#0a7b3c', fontWeight: 700 }}>· båt</span>}
        </div>
      </div>

      <span style={{ fontSize: 16, color: 'rgba(10,123,140,0.45)', flexShrink: 0 }}>›</span>
    </a>
  )
}

function formatDuration(min: number): string {
  if (!min || min < 1) return '–'
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m === 0 ? `${h} h` : `${h} h ${m} min`
}
