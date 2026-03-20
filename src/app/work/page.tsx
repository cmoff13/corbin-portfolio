'use client'

import { useRouter } from 'next/navigation'
import { CASE_STUDIES, SEGMENTS } from '@/lib/segments'

export default function WorkPage() {
  const router = useRouter()

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 32px' }}>

      <div style={{ marginBottom: '64px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          All work
        </h1>
        <p style={{ fontSize: '17px', color: '#555', lineHeight: 1.7, maxWidth: '480px' }}>
          Everything across brand, web, and product — unfiltered.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '2px' }}>
        {CASE_STUDIES.map((project) => {
          const segment = SEGMENTS[project.primarySegment]
          return (
            <div
              key={project.slug}
              onClick={() => router.push(`/work/${project.slug}`)}
              style={{
                padding: '32px',
                background: '#fafafa',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
                gap: '24px',
                marginBottom: '2px',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f0f0f0')}
              onMouseLeave={e => (e.currentTarget.style.background = '#fafafa')}
            >
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: segment.accentColor,
                    background: project.primarySegment === 'web' ? '#e8f5f0' : project.primarySegment === 'brand' ? '#faece7' : '#eeedfe',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}>
                    {segment.label}
                  </span>
                  {project.tags.slice(0, 2).map(tag => (
                    <span key={tag} style={{ fontSize: '12px', color: '#bbb' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 500, marginBottom: '6px', color: '#0f0f0f' }}>
                  {project.title}
                </h2>
                <p style={{ fontSize: '15px', color: '#777', lineHeight: 1.5 }}>
                  {project.subtitle}
                </p>
              </div>
              <span style={{ fontSize: '24px', color: '#ccc' }}>→</span>
            </div>
          )
        })}
      </div>

    </main>
  )
}