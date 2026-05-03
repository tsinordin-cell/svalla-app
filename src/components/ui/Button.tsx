'use client'
import React from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  children: React.ReactNode
}

const sizeMap: Record<Size, React.CSSProperties> = {
  sm: { height: 36, padding: '0 16px', fontSize: 13, borderRadius: 10 },
  md: { height: 44, padding: '0 22px', fontSize: 14, borderRadius: 12 },
  lg: { height: 52, padding: '0 28px', fontSize: 15.5, borderRadius: 14 },
}

const variantMap: Record<Variant, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(180deg, #0fa0b4 0%, #0a7b8c 55%, #075e6d 100%)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 14px rgba(10,123,140,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
  },
  secondary: {
    background: 'var(--surface, #fff)',
    color: 'var(--ink, #162d3a)',
    border: '1px solid var(--hairline, rgba(22,45,58,0.12))',
    boxShadow: '0 1px 4px rgba(22,45,58,0.06)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--teal, #0a7b8c)',
    border: 'none',
    boxShadow: 'none',
  },
}

/**
 * General-purpose button with primary / secondary / ghost variants.
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  style,
  disabled,
  className,
  ...rest
}) => {
  // press-feedback class triggar globalt definierad :active scale(0.97).
  // Slås av när disabled så användaren ej får visuell feedback på döda knappar.
  const cls = [
    !disabled && 'press-feedback',
    className,
  ].filter(Boolean).join(' ') || undefined

  return (
    <button
      type="button"
      disabled={disabled}
      className={cls}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontWeight: 600,
        fontFamily: 'inherit',
        letterSpacing: 0.1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        width: fullWidth ? '100%' : undefined,
        transition: 'opacity 0.15s, box-shadow 0.15s, transform 80ms ease',
        ...sizeMap[size],
        ...variantMap[variant],
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
