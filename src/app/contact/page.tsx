export default function ContactPage() {
  return (
    <main className="contact-page">

      <div className="contact-badge">
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} aria-hidden="true" />
        Open to work
      </div>

      <h1 className="contact-headline">
        Let's build something<br />worth putting your name on.
      </h1>

      <p className="contact-sub">
        Open to full-time roles at companies where design, craft, and strategy
        live in the same room. If that sounds like your team — get in touch.
      </p>

      <div className="contact-actions">
        <a
          href="mailto:cmoff13@gmail.com"
          className="contact-btn contact-btn-primary"
        >
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          cmoff13@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/corbinmoffitt/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-btn contact-btn-secondary"
        >
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect width="4" height="12" x="2" y="9"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
          linkedin.com/in/corbinmoffitt
        </a>
      </div>

      <div className="contact-looking-for">
        <p className="looking-for-label">What I'm looking for</p>
        <div className="looking-for-row">
          <span className="looking-for-key">Role</span>
          <span className="looking-for-val">Senior Designer, Lead Designer, or Head of Design</span>
        </div>
        <div className="looking-for-row">
          <span className="looking-for-key">Company</span>
          <span className="looking-for-val">Established teams where design is a core value, not a service department — Series B and beyond, or household names</span>
        </div>
        <div className="looking-for-row">
          <span className="looking-for-key">Industry</span>
          <span className="looking-for-val">Consumer, B2B SaaS, fintech, or anywhere the problem is genuinely hard</span>
        </div>
        <div className="looking-for-row">
          <span className="looking-for-key">Location</span>
          <span className="looking-for-val">Remote-first or flexible — based in Hawaii</span>
        </div>
      </div>

      <p style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--color-muted)',
        lineHeight: 'var(--leading-loose)',
      }}>
        I respond to every genuine inquiry. Recruiters welcome — but please read the work first.
      </p>

    </main>
  )
}
