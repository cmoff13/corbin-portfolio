'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SEGMENTS } from '@/lib/segments'

const segment = SEGMENTS.web
const ACCENT = '#DC2626'

const WEB_PROJECTS = [
  {
    slug: 'linear-cro',
    metric: '63%',
    metricLabel: 'CVR increase',
    bg: '#F0F4FF',
    discipline: 'CRO / Landing page',
    title: 'From 5.5% to 9.02% in 30 days',
    what: 'Heatmap-driven redesign of a single section that turned a decent-converting page into a high-converting one. One change, 30 days, measurable result.',
    outcomes: ['CVR: 5.5% → 9.02% in 30 days', 'Bounce rate dropped within 2 weeks'],
  },
  {
    slug: 'kirrin-finch',
    metric: '$1M+',
    metricLabel: 'Revenue scaled',
    bg: '#F5F0EB',
    discipline: 'Social Ads + Email',
    title: 'Scaling a DTC brand past $1M',
    what: 'Designed and produced static social ads and email campaigns for a gender-neutral clothing brand growing past a revenue plateau.',
    outcomes: ['Scaled from $700K to over $1M', 'Creative conversion rates cited as key growth driver'],
  },
  {
    slug: 'heybud-skincare',
    metric: 'Meta + Pinterest',
    metricLabel: 'Channels tested',
    bg: '#FFF5F5',
    discipline: 'Art Direction / Paid Social',
    title: 'UGC-led creative that actually performed',
    what: 'Led art direction across Meta and Pinterest. Tested polished product creative against UGC-style ads — UGC won decisively.',
    outcomes: ['UGC outperformed polished creative', 'Established repeatable creative playbook'],
  },
  {
    slug: 'issa',
    metric: 'Brand elevation',
    metricLabel: 'Saturated market',
    bg: '#F0FFF4',
    discipline: 'Brand + Web',
    title: 'Standing out in a saturated fitness market',
    what: "Strengthened brand image and digital presence for one of the world's largest fitness certification organizations against well-funded competitors.",
    outcomes: ['Stronger visual identity across digital', 'Clearer differentiation from category leaders'],
  },
  {
    slug: 'better-business-bureau',
    metric: 'A/B tested',
    metricLabel: 'Audience intelligence',
    bg: '#FFFBF0',
    discipline: 'Email Marketing',
    title: 'Drip campaigns that taught us the audience',
    what: "Built drip and re-engagement sequences for BBB's accreditation push. Used A/B testing to learn what actually moved business owners.",
    outcomes: ['Re-engagement of lapsed contacts', 'Data-driven audience intelligence framework'],
  },
  {
    slug: 'skygate-growth-strategies',
    metric: '0→1',
    metricLabel: 'Brand to live site',
    bg: '#F5F5F0',
    discipline: 'Brand + Webflow',
    title: 'Zero to one — brand system and Webflow launch',
    what: 'Built the complete brand identity and Webflow site for a real estate investment platform. Logo, color, type, design system, full build.',
    outcomes: ['Complete brand system delivered', 'Webflow site launched from scratch'],
  },
]

const TESTIMONIALS = [
  {
    quote: 'A powerhouse senior designer with a strong foundation in UI/UX.',
    name: 'Brian Steffes',
    title: 'Ex-Creative Team Lead Manager @ Disruptive Advertising',
    initials: 'BS',
    color: '#DC2626',
  },
  {
    quote: 'His adaptability across different styles and projects makes him a valuable asset to any creative or marketing team.',
    name: 'Sarah Rodriguez',
    title: 'Ex-VP Creative Manager @ Disruptive Advertising',
    initials: 'SR',
    color: '#3B0764',
  },
  {
    quote: 'Working with Corbin was a pleasure... I highly recommend him.',
    name: 'Claudia Gharai',
    title: 'Ex-Marketing Manager @ Porsche',
    initials: 'CG',
    color: '#1D4ED8',
  },
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Audit',
    description: 'Reading the data before redesigning anything. Heatmaps, scroll depth, form drop-off, and message match between ad and landing page.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Every element earns its place. Hierarchy, CTA placement, and copy framing built around what the visitor needs to believe before converting.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Brand-quality craft applied to performance outcomes. Pages that look intentional and convert because of it, not in spite of it.',
  },
  {
    number: '04',
    title: 'Measure',
    description: "Post-launch analysis and iteration. What moved, what didn't, and what to test next.",
  },
]

