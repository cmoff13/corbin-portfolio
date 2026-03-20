'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { CASE_STUDIES, SEGMENTS } from '@/lib/segments'

export default function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const project = CASE_STUDIES.find(c => c.slug === slug)

  if (!project) {
    return (
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 32px' }}>
        <p style={{ color: '#999' }}>Project not found.</p>
        <button onClick={() => router.back()} style={{ marginTop: '16px', fontSize: '14px', color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Back
        </button>
      </main>
    )
  }

  const segment = SEGMENTS[project.primarySegment]

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 32px' }}>

      <button
        onClick={() => router.back()}
        style={{ fontSize: '13px', color: '#999', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        ← Back
      </button>

      <div style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: segment.accentColor,
              background: project.primarySegment === 'web' ? '#e8f5f0' : project.primarySegment === 'brand' ? '#faece7' : '#eeedfe',
              padding: '3px 8px',
              borderRadius: '4px',
            }}>
              {tag}
            </span>
          ))}
        </div>

        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          {project.title}
        </h1>

        <p style={{ fontSize: '18px', color: '#777', lineHeight: 1.5, marginBottom: '48px' }}>
          {project.subtitle}
        </p>

        <div style={{ width: '100%', aspectRatio: '16/9', background: '#f2f2f2', borderRadius: '12px', marginBottom: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '13px', color: '#bbb', letterSpacing: '0.05em' }}>PROJECT IMAGES GO HERE</span>
        </div>
      </div>

      <div className="case-study-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', marginBottom: '64px' }}>
        {[
          { label: 'Challenge', content: 'Describe the core problem this project was solving. What was broken, missing, or unclear before you got involved?' },
          { label: 'Solution', content: 'Explain your approach — the key decisions you made, why you made them, and how they addressed the problem.' },
          { label: 'Result', content: 'What changed after? Quantify where possible. If no hard metrics exist, describe the qualitative outcome.' },
        ].map(section => (
          <div key={section.label} style={{ padding: '32px', background: '#fafafa', borderRadius: '12px' }}>
            <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: segment.accentColor, marginBottom: '12px' }}>
              {section.label}
            </p>
            <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, fontStyle: 'italic' }}>
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => router.push(`/${project.primarySegment}`)}
          style={{ fontSize: '14px', color: segment.accentColor, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← Back to {segment.label}
        </button>
        <p style={{ fontSize: '13px', color: '#bbb' }}>
          More projects coming
        </p>
      </div>

    </main>
  )
}