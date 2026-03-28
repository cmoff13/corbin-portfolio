'use client'

import { useEffect, useRef } from 'react'

interface AmbientBlobProps {
  color: string
}

export default function AmbientBlob({ color }: AmbientBlobProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    let bx = W * 0.65
    let by = H * 0.35
    let vx = 0
    let vy = 0
    let targetX = W * 0.65
    let targetY = H * 0.35
    let rafId: number
    let tick = 0

    canvas.width = W
    canvas.height = H

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas!.width = W
      canvas!.height = H
    }

    function onScroll() {
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0
      targetX = W * (0.72 - progress * 0.44)
      targetY = H * (0.35 + progress * 0.3 + Math.sin(progress * Math.PI * 2) * 0.12)
    }

    function animate() {
      tick++
      const idleX = W * 0.65 + Math.sin(tick * 0.003) * W * 0.04
      const idleY = H * 0.35 + Math.cos(tick * 0.002) * H * 0.03
      if (Math.abs(targetX - idleX) < W * 0.1) {
        targetX = idleX
        targetY = idleY
      }

      const dx = targetX - bx
      const dy = targetY - by
      vx += dx * 0.035
      vy += dy * 0.035
      vx *= 0.84
      vy *= 0.84
      bx += vx
      by += vy

      ctx!.clearRect(0, 0, W, H)
      const r = Math.min(W, H) * 0.65
      const g = ctx!.createRadialGradient(bx, by, 0, bx, by, r)
      g.addColorStop(0, color + '28')
      g.addColorStop(0.4, color + '14')
      g.addColorStop(0.7, color + '08')
      g.addColorStop(1, color + '00')
      ctx!.fillStyle = g
      ctx!.beginPath()
      ctx!.arc(bx, by, r, 0, Math.PI * 2)
      ctx!.fill()

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', resize)
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', resize)
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
