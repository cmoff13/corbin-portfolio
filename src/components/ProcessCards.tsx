'use client'

import { useState, useRef, useEffect } from 'react'

const BG = '#F0F2F5'

function getProcessSVG(index: number, c: string) {
  switch (index) {
    case 0: return (
      <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
        <circle cx="35" cy="45" r="22" stroke={c} strokeWidth="0.75" opacity="0.35"/>
        <circle cx="65" cy="45" r="22" stroke={c} strokeWidth="0.75" opacity="0.35"/>
        <path d="M50 24.6 A22 22 0 0 1 50 65.4 A22 22 0 0 1 50 24.6" fill={c} opacity="0.1"/>
        <circle cx="35" cy="45" r="22" fill={c} fillOpacity="0.04"/>
        <circle cx="65" cy="45" r="22" fill={c} fillOpacity="0.04"/>
        <line x1="50" y1="8" x2="50" y2="82" stroke={c} strokeWidth="0.4" opacity="0.15" strokeDasharray="2 3"/>
      </svg>
    )
    case 1: return (
      <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
        <polygon points="50,10 88,72 12,72" stroke={c} strokeWidth="0.75" opacity="0.35" fill={c} fillOpacity="0.04"/>
        <polygon points="50,24 76,68 24,68" stroke={c} strokeWidth="0.75" opacity="0.25" fill="none"/>
        <polygon points="50,38 64,64 36,64" stroke={c} strokeWidth="0.75" opacity="0.4" fill={c} fillOpacity="0.08"/>
        <circle cx="50" cy="56" r="3" fill={c} opacity="0.4"/>
      </svg>
    )
    case 2: return (
      <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
        <line x1="18" y1="45" x2="82" y2="45" stroke={c} strokeWidth="0.5" opacity="0.2"/>
        <line x1="50" y1="13" x2="50" y2="77" stroke={c} strokeWidth="0.5" opacity="0.2"/>
        <circle cx="50" cy="45" r="24" stroke={c} strokeWidth="0.75" opacity="0.3" fill={c} fillOpacity="0.04"/>
        <circle cx="50" cy="45" r="14" stroke={c} strokeWidth="0.75" opacity="0.4" fill={c} fillOpacity="0.06"/>
        <circle cx="50" cy="45" r="5" fill={c} opacity="0.5"/>
        <circle cx="50" cy="21" r="2" fill={c} opacity="0.3"/>
        <circle cx="74" cy="45" r="2" fill={c} opacity="0.3"/>
        <circle cx="50" cy="69" r="2" fill={c} opacity="0.3"/>
        <circle cx="26" cy="45" r="2" fill={c} opacity="0.3"/>
      </svg>
    )
    default: return (
      <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
        <rect x="16" y="14" width="68" height="52" rx="5" stroke={c} strokeWidth="0.75" opacity="0.3" fill={c} fillOpacity="0.03"/>
        <rect x="24" y="22" width="52" height="7" rx="2" fill={c} opacity="0.15"/>
        <rect x="24" y="33" width="36" height="4" rx="2" fill={c} opacity="0.1"/>
        <rect x="24" y="41" width="44" height="4" rx="2" fill={c} opacity="0.1"/>
        <rect x="24" y="49" width="28" height="4" rx="2" fill={c} opacity="0.1"/>
        <line x1="50" y1="66" x2="50" y2="76" stroke={c} strokeWidth="0.75" opacity="0.3"/>
        <path d="M42 76 L50 84 L58 76" stroke={c} strokeWidth="0.75" opacity="0.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
}

function ProcessCard({
  step,
  active,
  onClick,
  index,
  isMobile,
  accent,
}: {
  step: { number: string; title: string; description: string }
  active: boolean
  onClick: () => void
  index: number
  isMobile: boolean
  accent: string
}) {
  const previewRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const tRef = useRef(Math.random() * Math.PI * 2)
  const hoveredRef = useRef(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => { hoveredRef.current = hovered }, [hovered])

  useEffect(() => {
    if (active) {
      cancelAnimationFrame(rafRef.current)
      if (previewRef.current) previewRef.current.style.background = accent
      return
    }
    function frame() {
      const speed = hoveredRef.current ? 0.006 * 3.5 : 0.006
      tRef.current += speed
      const t = tRef.current
      const alpha = hoveredRef.current ? 0.26 : 0.12
      const x = 50 + 30 * Math.sin(t)
      const y = 50 + 20 * Math.cos(t * 0.7)
      const a1 = Math.round(alpha * 255).toString(16).padStart(2, '0')
      const a2 = Math.round(alpha * 0.4 * 255).toString(16).padStart(2, '0')
      const bg = `#F0F2F5 radial-gradient(ellipse at ${x}% ${y}%, ${accent}${a1} 0%, ${accent}${a2} 60%, transparent 100%)`
      if (previewRef.current) previewRef.current.style.background = bg
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, accent])

  const svgColor = active ? '#ffffff' : accent

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        padding: '3px',
        borderRadius: '18px',
        border: active ? `1px solid ${accent}` : '1px solid rgba(0,0,0,0.06)',
        background: active ? accent : BG,
        boxShadow: hovered ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
        cursor: 'none',
        textAlign: 'left',
        transition: 'all 0.25s ease',
      }}
    >
      <div ref={previewRef} style={{
        height: isMobile ? '100px' : '120px',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        background: BG,
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: active ? 1 : 0.85,
          transition: 'opacity 0.25s ease',
        }}>
          {getProcessSVG(index, svgColor)}
        </div>
      </div>
      <div style={{ padding: isMobile ? '10px 12px 10px' : '14px 16px' }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: active ? 'rgba(255,255,255,0.5)' : accent,
          marginBottom: '4px',
          transition: 'color 0.25s ease',
        }}>
          {step.number}
        </div>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '15px',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: active ? '#ffffff' : '#1a1a1a',
          transition: 'color 0.25s ease',
        }}>
          {step.title}
        </div>
      </div>
    </button>
  )
}

export default function ProcessCards({
  steps,
  accent,
  isMobile,
  activeStep,
  onStepChange,
}: {
  steps: { number: string; title: string; description: string }[]
  accent: string
  isMobile: boolean
  activeStep: number
  onStepChange: (i: number) => void
}) {
  return (
    <div style={{ maxWidth: 880 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: '12px',
      }}>
        {steps.map((step, i) => (
          <ProcessCard
            key={i}
            step={step}
            active={activeStep === i}
            onClick={() => onStepChange(i)}
            index={i}
            isMobile={isMobile}
            accent={accent}
          />
        ))}
      </div>
      <p
        key={activeStep}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: '#767676',
          lineHeight: 1.75,
          maxWidth: '560px',
          marginTop: '20px',
          marginBottom: 0,
          animation: 'fadeIn 0.2s ease',
        }}
      >
        {steps[activeStep].description}
      </p>
    </div>
  )
}
