'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CASE_STUDIES, SEGMENTS } from '@/lib/segments'
import CaseStudyCard from '@/components/CaseStudyCard'
import { useReveal, useWordReveal } from '@/hooks/useReveal'

const BG = '#F0F2F5'
const LINE = '1px solid rgba(0,0,0,0.07)'

const THUMBNAILS: Record<string, string> = {
  'black-coast-estates': '/images/black-coast/thumbnail.jpg',
  'skygate-growth-strategies': '/images/skygate/thumbnail.jpg',
  'portfolio-nav-system': '/images/portfolio/thumbnail.jpg',
  'kirrin-finch': '/images/kirrin-finch/thumbnail.jpg',
  'heybud-skincare': '/images/heybud-skincare/thumbnail.jpg',
  'linear-cro': '/images/linear-cro/thumbnail.jpg',
}

const SEGMENT_ICONS: Record<string, React.ReactNode> = {
  brand: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20"/><path d="m7 17 2-6 3 4 2-3 3 5"/><path d="M4 3h16v10H4z"/>
    </svg>
  ),
  web: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3l14 9-14 9V3z"/>
    </svg>
  ),
  ux: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
}

function WorkAmbientBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const blobs = [
      { x: 0, y: 0, ox: 0.15, oy: 0.25, r: 380, color: '#3B0764' },
      { x: 0, y: 0, ox: 0.85, oy: 0.55, r: 340, color: '#DC2626' },
      { x: 0, y: 0, ox: 0.55, oy: 0.15, r: 300, color: '#1D4ED8' },
    ]

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      blobs.forEach((b, i) => {
        blobs[i].x = b.ox * canvas.width
        blobs[i].y = b.oy * canvas.height
      })
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0
    function tick() {
      t += 0.004
      const W = canvas!.width
      const H = canvas!.height
      ctx!.clearRect(0, 0, W, H)

      blobs.forEach((blob, i) => {
        blob.x = blob.ox * W + Math.sin(t + i * 2.1) * W * 0.06
        blob.y = blob.oy * H + Math.cos(t * 0.7 + i * 1.5) * H * 0.08

        const g = ctx!.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r)
        g.addColorStop(0, blob.color + '18')
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
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default function WorkPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [isMobile, setIsMobile] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const inViewContact = useReveal(0)

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: started ? 1 : 0,
    transform: started ? 'translateY(0)' : 'translateY(10px)',
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
  })

  const visibleProjects = CASE_STUDIES.filter(p => {
    if (p.hidden) return false
    if (activeFilter === 'all') return true
    return p.primarySegment === activeFilter
  })

  function handleCopy() {
    navigator.clipboard.writeText('cmoff13@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', position: 'relative', cursor: 'none' }}>
      <WorkAmbientBlob />

      <div style={{ position: 'relative', zIndex: 1, padding: '0 clamp(24px, 6vw, 120px)' }}>

        {/* Hero */}
        <div style={{ paddingTop: 80, paddingBottom: 72, textAlign: 'center' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              color: '#bbb',
              letterSpacing: '0.16em',
              textTransform: 'uppercase' as const,
              marginBottom: 20,
              ...fadeUp(0),
            }}>
              All work
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: isMobile ? 'clamp(36px,10vw,48px)' : 'clamp(44px,5.5vw,68px)',
              fontWeight: 300,
              color: '#1a1a1a',
              letterSpacing: '-0.055em',
              lineHeight: 0.97,
              marginBottom: 24,
            }}>
              {useWordReveal('Everything,', started, 80).map(({ word, wrapStyle, innerStyle }, i) => (
                <span key={i} style={wrapStyle}><span style={innerStyle}>{word}</span></span>
              ))}
              <br />
              {useWordReveal('unfiltered.', started, 80 + 65).map(({ word, wrapStyle, innerStyle }, i) => (
                <span key={i} style={wrapStyle}><span style={innerStyle}>{word}</span></span>
              ))}
            </div>
            <div style={{
              ...fadeUp(320),
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 400,
              color: '#1a1a1a',
              marginBottom: 8,
            }}>
              Seven years across brand, web, and product.
            </div>
            <div style={{
              ...fadeUp(400),
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              color: '#999',
              lineHeight: 1.75,
            }}>
              Browse everything in one place, or use the segment links below to filter by discipline.
            </div>
          </div>
        </div>

        <div>

          {/* Segment filter pills */}
          <div style={{
            display: 'flex',
            gap: 8,
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            overflowX: isMobile ? 'auto' : 'visible',
            paddingBottom: 24,
            borderBottom: LINE,
            marginBottom: 24,
            justifyContent: 'center',
          }}>
            <button
              onClick={() => setActiveFilter('all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: activeFilter === 'all' ? 'rgba(0,0,0,0.08)' : 'none',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 999,
                padding: '5px 14px',
                cursor: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: activeFilter === 'all' ? 600 : 400,
                color: activeFilter === 'all' ? '#1a1a1a' : '#999',
                transition: 'all 0.15s ease',
              }}
            >
              All
            </button>
            {Object.values(SEGMENTS).map(seg => (
              <button
                key={seg.id}
                onClick={() => setActiveFilter(activeFilter === seg.id ? 'all' : seg.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: activeFilter === seg.id ? `${seg.accentColor}12` : 'none',
                  border: `1px solid ${activeFilter === seg.id ? seg.accentColor + '30' : 'rgba(0,0,0,0.08)'}`,
                  borderRadius: 999,
                  padding: '5px 14px 5px 8px',
                  cursor: 'none',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: activeFilter === seg.id ? 600 : 400,
                  color: activeFilter === seg.id ? seg.accentColor : '#999',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (activeFilter !== seg.id) {
                    e.currentTarget.style.borderColor = seg.accentColor + '30'
                    e.currentTarget.style.color = seg.accentColor
                  }
                }}
                onMouseLeave={e => {
                  if (activeFilter !== seg.id) {
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
                    e.currentTarget.style.color = '#999'
                  }
                }}
              >
                <span style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  background: activeFilter === seg.id ? `${seg.accentColor}15` : 'rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: activeFilter === seg.id ? seg.accentColor : '#bbb',
                }}>
                  {SEGMENT_ICONS[seg.id]}
                </span>
                {seg.label}
              </button>
            ))}
          </div>

          {/* Project list */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: 12,
          }}>
            {visibleProjects.map((project, i) => {
              const segment = SEGMENTS[project.primarySegment]
              return (
                <CaseStudyCard
                  key={project.slug}
                  slug={project.slug}
                  title={project.title}
                  subtitle={project.subtitle}
                  tags={project.tags}
                  thumbnail={THUMBNAILS[project.slug]}
                  accentColor={segment.accentColor}
                  segmentLabel={segment.label}
                  segmentIcon={SEGMENT_ICONS[project.primarySegment]}
                  isMobile={isMobile}
                  cardIndex={i}
                  onClick={() => router.push(`/work/${project.slug}`)}
                />
              )
            })}

            {visibleProjects.length === 0 && (
              <div style={{
                padding: '48px 0',
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: '#bbb',
                textAlign: 'center',
              }}>
                No projects in this category yet.
              </div>
            )}
          </div>

          {/* Contact footer */}
          <div ref={inViewContact.ref} style={{ ...inViewContact.style, borderTop: LINE, padding: '72px 0 80px', marginTop: '64px' }}>
            <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                color: '#bbb',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}>Get in touch</div>
              <div style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 40,
                fontWeight: 300,
                color: '#1a1a1a',
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                marginBottom: 12,
              }}>Seven years of design.</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: '#999',
                fontWeight: 300,
                marginBottom: 32,
              }}>Senior design roles and select freelance.</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ opacity: inViewContact.visible ? 1 : 0, transform: inViewContact.visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.5s ease 100ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) 100ms' }}>
                  <button
                    onClick={handleCopy}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 24px',
                      background: '#1a1a1a',
                      color: 'white',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      borderRadius: 999,
                      border: 'none',
                      cursor: 'none',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {copied ? 'Copied!' : 'Copy email'}
                  </button>
                </div>
                <div style={{ opacity: inViewContact.visible ? 1 : 0, transform: inViewContact.visible ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.5s ease 180ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) 180ms' }}>
                  <button
                    onClick={() => router.push('/')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 24px',
                      background: 'transparent',
                      color: '#1a1a1a',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      borderRadius: 999,
                      border: '1px solid rgba(0,0,0,0.12)',
                      cursor: 'none',
                    }}
                  >
                    Back to home →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
