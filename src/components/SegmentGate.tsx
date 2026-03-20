'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SegmentGate() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('segment')
  }, [])

  function choose(id: string) {
    localStorage.setItem('segment', id)
    router.push(`/${id}`)
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '48px 24px' }}>
      <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888' }}>
        Corbin Moffitt — Designer
      </p>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 400, textAlign: 'center', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
        Seven years of design.<br />Three ways to see it.
      </h1>
      <p style={{ fontSize: '16px', color: '#666', maxWidth: '400px', textAlign: 'center', lineHeight: 1.6 }}>
        Pick the work that's relevant to you. Everything else stays out of the way.
      </p>
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => choose('brand')} style={{ padding: '16px 20px', border: '1px solid #e5e5e5', borderRadius: '12px', background: '#fff', cursor: 'pointer', minWidth: '160px', textAlign: 'left', transition: 'border-color 0.2s' }}>
          <div style={{ fontWeight: 500, marginBottom: '4px', color: '#0f0f0f' }}>Brand identity</div>
          <div style={{ fontSize: '12px', color: '#999' }}>Logos, systems, craft</div>
        </button>
        <button onClick={() => choose('web')} style={{ padding: '16px 20px', border: '1px solid #e5e5e5', borderRadius: '12px', background: '#fff', cursor: 'pointer', minWidth: '160px', textAlign: 'left', transition: 'border-color 0.2s' }}>
          <div style={{ fontWeight: 500, marginBottom: '4px', color: '#0f0f0f' }}>Web & digital</div>
          <div style={{ fontSize: '12px', color: '#999' }}>Pages, CRO, performance</div>
        </button>
        <button onClick={() => choose('ux')} style={{ padding: '16px 20px', border: '1px solid #e5e5e5', borderRadius: '12px', background: '#fff', cursor: 'pointer', minWidth: '160px', textAlign: 'left', transition: 'border-color 0.2s' }}>
          <div style={{ fontWeight: 500, marginBottom: '4px', color: '#0f0f0f' }}>UX & product</div>
          <div style={{ fontSize: '12px', color: '#999' }}>Flows, IA, interaction</div>
        </button>
      </div>
      <button onClick={() => router.push('/work')} style={{ marginTop: '8px', fontSize: '13px', color: '#aaa', background: 'none', border: 'none', cursor: 'pointer' }}>
        See everything →
      </button>
    </main>
  )
}