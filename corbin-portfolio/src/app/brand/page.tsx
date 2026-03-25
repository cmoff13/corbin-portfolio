'use client'

import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'

const segment = SEGMENTS.brand
const projects = CASE_STUDIES.filter(c => c.primarySegment === 'brand' || c.alsoIn?.includes('brand'))

const THUMBNAILS: Record<string, string> = {}

const CRAFT_ITEMS = [
  { tag: 'Logomark / Geometric', name: 'Geometric mark series', detail: 'Marks constructed on strict geometric grids. Proportion-locked, scalable to any size.' },
  { tag: 'Type system', name: 'Brand type hierarchies', detail: 'Display, body, and mono pairings with usage rules across print and digital.' },
  { tag: 'Icon system', name: 'UI icon sets', detail: 'Consistent stroke-weight icon systems built for scalability across web and product.' },
  { tag: 'Color system', name: 'Brand palettes', detail: 'Multi-ramp systems mapped to semantic roles across primary, accent, and neutral.' },
  { tag: 'Logomark / Organic', name: 'Organic mark series', detail: 'Continuous path marks communicating warmth and approachability.' },
  { tag: 'Vector illustration', name: 'Editorial illustration', detail: 'Flat vector style. Limited palette, clean shapes, built for editorial and brand use.' },
  { tag: 'Lettermark', name: 'Monogram series', detail: 'Single-stroke letterform explorations. Each mark constrained to one continuous path.' },
  { tag: 'Brand guidelines', name: 'Guidelines & systems', detail: 'Full brand documentation covering voice, visual rules, and usage across touchpoints.' },
]

export default function BrandSegment() {
  return (
    <main className="segment-page">

      <div className="segment-header" style={{ background: segment.gradientSubtle }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={segment.accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 20h20"/><path d="m7 17 2-6 3 4 2-3 3 5"/><path d="M4 3h16v10H4z"/>
          </svg>
          <p className="segment-eyebrow" style={{ color: segment.accentColor }}>Brand identity</p>
        </div>
        <h1 className="segment-headline">{segment.headline[0]}<br />{segment.headline[1]}</h1>
        <p className="segment-intro">{segment.intro}</p>
      </div>

      <p className="craft-section-label">Craft archive — hover any piece</p>
      <div className="craft-grid">
        {CRAFT_ITEMS.map((item, i) => (
          <div
            key={i}
            className="craft-cell"
            tabIndex={0}
            style={{ background: i % 2 === 0 ? '#0f0f0f' : '#f2ede6' }}
          >
            <div
              className="craft-cell-label"
              style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)' }}
            >
              {item.tag.split(' / ')[0].toUpperCase()}
            </div>
            <div className="craft-overlay">
              <div className="craft-overlay-tag">{item.tag}</div>
              <div className="craft-overlay-name">{item.name}</div>
              <div className="craft-overlay-detail">{item.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="craft-section-label">Selected projects</p>
      <div className="project-list" style={{ gap: '16px' }}>
        {projects.map(project => {
          const thumbnail = THUMBNAILS[project.slug]
          return (
            <a
              key={project.slug}
              href={`/work/${project.slug}`}
              className="project-card"
              style={{
                padding: 0,
                overflow: 'hidden',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                cursor: 'none',
                display: 'grid',
                gridTemplateColumns: '250px 1fr',
                textDecoration: 'none',
                color: 'inherit',
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

              <div style={{ position: 'relative', overflow: 'hidden', width: '100%', aspectRatio: '1/1', flexShrink: 0 }}>
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={project.title}
                    loading="lazy"
                    className="card-img"
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
                    className="card-img"
                    style={{
                      width: '100%',
                      height: '100%',
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
                      style={{ color: segment.accentColor, background: '#F3EEF8' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          )
        })}
      </div>

    </main>
  )
}