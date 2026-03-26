'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CASE_STUDIES, SEGMENTS } from '@/lib/segments'
import ContactCta from '@/components/ContactCta'

const THUMBNAILS: Record<string, string> = {
  'black-coast-estates': '/images/black-coast/thumbnail.jpg',
  'skygate-growth-strategies': '/images/skygate/thumbnail.jpg',
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
  const visibleProjects = CASE_STUDIES.filter(p => !p.hidden)

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
      <div className="work-project-stack" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '0',
                background: 'var(--color-bg)',
                border: '1px solid var(--color-hairline)',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.borderColor = '#e4e4e1'
                const thumb = e.currentTarget.querySelector('.work-thumb') as HTMLElement
                if (thumb) thumb.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = '#ededec'
                const thumb = e.currentTarget.querySelector('.work-thumb') as HTMLElement
                if (thumb) thumb.style.transform = 'scale(1)'
              }}
            >
              {/* Thumbnail */}
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                background: segment.gradientSubtle,
                minHeight: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumbnail}
                    alt={project.title}
                    className="work-thumb"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  />
                ) : (
                  <div
                    className="work-thumb"
                    style={{
                      transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                      color: segment.accentColor,
                      opacity: 0.5,
                    }}
                  >
                    {SEGMENT_ICONS[project.primarySegment]}
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
              }}>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginBottom: '5px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: segment.accentColor,
                  }}>
                    {SEGMENT_ICONS[project.primarySegment]}
                    {segment.label}
                  </div>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '17px',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: '#1a1a1a',
                    lineHeight: 1.2,
                    marginBottom: '4px',
                  }}>
                    {project.title}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    color: '#9b9b9b',
                    lineHeight: 1.4,
                    marginBottom: '10px',
                  }}>
                    {project.subtitle}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {project.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '10px',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          padding: '2px 7px',
                          borderRadius: '4px',
                          color: segment.accentColor,
                          background: tagBg,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{
        marginTop: '64px',
        paddingTop: '40px',
        borderTop: '1px solid var(--color-hairline)',
      }}>
        <ContactCta variant="full" accentColor="#1a1a1a" />
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '32px',
        paddingTop: '32px',
        borderTop: '1px solid var(--color-hairline)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <button
          onClick={() => router.push('/')}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#999',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#1a1a1a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#999')}
        >
          ← Back to gate
        </button>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: '#ccc',
        }}>
          More projects coming
        </p>
      </div>

    </main>
  )
}