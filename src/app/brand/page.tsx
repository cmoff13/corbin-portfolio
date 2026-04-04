'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SEGMENTS } from '@/lib/segments'
import AmbientBlob from '@/components/AmbientBlob'
import ProcessCards from '@/components/ProcessCards'

const segment = SEGMENTS.brand
const ACCENT = '#3B0764'
const BG = '#F0F2F5'
const LINE = '1px solid rgba(0,0,0,0.07)'

const ARCHIVE_ITEMS = [
  {
    id: 'swift-powerwashing',
    tag: 'Logo mark',
    name: 'Swift Powerwashing',
    detail: 'Primary mark for a residential and commercial powerwashing business. Built for signage, vehicles, and digital.',
    image: '/images/brand/swift-logo.jpg',
    bg: '#F0F2F5',
    svg: null,
  },
  {
    id: 'mypetdx-palette',
    tag: 'Color palette',
    name: 'MyPetDx — Color system',
    detail: 'Brand color palette for a pet lab diagnostics platform. Warm, trustworthy, and approachable.',
    image: '/images/brand/mypetdx-palette.jpg',
    bg: '#F0F2F5',
    svg: null,
  },
  {
    id: 'poppy-palette',
    tag: 'Color palette',
    name: 'Poppy Mobile Notary — Color system',
    detail: 'Color system for a mobile notary service. Professional yet warm — built to communicate trust.',
    image: '/images/brand/poppy-palette.jpg',
    bg: '#F0F2F5',
    svg: null,
  },
  {
    id: 'poppy-type',
    tag: 'Type system',
    name: 'Poppy Mobile Notary — Type system',
    detail: 'Type scale and pairing for a mobile notary brand. Display, body, and label weights with usage rules.',
    image: '/images/brand/poppy-type.jpg',
    bg: '#F0F2F5',
    svg: null,
  },
]

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'logo', label: 'Logo' },
  { id: 'color', label: 'Color' },
  { id: 'type', label: 'Type' },
]

const TAG_MAP: Record<string, string> = {
  logo: 'Logo mark',
  color: 'Color palette',
  type: 'Type system',
}

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Understanding the business before touching a tool. Competitive audit, brand positioning, and what the mark needs to do in the world.',
  },
  {
    number: '02',
    title: 'Concept',
    description: 'Three directions minimum. Each one a genuine bet, not a variation. Presented with rationale, not just visuals.',
  },
  {
    number: '03',
    title: 'Refine',
    description: 'One direction taken to full system. Mark, color, type, and usage rules. Every decision defensible.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Production-ready files, usage guidelines, and a brand that holds up beyond the handoff.',
  },
]

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onMouseDown={() => onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <button
        onMouseDown={(e) => e.stopPropagation()}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          fontSize: '20px',
          cursor: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100000,
        }}
      >
        ×
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          maxWidth: '88vw',
          maxHeight: '82vh',
          borderRadius: '12px',
          objectFit: 'contain',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      />
    </div>
  )
}

function GalleryCard({ item, onClick }: { item: typeof ARCHIVE_ITEMS[0], onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        borderRadius: '14px',
        background: BG,
        border: LINE,
        boxShadow: hovered ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
        cursor: 'none',
        transition: 'box-shadow 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <div style={{
        borderRadius: '16px',
        background: item.bg,
        height: '200px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {item.svg ? (
          item.svg
        ) : item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        ) : null}
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{
          fontSize: '10px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#bbb',
          marginBottom: '5px',
        }}>
          {item.tag}
        </div>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '15px',
          fontWeight: 400,
          color: '#1a1a1a',
          letterSpacing: '-0.02em',
          marginBottom: '4px',
          lineHeight: 1.3,
        }}>
          {item.name}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: '#767676',
          lineHeight: 1.55,
        }}>
          {item.detail}
        </div>
      </div>
    </div>
  )
}


const CTA_BLOBS = [
  { ox: 0.2,  oy: 0.3,  r: 240, color: '#c4b5f4', vx: 0.18, vy: 0.12 },
  { ox: 0.8,  oy: 0.7,  r: 260, color: '#fca5a5', vx: -0.14, vy: -0.16 },
  { ox: 0.55, oy: 0.15, r: 220, color: '#93c5fd', vx: 0.1,  vy: 0.2 },
]

