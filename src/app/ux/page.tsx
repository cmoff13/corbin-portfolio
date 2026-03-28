'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'
import AmbientBlob from '@/components/AmbientBlob'

const segment = SEGMENTS.ux
const ACCENT = '#1D4ED8'
const BG = '#F0F2F5'
const LINE = '1px solid rgba(0,0,0,0.07)'

const projects = CASE_STUDIES.filter(c =>
  (c.primarySegment === 'ux' || c.alsoIn?.includes('ux')) && !c.hidden
)

const THUMBNAILS: Record<string, string> = {
  'black-coast-estates': '/images/black-coast/thumbnail.jpg',
}

export default function UXSegment() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const P = isMobile ? '24px' : 'clamp(24px, 6vw, 120px)'

  const pill = (text: string) => (
    <span key={text} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#999', background: 'rgba(0,0,0,0.05)', borderRadius: 999, padding: '4px 12px', display: 'inline-block' }}>{text}</span>
  )

  const sectionLabel = (text: string) => (
    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#bbb', letterSpacing: '0.14em', textTransform: 'uppercase' as const, fontWeight: 400, marginBottom: 28 }}>{text}</div>
  )

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', position: 'relative', cursor: 'none' }}>
      <AmbientBlob color={ACCENT} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* HERO */}
        <div style={{ padding: `80px ${P} 88px` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#bbb', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 22 }}>UX &amp; product</div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 'clamp(36px,10vw,48px)' : 'clamp(44px,5.5vw,68px)', fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.055em', lineHeight: 0.97, marginBottom: 26, maxWidth: 640 }}>
            {segment.headline[0]}<br />{segment.headline[1]}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 400, color: '#1a1a1a', marginBottom: 6, maxWidth: 500 }}>Good UX is invisible.</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 300, color: '#999', lineHeight: 1.75, maxWidth: 460 }}>The user never notices the decision hierarchy, the cognitive load trade-offs, or the three flows that got cut before the one that shipped.</div>
          </div>
        </div>

        <div style={{ borderTop: LINE }} />

        {/* APPROACH CALLOUT */}
        <div style={{ padding: `52px ${P}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ maxWidth: 600, padding: '24px 28px', borderRadius: 14, border: LINE }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#bbb', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 14 }}>How I approach product work</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 300, color: '#666', lineHeight: 1.75 }}>
              I start with the problem, not the interface. That means understanding user goals, mapping flows before pixels, and making decisions I can explain. Brand craft informs the output — systems thinking drives the process.
            </div>
          </div>
          </div>
        </div>

        <div style={{ borderTop: LINE }} />

        {/* PROJECTS */}
        <div style={{ padding: `52px ${P}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {sectionLabel('Selected work')}
          <div style={{ maxWidth: 880, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {projects.map(project => {
              const thumbnail = THUMBNAILS[project.slug]
              return (
                <div
                  key={project.slug}
                  onClick={() => router.push(`/work/${project.slug}`)}
                  style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', borderRadius: 14, overflow: 'hidden', border: LINE, cursor: 'none', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <div style={{ width: isMobile ? '100%' : 260, flexShrink: 0, background: BG, minHeight: isMobile ? 140 : 180, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: isMobile ? 'none' : LINE, borderBottom: isMobile ? LINE : 'none', overflow: 'hidden', position: 'relative' }}>
                    {thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumbnail}
                        alt={project.title}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(0,0,0,0.2)', letterSpacing: '-0.02em', textAlign: 'center', padding: '0 20px' }}>{project.title}</span>
                    )}
                  </div>
                  <div style={{ flex: 1, padding: isMobile ? '20px' : '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: BG }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                      {project.tags.slice(0, 3).map(pill)}
                    </div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 17 : 20, color: '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>{project.title}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#999', lineHeight: 1.65, marginBottom: 16, maxWidth: 400 }}>{project.subtitle}</div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: ACCENT, fontWeight: 500 }}>View case study →</span>
                  </div>
                </div>
              )
            })}
          </div>
          </div>
        </div>

        <div style={{ borderTop: LINE }} />

        {/* MORE WORK NOTE */}
        <div style={{ padding: `36px ${P}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#bbb', fontWeight: 300 }}>
            More UX work in progress — including a speculative redesign currently underway.
          </div>
          </div>
        </div>

        <div style={{ borderTop: LINE }} />

        {/* CONTACT */}
        <div style={{ padding: `72px ${P}` }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ maxWidth: 560 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#bbb', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 20 }}>Get in touch</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 28 : 40, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 12 }}>Thinking beyond the interface.</div>
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
                onClick={() => router.push('/brand')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'transparent', color: '#1a1a1a', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500, borderRadius: 999, border: LINE, cursor: 'none' }}
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
