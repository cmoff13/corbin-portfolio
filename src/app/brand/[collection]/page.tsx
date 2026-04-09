'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BRAND_COLLECTIONS } from '@/lib/segments'

const COLLECTION_IMAGES: Record<string, { src: string; alt: string }[]> = {
  'northstar': [],
  'five18-designs': [],
  'graphic-design': [],
  'personal': [],
}

export default function BrandGalleryPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: collectionSlug } = use(params)
  const router = useRouter()
  const collection = BRAND_COLLECTIONS.find(c => c.slug === collectionSlug)
  const images = COLLECTION_IMAGES[collectionSlug] ?? []
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

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

  const P = 'clamp(24px, 6vw, 120px)'

  return (
    <div style={{ minHeight: '100vh', background: '#111', cursor: 'none' }}>

      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        padding: `20px ${P}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: '#111',
      }}>
        <button
          onClick={() => router.push('/brand')}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
            background: 'none',
            border: 'none',
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: 0,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
        >
          ← Brand identity
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 16,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '-0.02em',
          }}>
            {collection.title}
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: 'rgba(255,255,255,0.3)',
            marginTop: 2,
          }}>
            {images.length} {images.length === 1 ? 'piece' : 'pieces'}
          </div>
        </div>
        <div style={{ width: 120 }} />
      </div>

      {/* Gallery masonry grid */}
      <div style={{ padding: `48px ${P}` }}>
        {images.length === 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            flexDirection: 'column',
            gap: 16,
          }}>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 28,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '-0.03em',
            }}>
              Coming soon
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: 'rgba(255,255,255,0.1)',
            }}>
              Images uploading
            </div>
          </div>
        ) : (
          <div style={{
            columns: 'auto 3',
            columnGap: 12,
          }}>
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setLightboxIndex(i)}
                style={{
                  breakInside: 'avoid',
                  marginBottom: 12,
                  borderRadius: 10,
                  overflow: 'hidden',
                  cursor: 'none',
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease ${i * 40}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 40}ms`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget.querySelector('img') as HTMLImageElement
                  if (el) el.style.transform = 'scale(1.03)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget.querySelector('img') as HTMLImageElement
                  if (el) el.style.transform = 'scale(1)'
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: '100%',
                    display: 'block',
                    transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
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
              border: 'none',
              color: 'rgba(255,255,255,0.5)',
              fontSize: 24,
              cursor: 'none',
              lineHeight: 1,
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
              maxWidth: '90vw',
              maxHeight: '90vh',
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
            bottom: 24,
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: 'rgba(255,255,255,0.3)',
          }}>
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
