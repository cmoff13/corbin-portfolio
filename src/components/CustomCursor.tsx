'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -1000, y: -1000 })
  const ringPos = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef<number>(0)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onMouseClick = useCallback((e: MouseEvent) => {
    const id = Date.now()
    setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 550)
  }, [])

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    function tick() {
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
      rafRef.current = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onMouseClick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onMouseClick)
    }
  }, [onMouseMove, onMouseClick])

  if (isTouch) return null

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', width: 7, height: 7,
        borderRadius: '50%', background: '#1a1a1a',
        pointerEvents: 'none', zIndex: 999999,
        transform: 'translate(-50%,-50%)',
        mixBlendMode: 'multiply',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', width: 32, height: 32,
        borderRadius: '50%', border: '1.5px solid #1a1a1a',
        pointerEvents: 'none', zIndex: 999998,
        transform: 'translate(-50%,-50%)',
        mixBlendMode: 'multiply', opacity: 0.4,
      }} />
      {ripples.map(r => (
        <div key={r.id} style={{
          position: 'fixed', left: r.x, top: r.y,
          width: 8, height: 8, borderRadius: '50%',
          border: '1.5px solid #1a1a1a',
          pointerEvents: 'none', zIndex: 999997,
          transform: 'translate(-50%,-50%)',
          mixBlendMode: 'multiply',
          animation: 'cursorRipple 0.5s ease forwards',
        }} />
      ))}
    </>
  )
}