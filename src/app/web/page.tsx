'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'
import AmbientBlob from '@/components/AmbientBlob'

const segment = SEGMENTS.web
const ACCENT = '#DC2626'
const BG = '#F0F2F5'
const LINE = '1px solid rgba(0,0,0,0.07)'

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

const PROCESS = [
  {
    num: '01', title: 'Audit',
    desc: 'Read the data before redesigning anything. Heatmaps, scroll depth, form drop-off.',
    svg: (
      <svg width="32" height="32" viewBox="0 0 100 90" fill="none">
        <rect x="22" y="16" width="56" height="64" rx="4" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
        <circle cx="70" cy="30" r="14" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none"/>
        <line x1="62" y1="22" x2="78" y2="38" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: '02', title: 'Strategy',
    desc: 'Every element earns its place. Hierarchy, CTA placement, copy framing.',
    svg: (
      <svg width="32" height="32" viewBox="0 0 100 90" fill="none">
        <polygon points="50,12 88,75 12,75" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none"/>
        <polygon points="50,30 74,70 26,70" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    num: '03', title: 'Design',
    desc: 'Brand-quality craft applied to performance outcomes.',
    svg: (
      <svg width="32" height="32" viewBox="0 0 100 90" fill="none">
        <rect x="12" y="14" width="76" height="58" rx="4" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" fill="none"/>
        <rect x="12" y="14" width="76" height="13" fill="rgba(0,0,0,0.07)"/>
        <rect x="26" y="46" width="48" height="12" rx="3" fill="rgba(0,0,0,0.1)"/>
      </svg>
    ),
  },
  {
    num: '04', title: 'Measure',
    desc: "What moved, what didn't, and what to test next.",
    svg: (
      <svg width="32" height="32" viewBox="0 0 100 90" fill="none">
        <rect x="10" y="58" width="14" height="22" fill="rgba(0,0,0,0.1)" rx="2"/>
        <rect x="30" y="42" width="14" height="38" fill="rgba(0,0,0,0.14)" rx="2"/>
        <rect x="50" y="28" width="14" height="52" fill="rgba(0,0,0,0.18)" rx="2"/>
        <rect x="70" y="14" width="14" height="66" fill="rgba(0,0,0,0.22)" rx="2"/>
      </svg>
    ),
  },
]

const STATS = [
  { num: '4+', label: 'Years at Disruptive Advertising', detail: 'Producing and auditing performance creative across dozens of DTC and ecom brands.' },
  { num: '100+', label: 'Landing pages audited', detail: 'CRO audits, message match analysis, and conversion-focused redesigns across ecom and SaaS.' },
  { num: '63%', label: 'CVR lift for Linear', detail: '5.5% to 9.02% in 30 days. One section change backed by heatmap data.' },
]

export default function WebPage() {
  const router = useRouter()
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeStat, setActiveStat] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

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
    <div style={{ background: BG, minHeight: '100vh', position: 'relative', cursor: 'none' }}>
      <AmbientBlob color={ACCENT} />

      <div style={{ position: 'relative', zIndex: 1, background: BG }}>

        {/* HERO */}
        <div style={{ padding: `80px ${P} 88px` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 10, color: '#bbb', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 22 }}>Web &amp; Digital</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 'clamp(36px,10vw,48px)' : 'clamp(44px,5.5vw,68px)', fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.055em', lineHeight: 0.97, marginBottom: 26, maxWidth: 640 }}>
            {segment.headline[0]}<br />{segment.headline[1]}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 400, color: '#1a1a1a', marginBottom: 6, maxWidth: 500 }}>Most designers stop at how it looks.</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 300, color: '#999', lineHeight: 1.75, maxWidth: 460, marginBottom: 36 }}>The work here goes further — landing pages built around message match, conversion audits that diagnose why a page isn&apos;t performing, ad creative systems designed to scale.</div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {['Landing pages', 'Social advertising', 'Email marketing', 'CRO & growth'].map(pill)}
          </div>
          </div>
        </div>

        <div style={{ borderTop: LINE }} />

        {/* PROJECTS */}
        <div style={{ padding: `52px ${P}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {sectionLabel('Selected work')}
          <div style={{ maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {visibleProjects.map(p => (
              <div
                key={p.slug}
                onClick={() => router.push('/work/' + p.slug)}
                style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', borderRadius: 14, overflow: 'hidden', border: LINE, cursor: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                <div style={{ width: isMobile ? '100%' : 260, flexShrink: 0, background: BG, minHeight: isMobile ? 120 : 180, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: isMobile ? 'none' : LINE, borderBottom: isMobile ? LINE : 'none' }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 36 : 44, fontWeight: 300, color: 'rgba(0,0,0,0.12)', letterSpacing: '-0.05em' }}>{p.metric}</span>
                </div>
                <div style={{ flex: 1, padding: isMobile ? '20px' : '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: BG }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>{p.tags.map(pill)}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 17 : 20, color: '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>{p.title}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#999', lineHeight: 1.65, marginBottom: 16, maxWidth: 400 }}>{p.what}</div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: ACCENT, fontWeight: 500 }}>View case study →</span>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>

        <div style={{ borderTop: LINE }} />

        {/* TESTIMONIALS */}
        <div style={{ padding: `52px ${P}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {sectionLabel('What people say')}
          <div style={{ maxWidth: 560 }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 20 : 26, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.03em', lineHeight: 1.3, marginBottom: 22 }}>
              &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#888', flexShrink: 0, fontFamily: "'Inter', sans-serif" }}>
                {TESTIMONIALS[activeTestimonial].initials}
              </div>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>{TESTIMONIALS[activeTestimonial].name}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#bbb' }}>{TESTIMONIALS[activeTestimonial].title}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
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

        <div style={{ borderTop: LINE }} />

        {/* PROCESS */}
        <div style={{ padding: `52px ${P}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {sectionLabel('How I work')}
          <div style={{ maxWidth: 880, display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 10 }}>
            {PROCESS.map(step => (
              <div key={step.num} style={{ borderRadius: 14, overflow: 'hidden', border: LINE }}>
                <div style={{ height: 100, background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: LINE }}>
                  {step.svg}
                </div>
                <div style={{ padding: '14px 16px', background: BG }}>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: '#bbb', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 5 }}>{step.num}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: '#1a1a1a', marginBottom: 5 }}>{step.title}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#999', lineHeight: 1.5 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>

        <div style={{ borderTop: LINE }} />

        {/* STATS */}
        <div style={{ padding: `52px ${P}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ maxWidth: 880, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)' }}>
            {STATS.map((s, i) => {
              const padL = !isMobile && i > 0 ? 48 : 0
              const padR = !isMobile && i < 2 ? 48 : 0
              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStat(activeStat === i ? null : i)}
                  style={{
                    padding: isMobile ? '24px 0' : `0`,
                    paddingLeft: padL,
                    paddingRight: padR,
                    borderRight: !isMobile && i < 2 ? LINE : 'none',
                    borderBottom: isMobile && i < 2 ? LINE : 'none',
                    cursor: 'none',
                    position: 'relative',
                  }}
                >
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 44 : 52, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 10 }}>{s.num}</div>
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

        <div style={{ borderTop: LINE }} />

        {/* CONTACT */}
        <div style={{ padding: `72px ${P}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ maxWidth: 560 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#bbb', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 20 }}>Get in touch</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 28 : 40, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 12 }}>Seven years of performance thinking.</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#999', fontWeight: 300, marginBottom: 32 }}>Senior design roles and select freelance.</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
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

      </div>
    </div>
  )
}
