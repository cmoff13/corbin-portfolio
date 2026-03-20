'use client'

import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'

const segment = SEGMENTS.web
const projects = CASE_STUDIES.filter(c => c.primarySegment === 'web' || c.alsoIn?.includes('web'))

export default function WebSegment() {
  const router = useRouter()

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 32px' }}>

      <div style={{ marginBottom: '64px' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: segment.accentColor, marginBottom: '16px' }}>
          Web & digital
        </p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, lineHeight: 1.15, marginBottom: '24px', letterSpacing: '-0.02em' }}>
          {segment.headline[0]}<br />{segment.headline[1]}
        </h1>
        <p style={{ fontSize: '17px', color: '#555', lineHeight: 1.7, maxWidth: '580px' }}>
          {segment.intro}
        </p>
      </div>

      <div style={{ display: 'grid', gap: '2px' }}>
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
                      background: '#e8f5f0',
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