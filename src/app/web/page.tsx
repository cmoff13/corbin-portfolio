'use client'

import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'

const segment = SEGMENTS.web
const projects = CASE_STUDIES.filter(c => c.primarySegment === 'web' || c.alsoIn?.includes('web'))

const THUMBNAILS: Record<string, string> = {}

export default function WebSegment() {
  const router = useRouter()

  return (
    <main className="segment-page">

      <div className="segment-header" style={{ background: segment.gradientSubtle }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={segment.accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 3l14 9-14 9V3z"/>
          </svg>
          <p className="segment-eyebrow" style={{ color: segment.accentColor }}>Web & digital</p>
        </div>
        <h1 className="segment-headline">{segment.headline[0]}<br />{segment.headline[1]}</h1>
        <p className="segment-intro">{segment.intro}</p>
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
                cursor: 'none',
                display: 'grid',
                gridTemplateColumns: '250px 1fr',
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

              <div style={{ position: 'relative', overflow: 'hidden', width: '250px', height: '250px', flexShrink: 0 }}>
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={project.title}
                    loading="lazy"
                    className="card-img"
                    style={{
                      width: '250px',
                      height: '250px',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  />
                ) : (
                  <div
                    className="card-img"
                    style={{
                      width: '250px',
                      height: '250px',
                      background: '#f7f7f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  >
                    <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ccc' }}>
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
                <div className="project-subtitle" style={{ marginBottom: '12px' }}>{project.subtitle}</div>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="project-tag"
                      style={{ color: segment.accentColor, background: '#FEF0EE' }}
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

    </main>
  )
}