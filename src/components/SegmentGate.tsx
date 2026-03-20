'use client'

import { useRouter } from 'next/navigation'

export default function SegmentGate() {
  const router = useRouter()

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <p style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888' }}>Corbin Moffitt — Designer</p>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '48px', fontWeight: 400, textAlign: 'center', lineHeight: 1.2 }}>Seven years of design.<br />Three ways to see it.</h1>
      <p style={{ fontSize: '16px', color: '#666', maxWidth: '400px', textAlign: 'center' }}>Pick the work that's relevant to you. Everything else stays out of the way.</p>
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button onClick={() => router.push('/brand')} style={{ padding: '16px 20px', border: '1px solid #e5e5e5', borderRadius: '12px', background: '#fff', cursor: 'pointer', minWidth: '160px', textAlign: 'left' }}>
          <div style={{ fontWeight: 500, marginBottom: '4px' }}>Brand identity</div>
          <div style={{ fontSize: '12px', color: '#999' }}>Logos, systems, craft</div>
        </button>
        <button onClick={() => router.push('/web')} style={{ padding: '16px 20px', border: '1px solid #e5e5e5', borderRadius: '12px', background: '#fff', cursor: 'pointer', minWidth: '160px', textAlign: 'left' }}>
          <div style={{ fontWeight: 500, marginBottom: '4px' }}>Web & digital</div>
          <div style={{ fontSize: '12px', color: '#999' }}>Pages, CRO, performance</div>
        </button>
        <button onClick={() => router.push('/ux')} style={{ padding: '16px 20px', border: '1px solid #e5e5e5', borderRadius: '12px', background: '#fff', cursor: 'pointer', minWidth: '160px', textAlign: 'left' }}>
          <div style={{ fontWeight: 500, marginBottom: '4px' }}>UX & product</div>
          <div style={{ fontSize: '12px', color: '#999' }}>Flows, IA, interaction</div>
        </button>
      </div>
      <button onClick={() => router.push('/work')} style={{ marginTop: '8px', fontSize: '13px', color: '#aaa', background: 'none', border: 'none', cursor: 'pointer' }}>See everything →</button>
    </main>
  )
}