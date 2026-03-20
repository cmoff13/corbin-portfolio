'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const SEGMENTS = [
  { id: 'brand', title: 'Brand identity', sub: 'Logos, systems, craft', accent: '#993C1D' },
  { id: 'web', title: 'Web & digital', sub: 'Pages, CRO, performance', accent: '#0F6E56' },
  { id: 'ux', title: 'UX & product', sub: 'Flows, IA, interaction', accent: '#534AB7' },
]

const BLOBS = [
  { ox: 0.15, oy: 0.25, r: 560, color: '#f5c8b0', rgb: [245, 200, 176] as [number,number,number], vx: 0.18, vy: 0.12 },
  { ox: 0.82, oy: 0.72, r: 620, color: '#b0e8d4', rgb: [176, 232, 212] as [number,number,number], vx: -0.14, vy: -0.16 },
  { ox: 0.55, oy: 0.15, r: 500, color: '#c8c4f4', rgb: [200, 196, 244] as [number,number,number], vx: 0.1, vy: 0.2 },
]

const BLOB_ACCENTS = ['#c8603a', '#1d9e75', '#534AB7']
const BRUSH_RADIUS = 18
const STROKE_ALPHA = 0.55
const FADE_SPEED = 0.012

type Blob = {
  x: number; y: number; ox: number; oy: number
  r: number; color: string; rgb: [number,number,number]
  vx: number; vy: number; dragged: boolean
}

type Stroke = { x: number; y: number; r: number; g: number; b: number; alpha: number }

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