function CtaBand({ isMobile }: { isMobile: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const mouse = useRef({ x: -1000, y: -1000 })
  const blobsRef = useRef(CTA_BLOBS.map(b => ({ ...b, x: 0, y: 0 })))

  useEffect(() => {
    const canvas = canvasRef.current
    const outer = outerRef.current
    if (!canvas || !outer) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      blobsRef.current.forEach((blob, i) => {
        blob.x = CTA_BLOBS[i].ox * canvas.width
        blob.y = CTA_BLOBS[i].oy * canvas.height
      })
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = outer.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    outer.addEventListener('mousemove', onMouseMove)

    function tick() {
      const W = canvas!.width
      const H = canvas!.height
      ctx!.fillStyle = '#F0F2F5'
      ctx!.fillRect(0, 0, W, H)

      blobsRef.current.forEach((blob, i) => {
        const ox = CTA_BLOBS[i].ox * W
        const oy = CTA_BLOBS[i].oy * H
        const dx = mouse.current.x - blob.x
        const dy = mouse.current.y - blob.y
        const dist = Math.hypot(dx, dy)
        const MAGNET_RADIUS = 200
        if (dist < MAGNET_RADIUS && mouse.current.x > -500) {
          const str = 0.008 * (1 - dist / MAGNET_RADIUS)
          blob.vx += dx * str * 0.1
          blob.vy += dy * str * 0.1
        }
        blob.vx += (ox - blob.x) * 0.001
        blob.vy += (oy - blob.y) * 0.001
        blob.vx *= 0.96
        blob.vy *= 0.96
        const speed = Math.hypot(blob.vx, blob.vy)
        if (speed > 3.5) { blob.vx = blob.vx / speed * 3.5; blob.vy = blob.vy / speed * 3.5 }
        blob.x += blob.vx
        blob.y += blob.vy

        const g = ctx!.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r)
        g.addColorStop(0, blob.color + 'cc')
        g.addColorStop(1, blob.color + '00')
        ctx!.fillStyle = g
        ctx!.beginPath()
        ctx!.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2)
        ctx!.fill()
      })

      rafRef.current = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      outer.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const GRAIN_BG = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"

  function handleCopy() {
    navigator.clipboard.writeText('cmoff13@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={outerRef} style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '16px',
      padding: isMobile ? '40px 24px' : '64px 48px',
      marginTop: '80px',
      minHeight: isMobile ? '280px' : undefined,
      height: isMobile ? 'auto' : undefined,
    }}>
      {/* Blob canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Grain */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.035,
        backgroundImage: GRAIN_BG,
        backgroundRepeat: 'repeat',
        backgroundSize: '180px 180px',
      }} />
      {/* Content */}
      <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 24px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(0,0,0,0.08)',
          borderRadius: '999px',
          padding: '4px 12px',
          marginBottom: '24px',
        }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#999' }} />
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.5)',
          }}>
            Open to work
          </span>
        </div>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: isMobile ? 'clamp(20px, 5vw, 28px)' : 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 400,
          color: '#1a1a1a',
          letterSpacing: '-0.03em',
          lineHeight: 1.2,
          marginBottom: '12px',
          maxWidth: '480px',
          margin: '0 auto 12px',
        }}>
          Let&apos;s build something worth looking at.
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '15px',
          color: '#767676',
          marginBottom: '32px',
        }}>
          Senior design roles and select freelance.
        </p>
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={handleCopy}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: '#1a1a1a',
              color: '#ffffff',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              borderRadius: '999px',
              border: 'none',
              cursor: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="5" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="2" y="4" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="#1a1a1a"/>
            </svg>
            {copied ? 'Copied!' : 'Copy email'}
          </button>
          <button
            onClick={() => router.push('/web')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: 'transparent',
              color: '#1a1a1a',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '999px',
              border: '1px solid rgba(0,0,0,0.15)',
              cursor: 'none',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)')}
          >
            Web &amp; digital →
          </button>
        </div>
      </div>
    </div>
  )
}

