'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { SEGMENTS, SegmentId } from '@/lib/segments'

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
  if (pathname === '/' || pathname === '/gate') return null

  const current = activeSegment ? SEGMENTS[activeSegment] : null

  return (
    <nav className="nav">
      <a href="/" className="nav-logo">Corbin Moffitt</a>

      <div style={{ position: 'relative' }} ref={containerRef}>
        <button
          type="button"
          className="switcher-pill"
          onClick={() => setOpen(o => !o)}
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
            aria-hidden
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {open && (
          <div className="switcher-popover">
            {Object.values(SEGMENTS).map(seg => (
              <button
                key={seg.id}
                type="button"
                className={`switcher-item ${activeSegment === seg.id ? 'active' : ''}`}
                onClick={() => {
                  router.push(`/${seg.id}`)
                  setOpen(false)
                }}
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
              type="button"
              className="switcher-meta"
              onClick={() => { router.push('/') ; setOpen(false) }}
            >
              ← Home
            </button>
            <button
              type="button"
              className="switcher-meta"
              onClick={() => { router.push('/gate') ; setOpen(false) }}
            >
              Lane picker
            </button>
            <button
              type="button"
              className="switcher-meta"
              onClick={() => { router.push('/work') ; setOpen(false) }}
            >
              See everything →
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
