'use client'

import { useRouter } from 'next/navigation'
import { SEGMENTS, CASE_STUDIES } from '@/lib/segments'

const segment = SEGMENTS.ux
const projects = CASE_STUDIES.filter(c => c.primarySegment === 'ux' || c.alsoIn?.includes('ux'))

export default function UXSegment() {
  const router = useRouter()

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 32px' }}>

      <div style={{ marginBottom: '64px' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: segment.accentColor, marginBottom: '16px' }}>
          UX & product
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
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: segment.accentColor,
                    background: '#eeedfe',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
              <span style={{ fontSize: '24px', color: '#ccc' }}>→</span>
              {project.slug === 'portfolio-nav-system' && (
                <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: segment.accentColor, background: '#eeedfe', padding: '3px 8px', borderRadius: '4px' }}>
                  Self-initiated
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '64px', padding: '32px', background: '#f7f6ff', borderRadius: '12px', borderLeft: '3px solid #534AB7' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, color: '#534AB7', marginBottom: '8px' }}>
          This segment is growing
        </p>
        <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.7 }}>
          UX work informed by seven years of design craft. More projects coming — including a speculative redesign currently in progress.
        </p>
      </div>

    </main>
  )
}