function getProcessSVG(index: number, c: string) {
  switch (index) {
    case 0: return (
      <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
        <rect x="25" y="20" width="50" height="60" rx="4" stroke={c} strokeWidth="0.75" opacity="0.3" fill={c} fillOpacity="0.04"/>
        <rect x="33" y="32" width="30" height="3" rx="1.5" fill={c} opacity="0.2"/>
        <rect x="33" y="40" width="22" height="3" rx="1.5" fill={c} opacity="0.15"/>
        <rect x="33" y="48" width="26" height="3" rx="1.5" fill={c} opacity="0.15"/>
        <circle cx="71" cy="33" r="14" stroke={c} strokeWidth="0.75" opacity="0.35" fill={c} fillOpacity="0.04"/>
        <line x1="71" y1="19" x2="71" y2="47" stroke={c} strokeWidth="0.5" opacity="0.2"/>
        <line x1="57" y1="33" x2="85" y2="33" stroke={c} strokeWidth="0.5" opacity="0.2"/>
        <line x1="80" y1="42" x2="88" y2="50" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      </svg>
    )
    case 1: return (
      <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
        <polygon points="20,20 80,20 65,50 35,50" stroke={c} strokeWidth="0.75" opacity="0.3" fill={c} fillOpacity="0.06"/>
        <polygon points="35,54 65,54 55,80 45,80" stroke={c} strokeWidth="0.75" opacity="0.3" fill={c} fillOpacity="0.06"/>
        <line x1="35" y1="50" x2="35" y2="54" stroke={c} strokeWidth="0.75" opacity="0.25"/>
        <line x1="65" y1="50" x2="65" y2="54" stroke={c} strokeWidth="0.75" opacity="0.25"/>
        <circle cx="50" cy="67" r="4" fill={c} opacity="0.3"/>
      </svg>
    )
    case 2: return (
      <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
        <rect x="15" y="15" width="70" height="55" rx="4" stroke={c} strokeWidth="0.75" opacity="0.3"/>
        <rect x="15" y="15" width="70" height="12" rx="4" fill={c} opacity="0.08"/>
        <circle cx="24" cy="21" r="2" fill={c} opacity="0.3"/>
        <circle cx="31" cy="21" r="2" fill={c} opacity="0.2"/>
        <circle cx="38" cy="21" r="2" fill={c} opacity="0.15"/>
        <rect x="24" y="34" width="42" height="3" rx="1.5" fill={c} opacity="0.12"/>
        <rect x="24" y="41" width="32" height="3" rx="1.5" fill={c} opacity="0.1"/>
        <rect x="30" y="52" width="28" height="9" rx="4" fill={c} opacity="0.25"/>
      </svg>
    )
    default: return (
      <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
        <rect x="18" y="60" width="10" height="20" rx="2" stroke={c} strokeWidth="0.75" opacity="0.3" fill="none"/>
        <rect x="34" y="48" width="10" height="32" rx="2" stroke={c} strokeWidth="0.75" opacity="0.35" fill="none"/>
        <rect x="50" y="36" width="10" height="44" rx="2" stroke={c} strokeWidth="0.75" opacity="0.4" fill="none"/>
        <rect x="66" y="22" width="10" height="58" rx="2" stroke={c} strokeWidth="0.75" opacity="0.5" fill={c} fillOpacity="0.2"/>
        <line x1="14" y1="80" x2="82" y2="80" stroke={c} strokeWidth="0.5" opacity="0.2"/>
      </svg>
    )
  }
}

