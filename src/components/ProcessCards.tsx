'use client'

import { useEffect, useRef, useState } from 'react'

const BG = '#F0F2F5'
const LINE = '1px solid rgba(0,0,0,0.07)'

function getProcessSVG(index: number, c: string) {
  switch (index) {
    case 0: return (
      <svg width="160" height="144" viewBox="0 0 100 90" fill="none">
        <circle cx="35" cy="45" r="22" stroke={c} strokeWidth="0.75" opacity="0.35"/>
        <circle cx="65" cy="45" r="22" stroke={c} strokeWidth="0.75" opacity="0.35"/>
        <path d="M50 24.6 A22 22 0 0 1 50 65.4 A22 22 0 0 1 50 24.6" fill={c} opacity="0.1"/>
        <circle cx="35" cy="45" r="22" fill={c} fillOpacity="0.04"/>
        <circle cx="65" cy="45" r="22" fill={c} fillOpacity="0.04"/>
        <line x1="50" y1="8" x2="50" y2="82" stroke={c} strokeWidth="0.4" opacity="0.15" strokeDasharray="2"/>
      </svg>
    )
    case 1: return (
      <svg width="160" height="144" viewBox="0 0 100 90" fill="none">
        <polygon points="50,10 88,72 12,72" stroke={c} strokeWidth="0.75" opacity="0.35" fill={c} fillOpacity="0.04"/>
        <polygon points="50,24 76,68 24,68" stroke={c} strokeWidth="0.75" opacity="0.25" fill="none"/>
        <polygon points="50,38 64,64 36,64" stroke={c} strokeWidth="0.75" opacity="0.4" fill={c} fillOpacity="0.08"/>
        <circle cx="50" cy="56" r="3" fill={c} opacity="0.4"/>
      </svg>
    )
    case 2: return (
      <svg width="160" height="144" viewBox="0 0 100 90" fill="none">
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
      <svg width="160" height="144" viewBox="0 0 100 90" fill="none">
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
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (isMobile) return
    const observers: IntersectionObserver[] = []
    stepRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(i)
            onStepChange(i)
          }
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [isMobile, onStepChange])

  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              width: '100%',
              height: 180,
              borderRadius: 12,
              border: LINE,
              background: BG,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {getProcessSVG(i, accent)}
            </div>
            <div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: accent,
                marginBottom: 6,
              }}>{step.number}</div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 20,
                fontWeight: 300,
                color: '#1a1a1a',
                letterSpacing: '-0.02em',
                marginBottom: 8,
              }}>{step.title}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: '#767676',
                lineHeight: 1.75,
              }}>{step.description}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 80,
        alignItems: 'start',
      }}
    >
      {/* Left — scrolling copy */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.map((step, i) => (
          <div
            key={i}
            ref={el => { stepRefs.current[i] = el }}
            style={{
              padding: '56px 0',
              borderBottom: i < steps.length - 1 ? LINE : 'none',
            }}
          >
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: activeIndex === i ? accent : '#bbb',
              marginBottom: 14,
              transition: 'color 0.4s ease',
            }}>
              {step.number}
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 28,
              fontWeight: 300,
              color: activeIndex === i ? '#1a1a1a' : '#bbb',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 14,
              transition: 'color 0.4s ease',
            }}>
              {step.title}
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: activeIndex === i ? '#767676' : '#bbb',
              lineHeight: 1.75,
              maxWidth: 400,
              transition: 'color 0.4s ease',
            }}>
              {step.description}
            </div>
          </div>
        ))}
      </div>

      {/* Right — sticky SVG panel */}
      <div style={{
        position: 'sticky',
        top: '30vh',
        height: 'fit-content',
      }}>
        <div style={{
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: 20,
          border: LINE,
          background: BG,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: activeIndex === i ? 1 : 0,
                transform: activeIndex === i ? 'scale(1)' : 'scale(0.92)',
                transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {getProcessSVG(i, accent)}
            </div>
          ))}
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
          }}>
            {steps.map((_, i) => (
              <div
                key={i}
                style={{
                  width: activeIndex === i ? 20 : 6,
                  height: 6,
                  borderRadius: 999,
                  background: activeIndex === i ? accent : 'rgba(0,0,0,0.12)',
                  transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
