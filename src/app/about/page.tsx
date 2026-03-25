'use client'

import { useState } from 'react'
import { SEGMENTS } from '@/lib/segments'
import PreFooter from '@/components/PreFooter'

const BELIEFS = [
  {
    accent: '#3B0764',
    title: 'Strategy before pixels',
    text: 'The best design decisions happen before Figma opens. I map the problem, the audience, and the message hierarchy first. The interface is the last step, not the first.',
  },
  {
    accent: '#DC2626',
    title: 'Systems, not one-offs',
    text: 'Every deliverable is designed to scale without me. A finished page the client can\'t maintain isn\'t a delivery — it\'s a dependency.',
  },
  {
    accent: '#1D4ED8',
    title: 'Decisions you can defend',
    text: 'If I can\'t articulate why a choice was made, it was the wrong choice. I design with rationale, and I\'ll push back when the brief is pulling in the wrong direction.',
  },
  {
    accent: '#1a1a1a',
    title: 'Speed as a discipline',
    text: 'A tight timeline isn\'t an excuse for shortcuts — it\'s a constraint the process has to absorb. Front-loading strategy is how I ship in weeks what takes other designers months.',
  },
]

const TIMELINE = [
  {
    period: '2022 — Now',
    role: 'Independent Practice',
    company: 'Freelance',
    detail: 'Brand identity, conversion-focused web design, and product UX for clients across real estate investment, healthcare AI, and luxury co-ownership. Delivered every engagement ahead of schedule. Zero revision rounds on final design presentations.',
    placeholder: false,
  },
  {
    period: '2018 — 2022',
    role: 'Designer',
    company: 'Disruptive Advertising',
    detail: 'Four years producing and auditing ad creative and landing pages across dozens of DTC and ecom brands. Where performance marketing and brand craft learned to work in the same room.',
    placeholder: false,
  },
  {
    period: 'Earlier',
    role: 'Brand Designer',
    company: 'Five18 Designs + Northstar',
    detail: 'Logos for businesses being named for the first time. Type systems built from scratch. Illustration and vector work that had to hold up at every scale. This is where the eye came from.',
    placeholder: false,
  },
]

const DISCIPLINES = [
  {
    id: 'brand' as const,
    desc: 'Logos, systems, and visual languages built to last.',
    href: '/brand',
  },
  {
    id: 'web' as const,
    desc: 'Conversion-focused pages with performance built in.',
    href: '/web',
  },
  {
    id: 'ux' as const,
    desc: 'Flows and interfaces grounded in how people actually think.',
    href: '/ux',
  },
]

export default function AboutPage() {
  const [activeEntry, setActiveEntry] = useState<number | null>(null)

  return (
    <>
      <div className="about-page">

        {/* Hero */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <div className="about-badge">
            <span className="about-badge-dot" aria-hidden="true" />
            Available for work
          </div>
          <h1 className="about-headline">
            Seven years of designing<br />for the hard brief.
          </h1>
          <p className="about-intro">
            I work at the intersection of brand, web, and product — building systems that scale
            and shipping work that moves the needle. Based in Hawaii. Looking for a company where
            design has a real seat at the table, not just a seat in the room.
          </p>
        </div>

        {/* Stats */}
        <div className="about-stats">
          <div>
            <div className="about-stat-value">7</div>
            <div className="about-stat-label">Years</div>
          </div>
          <div>
            <div className="about-stat-value">3</div>
            <div className="about-stat-label">Disciplines</div>
          </div>
          <div>
            <div className="about-stat-value">20+</div>
            <div className="about-stat-label">Projects</div>
          </div>
          <div>
            <div className="about-stat-value">0</div>
            <div className="about-stat-label">Missed deadlines</div>
          </div>
        </div>

        {/* Bio + photo */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 200px',
          gap: 'var(--space-10)',
          marginBottom: 'var(--space-16)',
          alignItems: 'start',
        }}>
          <div>
            <p style={{
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--color-ink-soft)',
              marginBottom: 'var(--space-5)',
            }}>
              I started as a brand designer — building visual identities, type systems, and the
              kind of work that lives on billboards and business cards. Over seven years the
              scope expanded: performance marketing at Disruptive Advertising, conversion-focused
              web design, product UX for funded startups.
            </p>
            <p style={{
              fontSize: 'var(--text-base)',
              lineHeight: 'var(--leading-loose)',
              color: 'var(--color-ink-soft)',
            }}>
              The through-line has always been the same: design in service of a real problem,
              with a process disciplined enough to get there on time. I work best when the stakes
              are real, the brief is hard, and the client trusts the process. That's not every
              engagement. When it is, the work reflects it.
            </p>
          </div>
          <div className="about-photo-wrap">
            <svg
              aria-hidden="true"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-subtle)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-subtle)',
              fontWeight: 600,
              letterSpacing: 'var(--tracking-wide)',
              textTransform: 'uppercase',
            }}>
              Photo coming
            </span>
          </div>
        </div>

        {/* Beliefs */}
        <p className="craft-section-label">How I work</p>
        <div className="beliefs-grid">
          {BELIEFS.map((b, i) => (
            <div key={i} className="belief-card">
              <div className="belief-card-accent" style={{ background: b.accent }} />
              <p className="belief-card-title">{b.title}</p>
              <p className="belief-card-text">{b.text}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <p className="craft-section-label">Career</p>
        <div className="timeline">
          {TIMELINE.map((entry, i) => (
            <div
              key={i}
              className="timeline-entry"
              onClick={() => setActiveEntry(activeEntry === i ? null : i)}
              role="button"
              tabIndex={0}
              aria-expanded={activeEntry === i}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveEntry(activeEntry === i ? null : i)
                }
              }}
            >
              <div className="timeline-period">{entry.period}</div>
              <div>
                <div className="timeline-role">{entry.role}</div>
                <div className="timeline-company">{entry.company}</div>
                <div style={{
                  maxHeight: activeEntry === i ? '300px' : '0',
                  opacity: activeEntry === i ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
                  marginTop: activeEntry === i ? 'var(--space-3)' : '0',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 'var(--leading-loose)',
                  color: 'var(--color-ink-soft)',
                }}>
                  {entry.detail}
                </div>
              </div>
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transition: 'transform 0.3s ease',
                  transform: activeEntry === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: '#ccc',
                  flexShrink: 0,
                  marginTop: '4px',
                }}
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Disciplines */}
        <p className="craft-section-label">Across</p>
        <div className="disciplines-grid">
          {DISCIPLINES.map(d => {
            const seg = SEGMENTS[d.id]
            return (
              <a
                key={d.id}
                href={d.href}
                className="discipline-card"
                style={{
                  background: seg.gradientSubtle,
                  borderColor: seg.accentColor + '25',
                }}
              >
                <p style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  letterSpacing: 'var(--tracking-wider)',
                  textTransform: 'uppercase',
                  color: seg.accentColor,
                  marginBottom: 'var(--space-2)',
                }}>
                  {seg.label}
                </p>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-ink-soft)',
                  lineHeight: 'var(--leading-snug)',
                }}>
                  {d.desc}
                </p>
              </a>
            )
          })}
        </div>

      </div>
      <PreFooter />
    </>
  )
}