function ProcessCard({ step, active, onClick, index }: {
  step: typeof PROCESS_STEPS[0]
  active: boolean
  onClick: () => void
  index: number
}) {
  const previewRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const tRef = useRef(Math.random() * Math.PI * 2)
  const hoveredRef = useRef(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => { hoveredRef.current = hovered }, [hovered])

  useEffect(() => {
    if (active) {
      cancelAnimationFrame(rafRef.current)
      if (previewRef.current) previewRef.current.style.background = ACCENT
      return
    }
    function frame() {
      const speed = hoveredRef.current ? 0.006 * 3.5 : 0.006
      tRef.current += speed
      const t = tRef.current
      const alpha = hoveredRef.current ? 0.26 : 0.12
      const x = 50 + 30 * Math.sin(t)
      const y = 50 + 20 * Math.cos(t * 0.7)
      const a1 = Math.round(alpha * 255).toString(16).padStart(2, '0')
      const a2 = Math.round(alpha * 0.4 * 255).toString(16).padStart(2, '0')
      const bg = `#FFF5F5 radial-gradient(ellipse at ${x}% ${y}%, ${ACCENT}${a1} 0%, ${ACCENT}${a2} 60%, transparent 100%)`
      if (previewRef.current) previewRef.current.style.background = bg
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active])

  const svgColor = active ? '#ffffff' : ACCENT

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        padding: '3px',
        borderRadius: '18px',
        border: active ? `1px solid ${ACCENT}` : '1px solid rgba(0,0,0,0.06)',
        background: active ? ACCENT : 'rgba(255,255,255,0.92)',
        boxShadow: hovered ? '0 4px 24px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.06)',
        cursor: 'none',
        textAlign: 'left',
        transition: 'all 0.25s ease',
      }}
    >
      <div ref={previewRef} style={{
        height: '120px',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        background: '#FFF5F5',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: active ? 1 : 0.85,
          transition: 'opacity 0.25s ease',
        }}>
          {getProcessSVG(index, svgColor)}
        </div>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          color: active ? 'rgba(255,255,255,0.5)' : ACCENT,
          marginBottom: '4px',
          transition: 'color 0.25s ease',
        }}>
          {step.number}
        </div>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '15px',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: active ? '#ffffff' : '#1a1a1a',
          transition: 'color 0.25s ease',
        }}>
          {step.title}
        </div>
      </div>
    </button>
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
      ctx!.fillStyle = '#f7f5f0'
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
      background: '#f7f5f0',
      borderRadius: '16px',
      padding: isMobile ? '48px 24px' : '64px 48px',
      marginTop: '80px',
    }}>
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
            textTransform: 'uppercase' as const,
            color: 'rgba(0,0,0,0.5)',
          }}>
            Open to work
          </span>
        </div>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: isMobile ? '22px' : 'clamp(20px, 2.5vw, 28px)',
          fontWeight: 400,
          color: '#1a1a1a',
          letterSpacing: '-0.03em',
          lineHeight: 1.2,
          marginBottom: '12px',
          maxWidth: '480px',
          margin: '0 auto 12px',
        }}>
          Seven years of performance thinking.
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
            onClick={() => router.push('/ux')}
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
            UX &amp; product →
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

