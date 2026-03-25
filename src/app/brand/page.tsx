'use client'

import { useState } from 'react'
import { SEGMENTS } from '@/lib/segments'

const segment = SEGMENTS.brand

const ARCHIVE_ITEMS = [
  {
    id: 'swift-powerwashing',
    tag: 'Logo mark',
    name: 'Swift Powerwashing',
    detail: 'Primary mark for a residential and commercial powerwashing business. Built for signage, vehicles, and digital.',
    image: '/images/brand/swift-logo.jpg',
    bg: '#f5f0eb',
  },
  {
    id: 'mypetdx-palette',
    tag: 'Color palette',
    name: 'MyPetDx — Color system',
    detail: 'Brand color palette for a pet lab diagnostics platform. Warm, trustworthy, and approachable.',
    image: '/images/brand/mypetdx-palette.jpg',
    bg: '#f7f5f0',
  },
  {
    id: 'poppy-palette',
    tag: 'Color palette',
    name: 'Poppy Mobile Notary — Color system',
    detail: 'Color system for a mobile notary service. Professional yet warm — built to communicate trust.',
    image: '/images/brand/poppy-palette.jpg',
    bg: '#f7f5f0',
  },
  {
    id: 'poppy-type',
    tag: 'Type system',
    name: 'Poppy Mobile Notary — Type system',
    detail: 'Type scale and pairing for a mobile notary brand. Display, body, and label weights with usage rules.',
    image: '/images/brand/poppy-type.jpg',
    bg: '#f7f5f0',
  },
]

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        cursor: 'zoom-out',
        backdropFilter: 'blur(4px)',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          cursor: 'pointer',
          color: '#fff',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
      >
        ×
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          borderRadius: '8px',
          objectFit: 'contain',
          cursor: 'default',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      />
    </div>
  )
}

function ArchiveRow({ item }: { item: typeof ARCHIVE_ITEMS[0] }) {
  const [hovered, setHovered] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          alignItems: 'stretch',
          border: `1px solid ${hovered ? '#e0e0e0' : '#f0f0f0'}`,
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
          cursor: item.image ? 'zoom-in' : 'default',
          boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.08)' : 'none',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => item.image && setLightboxOpen(true)}
      >
        {/* Image column */}
        <div style={{
          background: item.bg,
          position: 'relative',
          overflow: 'hidden',
          minHeight: '180px',
        }}>
          {item.image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                  transform: hovered ? 'scale(1.04)' : 'scale(1)',
                }}
              />
              {hovered && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.15)',
                  zIndex: 1,
                  transition: 'opacity 0.2s ease',
                }} />
              )}
            </>
          ) : (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.2)',
              }}>
                Coming soon
              </span>
            </div>
          )}
        </div>

        {/* Content column */}
        <div style={{
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '6px',
          background: '#ffffff',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: segment.accentColor,
            marginBottom: '4px',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20h20"/><path d="m7 17 2-6 3 4 2-3 3 5"/><path d="M4 3h16v10H4z"/>
            </svg>
            {item.tag}
          </div>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '22px',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#1a1a1a',
            lineHeight: 1.2,
          }}>
            {item.name}
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#9b9b9b',
            lineHeight: 1.65,
            marginTop: '4px',
            maxWidth: '320px',
          }}>
            {item.detail}
          </div>
        </div>
      </div>

      {lightboxOpen && item.image && (
        <Lightbox src={item.image} alt={item.name} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  )
}

export default function BrandSegment() {
  return (
    <main className="segment-page">

      <div className="segment-header" style={{ background: segment.gradientSubtle }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={segment.accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 20h20"/><path d="m7 17 2-6 3 4 2-3 3 5"/><path d="M4 3h16v10H4z"/>
          </svg>
          <p className="segment-eyebrow" style={{ color: segment.accentColor }}>Brand identity</p>
        </div>
        <h1 className="segment-headline">{segment.headline[0]}<br />{segment.headline[1]}</h1>
        <p className="segment-intro">{segment.intro}</p>
      </div>

      <p className="craft-section-label">Craft archive</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {ARCHIVE_ITEMS.map(item => (
          <ArchiveRow key={item.id} item={item} />
        ))}
      </div>

      <div style={{
        marginTop: '32px',
        padding: '32px',
        border: '1px dashed #e8e8e8',
        borderRadius: '12px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: '#ccc',
          letterSpacing: '0.04em',
        }}>
          More brand work coming — MyPetDx and others in progress
        </p>
      </div>

    </main>
  )
}