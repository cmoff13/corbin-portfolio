'use client'

import { use, useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BRAND_COLLECTIONS, COLLECTION_IMAGES, GalleryImage } from '@/lib/segments'

const BG = '#F0F2F5'
const ACCENT = '#3B0764'
const LINE = '1px solid rgba(0,0,0,0.07)'

interface ParallaxImage extends GalleryImage {
  x: number
  y: number
  width: number
  speed: number
  zIndex: number
}

function buildParallaxLayout(images: GalleryImage[]): ParallaxImage[] {
  const layouts = [
    { x: 4,  width: 44, speed: 0.12, zIndex: 1 },
    { x: 54, width: 36, speed: 0.14, zIndex: 1 },
    { x: 18, width: 60, speed: 0.35, zIndex: 2 },
    { x: 2,  width: 38, speed: 0.30, zIndex: 2 },
    { x: 48, width: 46, speed: 0.32, zIndex: 2 },
    { x: 8,  width: 82, speed: 0.60, zIndex: 3 },
    { x: 5,  width: 42, speed: 0.58, zIndex: 3 },
    { x: 52, width: 40, speed: 0.62, zIndex: 3 },
    { x: 20, width: 55, speed: 0.38, zIndex: 2 },
    { x: 3,  width: 36, speed: 0.15, zIndex: 1 },
    { x: 45, width: 50, speed: 0.55, zIndex: 3 },
    { x: 10, width: 78, speed: 0.40, zIndex: 2 },
  ]

  const GAP = 480

  return images.map((img, i) => {
    const layout = layouts[i % layouts.length]
    const row = Math.floor(i / 2)
    const baseY = 120 + row * GAP + (i % 2 === 1 ? 120 : 0)

    return {
      ...img,
      x: layout.x,
      y: baseY,
      width: layout.width,
      speed: layout.speed,
      zIndex: layout.zIndex,
    }
  })
}

export default function BrandCollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: collectionSlug } = use(params)
  const router = useRouter()
  const collection = BRAND_COLLECTIONS.find(c => c.slug === collectionSlug)
  const images = COLLECTION_IMAGES[collectionSlug] ?? []
  const parallaxImages = buildParallaxLayout(images)

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const imgRefs = useRef<(HTMLDivElement | null)[]>([])

  const totalCanvasHeight = images.length > 0
    ? Math.max(...parallaxImages.map(p => p.y)) + 800
    : 1200

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }
    document.addEventListener('mousemove', onMove)

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    function tick() {
      ringPosRef.current.x = lerp(ringPosRef.current.x, mouseRef.current.x, 0.1)
      ringPosRef.current.y = lerp(ringPosRef.current.y, mouseRef.current.y, 0.1)
      if (ringRef.current) {
        ringRef.current.style.left = ringPosRef.current.x + 'px'
        ringRef.current.style.top = ringPosRef.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile])

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') setLightboxIndex(i => i !== null ? Math.min(i + 1, images.length - 1) : null)
      if (e.key === 'ArrowLeft') setLightboxIndex(i => i !== null ? Math.max(i - 1, 0) : null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, images.length])

  const showRing = useCallback(() => {
    if (ringRef.current) { ringRef.current.style.width = '32px'; ringRef.current.style.height = '32px' }
    if (dotRef.current) dotRef.current.style.opacity = '0'
  }, [])

  const hideRing = useCallback(() => {
    if (ringRef.current) { ringRef.current.style.width = '0'; ringRef.current.style.height = '0' }
    if (dotRef.current) dotRef.current.style.opacity = '1'
  }, [])

  if (!collection) return null

  const P = isMobile ? '20px' : 'clamp(20px, 5vw, 80px)'
  const isEmpty = images.length === 0

  return (
    <div style={{ minHeight: '100vh', background: BG, cursor: 'none' }}>

      {/* Custom cursor */}
      {!isMobile && (
        <>
          <div ref={dotRef} style={{ position: 'fixed', width: 6, height: 6, borderRadius: '50%', background: ACCENT, pointerEvents: 'none', zIndex: 99999, transform: 'translate(-50%,-50%)', top: -100, left: -100, transition: 'opacity 0.15s ease' }} />
          <div ref={ringRef} style={{ position: 'fixed', borderRadius: '50%', border: `1.5px solid ${ACCENT}`, pointerEvents: 'none', zIndex: 99998, transform: 'translate(-50%,-50%)', width: 0, height: 0, transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1)', top: -100, left: -100 }} />
        </>
      )}

      {/* Sticky header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: BG,
        borderBottom: LINE,
        padding: `18px ${P}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <button
          onClick={() => router.push('/brand')}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: '#bbb',
            background: 'none',
            border: 'none',
            cursor: 'none',
            padding: 0,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#1a1a1a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#bbb')}
        >
          ← Brand identity
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#bbb', marginBottom: 4 }}>
            Brand identity
          </div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 18, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.03em' }}>
            {collection.title}
          </div>
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#bbb', letterSpacing: '0.04em' }}>
          {images.length} {images.length === 1 ? 'piece' : 'pieces'}
        </div>
      </div>

      {/* Parallax canvas */}
      {isEmpty ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 300, color: 'rgba(0,0,0,0.1)', letterSpacing: '-0.03em' }}>Coming soon</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(0,0,0,0.15)' }}>Images uploading</div>
        </div>
      ) : isMobile ? (
        <div style={{ padding: '32px 20px 80px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightboxIndex(i)}
              style={{ borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} style={{ width: '100%', display: 'block' }} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ position: 'relative', width: '100%', height: totalCanvasHeight, overflow: 'hidden' }}>
          {parallaxImages.map((item, i) => {
            const translateY = scrollY * item.speed
            return (
              <div
                key={i}
                ref={el => { imgRefs.current[i] = el }}
                onClick={() => setLightboxIndex(i)}
                onMouseEnter={showRing}
                onMouseLeave={hideRing}
                style={{
                  position: 'absolute',
                  left: `${item.x}%`,
                  top: item.y,
                  width: `${item.width}%`,
                  zIndex: item.zIndex,
                  borderRadius: 12,
                  overflow: 'hidden',
                  cursor: 'none',
                  transform: `translateY(${translateY}px)`,
                  willChange: 'transform',
                  boxShadow: item.zIndex === 3
                    ? '0 20px 60px rgba(0,0,0,0.10)'
                    : item.zIndex === 2
                    ? '0 8px 32px rgba(0,0,0,0.06)'
                    : '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{
                    width: '100%',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
            )
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none' }}
        >
          <button
            onClick={e => { e.stopPropagation(); setLightboxIndex(null) }}
            style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', borderRadius: 999, width: 40, height: 40, fontSize: 16, cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >✕</button>
          {lightboxIndex > 0 && (
            <button
              onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? i - 1 : null) }}
              style={{ position: 'absolute', left: 24, background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', borderRadius: 999, width: 44, height: 44, fontSize: 18, cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >←</button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].alt}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '88vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: 8 }}
          />
          {lightboxIndex < images.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? i + 1 : null) }}
              style={{ position: 'absolute', right: 24, background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', borderRadius: 999, width: 44, height: 44, fontSize: 18, cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >→</button>
          )}
          <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
