'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'
import AmbientBlob from '@/components/AmbientBlob'
import ProcessCards from '@/components/ProcessCards'
import CaseStudyCard from '@/components/CaseStudyCard'

const segment = SEGMENTS.ux
const ACCENT = '#1D4ED8'
const BG = '#F0F2F5'
const LINE = '1px solid rgba(0,0,0,0.07)'

const UX_METRICS: Record<string, string> = {
  'black-coast-estates': 'UX/UI',
  'portfolio-nav-system': '0→1',
}

const THUMBNAILS: Record<string, string> = {
  'black-coast-estates': '/images/black-coast/thumbnail.jpg',
  'portfolio-nav-system': '/images/portfolio/thumbnail.jpg',
}

const UX_STATS = [
  { num: '2', label: 'UX case studies', detail: 'Black Coast Estates and this portfolio — both shipped, both documented with full process rationale.' },
  { num: '7+', label: 'Years of craft', detail: 'Brand and web experience informing every UX decision — systems thinking developed across disciplines.' },
  { num: '100%', label: 'Process driven', detail: 'Research, IA, wireframes, and rationale before any visual work. Every decision defensible.' },
]

const TESTIMONIAL = {
  quote: 'THE. MOST. ORGANIZED. Figma Files I Have Ever Seen.',
  name: 'Vanessa Cohn',
  title: 'Ex-Creative Director @ Designity',
  initials: 'VC',
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

export default function UXPage() {
  const router = useRouter()
  const [activeStat, setActiveStat] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    mq.addEventListener('change', e => setIsMobile(e.matches))
  }, [])

  const [started, setStarted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 80)
    return () => clearTimeout(t)
  }, [])

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: started ? 1 : 0,
    transform: started ? 'translateY(0)' : 'translateY(10px)',
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
  })

  const inViewProjects = useInView(0)
  const inViewApproach = useInView(0)
  const inViewProcess  = useInView(0)
  const inViewStats    = useInView(0)
  const inViewContact  = useInView(0)

  const visibleProjects = CASE_STUDIES.filter(
    c => c.primarySegment === 'ux' && !c.hidden
  )

  const P = isMobile ? '24px' : 'clamp(24px, 6vw, 120px)'

  const pill = (text: string) => (
    <span key={text} style={{ fontSize: 11, color: '#999', background: 'rgba(0,0,0,0.05)', borderRadius: 999, padding: '4px 12px', display: 'inline-block' }}>
      {text}
    </span>
  )

  const sectionLabel = (text: string) => (
    <div style={{ fontSize: 10, color: '#bbb', letterSpacing: '0.14em', textTransform: 'uppercase' as const, fontWeight: 400, marginBottom: 28 }}>
      {text}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <AmbientBlob color={ACCENT} />
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* HERO */}
        <div style={{ padding: `80px ${P} 88px` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
              <div style={{ ...fadeUp(0), fontSize: 10, color: '#bbb', letterSpacing: '0.16em', textTransform: 'uppercase' as const, marginBottom: 22, fontFamily: "'Inter', sans-serif" }}>
                UX & Product
              </div>
              <div style={{ ...fadeUp(120), fontSize: isMobile ? 'clamp(36px,10vw,48px)' : 'clamp(44px,5.5vw,68px)', fontFamily: "'Outfit', sans-serif", fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.055em', lineHeight: 0.97, marginBottom: 26 }}>
                {segment.headline[0]}<br />{segment.headline[1]}
              </div>
              <div style={{ ...fadeUp(240), fontSize: 17, fontWeight: 400, color: '#1a1a1a', marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>
                Good UX is invisible.
              </div>
              <div style={{ ...fadeUp(340), fontSize: 15, fontWeight: 300, color: '#6b6b6b', lineHeight: 1.75, marginBottom: 36, fontFamily: "'Inter', sans-serif" }}>
                The user never notices the decision hierarchy, the cognitive load trade-offs, or the three flows that got cut before the one that shipped. This section documents the thinking.
              </div>
              <div style={{ ...fadeUp(440), display: 'flex', gap: 7, justifyContent: 'center', flexWrap: isMobile ? 'nowrap' : 'wrap' as any, overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? 4 : 0 }}>
                {['Wireframes', 'IA maps', 'Interaction design', 'Figma prototypes'].map(pill)}
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: LINE }} />

        {/* PROJECTS */}
        <div ref={inViewProjects.ref} style={inViewProjects.style}>
        <div style={{ padding: `52px ${P}` }}>
          <div>
            {sectionLabel('Selected work')}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 12,
            }}>
              {visibleProjects.map((p, i) => (
                <CaseStudyCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.title}
                  subtitle={p.subtitle}
                  tags={p.tags}
                  thumbnail={THUMBNAILS[p.slug]}
                  accentColor={ACCENT}
                  metric={UX_METRICS[p.slug] ?? 'UX'}
                  isMobile={isMobile}
                  cardIndex={i}
                  onClick={() => router.push('/work/' + p.slug)}
                />
              ))}
            </div>
          </div>
        </div>
        </div>{/* /inViewProjects */}

        <div style={{ borderTop: LINE }} />

        {/* TESTIMONIAL */}
        <div ref={inViewApproach.ref} style={inViewApproach.style}>
        <div style={{ padding: `52px ${P}` }}>
          <div>
            {sectionLabel('What people say')}
            <div style={{ maxWidth: 560 }}>
              <div style={{ fontSize: isMobile ? 20 : 26, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.03em', lineHeight: 1.3, marginBottom: 22 }}>
                "{TESTIMONIAL.quote}"
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#888', flexShrink: 0 }}>
                  {TESTIMONIAL.initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>{TESTIMONIAL.name}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>{TESTIMONIAL.title}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>{/* /inViewApproach */}

        <div style={{ borderTop: LINE }} />

        {/* PROCESS */}
        <div ref={inViewProcess.ref} style={inViewProcess.style}>
        <div style={{ padding: `52px ${P}` }}>
          <div>
            {sectionLabel('How I work')}
            <ProcessCards
              steps={[
                {
                  number: '01',
                  title: 'Discover',
                  description: "I start with what people are actually trying to do — not what they say they want, but what their behavior reveals. User goals, mental models, jobs to be done. Research before wireframes, always.",
                },
                {
                  number: '02',
                  title: 'Map',
                  description: 'Structure before pixels. Information architecture, user flows, decision trees — the invisible skeleton that determines whether a product feels intuitive or exhausting. I get this right before anything gets visual.',
                },
                {
                  number: '03',
                  title: 'Design',
                  description: 'High-fidelity Figma prototypes communicate how something works, not just how it looks. Every interaction decision is documented with rationale — so the handoff is a conversation, not a guessing game.',
                },
                {
                  number: '04',
                  title: 'Validate',
                  description: "Usability testing reveals what confidence in your own work cannot. I ship the version that works — not the version that looked good in the mockup. The user always wins the argument.",
                },
              ]}
              accent="#1D4ED8"
              isMobile={isMobile}
              activeStep={activeStep}
              onStepChange={setActiveStep}
            />
          </div>
        </div>
        </div>{/* /inViewProcess */}

        <div style={{ borderTop: LINE }} />

        {/* STATS */}
        <div ref={inViewStats.ref} style={inViewStats.style}>
        <div style={{ padding: `52px ${P}` }}>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', borderTop: LINE, borderBottom: LINE }}>
              {UX_STATS.map((s, i) => {
                const desktopPadding = i === 0 ? '40px 40px 40px 0' : i === 2 ? '40px 0 40px 40px' : '40px 40px 40px 40px'
                return (
                  <div
                    key={s.num}
                    onClick={() => setActiveStat(activeStat === i ? null : i)}
                    style={{
                      padding: isMobile ? '28px 0' : desktopPadding,
                      borderRight: !isMobile && i < 2 ? LINE : 'none',
                      borderBottom: isMobile && i < 2 ? LINE : 'none',
                      cursor: 'none',
                      position: 'relative' as const,
                    }}
                  >
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 36 : 52, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.05em', lineHeight: 1 }}>{s.num}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: activeStat === i ? ACCENT : '#767676', letterSpacing: '0.04em', transition: 'color 0.2s ease' }}>{s.label}</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginLeft: 8, transition: 'transform 0.2s ease, color 0.2s ease', transform: activeStat === i ? 'rotate(180deg)' : 'rotate(0deg)', color: activeStat === i ? ACCENT : '#999' }}>
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#999', lineHeight: 1.6, marginTop: activeStat === i ? 10 : 0, maxHeight: activeStat === i ? 60 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease, margin-top 0.3s ease', opacity: activeStat === i ? 1 : 0 }}>{s.detail}</div>
                    <div style={{ position: 'absolute' as const, bottom: 0, left: 0, height: 2, background: ACCENT, width: activeStat === i ? '100%' : '0%', transition: 'width 0.3s ease', borderRadius: 999 }} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        </div>{/* /inViewStats */}

        <div style={{ borderTop: LINE }} />

        {/* CONTACT */}
        <div ref={inViewContact.ref} style={inViewContact.style}>
        <div style={{ padding: `72px ${P}` }}>
          <div>
            <div style={{ maxWidth: 560 }}>
              <div style={{ fontSize: 10, color: '#bbb', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 20 }}>Get in touch</div>
              <div style={{ fontSize: isMobile ? 28 : 40, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 12 }}>
                Thinking in systems, designing for people.
              </div>
              <div style={{ fontSize: 15, color: '#6b6b6b', fontWeight: 300, marginBottom: 32 }}>Senior UX roles and select freelance.</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const, alignItems: 'center' }}>
                <button
                  onClick={() => { navigator.clipboard.writeText('cmoff13@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: ACCENT, color: 'white', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 600, borderRadius: 999, border: 'none', cursor: 'none' }}
                >
                  {copied ? 'Copied!' : 'Copy email'}
                </button>
                <button
                  onClick={() => router.push('/brand')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', color: '#1a1a1a', fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, borderRadius: 999, border: LINE, cursor: 'none' }}
                >
                  Brand identity →
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>{/* /inViewContact */}

      </div>
    </div>
  )
}
