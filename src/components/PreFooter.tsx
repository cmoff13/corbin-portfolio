export default function PreFooter() {
  return (
    <div className="prefooter">
      <div className="prefooter-inner">
        <div className="prefooter-status">
          <span className="prefooter-status-dot" aria-hidden="true" />
          Open to work
        </div>
        <h2 className="prefooter-headline">
          Ready to bring this thinking<br />to your team?
        </h2>
        <p className="prefooter-sub">
          Available for full-time roles at companies where design has a real seat at the table — not just a seat in the room.
        </p>
        <div className="prefooter-actions">
          <a href="/contact" className="prefooter-btn-primary">
            Get in touch
          </a>
          <a
            href="https://www.linkedin.com/in/corbinmoffitt/"
            target="_blank"
            rel="noopener noreferrer"
            className="prefooter-btn-secondary"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}
