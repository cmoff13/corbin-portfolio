'use client'

import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'

const segment = SEGMENTS.brand
const projects = CASE_STUDIES.filter(c => c.primarySegment === 'brand' || c.alsoIn?.includes('brand'))

export default function BrandSegment() {
  const router = useRouter()

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 32px' }}>

      <div style={{ marginBottom: '64px' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: segment.accentColor, marginBottom: '16px' }}>
          Brand identity
        </p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, lineHeight: 1.15, marginBottom: '24px', letterSpacing: '-0.02em' }}>
          {segment.headline[0]}<br />{segment.headline[1]}
        </h1>
        <p style={{ fontSize: '17px', color: '#555', lineHeight: 1.7, maxWidth: '580px' }}>
          {segment.intro}
        </p>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: '24px' }}>
          Craft archive — hover any piece
        </p>
        <div className="craft-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
          {[
            { tag: 'Logomark / Geometric', name: 'Geometric mark series', detail: 'Marks constructed on strict geometric grids. Proportion-locked, scalable to any size.' },
            { tag: 'Type system', name: 'Brand type hierarchies', detail: 'Display, body, and mono pairings with usage rules across print and digital.' },
            { tag: 'Icon system', name: 'UI icon sets', detail: 'Consistent stroke-weight icon systems built for scalability across web and product.' },
            { tag: 'Color system', name: 'Brand palettes', detail: 'Multi-ramp color systems mapped to semantic roles across primary, accent, and neutral.' },
            { tag: 'Logomark / Organic', name: 'Organic mark series', detail: 'Continuous path marks and fluid forms communicating warmth and approachability.' },
            { tag: 'Vector illustration', name: 'Editorial illustration', detail: 'Flat vector style. Limited palette, clean shapes, built for editorial and brand use.' },
            { tag: 'Lettermark', name: 'Monogram series', detail: 'Single-stroke letterform explorations. Each mark constrained to one continuous path.' },
            { tag: 'Brand guidelines', name: 'Guidelines & systems', detail: 'Full brand documentation covering voice, visual rules, and usage across touchpoints.' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                background: i % 2 === 0 ? '#0f0f0f' : '#f2ede6',
                borderRadius: '2px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement
                if (overlay) overlay.style.opacity = '1'
              }}
              onMouseLeave={e => {
                const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement
                if (overlay) overlay.style.opacity = '0'
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 500, color: i % 2 === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)', textAlign: 'center', letterSpacing: '0.05em' }}>
                  {item.tag.split(' / ')[0].toUpperCase()}
                </span>
              </div>
              <div
                className="overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(15,15,15,0.92)',
                  opacity: 0,
                  transition: 'opacity 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '16px',
                }}
              >
                <span style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '5px' }}>
                  {item.tag}
                </span>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: '#fff', lineHeight: 1.25, marginBottom: '6px' }}>
                  {item.name}
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                  {item.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gap: '2px' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#aaa', marginBottom: '24px' }}>
          Selected projects
        </p>
        {projects.map((project) => (
          <div
            key={project.slug}
            onClick={() => router.push(`/work/${project.slug}`)}
            style={{
              padding: '32px',
              background: '#fafafa',
              borderRadius: '12px',
              cursor: 'pointer',
              marginBottom: '2px',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f0f0f0')}
            onMouseLeave={e => (e.currentTarget.style.background = '#fafafa')}
          >
            <div className="project-card-inner" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '24px' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: '11px',
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: segment.accentColor,
                      background: '#faece7',
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 500, marginBottom: '6px' }}>
                  {project.title}
                </h2>
                <p style={{ fontSize: '15px', color: '#777', lineHeight: 1.5 }}>
                  {project.subtitle}
                </p>
              </div>
              <span className="project-card-arrow" style={{ fontSize: '24px', color: '#ccc' }}>→</span>
            </div>
          </div>
        ))}
      </div>

    </main>
  )
}