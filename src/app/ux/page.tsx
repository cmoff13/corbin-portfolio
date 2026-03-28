'use client'

import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'
import ContactCta from '@/components/ContactCta'
import HeroBlob from '@/components/HeroBlob'

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
    <main className="segment-page" style={{ cursor: 'none' }}>

      {/* Hero */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#F7F5F0',
        paddingTop: '72px',
        paddingBottom: '72px',
        marginLeft: 'clamp(-120px, -6vw, -24px)',
        marginRight: 'clamp(-120px, -6vw, -24px)',
        paddingLeft: 'clamp(24px, 6vw, 120px)',
        paddingRight: 'clamp(24px, 6vw, 120px)',
        marginBottom: '48px',
      }}>
        <HeroBlob color={segment.accentColor} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#bbb',
            marginBottom: '20px',
          }}>
            UX &amp; product
          </p>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(40px, 5.5vw, 72px)',
            fontWeight: 300,
            letterSpacing: '-0.05em',
            lineHeight: 1.0,
            color: '#1a1a1a',
            marginBottom: '24px',
          }}>
            {segment.headline[0]}<br />{segment.headline[1]}
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '17px',
            fontWeight: 400,
            color: '#1a1a1a',
            marginBottom: '6px',
            maxWidth: '520px',
          }}>
            Good UX is invisible.
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            fontWeight: 300,
            color: '#999',
            lineHeight: 1.75,
            maxWidth: '520px',
          }}>
            The user never notices the decision hierarchy, the cognitive load trade-offs, or the three flows that got cut before the one that shipped.
          </p>
        </div>
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

      <div style={{
        borderTop: '1px solid #f0f0f0',
        paddingTop: '48px',
        marginTop: '48px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          color: '#999',
        }}>
          More UX work in progress — including a speculative redesign currently underway.
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