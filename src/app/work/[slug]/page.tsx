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
      <main className="segment-page">
        <p style={{ color: '#999' }}>Project not found.</p>
        <button onClick={() => router.back()} style={{ marginTop: '16px', fontSize: '14px', color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Back
        </button>
      </main>
    )
  }

  const segment = SEGMENTS[project.primarySegment]
  const tagBg = project.primarySegment === 'web' ? '#e8f5f0' : project.primarySegment === 'brand' ? '#faece7' : '#eeedfe'

  return (
    <main className="segment-page">
      <button
        onClick={() => router.back()}
        style={{ fontSize: '13px', color: '#999', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        ← Back
      </button>

      <div className="project-tags" style={{ marginBottom: '16px' }}>
        {project.tags.map(tag => (
          <span key={tag} className="project-tag" style={{ color: segment.accentColor, background: tagBg }}>
            {tag}
          </span>
        ))}
      </div>

      <h1 style={{ fontFamily: 'inherit', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '12px', color: '#1a1a1a' }}>
        {project.title}
      </h1>

      <p style={{ fontSize: '17px', color: '#9b9b9b', lineHeight: 1.5, marginBottom: '48px' }}>
        {project.subtitle}
      </p>

      <div style={{ width: '100%', aspectRatio: '16/9', background: '#f7f7f5', borderRadius: '8px', marginBottom: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ebebе8' }}>
        <span style={{ fontSize: '12px', color: '#ccc', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>Project images go here</span>
      </div>

      <div className="case-study-cols">
        {[
          { label: 'Challenge', content: 'Describe the core problem this project was solving. What was broken, missing, or unclear before you got involved?' },
          { label: 'Solution', content: 'Explain your approach — the key decisions you made, why you made them, and how they addressed the problem.' },
          { label: 'Result', content: 'What changed after? Quantify where possible. If no hard metrics exist, describe the qualitative outcome.' },
        ].map(s => (
          <div key={s.label} className="case-col">
            <p className="case-col-label" style={{ color: segment.accentColor }}>{s.label}</p>
            <p className="case-col-text">{s.content}</p>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => router.push(`/${project.primarySegment}`)}
          style={{ fontSize: '13px', color: segment.accentColor, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← Back to {segment.label}
        </button>
        <p style={{ fontSize: '12px', color: '#ccc' }}>More projects coming</p>
      </div>
    </main>
  )
}