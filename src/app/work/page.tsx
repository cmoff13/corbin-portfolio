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

export default function WorkPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>('all')

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
      <AmbientBlob color="#3B0764" />

      <div style={{ position: 'relative', zIndex: 1, padding: '0 clamp(24px, 6vw, 120px)' }}>

        {/* Hero */}
        <div style={{ paddingTop: 80, paddingBottom: 56, marginBottom: 32 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              color: '#bbb',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}>All work</div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(44px, 5.5vw, 68px)',
              fontWeight: 300,
              color: '#1a1a1a',
              letterSpacing: '-0.055em',
              lineHeight: 0.97,
              marginBottom: 20,
              maxWidth: 640,
            }}>
              Everything,<br />unfiltered.
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 400,
              color: '#1a1a1a',
              marginBottom: 6,
              maxWidth: 480,
            }}>
              Seven years across brand, web, and product.
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              color: '#999',
              lineHeight: 1.75,
              maxWidth: 480,
            }}>
              Browse everything in one place, or use the segment links below to filter by discipline.
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Segment filter pills */}
          <div style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            paddingBottom: 24,
            borderBottom: LINE,
            marginBottom: 24,
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {visibleProjects.map(project => {
              const segment = SEGMENTS[project.primarySegment]
              const thumbnail = THUMBNAILS[project.slug]
              return (
                <div
                  key={project.slug}
                  onClick={() => router.push(`/work/${project.slug}`)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: 14,
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.07)',
                    background: BG,
                    cursor: 'none',
                    transition: 'opacity 0.2s',
                    marginBottom: 10,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  {/* Left thumbnail */}
                  <div style={{
                    width: 200,
                    height: 200,
                    flexShrink: 0,
                    background: BG,
                    overflow: 'hidden',
                    position: 'relative',
                    borderRight: '1px solid rgba(0,0,0,0.07)',
                  }}>
                    {thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumbnail}
                        alt={project.title}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: segment.accentColor + '0f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <span style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: 13,
                          fontWeight: 300,
                          color: 'rgba(0,0,0,0.2)',
                          letterSpacing: '-0.02em',
                          textAlign: 'center',
                          padding: '0 16px',
                          lineHeight: 1.3,
                        }}>{project.title}</span>
                      </div>
                    )}
                  </div>

                  {/* Right content */}
                  <div style={{
                    flex: 1,
                    padding: '28px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: BG,
                  }}>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: segment.accentColor,
                      marginBottom: 8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                      {SEGMENT_ICONS[project.primarySegment]}
                      {segment.label}
                    </div>
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 20,
                      fontWeight: 400,
                      color: '#1a1a1a',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                      marginBottom: 6,
                    }}>
                      {project.title}
                    </div>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: '#767676',
                      lineHeight: 1.6,
                      marginBottom: 14,
                    }}>
                      {project.subtitle}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 11,
                          color: '#999',
                          background: 'rgba(0,0,0,0.05)',
                          borderRadius: 999,
                          padding: '4px 12px',
                        }}>{tag}</span>
                      ))}
                    </div>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      color: segment.accentColor,
                      fontWeight: 500,
                    }}>View case study →</span>
                  </div>
                </div>
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
          <div style={{
            borderTop: LINE,
            padding: '72px 0 80px',
            marginTop: '64px',
          }}>
            <div style={{ maxWidth: 560 }}>
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
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
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
  )
}