function SegmentButton({
  seg, onClick, visible, delay,
}: {
  seg: typeof SEGMENTS[0]
  onClick: () => void
  visible: boolean
  delay: number
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: [
          `opacity 0.55s ease ${delay}ms`,
          `transform 0.55s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
          'background 0.2s ease',
          'border-color 0.2s ease',
          'box-shadow 0.2s ease',
        ].join(', '),
        padding: '14px 20px',
        minWidth: '160px',
        textAlign: 'left',
        border: `1px solid ${hovered ? seg.accent : 'rgba(0,0,0,0.1)'}`,
        borderRadius: '8px',
        background: hovered ? seg.accent : 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        cursor: 'none',
        boxShadow: hovered ? `0 6px 28px ${seg.accent}44` : '0 1px 3px rgba(0,0,0,0.06)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{
        fontWeight: 600,
        fontSize: '14px',
        marginBottom: '3px',
        color: hovered ? '#fff' : '#1a1a1a',
        transition: 'color 0.2s ease',
        letterSpacing: '-0.01em',
      }}>
        {seg.title}
      </div>
      <div style={{
        fontSize: '11px',
        color: hovered ? 'rgba(255,255,255,0.65)' : '#999',
        transition: 'color 0.2s ease',
        letterSpacing: '0.01em',
      }}>
        {seg.sub}
      </div>
    </button>
  )
}

export default function SegmentGate() {
  const router = useRouter()
  const [started, setStarted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)

  const mouse = useRef({ x: -500, y: -500 })
  const prevMouse = useRef({ x: -500, y: -500 })
  const ringPos = useRef({ x: -500, y: -500 })
  const cursorAccent = useRef('#1a1a1a')
  const cursorRaf = useRef<number>(0)
  const isDragging = useRef(false)
  const draggedIndex = useRef<number | null>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const blobsRef = useRef<Blob[]>([])
  const strokesRef = useRef<Stroke[]>([])

  useEffect(() => {
    const w = window.innerWidth
    const h = window.innerHeight
    blobsRef.current = BLOBS.map(b => ({
      x: b.ox * w, y: b.oy * h,
      ox: b.ox * w, oy: b.oy * h,
      r: b.r, color: b.color, rgb: b.rgb,
      vx: b.vx, vy: b.vy, dragged: false,
    }))
  }, [])

  useEffect(() => {
    localStorage.removeItem('segment')
    const t = setTimeout(() => setStarted(true), 100)
    return () => clearTimeout(t)
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
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
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
        if (blob.dragged) {
          blob.x = mx - dragOffset.current.x
          blob.y = my - dragOffset.current.y
          blob.ox = blob.x
          blob.oy = blob.y
        } else {
          blob.ox += blob.vx
          blob.oy += blob.vy
          if (blob.ox < -blob.r || blob.ox > W + blob.r) blob.vx *= -1
          if (blob.oy < -blob.r || blob.oy > H + blob.r) blob.vy *= -1
          blob.x += (blob.ox - blob.x) * 0.06
          blob.y += (blob.oy - blob.y) * 0.06
        }

        const g = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r)
        g.addColorStop(0, blob.color + 'cc')
        g.addColorStop(1, blob.color + '00')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2)
        ctx.fill()
      })

      let nearest = -1
      let minD = Infinity
      blobsRef.current.forEach((blob, i) => {
        const d = Math.hypot(mx - blob.x, my - blob.y)
        if (d < blob.r * 0.75 && d < minD) { minD = d; nearest = i }
      })
      cursorAccent.current = nearest >= 0 ? BLOB_ACCENTS[nearest] : '#1a1a1a'

      const moved = Math.hypot(mx - prevMouse.current.x, my - prevMouse.current.y) > 3
      if (moved) {
        if (nearest >= 0) {
          const [r, g, b] = blobsRef.current[nearest].rgb
          strokesRef.current.push({ x: mx, y: my, r, g, b, alpha: STROKE_ALPHA })
        }
        prevMouse.current = { x: mx, y: my }
      }

      strokesRef.current = strokesRef.current.filter(s => s.alpha > 0.005)
      strokesRef.current.forEach(s => {
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, BRUSH_RADIUS)
        g.addColorStop(0, `rgba(${s.r},${s.g},${s.b},${s.alpha})`)
        g.addColorStop(0.5, `rgba(${s.r},${s.g},${s.b},${s.alpha * 0.4})`)
        g.addColorStop(1, `rgba(${s.r},${s.g},${s.b},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(s.x, s.y, BRUSH_RADIUS, 0, Math.PI * 2)
        ctx.fill()
        s.alpha -= FADE_SPEED
      })

      if (frame % 2 === 0) {
        const img = ctx.getImageData(0, 0, W, H)
        const d = img.data
        for (let i = 0; i < d.length; i += 4) {
          const n = (Math.random() - 0.5) * 22
          d[i] = Math.min(255, Math.max(0, d[i] + n))
          d[i+1] = Math.min(255, Math.max(0, d[i+1] + n))
          d[i+2] = Math.min(255, Math.max(0, d[i+2] + n))
        }
        ctx.putImageData(img, 0, 0)
      }

      frame++
      animRef.current = requestAnimationFrame(tick)
    }

    tick()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (prevMouse.current.x === -500) prevMouse.current = { x: e.clientX, y: e.clientY }
    mouse.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onMouseDown = useCallback((e: MouseEvent) => {
    const { clientX: mx, clientY: my } = e
    for (let i = blobsRef.current.length - 1; i >= 0; i--) {
      const b = blobsRef.current[i]
      if (Math.hypot(mx - b.x, my - b.y) < b.r * 0.5) {
        isDragging.current = true
        draggedIndex.current = i
        dragOffset.current = { x: mx - b.x, y: my - b.y }
        b.dragged = true
        break
      }
    }
  }, [])

  const onMouseUp = useCallback(() => {
    if (draggedIndex.current !== null) {
      const b = blobsRef.current[draggedIndex.current]
      b.vx = Math.max(-2, Math.min(2, (mouse.current.x - prevMouse.current.x) * 0.3))
      b.vy = Math.max(-2, Math.min(2, (mouse.current.y - prevMouse.current.y) * 0.3))
      b.ox = b.x
      b.oy = b.y
      b.dragged = false
    }
    isDragging.current = false
    draggedIndex.current = null
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

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
        ring.style.transform = `translate(-50%,-50%) scale(${isDragging.current ? 1.8 : 1})`
      }
      cursorRaf.current = requestAnimationFrame(animCursor)
    }

    animCursor()
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(cursorRaf.current)
    }
  }, [onMouseMove, onMouseDown, onMouseUp])

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
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

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
          transition: 'border-color 0.25s ease, transform 0.2s cubic-bezier(0.23,1,0.32,1)',
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
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#aaa',
          marginBottom: '32px',
        }}>
          Corbin Moffitt — Designer
        </p>

        <div style={{
          width: '100%',
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          <div style={{
            fontSize: 'clamp(36px, 5.5vw, 60px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#1a1a1a',
            whiteSpace: 'nowrap',
            marginBottom: '6px',
          }}>
            {line1.map(({ word, wrapStyle, innerStyle }, i) => (
              <span key={i} style={wrapStyle}>
                <span style={innerStyle}>{word}</span>
              </span>
            ))}
          </div>
          <div style={{
            fontSize: 'clamp(36px, 5.5vw, 60px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#1a1a1a',
            whiteSpace: 'nowrap',
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
          fontSize: '15px',
          color: '#888',
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
          gap: '10px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '28px',
        }}>
          {SEGMENTS.map((seg, i) => (
            <SegmentButton
              key={seg.id}
              seg={seg}
              onClick={() => choose(seg.id)}
              visible={started}
              delay={820 + i * 70}
            />
          ))}
        </div>

        <div style={{ ...fadeUp(1040) }}>
          <button
            onClick={() => router.push('/work')}
            style={{
              fontSize: '12px',
              color: '#bbb',
              background: 'none',
              border: 'none',
              cursor: 'none',
              letterSpacing: '0.03em',
              transition: 'color 0.2s',
              fontWeight: 500,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#555')}
            onMouseLeave={e => (e.currentTarget.style.color = '#bbb')}
          >
            See everything →
          </button>
        </div>
      </div>
    </main>
  )
}