function useWordReveal(text: string, started: boolean, baseDelay: number) {
  return text.split(' ').map((word, i) => ({
    word,
    wrapStyle: {
      display: 'inline-block',
      overflow: 'hidden',
      verticalAlign: 'bottom',
      marginRight: '0.22em',
    } as React.CSSProperties,
    innerStyle: {
      display: 'inline-block',
      transform: started ? 'translateY(0)' : 'translateY(110%)',
      opacity: started ? 1 : 0,
      transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 65}ms, opacity 0.5s ease ${baseDelay + i * 65}ms`,
    } as React.CSSProperties,
  }))
}

function useInView(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
  }
  return { ref, style }
}

export default function BrandSegment() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeStep, setActiveStep] = useState(0)
  const [activeStat, setActiveStat] = useState(-1)
  const [lightboxItem, setLightboxItem] = useState<typeof ARCHIVE_ITEMS[0] | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [started, setStarted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const sync = () => setIsMobile(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: started ? 1 : 0,
    transform: started ? 'translateY(0)' : 'translateY(10px)',
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
  })

  const inViewProcess = useInView(0)
  const inViewStats   = useInView(0)
  const inViewQuote   = useInView(0)
  const inViewCta     = useInView(0)

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', position: 'relative', cursor: 'none' }}>
      <AmbientBlob color={ACCENT} />
      <main className="segment-page" style={{ background: 'transparent' }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ padding: '0 clamp(24px, 6vw, 120px)' }}>

      {/* Hero */}
      <div style={{ padding: '80px 0 88px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ maxWidth: 640 }}>
        <p style={{
          ...fadeUp(0),
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          fontWeight: 400,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#bbb',
          marginBottom: 20,
        }}>
          Brand identity
        </p>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(44px, 5.5vw, 68px)',
          fontWeight: 300,
          letterSpacing: '-0.055em',
          lineHeight: 0.97,
          color: '#1a1a1a',
          marginBottom: 24,
          maxWidth: 640,
        }}>
          {segment.headline[0]}<br />{segment.headline[1]}
        </h1>
        <p style={{
          ...fadeUp(400),
          fontFamily: "'Inter', sans-serif",
          fontSize: 17,
          fontWeight: 400,
          color: '#1a1a1a',
          marginBottom: 6,
          maxWidth: 520,
        }}>
          Before landing pages and product flows, there were marks.
        </p>
        <p style={{
          ...fadeUp(500),
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          fontWeight: 300,
          color: '#999',
          lineHeight: 1.75,
          maxWidth: 520,
        }}>
          Logos for businesses being named for the first time. Type systems built from scratch. This is where the eye came from.
        </p>
        </div>
        </div>
      </div>

      {/* Filter pills */}
      <div style={{
        ...fadeUp(750),
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: isMobile ? 'nowrap' : 'wrap',
        overflowX: isMobile ? 'auto' : 'visible',
        paddingBottom: isMobile ? '8px' : 0,
      }}>
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '6px 16px',
              borderRadius: '999px',
              border: activeFilter === f.id ? 'none' : LINE,
              background: activeFilter === f.id ? ACCENT : 'rgba(0,0,0,0.05)',
              color: activeFilter === f.id ? '#ffffff' : '#999',
              cursor: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div style={{
        ...fadeUp(900),
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '12px',
        marginBottom: '48px',
      }}>
        {(activeFilter === 'all'
          ? ARCHIVE_ITEMS
          : ARCHIVE_ITEMS.filter(item =>
              activeFilter === 'logo' ? item.tag === 'Logo mark' :
              activeFilter === 'color' ? item.tag === 'Color palette' :
              activeFilter === 'type' ? item.tag === 'Type system' : true
            )
        ).map(item => (
          <GalleryCard
            key={item.id}
            item={item}
            onClick={() => { if (item.image) setLightboxItem(item) }}
          />
        ))}
      </div>

      {lightboxItem && lightboxItem.image && (
        <Lightbox
          src={lightboxItem.image}
          alt={lightboxItem.name}
          onClose={() => setLightboxItem(null)}
        />
      )}

      {/* Process section */}
      <div ref={inViewProcess.ref} style={inViewProcess.style}>
      <div style={{
        borderTop: LINE,
        padding: `${isMobile ? '40px' : '64px'} 0`,
        marginTop: '72px',
        marginBottom: '64px',
      }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#bbb', letterSpacing: '0.14em', textTransform: 'uppercase' as const, fontWeight: 400, marginBottom: 28 }}>How I work</div>

        <ProcessCards
          steps={PROCESS_STEPS.map(s => ({ number: s.number, title: s.title, description: s.description }))}
          accent={ACCENT}
          isMobile={isMobile}
          activeStep={activeStep}
          onStepChange={setActiveStep}
        />
      </div>
      </div>{/* /inViewProcess */}

      {/* Stats row */}
      <div ref={inViewStats.ref} style={inViewStats.style}>
      <div style={{
        borderTop: LINE,
        borderBottom: LINE,
        marginTop: '64px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      }}>
        {[
          { number: '7',   label: 'Years of practice',  detail: 'Working in brand, web, and product since 2017.' },
          { number: '40+', label: 'Brands worked with',  detail: 'Across identity, digital, and product design.' },
          { number: '3',   label: 'Disciplines',         detail: 'Brand identity, web design, and UX.' },
        ].map((stat, i) => {
          const desktopPadding = i === 0
            ? '40px 40px 40px 0'
            : i === 2
              ? '40px 0 40px 40px'
              : '40px 40px 40px 40px'
          const mobilePadding = '28px 0'
          const borderRight = !isMobile && i < 2 ? LINE : 'none'
          const borderBottom = isMobile && i < 2 ? LINE : 'none'
          return (
            <div
              key={stat.label}
              onClick={() => setActiveStat(activeStat === i ? -1 : i)}
              style={{
                position: 'relative',
                cursor: 'none',
                padding: isMobile ? mobilePadding : desktopPadding,
                borderRight,
                borderBottom,
              }}
            >
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '52px',
                fontWeight: 300,
                color: '#1a1a1a',
                letterSpacing: '-0.05em',
                lineHeight: 1,
                transition: 'color 0.2s ease',
              }}>
                {stat.number}
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '12px',
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  color: activeStat === i ? ACCENT : '#767676',
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}>
                  {stat.label}
                </span>
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  style={{
                    flexShrink: 0,
                    marginLeft: '8px',
                    color: activeStat === i ? ACCENT : '#999',
                    transform: activeStat === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease, color 0.2s ease',
                  }}
                >
                  <polyline points="2,4 6,8 10,4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: '#767676',
                lineHeight: 1.65,
                maxHeight: activeStat === i ? '80px' : '0',
                opacity: activeStat === i ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.3s ease, opacity 0.3s ease',
                marginTop: activeStat === i ? '10px' : 0,
              }}>
                {stat.detail}
              </div>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: ACCENT,
                width: activeStat === i ? '100%' : '0',
                transition: 'width 0.3s ease',
              }} />
            </div>
          )
        })}
      </div>
      </div>{/* /inViewStats */}

      {/* Pull quote */}
      <div ref={inViewQuote.ref} style={inViewQuote.style}>
      <div style={{
        borderTop: LINE,
        padding: `${isMobile ? '40px' : '64px'} 0`,
        marginTop: '80px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: isMobile ? '22px' : 'clamp(22px, 3vw, 32px)',
          fontWeight: 400,
          color: '#1a1a1a',
          letterSpacing: '-0.03em',
          lineHeight: 1.3,
          textAlign: 'center',
          maxWidth: '520px',
          margin: '0 auto',
        }}>
          "A logo that needs explaining has already failed."
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: '#999',
          textAlign: 'center',
          marginTop: '16px',
        }}>
          — on brand clarity
        </p>
      </div>
      </div>{/* /inViewQuote */}

      {/* Contact */}
      <div ref={inViewCta.ref} style={{ ...inViewCta.style, borderTop: LINE, padding: `72px 0` }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#bbb', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 20 }}>Get in touch</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 28 : 40, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 12 }}>Let&apos;s build something worth looking at.</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#999', fontWeight: 300, marginBottom: 32 }}>Senior design roles and select freelance.</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={() => { navigator.clipboard.writeText('cmoff13@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: ACCENT, color: 'white', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, borderRadius: 999, border: 'none', cursor: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {copied ? 'Copied!' : 'Copy email'}
            </button>
            <button
              onClick={() => router.push('/web')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', color: '#1a1a1a', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, borderRadius: 999, border: LINE, cursor: 'none' }}
            >
              Web &amp; digital →
            </button>
          </div>
        </div>
      </div>

      </div>
      </div>
      </main>
    </div>
  )
}
