'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const SEGMENTS = [
  {
    id: 'brand',
    title: 'Brand identity',
    sub: 'Logos, systems, craft',
    accent: '#3B0764',
    gradient: 'linear-gradient(135deg, #3B0764, #6D28D9)',
    previewBg: '#F0F2F5',
  },
  {
    id: 'web',
    title: 'Web & digital',
    sub: 'Pages, CRO, performance',
    accent: '#DC2626',
    gradient: 'linear-gradient(135deg, #DC2626, #F87171)',
    previewBg: '#F0F2F5',
  },
  {
    id: 'ux',
    title: 'UX & product',
    sub: 'Flows, IA, interaction',
    accent: '#1D4ED8',
    gradient: 'linear-gradient(135deg, #1D4ED8, #60A5FA)',
    previewBg: '#F0F2F5',
  },
]

const BLOBS = [
  { ox: 0.15, oy: 0.25, r: 560, color: '#c4b5f4', rgb: [196, 181, 244] as [number, number, number], vx: 0.18, vy: 0.12 },
  { ox: 0.82, oy: 0.72, r: 620, color: '#fca5a5', rgb: [252, 165, 165] as [number, number, number], vx: -0.14, vy: -0.16 },
  { ox: 0.55, oy: 0.15, r: 500, color: '#93c5fd', rgb: [147, 197, 253] as [number, number, number], vx: 0.1, vy: 0.2 },
]

const MAGNET_STRENGTH = 0.032
const MAGNET_RADIUS = 680

type Blob = {
  x: number; y: number; ox: number; oy: number
  r: number; color: string; rgb: [number, number, number]
  vx: number; vy: number
}

