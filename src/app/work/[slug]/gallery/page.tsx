'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { CASE_STUDIES } from '@/lib/segments'

export default function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const project = CASE_STUDIES.find(c => c.slug === slug)

  if (!project) return null

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F0F2F5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 16,
      cursor: 'none',
    }}>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 10,
        color: '#bbb',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}>
        Gallery — coming soon
      </div>
      <div style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 32,
        fontWeight: 300,
        color: '#1a1a1a',
        letterSpacing: '-0.03em',
      }}>
        {project.title}
      </div>
      <button
        onClick={() => router.push('/brand')}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: '#3B0764',
          background: 'none',
          border: 'none',
          cursor: 'none',
          marginTop: 8,
        }}
      >
        ← Back to Brand
      </button>
    </div>
  )
}
