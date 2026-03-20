'use client'

import { useRouter } from 'next/navigation'
import { CASE_STUDIES, SEGMENTS } from '@/lib/segments'

export default function WorkPage() {
  const router = useRouter()
  return (
    <main className="work-page">
      <h1 className="work-headline">All work</h1>
      <p className="work-intro">Everything across brand, web, and product — unfiltered.</p>

      <div className="project-list">
        {CASE_STUDIES.map(project => {
          const segment = SEGMENTS[project.primarySegment]
          const tagBg = project.primarySegment === 'web' ? '#e8f5f0' : project.primarySegment === 'brand' ? '#faece7' : '#eeedfe'
          return (
            <div
              key={project.slug}
              className="project-card"
              onClick={() => router.push(`/work/${project.slug}`)}
            >
              <div>
                <div className="project-tags">
                  <span
                    className="project-tag"
                    style={{ color: segment.accentColor, background: tagBg }}
                  >
                    {segment.label}
                  </span>
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} style={{ fontSize: '12px', color: '#bbb' }}>{tag}</span>
                  ))}
                </div>
                <div className="project-title">{project.title}</div>
                <div className="project-subtitle">{project.subtitle}</div>
              </div>
              <span className="project-arrow">→</span>
            </div>
          )
        })}
      </div>
    </main>
  )
}