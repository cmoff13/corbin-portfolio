'use client'

import { useEffect, useRef, useCallback } from 'react'

interface HeroBlobProps {
  color: string
}

export default function HeroBlob({ color }: HeroBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const blobRef = useRef({ x: 0, y: 0, vx: 0.3, vy: 0.2 })
  const rafRef = useRef<number>(0)

  const onMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const parent = canvas.parentElement
    if (!parent) return

    function resize() {
      if (!canvas || !parent) return
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      blobRef.current.x = canvas.width * 0.65
      blobRef.current.y = canvas.height * 0.45
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    parent.addEventListener('mousemove', onMouseMove as EventListener)

    function tick() {
      if (!canvas || !ctx) return
      const W = canvas.width
      const H = canvas.height
      const blob = blobRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      const dx = mx - blob.x
      const dy = my - blob.y
      const dist = Math.hypot(dx, dy)
      if (dist < 500) {
        blob.vx += dx * 0.012 * (1 - dist / 500) * 0.1
        blob.vy += dy * 0.012 * (1 - dist / 500) * 0.1
      }
      blob.vx += (W * 0.65 - blob.x) * 0.0012
      blob.vy += (H * 0.45 - blob.y) * 0.0012
      blob.vx *= 0.95
      blob.vy *= 0.95
      blob.x += blob.vx
      blob.y += blob.vy

      ctx.clearRect(0, 0, W, H)
      const r = Math.min(W, H) * 0.65
      const g = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, r)
      g.addColorStop(0, color + '28')
      g.addColorStop(0.4, color + '14')
      g.addColorStop(0.7, color + '08')
      g.addColorStop(1, color + '00')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(blob.x, blob.y, r, 0, Math.PI * 2)
      ctx.fill()

      rafRef.current = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      parent.removeEventListener('mousemove', onMouseMove as EventListener)
    }
  }, [color, onMouseMove])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
