'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'
import AmbientBlob from '@/components/AmbientBlob'
import ProcessCards from '@/components/ProcessCards'
import CaseStudyCard from '@/components/CaseStudyCard'

const segment = SEGMENTS.web
const ACCENT = '#DC2626'
const BG = '#F0F2F5'
const LINE = '1px solid rgba(0,0,0,0.07)'

const WEB_THUMBNAILS: Record<string, string> = {
  'linear-cro': '/images/linear-cro/thumbnail.jpg',
  'kirrin-finch': '/images/kirrin-finch/thumbnail.jpg',
  'heybud-skincare': '/images/heybud-skincare/thumbnail.jpg',
  'skygate-growth-strategies': '/images/skygate/thumbnail.jpg',
}

const WEB_PROJECTS = [
  { slug: 'linear-cro', metric: '63%', tags: ['CRO', 'Landing page', 'Heatmaps'], title: 'From 5.5% to 9.02% in 30 days', what: 'Heatmap-driven redesign of a single section that turned a decent-converting page into a high-converting one. One change, 30 days, measurable result.' },
  { slug: 'kirrin-finch', metric: '$1M+', tags: ['Social ads', 'Email marketing', 'DTC'], title: 'Scaling a DTC brand past $1M', what: 'Designed and produced static social ads and email campaigns for a gender-neutral clothing brand growing past a revenue plateau.' },
  { slug: 'heybud-skincare', metric: 'Meta + Pinterest', tags: ['Art direction', 'Meta ads', 'Pinterest'], title: 'UGC-led creative that actually performed', what: 'Tested polished product creative against UGC-style ads. UGC won decisively.' },
  { slug: 'issa', metric: 'Brand elevation', tags: ['Brand identity', 'Web design', 'Fitness'], title: 'Standing out in a saturated fitness market', what: "Strengthened brand image and digital presence for one of the world's largest fitness certification organizations." },
  { slug: 'better-business-bureau', metric: 'A/B tested', tags: ['Email marketing', 'Drip campaigns', 'A/B testing'], title: 'Drip campaigns that taught us the audience', what: 'Built drip and re-engagement sequences. Used A/B testing to learn what actually moved business owners.' },
  { slug: 'skygate-growth-strategies', metric: '0→1', tags: ['Brand system', 'Webflow', 'Design system'], title: 'Zero to one — brand system and Webflow launch', what: 'Built the complete brand identity and Webflow site for a real estate investment platform.' },
]

const TESTIMONIALS = [
  { quote: 'A powerhouse senior designer with a strong foundation in UI/UX.', name: 'Brian Steffes', title: 'Ex-Creative Team Lead Manager @ Disruptive Advertising', initials: 'BS' },
  { quote: 'His adaptability across different styles and projects makes him a valuable asset to any creative or marketing team.', name: 'Sarah Rodriguez', title: 'Ex-VP Creative Manager @ Disruptive Advertising', initials: 'SR' },
  { quote: 'Working with Corbin was a pleasure... I highly recommend him.', name: 'Claudia Gharai', title: 'Ex-Marketing Manager @ Porsche', initials: 'CG' },
]

const STATS = [
  { num: '4+', label: 'Years at Disruptive Advertising', detail: 'Producing and auditing performance creative across dozens of DTC and ecom brands.' },
  { num: '100+', label: 'Landing pages audited', detail: 'CRO audits, message match analysis, and conversion-focused redesigns across ecom and SaaS.' },
  { num: '63%', label: 'CVR lift for Linear', detail: '5.5% to 9.02% in 30 days. One section change backed by heatmap data.' },
]

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

