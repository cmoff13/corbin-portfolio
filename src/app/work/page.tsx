'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CASE_STUDIES, SEGMENTS } from '@/lib/segments'
import AmbientBlob from '@/components/AmbientBlob'

const BG = '#F0F2F5'
const LINE = '1px solid rgba(0,0,0,0.07)'

const THUMBNAILS: Record<string, string> = {
  'black-coast-estates': '/images/black-coast/thumbnail.jpg',
  'skygate-growth-strategies': '/images/skygate/thumbnail.jpg',
  'portfolio-nav-system': '/images/portfolio-nav-system/thumbnail.jpg',
  'kirrin-finch': '/images/kirrin/thumbnail.jpg',
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

export default function WorkPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const visibleProjects = CASE_STUDIES.filter(p => !p.hidden)

  function handleCopy() {
    navigator.clipboard.writeText('cmoff13@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', position: 'relative', cursor: 'none' }}>
      <AmbientBlob color="#3B0764" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(24px, 6vw, 120px)' }}>

          {/* Header */}
          <div style={{ paddingTop: 80, marginBottom: '56px' }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: '#ccc',
              marginBottom: '12px',
            }}>
              All work
            </p>
            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#1a1a1a',
              marginBottom: '16px',
            }}>
              Everything, unfiltered.
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              color: '#9b9b9b',
              lineHeight: 1.6,
              maxWidth: '480px',
            }}>
              All projects across brand identity, web and digital, and UX — in one place. Use the segment switcher above to filter by discipline.
            </p>
          </div>

          {/* Segment legend */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '40px',
              paddingBottom: '24px',
              borderBottom: LINE,
              flexWrap: 'wrap',
            }}
          >
            {Object.values(SEGMENTS).map(seg => (
              <button
                key={seg.id}
                onClick={() => router.push(`/${seg.id}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: `1px solid ${seg.accentColor}22`,
                  borderRadius: '999px',
                  padding: '5px 14px 5px 8px',
                  cursor: 'none',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  color: seg.accentColor,
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = seg.accentColor + '55')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = seg.accentColor + '22')}
              >
                <span style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  background: seg.gradientSubtle,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: seg.accentColor,
                  border: `1px solid ${seg.accentColor}22`,
                }}>
                  {SEGMENT_ICONS[seg.id]}
                </span>
                {seg.label}
              </button>
            ))}
          </div>

          {/* Project list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {visibleProjects.map(project => {
              const segment = SEGMENTS[project.primarySegment]
              const thumbnail = THUMBNAILS[project.slug]
              return (
                <div
                  key={project.slug}
                  onClick={() => router.push(`/work/${project.slug}`)}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  style={{
                    borderRadius: '18px',
                    background: BG,
                    border: '1px solid rgba(0,0,0,0.07)',
                    cursor: 'none',
                    transition: 'opacity 0.2s',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {/* Left frame */}
                    <div style={{
                      width: '260px',
                      flexShrink: 0,
                      borderRadius: '16px',
                      background: segment.accentColor + '0f',
                      minHeight: '180px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}>
                      {thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumbnail}
                          alt={project.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            position: 'absolute',
                            inset: 0,
                          }}
                        />
                      ) : (
                        <span style={{
                          fontFamily: "'Climate Crisis', cursive",
                          fontSize: '40px',
                          color: 'rgba(0,0,0,0.1)',
                          textAlign: 'center',
                          pointerEvents: 'none',
                          userSelect: 'none',
                          padding: '0 16px',
                          lineHeight: 1.2,
                        }}>
                          {project.title}
                        </span>
                      )}
                    </div>

                    {/* Right content */}
                    <div style={{
                      flex: 1,
                      padding: '24px 28px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      background: BG,
                    }}>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: segment.accentColor,
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}>
                        {SEGMENT_ICONS[project.primarySegment]}
                        {segment.label}
                      </div>
                      <div style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '22px',
                        fontWeight: 400,
                        color: '#1a1a1a',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                      }}>
                        {project.title}
                      </div>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        color: '#767676',
                        lineHeight: 1.6,
                        marginTop: '6px',
                      }}>
                        {project.subtitle}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '12px' }}>
                        {project.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: '11px',
                              color: '#999',
                              background: 'rgba(0,0,0,0.05)',
                              borderRadius: 999,
                              padding: '4px 12px',
                              display: 'inline-block',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        color: segment.accentColor,
                        fontWeight: 500,
                        marginTop: '16px',
                      }}>
                        View case study →
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact footer */}
          <div style={{ borderTop: LINE, padding: '72px 0', marginTop: '48px' }}>
            <div style={{ maxWidth: 560 }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#bbb', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>Get in touch</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 40, fontWeight: 300, color: '#1a1a1a', letterSpacing: '-0.04em', lineHeight: 1.05, marginBottom: 12 }}>Seven years of design.</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#999', fontWeight: 300, marginBottom: 32 }}>Senior design roles and select freelance.</div>
              <button
                onClick={handleCopy}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#1a1a1a', color: 'white', fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, borderRadius: 999, border: 'none', cursor: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {copied ? 'Copied!' : 'Copy email'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
