'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CASE_STUDIES, SEGMENTS } from '@/lib/segments'

const THUMBNAILS: Record<string, string> = {
  'black-coast-estates': '/images/black-coast/thumbnail.jpg',
  'skygate-growth-strategies': '/images/skygate/thumbnail.jpg',
  'portfolio-nav-system': '/images/portfolio-nav-system/thumbnail.jpg',
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
  const visibleProjects = CASE_STUDIES.filter(p => !p.hidden)

  function handleCopy() {
    navigator.clipboard.writeText('cmoff13@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="work-page" style={{ cursor: 'none' }}>

      {/* Header */}
      <div className="work-hero" style={{ marginBottom: '56px' }}>
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
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          color: '#b3b3b3',
          lineHeight: 1.55,
          maxWidth: '480px',
          marginTop: '14px',
        }}>
          New here? Start from the{' '}
          <Link
            href="/"
            style={{ color: '#767676', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
          >
            home gate
          </Link>
          {' '}to browse by discipline first — this page is the full archive.
        </p>
      </div>

      {/* Segment legend */}
      <div
        className="work-seg-legend"
        style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '40px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--color-hairline)',
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
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              color: seg.accentColor,
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <span style={{
              width: '20px',
              height: '20px',
              borderRadius: '5px',
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {visibleProjects.map(project => {
          const segment = SEGMENTS[project.primarySegment]
          const thumbnail = THUMBNAILS[project.slug]
          const tagBg = project.primarySegment === 'web'
            ? '#FEF0EE'
            : project.primarySegment === 'brand'
            ? '#F3EEF8'
            : '#EFF6FF'

          return (
            <div
              key={project.slug}
              onClick={() => router.push(`/work/${project.slug}`)}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.10)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)' }}
              style={{
                borderRadius: '18px',
                background: 'rgba(255,255,255,0.92)',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                padding: '3px',
                marginBottom: '12px',
                cursor: 'none',
                transition: 'box-shadow 0.3s ease',
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
                          fontSize: '10px',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '3px 8px',
                          borderRadius: '999px',
                          color: segment.accentColor,
                          background: tagBg,
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
      <div style={{
        paddingTop: '64px',
        paddingBottom: '80px',
        borderTop: '1px solid #f0f0f0',
        marginTop: '48px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: '#767676',
          marginBottom: '20px',
        }}>
          Open to senior design roles and select freelance.
        </p>
        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
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
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="5" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="2" y="4" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="#1a1a1a"/>
          </svg>
          {copied ? 'Copied!' : 'Copy email'}
        </button>
      </div>

    </main>
  )
}