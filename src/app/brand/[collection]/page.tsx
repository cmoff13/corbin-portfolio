'use client'

import { use, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { BRAND_COLLECTIONS, COLLECTION_IMAGES } from '@/lib/segments'

const LINE = '1px solid rgba(0,0,0,0.07)'
const BG = '#F0F2F5'
const ACCENT = '#3B0764'

export default function BrandCollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: collectionSlug } = use(params)
  const router = useRouter()
  const collection = BRAND_COLLECTIONS.find(c => c.slug === collectionSlug)
  const images = COLLECTION_IMAGES[collectionSlug] ?? []

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const mouseRef = useRef({ x: 0, y: 0 })
  const imgPosRef = useRef({ x: 0, y: 0 })
  const floatingRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const ringPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
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
      imgPosRef.current.x = lerp(imgPosRef.current.x, mouseRef.current.x, 0.1)
      imgPosRef.current.y = lerp(imgPosRef.current.y, mouseRef.current.y, 0.1)

      ringPosRef.current.x = lerp(ringPosRef.current.x, mouseRef.current.x, 0.12)
      ringPosRef.current.y = lerp(ringPosRef.current.y, mouseRef.current.y, 0.12)

      if (ringRef.current) {
        ringRef.current.style.left = ringPosRef.current.x + 'px'
        ringRef.current.style.top = ringPosRef.current.y + 'px'
      }

      if (floatingRef.current && wrapRef.current && hoveredIndex !== null) {
        const rect = wrapRef.current.getBoundingClientRect()
        const x = imgPosRef.current.x - rect.left + 24
        const y = imgPosRef.current.y - rect.top - 80
        floatingRef.current.style.left = x + 'px'
        floatingRef.current.style.top = y + 'px'
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile, hoveredIndex])

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

  if (!collection) return null

  const P = isMobile ? '24px' : 'clamp(24px, 6vw, 120px)'
  const isEmpty = images.length === 0

  return (
    <div style={{ minHeight: '100vh', background: BG, cursor: 'none' }}>

      {/* Custom cursor — desktop only */}
      {!isMobile && (
        <>
          <div
            ref={dotRef}
            style={{
              position: 'fixed',
              width: hoveredIndex !== null ? 0 : 6,
              height: hoveredIndex !== null ? 0 : 6,
              borderRadius: '50%',
              background: ACCENT,
              pointerEvents: 'none',
              zIndex: 99999,
              transform: 'translate(-50%,-50%)',
              transition: 'width 0.15s ease, height 0.15s ease',
              top: -100,
              left: -100,
            }}
          />
          <div
            ref={ringRef}
            style={{
              position: 'fixed',
              width: hoveredIndex !== null ? 36 : 0,
              height: hoveredIndex !== null ? 36 : 0,
              borderRadius: '50%',
              border: `1.5px solid ${ACCENT}`,
              background: hoveredIndex !== null ? ACCENT + '12' : 'transparent',
              pointerEvents: 'none',
              zIndex: 99998,
              transform: 'translate(-50%,-50%)',
              transition: 'width 0.2s cubic-bezier(0.16,1,0.3,1), height 0.2s cubic-bezier(0.16,1,0.3,1)',
              top: -100,
              left: -100,
            }}
          />
        </>
      )}

      {/* Sticky header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
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
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#1a1a1a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#bbb')}
        >
          ← Brand identity
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 16,
            fontWeight: 300,
            color: '#1a1a1a',
            letterSpacing: '-0.02em',
          }}>
            {collection.title}
          </div>
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          color: '#bbb',
          letterSpacing: '0.04em',
          width: 120,
          textAlign: 'right',
        }}>
          {images.length} {images.length === 1 ? 'piece' : 'pieces'}
        </div>
      </div>

      {/* Desktop list interaction */}
      {!isMobile && (
        <div ref={wrapRef} style={{ padding: `48px ${P}`, position: 'relative' }}>

          {/* Floating image */}
          <div
            ref={floatingRef}
            style={{
              position: 'absolute',
              width: 280,
              height: 200,
              borderRadius: 12,
              overflow: 'hidden',
              pointerEvents: 'none',
              zIndex: 10,
              border: LINE,
              opacity: hoveredIndex !== null && !isEmpty ? 1 : 0,
              transform: hoveredIndex !== null ? 'scale(1) rotate(-1deg)' : 'scale(0.92) rotate(-2deg)',
              transition: 'opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {hoveredIndex !== null && images[hoveredIndex] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[hoveredIndex].src}
                alt={images[hoveredIndex].alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
          </div>

          {isEmpty ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '50vh',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 32,
                fontWeight: 300,
                color: 'rgba(0,0,0,0.1)',
                letterSpacing: '-0.03em',
              }}>
                Coming soon
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: 'rgba(0,0,0,0.2)',
              }}>
                Images uploading
              </div>
            </div>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {images.map((img, i) => (
                <li
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: `20px 0 20px ${hoveredIndex === i ? 12 : 0}px`,
                    borderBottom: LINE,
                    borderTop: i === 0 ? LINE : 'none',
                    cursor: 'none',
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.5s ease ${i * 40}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 40}ms, padding-left 0.3s cubic-bezier(0.16,1,0.3,1)`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      color: '#ccc',
                      letterSpacing: '0.1em',
                      width: 28,
                      flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 24,
                      fontWeight: 300,
                      color: hoveredIndex === i ? ACCENT : '#1a1a1a',
                      letterSpacing: '-0.03em',
                      transition: 'color 0.25s ease',
                    }}>
                      {img.alt}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: '#bbb',
                      letterSpacing: '0.04em',
                    }}>
                      {img.category}
                    </span>
                    <span style={{
                      fontSize: 14,
                      color: hoveredIndex === i ? ACCENT : '#ccc',
                      transform: hoveredIndex === i ? 'translateX(6px)' : 'translateX(0)',
                      transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), color 0.25s ease',
                      display: 'inline-block',
                    }}>
                      →
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Mobile masonry grid */}
      {isMobile && (
        <div style={{ padding: `32px ${P}` }}>
          {isEmpty ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '50vh',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 28,
                fontWeight: 300,
                color: 'rgba(0,0,0,0.1)',
                letterSpacing: '-0.03em',
              }}>
                Coming soon
              </div>
            </div>
          ) : (
            <div style={{ columns: '2', columnGap: 10 }}>
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  style={{
                    breakInside: 'avoid',
                    marginBottom: 10,
                    borderRadius: 8,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? 'translateY(0)' : 'translateY(16px)',
                    transition: `opacity 0.5s ease ${i * 40}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 40}ms`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{ width: '100%', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'none',
          }}
        >
          <button
            onClick={e => { e.stopPropagation(); setLightboxIndex(null) }}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              background: 'none',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)',
              borderRadius: 999,
              width: 40,
              height: 40,
              fontSize: 16,
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            ✕
          </button>
          {lightboxIndex > 0 && (
            <button
              onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? i - 1 : null) }}
              style={{
                position: 'absolute',
                left: 24,
                background: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.6)',
                borderRadius: 999,
                width: 44,
                height: 44,
                fontSize: 18,
                cursor: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ←
            </button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].alt}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '88vw',
              maxHeight: '88vh',
              objectFit: 'contain',
              borderRadius: 8,
            }}
          />
          {lightboxIndex < images.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); setLightboxIndex(i => i !== null ? i + 1 : null) }}
              style={{
                position: 'absolute',
                right: 24,
                background: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.6)',
                borderRadius: 999,
                width: 44,
                height: 44,
                fontSize: 18,
                cursor: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              →
            </button>
          )}
          <div style={{
            position: 'absolute',
            bottom: 56,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Outfit', sans-serif",
            fontSize: 16,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}>
            {images[lightboxIndex].alt}
          </div>
          <div style={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.08em',
          }}>
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
