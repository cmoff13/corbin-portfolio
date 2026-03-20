'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { SEGMENTS, SegmentId } from '@/lib/segments'

export default function SegmentSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<SegmentId | null>(null)
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem('segment') as SegmentId | null
    const fromPath = Object.keys(SEGMENTS).find(id => pathname.startsWith(`/${id}`)) as SegmentId | undefined
    const resolved = fromPath ?? stored ?? null
    setCurrent(resolved)
    if (resolved) localStorage.setItem('segment', resolved)
    setMounted(true)
  }, [pathname])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function switchTo(id: SegmentId) {
    localStorage.setItem('segment', id)
    setCurrent(id)
    setOpen(false)
    router.push(`/${id}`)
  }

  const seg = current ? SEGMENTS[current] : null

  if (!mounted) return null

  return (
    <div ref={ref} className="switcher-root">
      <button
        className="switcher-pill"
        style={{ '--seg-accent': seg?.accentColor ?? '#888' } as React.CSSProperties}
        onClick={() => setOpen(o => !o)}
        aria-label="Switch portfolio segment"
      >
        {seg && <span className="switcher-dot" />}
        <span className="switcher-label">
          {seg ? seg.shortLabel : 'View by'}
        </span>
        <span className="switcher-chevron">{open ? '↑' : '↓'}</span>
      </button>

      {open && (
        <div className="switcher-popover">
          {Object.values(SEGMENTS).map(s => (
            <button
              key={s.id}
              className={`switcher-item ${s.id === current ? 'switcher-item--active' : ''}`}
              style={{ '--seg-accent': s.accentColor } as React.CSSProperties}
              onClick={() => switchTo(s.id)}
            >
              <span className="switcher-item-dot" />
              <span className="switcher-item-label">{s.label}</span>
              {s.id === current && <span className="switcher-item-check">✓</span>}
            </button>
          ))}
          <div className="switcher-divider" />
          <button
            className="switcher-item"
            onClick={() => { setOpen(false); router.push('/') }}
          >
            <span className="switcher-item-label switcher-item-all">← Back to gate</span>
          </button>
          <button
            className="switcher-item"
            onClick={() => { setOpen(false); router.push('/work') }}
          >
            <span className="switcher-item-label switcher-item-all">See everything →</span>
          </button>
        </div>
      )}
    </div>
  )
}