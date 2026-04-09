'use client'

import { use, useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BRAND_COLLECTIONS, COLLECTION_IMAGES } from '@/lib/segments'

const BG = '#F0F2F5'
const ACCENT = '#3B0764'
const LINE = '1px solid rgba(0,0,0,0.07)'

export default function BrandCollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: collectionSlug } = use(params)
  const router = useRouter()
  const collection = BRAND_COLLECTIONS.find(c => c.slug === collectionSlug)
  const images = COLLECTION_IMAGES[collectionSlug] ?? []

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const revealRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
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
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    revealRefs.current.forEach((el, i) => {
      if (!el) return
      setTimeout(() => observer.observe(el), i * 50)
    })

    return () => observer.disconnect()
  }, [images.length, loaded])

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

  const setRevealRef = useCallback((el: HTMLDivElement | null, i: number) => {
    revealRefs.current[i] = el
  }, [])

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
    <>
      <style>{`
        .gallery-item {
          opacity: 0;
          filter: blur(10px);
          transform: scale(0.95);
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1),
                      filter 0.75s cubic-bezier(0.16,1,0.3,1),
                      transform 0.75s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.3s ease;
        }
        .gallery-item.revealed {
          opacity: 1;
          filter: blur(0px);
          transform: scale(1);
        }
        .gallery-item:hover img {
          transform: scale(1.04);
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: BG, cursor: 'none' }}>

        {/* Custom cursor */}
        {!isMobile && (
          <>
            <div ref={dotRef} style={{ position: 'fixed', width: 6, height: 6, borderRadius: '50%', background: ACCENT, pointerEvents: 'none', zIndex: 99999, transform: 'translate(-50%,-50%)', transition: 'opacity 0.15s ease', top: -100, left: -100 }} />
            <div ref={ringRef} style={{ position: 'fixed', borderRadius: '50%', border: `1.5px solid ${ACCENT}`, pointerEvents: 'none', zIndex: 99998, transform: 'translate(-50%,-50%)', width: 0, height: 0, transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1)', top: -100, left: -100 }} />
          </>
        )}

        {/* Fixed back button */}
        <button
          onClick={() => router.push('/brand')}
          style={{
            position: 'fixed',
            top: 20,
            left: 20,
            zIndex: 50,
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: '#bbb',
            background: BG,
            border: LINE,
            borderRadius: 999,
            padding: '8px 16px',
            cursor: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#1a1a1a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#bbb')}
        >
          ← Back
        </button>

        {/* Header */}
        <div style={{ padding: `80px ${P} 48px`, textAlign: 'center' }}>
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
            fontSize: isMobile ? 36 : 52,
            fontWeight: 300,
            color: '#1a1a1a',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: 8,
          }}>
            {collection.title}
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: '#bbb',
            letterSpacing: '0.04em',
          }}>
            {images.length} {images.length === 1 ? 'piece' : 'pieces'}
          </div>
        </div>

        {/* Gallery */}
        <div style={{ padding: `40px ${P} 80px` }}>
          {isEmpty ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 32, fontWeight: 300, color: 'rgba(0,0,0,0.1)', letterSpacing: '-0.03em' }}>Coming soon</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(0,0,0,0.15)' }}>Images uploading</div>
            </div>
          ) : isMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {images.map((img, i) => (
                <div
                  key={i}
                  ref={el => setRevealRef(el, i)}
                  className="gallery-item"
                  onClick={() => setLightboxIndex(i)}
                  style={{ borderRadius: 10, overflow: 'hidden', cursor: 'none' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} style={{ width: '100%', display: 'block', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' }} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ columns: '2', columnGap: 10, columnFill: 'balance' }}>
              {images.map((img, i) => (
                <div
                  key={i}
                  ref={el => setRevealRef(el, i)}
                  className="gallery-item"
                  onClick={() => setLightboxIndex(i)}
                  onMouseEnter={showRing}
                  onMouseLeave={hideRing}
                  style={{
                    breakInside: 'avoid',
                    marginBottom: 10,
                    borderRadius: 10,
                    overflow: 'hidden',
                    cursor: 'none',
                    transitionDelay: `${(i % 4) * 50}ms`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{
                      width: '100%',
                      display: 'block',
                      transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && images[lightboxIndex] && (
          <div
            onClick={() => setLightboxIndex(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none' }}
          >
            <button onClick={e => { e.stopPropagation(); setLightboxIndex(null) }} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', borderRadius: 999, width: 40, height: 40, fontSize: 16, cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            {lightboxIndex > 0 && (
              <button onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? i - 1 : null) }} style={{ position: 'absolute', left: 24, background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', borderRadius: 999, width: 44, height: 44, fontSize: 18, cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[lightboxIndex].src} alt={images[lightboxIndex].alt} onClick={e => e.stopPropagation()} style={{ maxWidth: '88vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: 8 }} />
            {lightboxIndex < images.length - 1 && (
              <button onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? i + 1 : null) }} style={{ position: 'absolute', right: 24, background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', borderRadius: 999, width: 44, height: 44, fontSize: 18, cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
            )}
            <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
