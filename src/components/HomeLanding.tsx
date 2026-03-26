'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CASE_STUDIES, SEGMENTS, GATE_COPY, ABOUT_COPY } from '@/lib/segments'
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

export default function HomeLanding() {
  const router = useRouter()
  const visibleProjects = CASE_STUDIES.filter(p => !p.hidden)
  const headlineParts = GATE_COPY.headline.split('\n')
  const headlineA = headlineParts[0] ?? ''
  const headlineB = headlineParts.slice(1).join('\n')

  return (
    <main className="home-landing">
      <header className="home-top-bar">
        <Link href="/" className="home-top-logo">
          Corbin Moffitt
        </Link>
        <nav className="home-top-nav" aria-label="Site">
          <button
            type="button"
            className="home-top-link"
            onClick={() => router.push('/work')}
          >
            All work
          </button>
          <Link href="/gate" className="home-top-link home-top-link-subtle">
            Lane picker
          </Link>
        </nav>
      </header>

      <section className="home-hero" aria-labelledby="home-heading">
        <p className="home-hero-eyebrow">
          {GATE_COPY.eyebrow}
        </p>
        <h1 id="home-heading" className="home-hero-title">
          <span className="home-hero-title-strong">{headlineA}</span>
          {headlineB ? (
            <>
              <br />
              <span className="home-hero-title-soft">{headlineB}</span>
            </>
          ) : null}
        </h1>
        <p className="home-hero-lede">
          Case studies first — then deeper lanes by discipline. Want the full-screen picker? It’s still one click away.
        </p>
        <p className="home-hero-bio">
          {ABOUT_COPY.bio}
        </p>
      </section>

      <div className="home-section-head">
        <span className="home-section-rule" aria-hidden />
        <h2 className="home-section-label">Browse by discipline</h2>
      </div>
      <div className="home-seg-row">
        {Object.values(SEGMENTS).map(seg => (
          <button
            key={seg.id}
            type="button"
            className="home-seg-chip"
            onClick={() => router.push(`/${seg.id}`)}
          >
            <span
              className="home-seg-chip-icon"
              style={{
                background: seg.gradientSubtle,
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

      <div className="home-section-head home-section-head-spaced">
        <span className="home-section-rule" aria-hidden />
        <h2 className="home-section-label">Selected work</h2>
      </div>
      <WorkProjectStack projects={visibleProjects} />

      <div style={{
        marginTop: '28px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px 24px',
        alignItems: 'center',
      }}>
        <button
          type="button"
          onClick={() => router.push('/work')}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-ink)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            borderBottom: '1px solid rgba(0,0,0,0.15)',
          }}
        >
          {GATE_COPY.skipLabel.replace('→', '').trim()}
          <span aria-hidden="true"> →</span>
        </button>
        <Link
          href="/gate"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: 'var(--color-muted)',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
          }}
        >
          Open lane picker (original gate)
        </Link>
      </div>

      <div style={{
        marginTop: '64px',
        paddingTop: '40px',
        borderTop: '1px solid var(--color-hairline)',
      }}>
        <ContactCta variant="full" accentColor="#1a1a1a" />
      </div>
    </main>
  )
}
