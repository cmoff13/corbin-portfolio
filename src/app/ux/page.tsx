'use client'

import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'

const segment = SEGMENTS.ux
const projects = CASE_STUDIES.filter(c => c.primarySegment === 'ux' || c.alsoIn?.includes('ux'))

export default function UXSegment() {
  const router = useRouter()
  return (
    <main className="segment-page">
      <p className="segment-eyebrow" style={{ color: segment.accentColor }}>UX & product</p>
      <h1 className="segment-headline">{segment.headline[0]}<br />{segment.headline[1]}</h1>
      <p className="segment-intro">{segment.intro}</p>

      <div
        className="ux-callout"
        style={{ background: '#f7f6ff', borderColor: segment.accentColor }}
      >
        <p className="ux-callout-title" style={{ color: segment.accentColor }}>
          How I approach product work
        </p>
        <p className="ux-callout-text">
          I start with the problem, not the interface. That means understanding user goals, mapping flows before pixels, and making decisions I can explain. Brand craft informs the output — systems thinking drives the process.
        </p>
      </div>

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
                    style={{ color: segment.accentColor, background: '#eeedfe' }}
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

      <div
        className="ux-callout"
        style={{ background: '#f7f6ff', borderColor: segment.accentColor, marginTop: '48px' }}
      >
        <p className="ux-callout-title" style={{ color: segment.accentColor }}>
          This segment is growing
        </p>
        <p className="ux-callout-text">
          UX work informed by seven years of design craft. More projects coming — including a speculative redesign currently in progress.
        </p>
      </div>
    </main>
  )
}