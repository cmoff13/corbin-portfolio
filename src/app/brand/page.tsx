'use client'

import { useState } from 'react'
import { SEGMENTS } from '@/lib/segments'
import ContactCta from '@/components/ContactCta'

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

function GridCell({ item }: { item: typeof ARCHIVE_ITEMS[0] }) {
  const [hovered, setHovered] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => item.image && setLightboxOpen(true)}
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          borderRadius: '16px',
          overflow: 'hidden',
          background: item.bg,
          cursor: item.image ? 'zoom-in' : 'default',
        }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
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
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.2)',
            }}>
              Coming soon
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10,0,20,0.88) 0%, rgba(10,0,20,0.2) 50%, transparent 100%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '24px',
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: segment.accentColor,
            marginBottom: '6px',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s',
          }}>
            {item.tag}
          </span>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '18px',
            fontWeight: 400,
            color: '#ffffff',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease 0.08s, transform 0.3s ease 0.08s',
          }}>
            {item.name}
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.6,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease 0.11s, transform 0.3s ease 0.11s',
          }}>
            {item.detail}
          </span>
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

      {/* Dark premium header */}
      <div style={{
        background: '#1A0030',
        borderRadius: '16px',
        padding: '48px',
        marginBottom: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle purple glow */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109,40,217,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#A78BFA',
          }} />
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#A78BFA',
          }}>
            Brand identity
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: '#FFFFFF',
          marginBottom: '16px',
        }}>
          {segment.headline[0]}<br />{segment.headline[1]}
        </h1>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '15px',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.7,
          maxWidth: '480px',
          margin: 0,
        }}>
          {segment.intro}
        </p>
      </div>

      {/* Section label */}
      <p className="craft-section-label">Craft archive</p>

      {/* 2x2 image grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        marginBottom: '48px',
      }}>
        {ARCHIVE_ITEMS.map(item => (
          <GridCell key={item.id} item={item} />
        ))}
      </div>

      {/* More coming note */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '12px',
        color: 'var(--color-muted)',
        letterSpacing: '0.04em',
        textAlign: 'center',
        marginBottom: '64px',
      }}>
        More brand work coming — MyPetDx and others in progress
      </p>

      {/* Contact */}
      <div style={{
        paddingTop: '40px',
        borderTop: '1px solid var(--color-hairline)',
      }}>
        <ContactCta variant="full" accentColor={segment.accentColor} />
      </div>

    </main>
  )
}