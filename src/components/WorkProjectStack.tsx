'use client'

import { useRouter } from 'next/navigation'
import { SEGMENTS, type CaseStudy } from '@/lib/segments'

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

export default function WorkProjectStack({ projects }: { projects: CaseStudy[] }) {
  const router = useRouter()

  return (
    <div className="work-project-stack">
      {projects.map(project => {
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
            className="work-index-row"
            role="button"
            tabIndex={0}
            onClick={() => router.push(`/work/${project.slug}`)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                router.push(`/work/${project.slug}`)
              }
            }}
          >
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              background: segment.gradientSubtle,
              minHeight: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            >
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
                  }}
                />
              ) : (
                <div
                  className="work-thumb"
                  style={{
                    color: segment.accentColor,
                    opacity: 0.5,
                  }}
                >
                  {SEGMENT_ICONS[project.primarySegment]}
                </div>
              )}
            </div>

            <div style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
            >
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
                }}
                >
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
                }}
                >
                  {project.title}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: '#9b9b9b',
                  lineHeight: 1.4,
                  marginBottom: '10px',
                }}
                >
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
                stroke="var(--color-meta)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
                aria-hidden
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        )
      })}
    </div>
  )
}
