'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { SEGMENTS, SegmentId } from '@/lib/segments'

function GlobalCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -500, y: -500 })
  const ringPos = useRef({ x: -500, y: -500 })
  const rafRef = useRef<number>(0)

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)

    function animate() {
      const dot = dotRef.current
      const ring = ringRef.current
      if (dot && ring) {
        dot.style.left = `${mouse.current.x}px`
        dot.style.top = `${mouse.current.y}px`
        ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.18
        ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.18
        ring.style.left = `${ringPos.current.x}px`
        ring.style.top = `${ringPos.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [onMouseMove])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: '#1a1a1a',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1.5px solid #1a1a1a',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'multiply',
          opacity: 0.4,
        }}
      />
    </>
  )
}

export default function SegmentSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [activeSegment, setActiveSegment] = useState<SegmentId | null>(null)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setOpen(false) }
    function onPointer(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  useEffect(() => {
    setMounted(true)
    const seg = Object.keys(SEGMENTS).find(id => pathname.startsWith(`/${id}`)) as SegmentId | undefined
    setActiveSegment(seg ?? null)
  }, [pathname])

  if (!mounted) return null
  if (pathname === '/') return null

  const current = activeSegment ? SEGMENTS[activeSegment] : null

  return (
    <>
      <GlobalCursor />

      <nav className="nav">
        <a href="/" className="nav-logo" style={{ cursor: 'pointer' }}>Corbin Moffitt</a>

        <div style={{ position: 'relative' }} ref={containerRef}>
          <button
            className="switcher-pill"
            onClick={() => setOpen(o => !o)}
            style={{ cursor: 'pointer' }}
          >
            {current ? (
              <>
                <span
                  className="switcher-dot"
                  style={{ background: current.accentColor }}
                />
                {current.shortLabel}
              </>
            ) : (
              'View by'
            )}
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                marginLeft: '2px',
                transition: 'transform 0.2s ease',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                color: '#aaa',
              }}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {open && (
            <div className="switcher-popover">
              {Object.values(SEGMENTS).map(seg => (
                <button
                  key={seg.id}
                  className={`switcher-item ${activeSegment === seg.id ? 'active' : ''}`}
                  onClick={() => {
                    router.push(`/${seg.id}`)
                    setOpen(false)
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <span
                    className="switcher-dot"
                    style={{ background: seg.accentColor }}
                  />
                  {seg.label}
                </button>
              ))}

              <div className="switcher-divider" />

              <button
                className="switcher-meta"
                onClick={() => { router.push('/') ; setOpen(false) }}
                style={{ cursor: 'pointer' }}
              >
                ← Back to gate
              </button>
              <button
                className="switcher-meta"
                onClick={() => { router.push('/work') ; setOpen(false) }}
                style={{ cursor: 'pointer' }}
              >
                See everything →
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}