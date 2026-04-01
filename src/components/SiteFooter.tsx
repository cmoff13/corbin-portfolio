'use client'

export default function SiteFooter() {
  const LINE = '1px solid rgba(0,0,0,0.07)'
  const P = 'clamp(24px, 6vw, 120px)'

  return (
    <footer style={{
      borderTop: LINE,
      padding: `20px ${P}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
    }}>
      <span style={{ fontSize: 11, color: '#bbb', letterSpacing: '0.02em' }}>
        Corbin Moffitt — {new Date().getFullYear()}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {[
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/corbinmoffitt', external: true },
          { label: 'Figma', href: 'https://www.figma.com/design/bPfgluySGiIXoHucOxmyfn', external: true },
          { label: 'Resume ↓', href: '/CorbinMoffittResume_04-2026.pdf', download: 'CorbinMoffittResume_04-2026.pdf' },
        ].map(link => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            download={link.download ?? undefined}
            style={{
              fontSize: 11,
              color: '#999',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'color 0.2s',
              cursor: 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
            onMouseLeave={e => e.currentTarget.style.color = '#999'}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
