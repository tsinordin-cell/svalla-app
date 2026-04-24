'use client'
import React from 'react'

interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  children: React.ReactNode
}

/**
 * Filter chip / pill.
 * active → teal background, white text, subtle shadow.
 * default → white surface, hairline border, muted text.
 */
const Pill: React.FC<PillProps> = ({ active = false, children, style, className, ...rest }) => {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    height: 32,
    padding: '0 14px',
    borderRadius: 999,
    border: 'none',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: 0.1,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    transition: 'background 0.15s, color 0.15s, box-shadow 0.15s',
    fontFamily: 'inherit',
  }

  const activeStyle: React.CSSProperties = {
    background: 'var(--teal, #0a7b8c)',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(10,123,140,0.22)',
  }

  const defaultStyle: React.CSSProperties = {
    background: 'var(--surface, #fff)',
    color: 'var(--ink-muted, #6a8a96)',
    boxShadow: 'inset 0 0 0 1px var(--hairline, rgba(22,45,58,0.1))',
  }

  return (
    <button
      type="button"
      className={className}
      style={{
        ...base,
        ...(active ? activeStyle : defaultStyle),
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Pill