export default function WebPage() {
  const router = useRouter()
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeStat, setActiveStat] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
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

  const inViewProjects    = useInView(0)
  const inViewTestimonial = useInView(0)
  const inViewProcess     = useInView(0)
  const inViewStats       = useInView(0)
  const inViewContact     = useInView(0)

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [])

  const visibleProjects = WEB_PROJECTS.filter(p => {
    const cs = CASE_STUDIES.find(c => c.slug === p.slug)
    return cs && !cs.hidden
  })

  const P = isMobile ? '24px' : 'clamp(24px, 6vw, 120px)'

  const pill = (text: string) => (
    <span key={text} style={{ fontSize: 11, color: '#999', background: 'rgba(0,0,0,0.05)', borderRadius: 999, padding: '4px 12px', display: 'inline-block' }}>{text}</span>
  )

  const sectionLabel = (text: string) => (
    <div style={{ fontSize: 10, color: '#bbb', letterSpacing: '0.14em', textTransform: 'uppercase' as const, fontWeight: 400, marginBottom: 28 }}>{text}</div>
  )

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', position: 'relative', cursor: 'none' }}>
      <AmbientBlob color={ACCENT} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* HERO */}
        <div style={{ padding: `80px ${P} 88px` }}>
          <div style={{ textAlign: 'center' }}>
          <div style={{ ...fadeUp(0), fontSize: 10, color: '#bbb', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 22 }}>Web &amp; Digital</div>
          <div style={{ ...fadeUp(120), fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 'clamp(36px,10vw,48px)' : 'clamp(44px,5.5vw,68px)', fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.055em', lineHeight: 0.97, marginBottom: 26, maxWidth: 640, margin: '0 auto 26px' }}>
            {segment.headline[0]}<br />{segment.headline[1]}
          </div>
          <div style={{ ...fadeUp(240), fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 400, color: '#1a1a1a', marginBottom: 6, maxWidth: 500, margin: '0 auto 6px' }}>Most designers stop at how it looks.</div>
          <div style={{ ...fadeUp(340), fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 300, color: '#999', lineHeight: 1.75, maxWidth: 460, marginBottom: 36, margin: '0 auto 36px' }}>The work here goes further — landing pages built around message match, conversion audits that diagnose why a page isn&apos;t performing, ad creative systems designed to scale.</div>
          <div style={{ ...fadeUp(440), display: 'flex', gap: 7, flexWrap: isMobile ? 'nowrap' : 'wrap', overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? 4 : 0, justifyContent: 'center' }}>
            {['Landing pages', 'Social advertising', 'Email marketing', 'CRO & growth'].map(pill)}
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
                subtitle={p.what}
                tags={p.tags}
                thumbnail={WEB_THUMBNAILS[p.slug]}
                accentColor={ACCENT}
                metric={p.metric}
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

        {/* TESTIMONIALS */}
        <div ref={inViewTestimonial.ref} style={inViewTestimonial.style}>
        <div style={{ padding: `52px ${P}` }}>
          <div>
          {sectionLabel('What people say')}
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 20 : 26, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.03em', lineHeight: 1.3, marginBottom: 22, maxWidth: '100%', wordBreak: 'break-word' }}>
              &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#888', flexShrink: 0, fontFamily: "'Inter', sans-serif" }}>
                {TESTIMONIALS[activeTestimonial].initials}
              </div>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>{TESTIMONIALS[activeTestimonial].name}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#bbb' }}>{TESTIMONIALS[activeTestimonial].title}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
              {TESTIMONIALS.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{ width: 20, height: 2, borderRadius: 999, background: i === activeTestimonial ? '#1a1a1a' : 'rgba(0,0,0,0.12)', cursor: 'none', transition: 'background 0.2s' }}
                />
              ))}
            </div>
          </div>
          </div>
        </div>
        </div>{/* /inViewTestimonial */}

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
                title: 'Audit',
                description: 'Before touching a frame, I read the data. Heatmaps show where attention dies. Scroll depth reveals what people never see. Form drop-off pinpoints where intent collapses. The redesign starts here — not in Figma.',
              },
              {
                number: '02',
                title: 'Strategy',
                description: 'Every element on a page is a decision. Message hierarchy, CTA placement, copy framing — none of it happens by accident in work that converts. I build the argument before I build the layout.',
              },
              {
                number: '03',
                title: 'Design',
                description: "Performance creative doesn't mean ugly creative. Brand-quality craft applied to conversion outcomes — ads that earn attention before they ask for action.",
              },
              {
                number: '04',
                title: 'Measure',
                description: "Shipping is the beginning, not the end. What moved, what didn't, and what to test next. Every result teaches you something about the audience — if you're paying attention.",
              },
            ]}
            accent="#DC2626"
            isMobile={isMobile}
            activeStep={activeStep}
            onStepChange={setActiveStep}
          />
          </div>
        </div>
        </div>{/* /inViewProcess */}

        {/* STATS */}
        <div ref={inViewStats.ref} style={inViewStats.style}>
        <div style={{ padding: `52px ${P}` }}>
          <div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', borderTop: LINE, borderBottom: LINE }}>
            {STATS.map((s, i) => {
              const desktopPadding = i === 0
                ? '40px 40px 40px 0'
                : i === 2
                ? '40px 0 40px 40px'
                : '40px 40px 40px 40px'
              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStat(activeStat === i ? null : i)}
                  style={{
                    padding: isMobile ? '28px 0' : desktopPadding,
                    borderRight: !isMobile && i < 2 ? LINE : 'none',
                    borderBottom: isMobile && i < 2 ? LINE : 'none',
                    cursor: 'none',
                    position: 'relative',
                  }}
                >
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 36 : 52, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 10 }}>{s.num}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#bbb', letterSpacing: '0.04em' }}>{s.label}</div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s', transform: activeStat === i ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0, marginLeft: 8 }}>
                      <path d="M2 4l4 4 4-4" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#999', lineHeight: 1.6, marginTop: activeStat === i ? 10 : 0, maxHeight: activeStat === i ? 60 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease, margin-top 0.3s ease', opacity: activeStat === i ? 1 : 0 }}>{s.detail}</div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, height: 2, background: '#1a1a1a', width: activeStat === i ? '100%' : '0%', transition: 'width 0.3s ease', borderRadius: 999 }} />
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
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#bbb', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 20 }}>Get in touch</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 28 : 40, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 12 }}>Seven years of performance thinking.</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#999', fontWeight: 300, marginBottom: 32 }}>Senior design roles and select freelance.</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
              <button
                onClick={() => { navigator.clipboard.writeText('cmoff13@gmail.com'); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#1a1a1a', color: 'white', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, borderRadius: 999, border: 'none', cursor: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {copied ? 'Copied!' : 'Copy email'}
              </button>
              <button
                onClick={() => router.push('/ux')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', color: '#1a1a1a', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, borderRadius: 999, border: LINE, cursor: 'none' }}
              >
                UX &amp; product →
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