function useWordReveal(text: string, started: boolean, baseDelay: number) {
  return text.split(' ').map((word, i) => ({
    word,
    wrapStyle: {
      display: 'inline-block',
      overflow: 'hidden',
      verticalAlign: 'bottom',
      marginRight: '0.22em',
    } as React.CSSProperties,
    innerStyle: {
      display: 'inline-block',
      transform: started ? 'translateY(0)' : 'translateY(110%)',
      opacity: started ? 1 : 0,
      transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 65}ms, opacity 0.5s ease ${baseDelay + i * 65}ms`,
    } as React.CSSProperties,
  }))
}

const SEGMENT_GRADIENTS: Record<string, { c1: string; c2: string }> = {
  brand: { c1: '#6D28D9', c2: '#3B0764' },
  web:   { c1: '#DC2626', c2: '#7f1d1d' },
  ux:    { c1: '#3b82f6', c2: '#1D4ED8' },
}

function BrandSVG() {
  return (
    <svg width={140} height={120} aria-hidden="true" style={{ position: 'absolute', inset: 0, margin: 'auto', display: 'block' }}>
      <circle cx={54} cy={60} r={44} fill="#3B0764" fillOpacity={0.04} stroke="#3B0764" strokeWidth={0.75} opacity={0.35} />
      <circle cx={86} cy={60} r={44} fill="#3B0764" fillOpacity={0.04} stroke="#3B0764" strokeWidth={0.75} opacity={0.35} />
      <path
        d="M70,19.01 A44,44,0,0,1,70,100.99 A44,44,0,0,0,70,19.01 Z"
        fill="#3B0764"
        opacity={0.08}
      />
    </svg>
  )
}

function WebSVG() {
  const xs = Array.from({ length: 8 }, (_, i) => i * 18)
  const ys = Array.from({ length: 7 }, (_, i) => i * 18)
  return (
    <svg width={140} height={120} aria-hidden="true" style={{ position: 'absolute', inset: 0, margin: 'auto', display: 'block' }}>
      {xs.map(x => (
        <line key={x} x1={x} y1={0} x2={x} y2={120} stroke="#DC2626" strokeWidth={0.5} opacity={0.2} />
      ))}
      {ys.map(y => (
        <line key={y} x1={0} y1={y} x2={140} y2={y} stroke="#DC2626" strokeWidth={0.5} opacity={0.2} />
      ))}
      <rect x={18} y={30} width={60} height={56} rx={2} fill="#DC2626" fillOpacity={0.12} stroke="#DC2626" strokeWidth={0.5} strokeOpacity={0.4} />
      <rect x={76} y={20} width={56} height={24} rx={2} fill="#DC2626" fillOpacity={0.08} />
      <rect x={76} y={60} width={56} height={24} rx={2} fill="#DC2626" fillOpacity={0.08} />
    </svg>
  )
}

function UxSVG() {
  const rects = [
    { x:  8, y:  6, w: 124, h: 108, rx: 8, op: 0.20, filled: false },
    { x: 14, y: 12, w: 112, h:  96, rx: 7, op: 0.25, filled: false },
    { x: 20, y: 18, w: 100, h:  84, rx: 6, op: 0.30, filled: false },
    { x: 26, y: 24, w:  88, h:  72, rx: 5, op: 0.35, filled: false },
    { x: 32, y: 30, w:  76, h:  60, rx: 4, op: 0.40, filled: false },
    { x: 38, y: 36, w:  64, h:  48, rx: 3, op: 0.45, filled: false },
    { x: 44, y: 42, w:  52, h:  36, rx: 2, op: 0.50, filled: true  },
  ]
  return (
    <svg width={140} height={120} aria-hidden="true" style={{ position: 'absolute', inset: 0, margin: 'auto', display: 'block' }}>
      {rects.map((r, i) => (
        <rect
          key={i}
          x={r.x} y={r.y} width={r.w} height={r.h} rx={r.rx}
          fill={r.filled ? '#1D4ED8' : 'none'}
          fillOpacity={r.filled ? 0.15 : undefined}
          stroke="#1D4ED8"
          strokeWidth={0.75}
          opacity={r.op}
        />
      ))}
    </svg>
  )
}

function SegmentButton({
  seg, onClick, visible, delay, fullWidth, isMobile,
}: {
  seg: typeof SEGMENTS[0]
  onClick: () => void
  visible: boolean
  delay: number
  fullWidth: boolean
  isMobile: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const tRef = useRef(Math.random() * Math.PI * 2)
  const hoveredRef = useRef(false)

  useEffect(() => {
    hoveredRef.current = hovered
  }, [hovered])

  useEffect(() => {
    const grad = SEGMENT_GRADIENTS[seg.id]
    if (!grad) return

    function frame() {
      const speed = hoveredRef.current ? 0.006 * 3.5 : 0.006
      tRef.current += speed
      const t = tRef.current
      const alpha = hoveredRef.current ? 0.26 : 0.12
      const x = 50 + 30 * Math.sin(t)
      const y = 50 + 20 * Math.cos(t * 0.7)
      const bg = `${seg.previewBg} radial-gradient(ellipse at ${x}% ${y}%, ${grad.c1}${Math.round(alpha * 255).toString(16).padStart(2, '0')} 0%, ${grad.c2}${Math.round(alpha * 0.4 * 255).toString(16).padStart(2, '0')} 60%, transparent 100%)`
      if (previewRef.current) previewRef.current.style.background = bg
      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [seg.id, seg.previewBg])

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: [
          `opacity 0.55s ease ${delay}ms`,
          `transform 0.55s cubic-bezier(0.23,1,0.32,1) ${visible ? '0ms' : delay + 'ms'}`,
          'box-shadow 0.2s ease',
        ].join(', '),
        padding: '3px',
        ...(fullWidth
          ? { width: '100%', minWidth: 0 }
          : { minWidth: '280px' }),
        textAlign: 'left',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '18px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        cursor: 'none',
        boxShadow: hovered
          ? '0 4px 24px rgba(0,0,0,0.08)'
          : '0 1px 4px rgba(0,0,0,0.06)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Preview area */}
      <div ref={previewRef} style={{
        height: isMobile ? undefined : '200px',
        aspectRatio: isMobile ? '16/9' : undefined,
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        background: seg.previewBg,
      }}>
        {seg.id === 'brand' && <BrandSVG />}
        {seg.id === 'web'   && <WebSVG />}
        {seg.id === 'ux'    && <UxSVG />}
      </div>
      {/* Label area */}
      <div style={{
        padding: isMobile ? '14px 16px 16px' : '16px 20px',
        background: 'transparent',
      }}>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 400,
          fontSize: '17px',
          letterSpacing: '-0.02em',
          color: '#1a1a1a',
          marginBottom: '3px',
        }}>
          {seg.title}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: '#767676',
        }}>
          {seg.sub}
        </div>
      </div>
    </button>
  )
}

export default function SegmentGate() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  const mouse = useRef({ x: -1000, y: -1000 })
  const blobsRef = useRef<Blob[]>([])

  useEffect(() => {
    const w = window.innerWidth
    const h = window.innerHeight
    blobsRef.current = BLOBS.map(b => ({
      x: b.ox * w, y: b.oy * h,
      ox: b.ox * w, oy: b.oy * h,
      r: b.r, color: b.color, rgb: b.rgb,
      vx: b.vx, vy: b.vy,
    }))
  }, [])

  useEffect(() => {
    localStorage.removeItem('segment')
    const t = setTimeout(() => setStarted(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const onResize = () => {
      const prevW = W
      const prevH = H
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
      if (prevW <= 0 || prevH <= 0) return
      blobsRef.current.forEach((blob, i) => {
        const t = BLOBS[i]
        if (t) {
          blob.ox = t.ox * W
          blob.oy = t.oy * H
        }
        blob.x = (blob.x / prevW) * W
        blob.y = (blob.y / prevH) * H
      })
    }
    window.addEventListener('resize', onResize)

    let frame = 0

    function tick() {
      if (!ctx) return
      const mx = mouse.current.x
      const my = mouse.current.y

      ctx.fillStyle = '#F0F2F5'
      ctx.fillRect(0, 0, W, H)

      blobsRef.current.forEach(blob => {
        const dx = mx - blob.x
        const dy = my - blob.y
        const dist = Math.hypot(dx, dy)

        // Magnet pull toward cursor
        if (dist < MAGNET_RADIUS && mx > -500) {
          const strength = MAGNET_STRENGTH * (1 - dist / MAGNET_RADIUS)
          blob.vx += dx * strength * 0.1
          blob.vy += dy * strength * 0.1
        }

        // Drift back toward origin
        blob.vx += (blob.ox - blob.x) * 0.001
        blob.vy += (blob.oy - blob.y) * 0.001

        // Dampen
        blob.vx *= 0.96
        blob.vy *= 0.96

        // Clamp speed
        const speed = Math.hypot(blob.vx, blob.vy)
        if (speed > 3.5) {
          blob.vx = (blob.vx / speed) * 3.5
          blob.vy = (blob.vy / speed) * 3.5
        }

        blob.x += blob.vx
        blob.y += blob.vy

        const g = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r)
        g.addColorStop(0, blob.color + 'cc')
        g.addColorStop(1, blob.color + '00')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2)
        ctx.fill()
      })

      animRef.current = requestAnimationFrame(tick)
    }

    tick()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [onMouseMove])

  function choose(id: string) {
    localStorage.setItem('segment', id)
    router.push(`/${id}`)
  }

  const line1 = useWordReveal('Seven years of design.', started, 80)
  const line2 = useWordReveal('Three ways to see it.', started, 400)

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: started ? 1 : 0,
    transform: started ? 'translateY(0)' : 'translateY(10px)',
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
  })

  return (
    <main
      className="no-select"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '48px 20px 40px' : '24px 24px',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

<div className="grain-overlay" aria-hidden="true" />

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          textAlign: 'center',
          fontFamily: "'Climate Crisis', cursive",
          fontSize: 'clamp(70px, 10vw, 140px)',
          fontWeight: 400,
          color: 'white',
          opacity: 0.15,
          mixBlendMode: 'overlay',
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          zIndex: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          userSelect: 'none',
          display: isMobile ? 'none' : 'block',
        }}
      >
        Corbin Moffitt
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-0.15em',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Climate Crisis', cursive",
          fontSize: 'clamp(120px, 18vw, 260px)',
          fontWeight: 400,
          color: 'white',
          opacity: 0.15,
          mixBlendMode: 'overlay',
          letterSpacing: '-0.04em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          zIndex: 0,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          userSelect: 'none',
          display: isMobile ? 'none' : 'block',
        }}
      >
        Designer
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        <div style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: isMobile ? 'clamp(32px, 9vw, 52px)' : 'clamp(22px, 4vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#1a1a1a',
            textAlign: 'center',
            overflowWrap: 'break-word',
            marginBottom: '6px',
          }}>
            {line1.map(({ word, wrapStyle, innerStyle }, i) => (
              <span key={i} style={wrapStyle}>
                <span style={innerStyle}>{word}</span>
              </span>
            ))}
          </div>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: isMobile ? 'clamp(32px, 9vw, 52px)' : 'clamp(22px, 4vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#1a1a1a',
            textAlign: 'center',
            overflowWrap: 'break-word',
          }}>
            {line2.map(({ word, wrapStyle, innerStyle }, i) => (
              <span key={i} style={wrapStyle}>
                <span style={innerStyle}>{word}</span>
              </span>
            ))}
          </div>
        </div>

        <p style={{
          ...fadeUp(700),
          fontFamily: "'Inter', sans-serif",
          fontSize: isMobile ? '16px' : '15px',
          color: isMobile ? '#767676' : '#444',
          textAlign: 'center',
          lineHeight: 1.6,
          marginBottom: '48px',
          maxWidth: isMobile ? '280px' : '340px',
          margin: isMobile ? '0 auto 48px' : undefined,
        }}>
          Pick the work that's relevant to you.
        </p>

        <div style={{
          ...fadeUp(820),
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          flexWrap: isMobile ? 'nowrap' : 'wrap',
          justifyContent: isMobile ? 'stretch' : 'center',
          alignItems: isMobile ? 'stretch' : undefined,
          gap: '10px',
          width: '100%',
          maxWidth: isMobile ? '100%' : undefined,
          marginTop: isMobile ? '32px' : undefined,
          marginBottom: '28px',
        }}>
          {SEGMENTS.map((seg, i) => (
            <SegmentButton
              key={seg.id}
              seg={seg}
              onClick={() => choose(seg.id)}
              visible={started}
              delay={820 + i * 70}
              fullWidth={isMobile}
              isMobile={isMobile}
            />
          ))}
        </div>

        <div style={{
          ...fadeUp(1040),
          display: isMobile ? 'flex' : undefined,
          justifyContent: isMobile ? 'center' : undefined,
          marginTop: isMobile ? '24px' : undefined,
        }}>
          <button
            onClick={() => router.push('/work')}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? '13px' : '12px',
              color: '#888',
              background: 'none',
              border: 'none',
              cursor: 'none',
              letterSpacing: '0.03em',
              transition: 'color 0.2s',
              fontWeight: 500,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#333')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888')}
          >
            See everything<span aria-hidden="true"> →</span>
          </button>
        </div>

      </div>

      {/* Bottom badge — fixed to viewport bottom */}
      <div style={{
        ...fadeUp(1160),
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(0,0,0,0.07)',
          borderRadius: '999px',
          padding: '5px 8px 5px 12px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            color: 'rgba(0,0,0,0.4)',
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
          }}>
            Vibe-coded with Claude, Cursor and Vercel
          </span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {/* Claude logo */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-label="Claude">
              <rect width="18" height="18" rx="4" fill="#D97706"/>
              <line x1="9" y1="3.5" x2="9" y2="14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9"/>
              <line x1="3.5" y1="9" x2="14.5" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9"/>
              <line x1="4.9" y1="4.9" x2="13.1" y2="13.1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9"/>
              <line x1="13.1" y1="4.9" x2="4.9" y2="13.1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9"/>
            </svg>
            {/* Cursor logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cursor-logo.png" alt="Cursor" width="18" height="18" style={{ borderRadius: '4px', display: 'block' }} />
            {/* Vercel logo */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-label="Vercel">
              <rect width="18" height="18" rx="4" fill="#111"/>
              <path d="M9 4.5L14.5 13.5H3.5L9 4.5Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    </main>
  )
}