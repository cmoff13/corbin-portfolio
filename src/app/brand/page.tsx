'use client'

import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'

const segment = SEGMENTS.brand
const projects = CASE_STUDIES.filter(c => c.primarySegment === 'brand' || c.alsoIn?.includes('brand'))

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
  const router = useRouter()
  return (
    <main className="segment-page">
      <p className="segment-eyebrow" style={{ color: segment.accentColor }}>Brand identity</p>
      <h1 className="segment-headline">{segment.headline[0]}<br />{segment.headline[1]}</h1>
      <p className="segment-intro">{segment.intro}</p>

      <p className="craft-section-label">Craft archive — hover any piece</p>
      <div className="craft-grid">
        {CRAFT_ITEMS.map((item, i) => (
          <div
            key={i}
            className="craft-cell"
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
      <div className="project-list">
        {projects.map(project => (
          <div
            key={project.slug}
            className="project-card"
            onClick={() => router.push(`/work/${project.slug}`)}
          >
            <div>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="project-tag"
                    style={{ color: segment.accentColor, background: '#faece7' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-title">{project.title}</div>
              <div className="project-subtitle">{project.subtitle}</div>
            </div>
            <span className="project-arrow">→</span>
          </div>
        ))}
      </div>
    </main>
  )
}