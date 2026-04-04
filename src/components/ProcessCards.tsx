'use client'

import { useEffect, useRef, useState } from 'react'

const BG = '#F0F2F5'
const LINE = '1px solid rgba(0,0,0,0.07)'
const STEP_HEIGHT = 600

function getProcessSVG(index: number, c: string) {
  switch (index) {
    case 0: return (
      <svg width="75%" height="75%" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="70" stroke={c} strokeWidth="0.5" opacity="0.15"/>
        <circle cx="100" cy="100" r="50" stroke={c} strokeWidth="0.5" opacity="0.2"/>
        <circle cx="100" cy="100" r="30" stroke={c} strokeWidth="0.5" opacity="0.3"/>
        <circle cx="100" cy="100" r="12" fill={c} opacity="0.12"/>
        <circle cx="100" cy="100" r="5" fill={c} opacity="0.5"/>
        <line x1="100" y1="30" x2="100" y2="170" stroke={c} strokeWidth="0.5" opacity="0.12" strokeDasharray="3 4"/>
        <line x1="30" y1="100" x2="170" y2="100" stroke={c} strokeWidth="0.5" opacity="0.12" strokeDasharray="3 4"/>
        <rect x="60" y="38" width="32" height="20" rx="3" fill={c} fillOpacity="0.06" stroke={c} strokeWidth="0.75" opacity="0.2"/>
        <rect x="63" y="42" width="20" height="2.5" rx="1" fill={c} opacity="0.3"/>
        <rect x="63" y="47" width="14" height="2" rx="1" fill={c} opacity="0.2"/>
        <rect x="108" y="142" width="32" height="20" rx="3" fill={c} fillOpacity="0.06" stroke={c} strokeWidth="0.75" opacity="0.2"/>
        <rect x="111" y="146" width="20" height="2.5" rx="1" fill={c} opacity="0.3"/>
        <rect x="111" y="151" width="14" height="2" rx="1" fill={c} opacity="0.2"/>
        <rect x="142" y="60" width="28" height="18" rx="3" fill={c} fillOpacity="0.06" stroke={c} strokeWidth="0.75" opacity="0.2"/>
        <rect x="145" y="64" width="18" height="2.5" rx="1" fill={c} opacity="0.3"/>
        <rect x="145" y="69" width="12" height="2" rx="1" fill={c} opacity="0.2"/>
        <rect x="30" y="122" width="28" height="18" rx="3" fill={c} fillOpacity="0.06" stroke={c} strokeWidth="0.75" opacity="0.2"/>
        <rect x="33" y="126" width="18" height="2.5" rx="1" fill={c} opacity="0.3"/>
        <rect x="33" y="131" width="12" height="2" rx="1" fill={c} opacity="0.2"/>
        <circle cx="100" cy="30" r="3" fill={c} opacity="0.4"/>
        <circle cx="170" cy="100" r="3" fill={c} opacity="0.4"/>
        <circle cx="100" cy="170" r="3" fill={c} opacity="0.4"/>
        <circle cx="30" cy="100" r="3" fill={c} opacity="0.4"/>
      </svg>
    )
    case 1: return (
      <svg width="75%" height="75%" viewBox="0 0 200 200" fill="none">
        <rect x="20" y="20" width="74" height="52" rx="5" fill={c} fillOpacity="0.05" stroke={c} strokeWidth="0.75" opacity="0.25"/>
        <rect x="28" y="28" width="46" height="5" rx="2" fill={c} opacity="0.2"/>
        <rect x="28" y="37" width="32" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="28" y="44" width="38" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="28" y="51" width="26" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="106" y="20" width="74" height="52" rx="5" fill={c} fillOpacity="0.05" stroke={c} strokeWidth="0.75" opacity="0.25"/>
        <rect x="114" y="28" width="46" height="5" rx="2" fill={c} opacity="0.2"/>
        <rect x="114" y="37" width="32" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="114" y="44" width="38" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="114" y="51" width="26" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="20" y="90" width="74" height="52" rx="5" fill={c} fillOpacity="0.05" stroke={c} strokeWidth="0.75" opacity="0.25"/>
        <rect x="28" y="98" width="46" height="5" rx="2" fill={c} opacity="0.2"/>
        <rect x="28" y="107" width="32" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="28" y="114" width="38" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="28" y="121" width="26" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="106" y="90" width="74" height="52" rx="5" fill={c} fillOpacity="0.08" stroke={c} strokeWidth="1" opacity="0.4"/>
        <rect x="114" y="98" width="46" height="5" rx="2" fill={c} opacity="0.35"/>
        <rect x="114" y="107" width="32" height="3" rx="1.5" fill={c} opacity="0.2"/>
        <rect x="114" y="114" width="38" height="3" rx="1.5" fill={c} opacity="0.2"/>
        <rect x="114" y="121" width="26" height="3" rx="1.5" fill={c} opacity="0.2"/>
        <circle cx="143" cy="105" r="8" fill={c} opacity="0.15"/>
        <circle cx="143" cy="105" r="4" fill={c} opacity="0.4"/>
        <path d="M57 72 L57 90" stroke={c} strokeWidth="0.75" opacity="0.3" strokeDasharray="2 2"/>
        <path d="M143 72 L143 90" stroke={c} strokeWidth="0.75" opacity="0.3" strokeDasharray="2 2"/>
        <rect x="30" y="158" width="140" height="26" rx="5" fill={c} fillOpacity="0.06" stroke={c} strokeWidth="0.75" opacity="0.2"/>
        <rect x="38" y="164" width="60" height="3.5" rx="1.5" fill={c} opacity="0.15"/>
        <rect x="38" y="171" width="40" height="3" rx="1.5" fill={c} opacity="0.1"/>
        <path d="M100 142 L100 158" stroke={c} strokeWidth="0.75" opacity="0.3" strokeDasharray="2 2"/>
      </svg>
    )
    case 2: return (
      <svg width="75%" height="75%" viewBox="0 0 200 200" fill="none">
        <rect x="25" y="25" width="150" height="115" rx="8" fill={c} fillOpacity="0.04" stroke={c} strokeWidth="0.75" opacity="0.2"/>
        <rect x="25" y="25" width="150" height="22" rx="8" fill={c} fillOpacity="0.08"/>
        <circle cx="38" cy="36" r="4" fill={c} opacity="0.25"/>
        <circle cx="52" cy="36" r="4" fill={c} opacity="0.15"/>
        <circle cx="66" cy="36" r="4" fill={c} opacity="0.1"/>
        <rect x="35" y="57" width="60" height="40" rx="4" fill={c} fillOpacity="0.08" stroke={c} strokeWidth="0.5" opacity="0.2"/>
        <rect x="40" y="63" width="40" height="3" rx="1.5" fill={c} opacity="0.2"/>
        <rect x="40" y="70" width="30" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="40" y="77" width="35" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="40" y="84" width="22" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="105" y="57" width="60" height="40" rx="4" fill={c} fillOpacity="0.08" stroke={c} strokeWidth="0.5" opacity="0.2"/>
        <rect x="110" y="63" width="40" height="3" rx="1.5" fill={c} opacity="0.2"/>
        <rect x="110" y="70" width="30" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="110" y="77" width="35" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="110" y="84" width="22" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="55" y="107" width="90" height="24" rx="5" fill={c} fillOpacity="0.12" stroke={c} strokeWidth="0.75" opacity="0.3"/>
        <rect x="65" y="116" width="60" height="3.5" rx="1.5" fill={c} opacity="0.4"/>
        <rect x="35" y="152" width="130" height="32" rx="6" fill={c} fillOpacity="0.06" stroke={c} strokeWidth="0.5" opacity="0.15"/>
        <path d="M55 162 L65 172 L85 156" stroke={c} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="95" y="160" width="60" height="3" rx="1.5" fill={c} opacity="0.15"/>
        <rect x="95" y="167" width="44" height="3" rx="1.5" fill={c} opacity="0.1"/>
      </svg>
    )
    default: return (
      <svg width="75%" height="75%" viewBox="0 0 200 200" fill="none">
        <rect x="20" y="130" width="24" height="52" rx="4" fill={c} opacity="0.1"/>
        <rect x="52" y="108" width="24" height="74" rx="4" fill={c} opacity="0.15"/>
        <rect x="84" y="82" width="24" height="100" rx="4" fill={c} opacity="0.2"/>
        <rect x="116" y="56" width="24" height="126" rx="4" fill={c} opacity="0.28"/>
        <rect x="148" y="28" width="24" height="154" rx="4" fill={c} opacity="0.38"/>
        <path d="M32 130 L64 108 L96 82 L128 56 L160 28" stroke={c} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="32" cy="130" r="4" fill={c} opacity="0.35"/>
        <circle cx="64" cy="108" r="4" fill={c} opacity="0.4"/>
        <circle cx="96" cy="82" r="4" fill={c} opacity="0.45"/>
        <circle cx="128" cy="56" r="4" fill={c} opacity="0.5"/>
        <circle cx="160" cy="28" r="5" fill={c} opacity="0.6"/>
        <rect x="130" y="14" width="48" height="22" rx="4" fill={c} fillOpacity="0.1" stroke={c} strokeWidth="0.75" opacity="0.3"/>
        <rect x="136" y="19" width="28" height="3" rx="1.5" fill={c} opacity="0.35"/>
        <rect x="136" y="25" width="18" height="2.5" rx="1" fill={c} opacity="0.2"/>
        <line x1="20" y1="182" x2="172" y2="182" stroke={c} strokeWidth="0.5" opacity="0.2"/>
        <rect x="20" y="185" width="8" height="3" rx="1" fill={c} opacity="0.15"/>
        <rect x="52" y="185" width="8" height="3" rx="1" fill={c} opacity="0.15"/>
        <rect x="84" y="185" width="8" height="3" rx="1" fill={c} opacity="0.15"/>
        <rect x="116" y="185" width="8" height="3" rx="1" fill={c} opacity="0.15"/>
        <rect x="148" y="185" width="8" height="3" rx="1" fill={c} opacity="0.15"/>
      </svg>
    )
  }
}

