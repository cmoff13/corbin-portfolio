'use client'

import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'
import ContactCta from '@/components/ContactCta'

const segment = SEGMENTS.ux
const projects = CASE_STUDIES.filter(c =>
  (c.primarySegment === 'ux' || c.alsoIn?.includes('ux')) && !c.hidden
)

const THUMBNAILS: Record<string, string> = {
  'black-coast-estates': '/images/black-coast/thumbnail.jpg',
}

export default function UXSegment() {
  const router = useRouter()

  return (
    <main className="segment-page">

      <div className="segment-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={segment.accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
          <p className="segment-eyebrow" style={{ color: segment.accentColor }}>UX & product</p>
        </div>
        <h1 className="segment-headline">{segment.headline[0]}<br />{segment.headline[1]}</h1>
        <p className="segment-intro">{segment.intro}</p>
      </div>

      <div
        className="ux-callout"
        style={{ background: '#EFF6FF', borderColor: segment.accentColor }}
      >
        <p className="ux-callout-title" style={{ color: segment.accentColor }}>
          How I approach product work
        </p>
        <p className="ux-callout-text">
          I start with the problem, not the interface. That means understanding user goals, mapping flows before pixels, and making decisions I can explain. Brand craft informs the output — systems thinking drives the process.
        </p>
      </div>

      <div className="project-list" style={{ gap: '16px' }}>
        {projects.map(project => {
          const thumbnail = THUMBNAILS[project.slug]
          return (
            <div
              key={project.slug}
              className="project-card"
              onClick={() => router.push(`/work/${project.slug}`)}
              style={{
                padding: 0,
                overflow: 'hidden',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                cursor: 'pointer',
                display: 'grid',
                gridTemplateColumns: 'minmax(180px, min(40vw, 300px)) 1fr',
                alignItems: 'center',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                const img = e.currentTarget.querySelector('.card-img') as HTMLElement
                if (img) img.style.transform = 'scale(1.04)'
                const overlay = e.currentTarget.querySelector('.card-overlay-card') as HTMLElement
                if (overlay) overlay.style.opacity = '1'
                const cursor = e.currentTarget.querySelector('.card-cursor') as HTMLElement
                if (cursor) cursor.style.opacity = '1'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
                const img = e.currentTarget.querySelector('.card-img') as HTMLElement
                if (img) img.style.transform = 'scale(1)'
                const overlay = e.currentTarget.querySelector('.card-overlay-card') as HTMLElement
                if (overlay) overlay.style.opacity = '0'
                const cursor = e.currentTarget.querySelector('.card-cursor') as HTMLElement
                if (cursor) cursor.style.opacity = '0'
              }}
              onMouseMove={e => {
                const cursor = e.currentTarget.querySelector('.card-cursor') as HTMLElement
                if (!cursor) return
                const rect = e.currentTarget.getBoundingClientRect()
                cursor.style.left = `${e.clientX - rect.left}px`
                cursor.style.top = `${e.clientY - rect.top}px`
              }}
            >
              <div className="card-cursor" style={{
                position: 'absolute',
                pointerEvents: 'none',
                zIndex: 20,
                opacity: 0,
                transform: 'translate(-50%, -50%)',
                transition: 'opacity 0.2s ease',
                background: '#1a1a1a',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.02em',
                padding: '9px 16px',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}>
                View project →
              </div>

              <div style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                aspectRatio: '16 / 10',
                flexShrink: 0,
              }}
              >
                {thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumbnail}
                    alt={project.title}
                    loading="lazy"
                    className="card-img"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  />
                ) : (
                  <div
                    className="card-img"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--color-surface)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-meta)' }}>
                      {project.title}
                    </span>
                  </div>
                )}
                <div
                  className="card-overlay-card"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `${segment.accentColor}18`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                <div className="project-title">{project.title}</div>
                <div className="project-subtitle" style={{ marginBottom: '12px' }}>
                  {project.subtitle}
                </div>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="project-tag"
                      style={{ color: segment.accentColor, background: '#EFF6FF' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div
        className="ux-callout ux-callout-delayed"
        style={{ background: '#EFF6FF', borderColor: segment.accentColor, marginTop: '48px' }}
      >
        <p className="ux-callout-title" style={{ color: segment.accentColor }}>
          This segment is growing
        </p>
        <p className="ux-callout-text">
          UX work informed by seven years of design craft. More projects coming — including a speculative redesign currently in progress.
        </p>
      </div>

      <div style={{
        marginTop: '64px',
        paddingTop: '40px',
        borderTop: '1px solid var(--color-hairline)',
      }}>
        <ContactCta variant="full" accentColor={segment.accentColor} />
      </div>

    </main>
  )
}