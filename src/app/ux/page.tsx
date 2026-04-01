'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'
import AmbientBlob from '@/components/AmbientBlob'

const segment = SEGMENTS.ux
const ACCENT = '#1D4ED8'
const BG = '#F0F2F5'
const LINE = '1px solid rgba(0,0,0,0.07)'

const UX_METRICS: Record<string, string> = {
  'black-coast-estates': 'UX/UI',
  'portfolio-nav-system': '0→1',
}

const UX_PROCESS = [
  {
    num: '01',
    title: 'Research',
    desc: 'Understanding user goals and mental models before touching a frame. Audience mapping, competitive audit, and defining what success looks like.',
    svg: (
      <svg width="32" height="32" viewBox="0 0 100 90" fill="none">
        <circle cx="44" cy="42" r="20" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none"/>
        <line x1="58" y1="56" x2="76" y2="74" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="44" cy="42" r="8" fill="rgba(0,0,0,0.08)"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Map',
    desc: 'Flows before frames. IA, user journeys, and decision points mapped out so the structure is right before any visual work begins.',
    svg: (
      <svg width="32" height="32" viewBox="0 0 100 90" fill="none">
        <rect x="12" y="18" width="22" height="14" rx="3" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none"/>
        <rect x="39" y="38" width="22" height="14" rx="3" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none"/>
        <rect x="66" y="58" width="22" height="14" rx="3" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none"/>
        <line x1="34" y1="25" x2="39" y2="45" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"/>
        <line x1="61" y1="45" x2="66" y2="65" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Wire',
    desc: 'Low-fidelity decisions at speed. Structure, hierarchy, and interaction patterns locked before visual polish begins.',
    svg: (
      <svg width="32" height="32" viewBox="0 0 100 90" fill="none">
        <rect x="14" y="12" width="72" height="66" rx="4" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" fill="none"/>
        <rect x="14" y="12" width="72" height="14" fill="rgba(0,0,0,0.06)"/>
        <rect x="22" y="34" width="30" height="20" rx="2" stroke="rgba(0,0,0,0.15)" strokeWidth="1" fill="none"/>
        <rect x="58" y="34" width="20" height="8" rx="2" fill="rgba(0,0,0,0.08)"/>
        <rect x="58" y="46" width="20" height="8" rx="2" fill="rgba(0,0,0,0.06)"/>
        <rect x="22" y="62" width="56" height="8" rx="2" fill="rgba(0,0,0,0.1)"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Ship',
    desc: 'High-fidelity prototype delivered with rationale. Every decision documented so the handoff is a conversation, not a mystery.',
    svg: (
      <svg width="32" height="32" viewBox="0 0 100 90" fill="none">
        <rect x="20" y="10" width="60" height="70" rx="6" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" fill="none"/>
        <line x1="50" y1="80" x2="50" y2="88" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
        <line x1="38" y1="88" x2="62" y2="88" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="30" y="22" width="40" height="26" rx="2" fill="rgba(0,0,0,0.06)"/>
        <rect x="30" y="56" width="18" height="4" rx="2" fill="rgba(0,0,0,0.1)"/>
        <rect x="52" y="56" width="18" height="4" rx="2" fill="rgba(0,0,0,0.06)"/>
      </svg>
    ),
  },
]

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

export default function UXPage() {
  const router = useRouter()
  const [activeStat, setActiveStat] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeProcess, setActiveProcess] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    mq.addEventListener('change', e => setIsMobile(e.matches))
  }, [])

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
            <div style={{ fontSize: 10, color: '#bbb', letterSpacing: '0.16em', textTransform: 'uppercase' as const, marginBottom: 22 }}>
              UX & Product
            </div>
            <div style={{ fontSize: isMobile ? 'clamp(36px,10vw,48px)' : 'clamp(44px,5.5vw,68px)', fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.055em', lineHeight: 0.97, marginBottom: 26, maxWidth: 640 }}>
              {segment.headline[0]}<br />{segment.headline[1]}
            </div>
            <div style={{ fontSize: 17, fontWeight: 400, color: '#1a1a1a', marginBottom: 6, maxWidth: 500 }}>
              Good UX is invisible.
            </div>
            <div style={{ fontSize: 15, fontWeight: 300, color: '#6b6b6b', lineHeight: 1.75, maxWidth: 460, marginBottom: 36 }}>
              The user never notices the decision hierarchy, the cognitive load trade-offs, or the three flows that got cut before the one that shipped. This section documents the thinking.
            </div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' as const }}>
              {['Wireframes', 'IA maps', 'Interaction design', 'Figma prototypes'].map(pill)}
            </div>
          </div>
        </div>

        <div style={{ borderTop: LINE }} />

        {/* PROJECTS */}
        <div style={{ padding: `52px ${P}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            {sectionLabel('Selected work')}
            <div style={{ maxWidth: 880, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
              {visibleProjects.map(p => (
                <div
                  key={p.slug}
                  onClick={() => router.push('/work/' + p.slug)}
                  style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' as any, borderRadius: 14, overflow: 'hidden', border: LINE, cursor: 'none', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <div style={{ width: isMobile ? '100%' : 260, flexShrink: 0, background: BG, minHeight: isMobile ? 120 : 180, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: isMobile ? 'none' : LINE, borderBottom: isMobile ? LINE : 'none' }}>
                    <span style={{ fontSize: isMobile ? 36 : 44, fontWeight: 300, color: 'rgba(0,0,0,0.12)', letterSpacing: '-0.05em' }}>
                      {UX_METRICS[p.slug] ?? 'UX'}
                    </span>
                  </div>
                  <div style={{ flex: 1, padding: isMobile ? '20px' : '28px 32px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', background: BG }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const, marginBottom: 12 }}>
                      {p.tags.map(pill)}
                    </div>
                    <div style={{ fontSize: isMobile ? 17 : 20, color: '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: 13, color: '#6b6b6b', lineHeight: 1.65, marginBottom: 16, maxWidth: 400 }}>
                      {p.subtitle}
                    </div>
                    <span style={{ fontSize: 12, color: ACCENT, fontWeight: 500 }}>View case study →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: LINE }} />

        {/* TESTIMONIAL */}
        <div style={{ padding: `52px ${P}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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

        <div style={{ borderTop: LINE }} />

        {/* PROCESS */}
        <div style={{ padding: `52px ${P}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            {sectionLabel('How I work')}
            <div style={{ maxWidth: 880, display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
              {UX_PROCESS.map((step, i) => (
                <div
                  key={step.num}
                  onClick={() => setActiveProcess(i)}
                  style={{ borderRadius: 14, overflow: 'hidden', border: i === activeProcess ? `1px solid ${ACCENT}40` : LINE, cursor: 'none', transition: 'border-color 0.25s' }}
                >
                  <div style={{ height: 110, background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: LINE }}>
                    <div style={{ opacity: i === activeProcess ? 1 : 0.6, transition: 'opacity 0.25s' }}>{step.svg}</div>
                  </div>
                  <div style={{ padding: '14px 16px', background: BG }}>
                    <div style={{ fontSize: 9, color: i === activeProcess ? ACCENT : '#bbb', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 5, transition: 'color 0.25s' }}>{step.num}</div>
                    <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: i === activeProcess ? 500 : 400, marginBottom: 4 }}>{step.title}</div>
                    <div style={{ fontSize: 11, color: '#888', lineHeight: 1.5 }}>{step.desc}</div>
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
              {UX_STATS.map((s, i) => (
                <div
                  key={s.num}
                  onClick={() => setActiveStat(activeStat === i ? null : i)}
                  style={{
                    padding: isMobile ? '24px 0' : `0 ${i === 0 ? '48px 0 0' : i === 1 ? '0 48px' : '0 0 0 48px'}`,
                    borderRight: !isMobile && i < 2 ? LINE : 'none',
                    borderBottom: isMobile && i < 2 ? LINE : 'none',
                    cursor: 'none',
                    position: 'relative' as const,
                    paddingBottom: isMobile ? 24 : 0,
                  }}
                >
                  <div style={{ fontSize: isMobile ? 44 : 52, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 10 }}>{s.num}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 11, color: '#888', letterSpacing: '0.04em' }}>{s.label}</div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s', transform: activeStat === i ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
                      <path d="M2 4l4 4 4-4" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: 12, color: '#6b6b6b', lineHeight: 1.6, marginTop: activeStat === i ? 10 : 0, maxHeight: activeStat === i ? 80 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease, margin-top 0.3s ease', opacity: activeStat === i ? 1 : 0 }}>{s.detail}</div>
                  <div style={{ position: 'absolute' as const, bottom: 0, left: 0, height: 2, background: '#1a1a1a', width: activeStat === i ? '100%' : '0%', transition: 'width 0.3s ease', borderRadius: 999 }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: LINE }} />

        {/* CONTACT */}
        <div style={{ padding: `72px ${P}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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

      </div>
    </div>
  )
}
