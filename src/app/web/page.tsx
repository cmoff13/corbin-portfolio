'use client'

import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'

const segment = SEGMENTS.web
const projects = CASE_STUDIES.filter(c => c.primarySegment === 'web' || c.alsoIn?.includes('web'))

export default function WebSegment() {
  const router = useRouter()
  return (
    <main className="segment-page">
      <p className="segment-eyebrow" style={{ color: segment.accentColor }}>Web & digital</p>
      <h1 className="segment-headline">{segment.headline[0]}<br />{segment.headline[1]}</h1>
      <p className="segment-intro">{segment.intro}</p>

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
                    style={{ color: segment.accentColor, background: '#e8f5f0' }}
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