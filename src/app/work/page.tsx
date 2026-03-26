'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CASE_STUDIES, SEGMENTS } from '@/lib/segments'
import ContactCta from '@/components/ContactCta'
import WorkProjectStack from '@/components/WorkProjectStack'

const SEGMENT_ICONS: Record<string, React.ReactNode> = {
  brand: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20"/><path d="m7 17 2-6 3 4 2-3 3 5"/><path d="M4 3h16v10H4z"/>
    </svg>
  ),
  web: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3l14 9-14 9V3z"/>
    </svg>
  ),
  ux: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
}

export default function WorkPage() {
  const router = useRouter()
  const visibleProjects = CASE_STUDIES.filter(p => !p.hidden)

  return (
    <main className="work-page">

      <div className="work-hero" style={{ marginBottom: '56px' }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
          color: '#ccc',
          marginBottom: '12px',
        }}>
          All work
        </p>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(32px, 4vw, 48px)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: '#1a1a1a',
          marginBottom: '16px',
        }}>
          Everything, unfiltered.
        </h1>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '15px',
          color: '#9b9b9b',
          lineHeight: 1.6,
          maxWidth: '480px',
        }}>
          All projects across brand identity, web and digital, and UX — in one place. Use the segment switcher above to filter by discipline.
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          color: '#b3b3b3',
          lineHeight: 1.55,
          maxWidth: '480px',
          marginTop: '14px',
        }}>
          <Link
            href="/"
            style={{ color: '#767676', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
          >
            Home
          </Link>
          {' '}has the full overview. Prefer the animated picker?{' '}
          <Link
            href="/gate"
            style={{ color: '#767676', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
          >
            Lane picker
          </Link>
          .
        </p>
      </div>

      <div
        className="work-seg-legend"
        style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '40px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--color-hairline)',
          flexWrap: 'wrap',
        }}
      >
        {Object.values(SEGMENTS).map(seg => (
          <button
            key={seg.id}
            type="button"
            onClick={() => router.push(`/${seg.id}`)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              color: seg.accentColor,
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <span style={{
              width: '20px',
              height: '20px',
              borderRadius: '5px',
              background: seg.gradientSubtle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: seg.accentColor,
              border: `1px solid ${seg.accentColor}22`,
            }}
            >
              {SEGMENT_ICONS[seg.id]}
            </span>
            {seg.label}
          </button>
        ))}
      </div>

      <WorkProjectStack projects={visibleProjects} />

      <div style={{
        marginTop: '64px',
        paddingTop: '40px',
        borderTop: '1px solid var(--color-hairline)',
      }}>
        <ContactCta variant="full" accentColor="#1a1a1a" />
      </div>

      <div style={{
        marginTop: '32px',
        paddingTop: '32px',
        borderTop: '1px solid var(--color-hairline)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <button
          type="button"
          onClick={() => router.push('/')}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: '#999',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#1a1a1a')}
          onMouseLeave={e => (e.currentTarget.style.color = '#999')}
        >
          ← Home
        </button>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          color: '#ccc',
        }}>
          More projects coming
        </p>
      </div>

    </main>
  )
}
