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
  const sequence = [
    { x: 4,  width: 62, speed: 0.55, zIndex: 1 },
    { x: 55, width: 30, speed: 0.08, zIndex: 3 },
    { x: 22, width: 60, speed: 0.52, zIndex: 1 },
    { x: 8,  width: 44, speed: 0.28, zIndex: 2 },
    { x: 62, width: 28, speed: 0.06, zIndex: 3 },
    { x: 30, width: 64, speed: 0.55, zIndex: 1 },
    { x: 44, width: 42, speed: 0.26, zIndex: 2 },
    { x: 2,  width: 30, speed: 0.08, zIndex: 3 },
    { x: 16, width: 58, speed: 0.52, zIndex: 1 },
    { x: 50, width: 44, speed: 0.28, zIndex: 2 },
    { x: 68, width: 28, speed: 0.06, zIndex: 3 },
    { x: 8,  width: 62, speed: 0.55, zIndex: 1 },
    { x: 36, width: 30, speed: 0.08, zIndex: 3 },
    { x: 5,  width: 44, speed: 0.26, zIndex: 2 },
    { x: 48, width: 60, speed: 0.52, zIndex: 1 },
    { x: 20, width: 28, speed: 0.06, zIndex: 3 },
  ]

  const GAP = 350

  return images.map((img, i) => {
    const s = sequence[i % sequence.length]
    const baseY = 200 + i * GAP

    return {
      ...img,
      x: s.x,
      y: baseY,
      width: s.width,
      speed: s.speed,
      zIndex: s.zIndex,
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

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const imgRefs = useRef<(HTMLDivElement | null)[]>([])

  const currentIndex = BRAND_COLLECTIONS.findIndex(c => c.slug === collectionSlug)
  const nextCollection = BRAND_COLLECTIONS[(currentIndex + 1) % BRAND_COLLECTIONS.length]

  const totalCanvasHeight = images.length > 0
    ? Math.max(...parallaxImages.map(p => p.y)) + 1200
    : 1600

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isMobile) return

    let targetY = 0
    let currentY = 0
    let rafId: number

    const onScroll = () => {
      targetY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    function tick() {
      const diff = targetY - currentY
      if (Math.abs(diff) < 0.05) {
        currentY = targetY
      } else {
        currentY += diff * 0.1
      }

      parallaxImages.forEach((item, i) => {
        const el = imgRefs.current[i]
        if (!el) return
        const offset = currentY * item.speed * -1
        el.style.transform = `translateY(${offset}px)`
      })

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [isMobile, parallaxImages])

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

      {/* Hero header */}
      <div style={{
        padding: '80px 0 64px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 5,
      }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase' as const,
          color: '#bbb',
          marginBottom: 16,
        }}>
          Brand identity
        </div>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(48px, 8vw, 96px)',
          fontWeight: 300,
          color: '#1a1a1a',
          letterSpacing: '-0.05em',
          lineHeight: 0.95,
          marginBottom: 20,
        }}>
          {collection.title}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: '#bbb',
          letterSpacing: '0.06em',
        }}>
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
                  willChange: 'transform',
                  boxShadow: item.zIndex === 3
                    ? '0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)'
                    : item.zIndex === 2
                    ? '0 8px 28px rgba(0,0,0,0.07)'
                    : '0 2px 8px rgba(0,0,0,0.03)',
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

      {/* Next collection CTA */}
      <div style={{
        padding: `120px ${P}`,
        textAlign: 'center',
        borderTop: LINE,
        background: BG,
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase' as const,
          color: '#bbb',
          marginBottom: 20,
        }}>
          Next collection
        </div>
        <div
          onClick={() => router.push(`/brand/${nextCollection.slug}`)}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 300,
            color: '#1a1a1a',
            letterSpacing: '-0.05em',
            lineHeight: 0.95,
            marginBottom: 32,
            cursor: 'none',
            display: 'inline-block',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.5'
            showRing()
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1'
            hideRing()
          }}
        >
          {nextCollection.title}
        </div>
        <div style={{ display: 'block' }}>
          <button
            onClick={() => router.push(`/brand/${nextCollection.slug}`)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: ACCENT,
              background: 'none',
              border: 'none',
              cursor: 'none',
              padding: 0,
              letterSpacing: '0.02em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'gap 0.25s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.gap = '14px'
              showRing()
            }}
            onMouseLeave={e => {
              e.currentTarget.style.gap = '8px'
              hideRing()
            }}
          >
            View collection →
          </button>
        </div>
      </div>

      {/* Back to brand */}
      <div style={{
        padding: `40px ${P}`,
        textAlign: 'center',
        borderTop: LINE,
        background: BG,
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
            letterSpacing: '0.04em',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#1a1a1a'
            showRing()
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#bbb'
            hideRing()
          }}
        >
          ← Back to brand identity
        </button>
      </div>

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