function BlobCanvas({ accent }: { accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1000, y: -1000 })
  const blob = useRef({ x: 0, y: 0, vx: 0, vy: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      blob.current.x = canvas.width / 2
      blob.current.y = canvas.height / 2
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.parentElement?.addEventListener('mousemove', onMouseMove)

    const r = parseInt(accent.slice(1, 3), 16)
    const g = parseInt(accent.slice(3, 5), 16)
    const b = parseInt(accent.slice(5, 7), 16)

    function tick() {
      const W = canvas!.width
      const H = canvas!.height
      const cx = W / 2
      const cy = H / 2
      const dx = mouse.current.x - blob.current.x
      const dy = mouse.current.y - blob.current.y
      const dist = Math.hypot(dx, dy)
      const MAGNET = 300
      if (dist < MAGNET && mouse.current.x > -500) {
        const str = 0.006 * (1 - dist / MAGNET)
        blob.current.vx += dx * str
        blob.current.vy += dy * str
      }
      blob.current.vx += (cx - blob.current.x) * 0.003
      blob.current.vy += (cy - blob.current.y) * 0.003
      blob.current.vx *= 0.92
      blob.current.vy *= 0.92
      const speed = Math.hypot(blob.current.vx, blob.current.vy)
      if (speed > 4) {
        blob.current.vx = blob.current.vx / speed * 4
        blob.current.vy = blob.current.vy / speed * 4
      }
      blob.current.x += blob.current.vx
      blob.current.y += blob.current.vy
      ctx!.clearRect(0, 0, W, H)
      const radius = Math.min(W, H) * 0.55
      const grad = ctx!.createRadialGradient(blob.current.x, blob.current.y, 0, blob.current.x, blob.current.y, radius)
      grad.addColorStop(0, `rgba(${r},${g},${b},0.14)`)
      grad.addColorStop(0.5, `rgba(${r},${g},${b},0.06)`)
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
      ctx!.fillStyle = grad
      ctx!.beginPath()
      ctx!.arc(blob.current.x, blob.current.y, radius, 0, Math.PI * 2)
      ctx!.fill()
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove)
    }
  }, [accent])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
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
  const outerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [vh, setVh] = useState(800)

  useEffect(() => {
    setVh(window.innerHeight)
    const onResize = () => setVh(window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const onScroll = () => {
      const el = outerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrolled = -rect.top
      const total = el.offsetHeight - window.innerHeight
      if (scrolled < 0 || scrolled > total) return
      const progress = scrolled / total
      const idx = Math.min(steps.length - 1, Math.floor(progress * steps.length))
      setActiveIndex(idx)
      onStepChange(idx)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile, steps.length, onStepChange])

  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        {steps.map((step, i) => (
          <div key={i}>
            <div style={{
              width: '100%',
              aspectRatio: '1/1',
              borderRadius: 16,
              border: LINE,
              background: BG,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}>
              {getProcessSVG(i, accent)}
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              color: accent,
              marginBottom: 10,
            }}>{step.number}</div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 22,
              fontWeight: 300,
              color: '#1a1a1a',
              letterSpacing: '-0.02em',
              marginBottom: 10,
            }}>{step.title}</div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: '#767676',
              lineHeight: 1.75,
            }}>{step.description}</div>
          </div>
        ))}
      </div>
    )
  }

  const totalHeight = steps.length * STEP_HEIGHT + vh

  return (
    <div
      ref={outerRef}
      style={{ height: totalHeight, position: 'relative' }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 80,
        alignItems: 'center',
      }}>
        {/* Left — copy */}
        <div style={{ position: 'relative', height: 280 }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                opacity: activeIndex === i ? 1 : 0,
                transform: activeIndex === i
                  ? 'translateY(0)'
                  : activeIndex > i
                  ? 'translateY(-24px)'
                  : 'translateY(24px)',
                transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                pointerEvents: activeIndex === i ? 'auto' : 'none',
              }}
            >
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: accent,
                marginBottom: 16,
              }}>{step.number}</div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 36,
                fontWeight: 300,
                color: '#1a1a1a',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: 18,
              }}>{step.title}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: '#767676',
                lineHeight: 1.75,
                maxWidth: 380,
              }}>{step.description}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 32 }}>
                {steps.map((_, j) => (
                  <div key={j} style={{
                    width: activeIndex === j ? 20 : 6,
                    height: 6,
                    borderRadius: 999,
                    background: activeIndex === j ? accent : 'rgba(0,0,0,0.12)',
                    transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
                  }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right — SVG panel */}
        <div style={{
          aspectRatio: '1/1',
          borderRadius: 20,
          border: LINE,
          background: BG,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <BlobCanvas accent={accent} />
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
                transform: activeIndex === i ? 'scale(1)' : 'scale(0.88)',
                transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                zIndex: 1,
              }}
            >
              {getProcessSVG(i, accent)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