export default function WebSegment() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [activeStat, setActiveStat] = useState(-1)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [started, setStarted] = useState(false)

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: started ? 1 : 0,
    transform: started ? 'translateY(0)' : 'translateY(10px)',
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
  })

  const line1 = useWordReveal(segment.headline[0], started, 80)
  const line2 = useWordReveal(segment.headline[1], started, 320)

  const inViewChips        = useInView(0)
  const inViewProjects     = useInView(0)
  const inViewTestimonials = useInView(0)
  const inViewProcess      = useInView(0)
  const inViewStats        = useInView(0)
  const inViewCta          = useInView(0)

  const t = TESTIMONIALS[activeTestimonial]

  return (
    <main className="segment-page" style={{ cursor: 'none' }}>

      {/* SECTION 1 — HERO */}
      <div style={{ paddingTop: isMobile ? '48px' : '80px', marginBottom: '48px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
          ...fadeUp(0),
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ACCENT }} />
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: ACCENT,
          }}>
            Web &amp; Digital
          </span>
        </div>

        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: '#1a1a1a',
          marginBottom: 0,
        }}>
          <div>
            {line1.map(({ word, wrapStyle, innerStyle }, i) => (
              <span key={i} style={wrapStyle}><span style={innerStyle}>{word}</span></span>
            ))}
          </div>
          <div>
            {line2.map(({ word, wrapStyle, innerStyle }, i) => (
              <span key={i} style={wrapStyle}><span style={innerStyle}>{word}</span></span>
            ))}
          </div>
        </h1>

        <p style={{
          ...fadeUp(600),
          fontFamily: "'Inter', sans-serif",
          fontSize: '15px',
          color: '#767676',
          lineHeight: 1.75,
          maxWidth: '520px',
          marginTop: '20px',
          marginBottom: 0,
        }}>
          {segment.intro}
        </p>
      </div>

      {/* SECTION 2 — CAPABILITIES STRIP */}
      <div ref={inViewChips.ref} style={inViewChips.style}>
        <div style={{
          ...fadeUp(750),
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '64px',
          marginTop: '32px',
        }}>
          {['Landing Pages', 'Social Advertising', 'Email Marketing', 'CRO & Growth'].map(chip => (
            <span key={chip} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#767676',
              background: '#F5F5F5',
              borderRadius: '999px',
              padding: '5px 14px',
            }}>
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* SECTION 3 — PROJECT CARDS */}
      <div ref={inViewProjects.ref} style={inViewProjects.style}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '64px' }}>
          {WEB_PROJECTS.map(p => (
            <div
              key={p.slug}
              onClick={() => router.push('/work/' + p.slug)}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.10)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)' }}
              style={{
                borderRadius: '18px',
                background: 'rgba(255,255,255,0.92)',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                padding: '3px',
                cursor: 'none',
                transition: 'box-shadow 0.3s ease',
                overflow: 'hidden',
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
              }}>
                {/* Left frame */}
                <div style={{
                  width: isMobile ? '100%' : '260px',
                  height: isMobile ? '160px' : undefined,
                  minHeight: isMobile ? undefined : '180px',
                  flexShrink: 0,
                  borderRadius: isMobile ? '16px 16px 0 0' : '16px',
                  background: p.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <span style={{
                    fontFamily: "'Climate Crisis', cursive",
                    fontSize: 'clamp(36px, 4vw, 52px)',
                    color: 'rgba(0,0,0,0.12)',
                    textAlign: 'center',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    letterSpacing: '-0.03em',
                  }}>
                    {p.metric}
                  </span>
                </div>

                {/* Right content */}
                <div style={{
                  flex: 1,
                  padding: '24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: ACCENT,
                    marginBottom: '8px',
                  }}>
                    {p.discipline}
                  </div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#1a1a1a',
                    letterSpacing: '-0.02em',
                    marginBottom: '8px',
                    lineHeight: 1.25,
                  }}>
                    {p.title}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: '#767676',
                    lineHeight: 1.65,
                    marginBottom: '16px',
                  }}>
                    {p.what}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {p.outcomes.slice(0, 2).map((o, i) => (
                      <span key={i} style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '11px',
                        color: '#767676',
                        background: '#F5F5F5',
                        borderRadius: '999px',
                        padding: '4px 10px',
                      }}>
                        {o}
                      </span>
                    ))}
                  </div>
                  <div style={{
                    marginTop: '20px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: ACCENT,
                    fontWeight: 500,
                  }}>
                    View case study →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4 — TESTIMONIALS */}
      <div ref={inViewTestimonials.ref} style={inViewTestimonials.style}>
        <div style={{
          borderTop: '1px solid #f0f0f0',
          paddingTop: '64px',
          marginTop: '72px',
        }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '28px',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#1a1a1a',
            marginBottom: '32px',
          }}>
            What people say
          </h2>

          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <div style={{
              position: 'relative',
              padding: isMobile ? '32px 24px 24px' : '40px 48px 32px',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: isMobile ? '16px' : '32px',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '80px',
                color: ACCENT,
                opacity: 0.15,
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
              }}>
                &ldquo;
              </div>

              <p
                key={activeTestimonial}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: isMobile ? '20px' : 'clamp(20px, 2.5vw, 28px)',
                  fontWeight: 400,
                  color: '#1a1a1a',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                  marginBottom: '28px',
                  animation: 'fadeIn 0.35s ease',
                }}
              >
                {t.quote}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: t.color + '1e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    color: t.color,
                  }}>
                    {t.initials}
                  </span>
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#1a1a1a',
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    color: '#767676',
                  }}>
                    {t.title}
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '24px',
            }}>
              {TESTIMONIALS.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: ACCENT,
                    opacity: activeTestimonial === i ? 1 : 0.2,
                    cursor: 'none',
                    transition: 'opacity 0.2s ease',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 5 — HOW I WORK */}
      <div ref={inViewProcess.ref} style={inViewProcess.style}>
        <div style={{
          borderTop: '1px solid #f0f0f0',
          paddingTop: '56px',
          marginTop: '72px',
          marginBottom: '64px',
        }}>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '28px',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#1a1a1a',
            marginBottom: '24px',
          }}>
            How I work
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '12px',
          }}>
            {PROCESS_STEPS.map((step, i) => (
              <ProcessCard
                key={i}
                step={step}
                active={activeStep === i}
                onClick={() => setActiveStep(i)}
                index={i}
              />
            ))}
          </div>

          <p
            key={activeStep}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#767676',
              lineHeight: 1.75,
              maxWidth: '560px',
              marginTop: '20px',
              marginBottom: 0,
              animation: 'fadeIn 0.2s ease',
            }}
          >
            {PROCESS_STEPS[activeStep].description}
          </p>
        </div>
      </div>

      {/* SECTION 6 — STATS ROW */}
      <div ref={inViewStats.ref} style={inViewStats.style}>
        <div style={{
          borderTop: '1px solid #f0f0f0',
          borderBottom: '1px solid #f0f0f0',
          marginTop: '64px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        }}>
          {[
            { number: '4+',   label: 'Years at Disruptive Advertising', detail: 'Producing and auditing performance creative across dozens of DTC and ecom brands.' },
            { number: '100+', label: 'Landing pages audited',           detail: 'CRO audits, message match analysis, and redesigns across ecom and SaaS.' },
            { number: '63%',  label: 'CVR lift for Linear',             detail: '5.5% to 9.02% in 30 days. One section change backed by heatmap data.' },
          ].map((stat, i) => {
            const desktopPadding = i === 0
              ? '40px 40px 40px 0'
              : i === 2
                ? '40px 0 40px 40px'
                : '40px 40px 40px 40px'
            const mobilePadding = '28px 0'
            const borderRight = !isMobile && i < 2 ? '1px solid #f0f0f0' : 'none'
            const borderBottom = isMobile && i < 2 ? '1px solid #f0f0f0' : 'none'
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
                  fontFamily: "'Climate Crisis', cursive",
                  fontSize: '52px',
                  fontWeight: 400,
                  color: activeStat === i ? ACCENT : '#1a1a1a',
                  letterSpacing: '-0.02em',
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
      </div>

      {/* SECTION 7 — CONTACT BAND */}
      <div ref={inViewCta.ref} style={inViewCta.style}>
        <CtaBand isMobile={isMobile} />
      </div>

    </main>
  )
}
