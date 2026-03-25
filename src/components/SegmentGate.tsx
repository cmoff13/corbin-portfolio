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
  },
  {
    id: 'web',
    title: 'Web & digital',
    sub: 'Pages, CRO, performance',
    accent: '#DC2626',
    gradient: 'linear-gradient(135deg, #DC2626, #F87171)',
  },
  {
    id: 'ux',
    title: 'UX & product',
    sub: 'Flows, IA, interaction',
    accent: '#1D4ED8',
    gradient: 'linear-gradient(135deg, #1D4ED8, #60A5FA)',
  },
]

const BLOBS = [
  { ox: 0.15, oy: 0.25, r: 560, color: '#c4b5f4', rgb: [196, 181, 244] as [number, number, number], vx: 0.18, vy: 0.12 },
  { ox: 0.82, oy: 0.72, r: 620, color: '#fca5a5', rgb: [252, 165, 165] as [number, number, number], vx: -0.14, vy: -0.16 },
  { ox: 0.55, oy: 0.15, r: 500, color: '#93c5fd', rgb: [147, 197, 253] as [number, number, number], vx: 0.1, vy: 0.2 },
]

const BLOB_ACCENTS = ['#3B0764', '#DC2626', '#1D4ED8']
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

const ICONS: Record<string, React.ReactNode> = {
  brand: (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20"/><path d="m7 17 2-6 3 4 2-3 3 5"/><path d="M4 3h16v10H4z"/>
    </svg>
  ),
  web: (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3l14 9-14 9V3z"/>
    </svg>
  ),
  ux: (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
}

function SegmentButton({
  seg, onClick, visible, delay, fullWidth,
}: {
  seg: typeof SEGMENTS[0]
  onClick: () => void
  visible: boolean
  delay: number
  fullWidth: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-2px)' : 'translateY(0)'
          : 'translateY(16px)',
        transition: [
          `opacity 0.55s ease ${delay}ms`,
          `transform 0.55s cubic-bezier(0.23,1,0.32,1) ${visible ? '0ms' : delay + 'ms'}`,
          'border-color 0.2s ease',
          'box-shadow 0.2s ease',
        ].join(', '),
        padding: '16px 20px',
        ...(fullWidth
          ? { width: '100%', minWidth: 0 }
          : { minWidth: '170px' }),
        textAlign: 'left',
        border: `1.5px solid ${hovered ? seg.accent + '60' : 'rgba(0,0,0,0.08)'}`,
        borderRadius: '14px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        cursor: 'none',
        boxShadow: hovered
          ? '0 4px 20px rgba(0,0,0,0.10)'
          : '0 1px 4px rgba(0,0,0,0.06)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        marginBottom: '5px',
        color: seg.accent,
      }}>
        {ICONS[seg.id]}
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 400,
          fontSize: '15px',
          letterSpacing: '-0.02em',
          color: '#1a1a1a',
        }}>
          {seg.title}
        </span>
      </div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px',
        color: '#555',
        paddingLeft: '21px',
      }}>
        {seg.sub}
      </div>
    </button>
  )
}

export default function SegmentGate() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const [narrowSegmentCards, setNarrowSegmentCards] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)

  const mouse = useRef({ x: -1000, y: -1000 })
  const ringPos = useRef({ x: -1000, y: -1000 })
  const cursorAccent = useRef('#1a1a1a')
  const cursorRaf = useRef<number>(0)
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
    const mq = window.matchMedia('(max-width: 499px)')
    const sync = () => setNarrowSegmentCards(mq.matches)
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

      ctx.fillStyle = '#f7f5f0'
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

      // Cursor accent based on nearest blob
      let nearest = -1
      let minD = Infinity
      blobsRef.current.forEach((blob, i) => {
        const d = Math.hypot(mx - blob.x, my - blob.y)
        if (d < blob.r * 0.75 && d < minD) { minD = d; nearest = i }
      })
      cursorAccent.current = nearest >= 0 ? BLOB_ACCENTS[nearest] : '#1a1a1a'

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

    function animCursor() {
      const dot = cursorDotRef.current
      const ring = cursorRingRef.current
      if (dot && ring) {
        dot.style.left = `${mouse.current.x}px`
        dot.style.top = `${mouse.current.y}px`
        dot.style.background = cursorAccent.current
        ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.18
        ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.18
        ring.style.left = `${ringPos.current.x}px`
        ring.style.top = `${ringPos.current.y}px`
        ring.style.borderColor = cursorAccent.current
      }
      cursorRaf.current = requestAnimationFrame(animCursor)
    }

    animCursor()
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(cursorRaf.current)
    }
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
        padding: '48px 24px',
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
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: '#1a1a1a',
          pointerEvents: 'none',
          zIndex: 100,
          transform: 'translate(-50%,-50%)',
          transition: 'background 0.25s ease',
          mixBlendMode: 'multiply',
        }}
      />

      <div
        ref={cursorRingRef}
        style={{
          position: 'fixed',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid #1a1a1a',
          pointerEvents: 'none',
          zIndex: 99,
          transform: 'translate(-50%,-50%)',
          transition: 'border-color 0.25s ease',
          mixBlendMode: 'multiply',
          opacity: 0.4,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '640px',
        }}
      >
        <p style={{
          ...fadeUp(0),
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#666',
          marginBottom: '32px',
        }}>
          Corbin Moffitt — Designer
        </p>

        <div style={{ width: '100%', textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(28px, 5.5vw, 60px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#1a1a1a',
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
            fontSize: 'clamp(28px, 5.5vw, 60px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#1a1a1a',
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
          fontSize: '15px',
          color: '#444',
          textAlign: 'center',
          lineHeight: 1.6,
          marginBottom: '48px',
          maxWidth: '340px',
        }}>
          Pick the work that's relevant to you.
          Everything else stays out of the way.
        </p>

        <div style={{
          ...fadeUp(820),
          display: 'flex',
          flexDirection: narrowSegmentCards ? 'column' : 'row',
          flexWrap: narrowSegmentCards ? 'nowrap' : 'wrap',
          justifyContent: narrowSegmentCards ? 'stretch' : 'center',
          alignItems: narrowSegmentCards ? 'stretch' : undefined,
          gap: '10px',
          width: '100%',
          marginBottom: '28px',
        }}>
          {SEGMENTS.map((seg, i) => (
            <SegmentButton
              key={seg.id}
              seg={seg}
              onClick={() => choose(seg.id)}
              visible={started}
              delay={820 + i * 70}
              fullWidth={narrowSegmentCards}
            />
          ))}
        </div>

        <div style={{ ...fadeUp(1040) }}>
          <button
            onClick={() => router.push('/work')}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
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
    </main>
  )
}