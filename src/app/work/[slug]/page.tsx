'use client'

import { use, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CASE_STUDIES, SEGMENTS } from '@/lib/segments'

// ── Skygate ────────────────────────────────────────────────────────────────

const SKYGATE_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `Skygate Growth Strategies is a real estate investment platform offering accredited investors access to institutional-grade projects in partnership with JDS Development — one of the most active developers in the US.

They came to me with a clear business problem: their existing web presence didn't reflect the caliber of their deals or their partners. They were asking high-net-worth investors to trust them with significant capital, but their digital touchpoint communicated nothing about who they were, what they did, or why they were credible.

The engagement scope was a single conversion-focused landing page. Timeline was tight. Stakes were real.`,
  },
  problem: {
    title: 'Problem / challenge',
    content: `The core tension was trust at first contact. Real estate investment — especially at the institutional level — requires a visitor to feel confident within seconds of landing. The old site failed on every dimension: unclear value proposition, no social proof, weak visual hierarchy, and no path to conversion.

The brief I set for myself: a visitor should know exactly what Skygate does, why they're credible, and what to do next — all within five seconds of landing. Everything else was noise.

Secondary challenge: this was my first time building an intentional design system across Figma and Webflow simultaneously. I had to architect for scalability from day one, not retrofit it later.`,
  },
  research: {
    title: 'Research & discovery',
    content: `Before touching a frame in Figma, I spent time mapping the investor decision journey. What does a high-net-worth accredited investor actually need to feel before they fill out a form? The answer isn't features — it's legitimacy, clarity, and momentum.

I audited competitors across institutional real estate, private equity platforms, and high-conversion B2B SaaS landing pages. The pattern was consistent: the best-performing pages led with a specific, credible claim — not a vague tagline — followed immediately by a trust anchor (partner logos, credentials, or a named deal) and a single, low-friction CTA.

I also ran content mapping sessions with the account manager before any wireframes. We defined the message hierarchy together: what needs to be true for someone to scroll, what needs to be true for someone to click. That document became the blueprint for the layout.`,
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `Every layout decision traced back to the five-second test.

The hero led with a direct value statement — not a welcome message, not a company name, but a specific claim about what Skygate offered and who it was for. Investor-grade language, not marketing fluff.

Trust signals came immediately below the fold: the JDS Development partnership, deal types, and accreditation language. I deliberately avoided the pattern of burying credibility in a footer — that's where trust goes to die on investment platforms.

CTAs were singular throughout. One action per section. The instinct to add secondary options — "learn more," "watch a video," "explore deals" — was resisted at every turn. A confused visitor doesn't convert.

Typography and spacing were used as trust signals themselves. Generous whitespace, a restrained type scale, and a color system anchored in navy and warm neutral communicated stability and institutional credibility without saying a word.`,
  },
  system: {
    title: 'Design system',
    content: `One of the explicit goals was delivering a system Skygate could own and scale — not a one-off page they'd need to come back to me to update.

I built the design system in Figma before writing a single line of Webflow. The system covered: a four-step type scale (display, heading, body, label), a semantic color palette with primary, accent, and neutral ramps, a component library of reusable sections (hero, feature grid, testimonial, CTA), and a spacing framework on a base-8 grid.

Each component was documented with usage notes — when to use it, what to avoid, how to modify it without breaking the visual system. The handoff wasn't a file, it was a system with a manual.

In Webflow, I mapped the Figma system directly to global styles and CMS fields where applicable, so future content updates wouldn't require design decisions.`,
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `The page launched almost a month ahead of the original timeline.

That outcome wasn't luck — it was the direct result of front-loading the strategic work. Because the content map, message hierarchy, and design direction were aligned before any visual work began, the feedback loops were tight and the revisions were minimal. The client wasn't reacting to designs; they were confirming decisions we'd already made together.

The deliverable was a live Webflow site with a fully documented Figma design system. Skygate left the engagement with a page that worked on day one and a system they could build on independently.`,
  },
  reflections: {
    title: 'Reflections',
    content: `The thing I'm most proud of here isn't the visual design — it's the process discipline.

I've seen landing pages built fast and rebuilt six months later because the brief was wrong. This one was built right because we answered the hard questions before anyone opened Figma. What does this page need to do? Who is it for? What does success look like? Those aren't design questions — they're strategy questions. And they're the ones most designers skip.

If I were doing this again, I'd push even harder on quantitative benchmarks upfront. Conversion rate targets, scroll depth goals, form completion benchmarks. Not because the numbers are the point — but because they force alignment on what "working" actually means before you ship.

The scalable design system was the right call. In hindsight, I'd make the component documentation even more thorough — more explicit usage guidelines, more examples of what not to do.`,
  },
}

// ── Rely Health ────────────────────────────────────────────────────────────

const RELY_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `Rely Health is a healthcare AI platform built for a generation that didn't grow up with technology. The project came through a design agency I freelanced with — I was brought in as the UI execution layer, working from a brief and design system the agency had already established with the client.

My scope was focused: take the approved design system and translate it into a proposed visual direction for a full website redesign in Figma. No engineering, no copywriting, no strategy — pure UI design with a specific brief and a tight turnaround.

The challenge was deceptively hard. Healthcare AI is a crowded, visually homogeneous space. And the primary audience — adults 55 and older — required a level of warmth and approachability that most AI brands actively avoid.`,
  },
  problem: {
    title: 'Problem / challenge',
    content: `The previous site was outdated and brand-inconsistent. More importantly, it felt like what it was: a tech product built by people who weren't thinking about the person on the other end of the screen.

For a 65-year-old managing a chronic condition, interacting with a healthcare AI isn't exciting — it can be intimidating, confusing, or even frightening. The design needed to lower that barrier without dumbing anything down.

The market problem was equally real. Healthcare AI brands in 2024 all looked the same: dark backgrounds, electric blue gradients, robotic iconography, and interface screenshots that emphasized the technology over the human. Standing out meant going in the opposite direction — warmth, clarity, and a visual language that felt like a trusted healthcare provider, not a Silicon Valley startup.`,
  },
  research: {
    title: 'Research & discovery',
    content: `Formal research wasn't part of my scope — the agency had handled stakeholder interviews and audience analysis upstream. What I worked from was a detailed brief covering the target audience (adults 55+, mixed gender), the brand's tone of voice, and the client's specific preferences around color, imagery, and layout feel.

That brief became my research artifact. I read it closely enough to make design decisions the client hadn't explicitly asked for but would recognize as right when they saw them.

My informal audit was competitive. I spent time in the healthcare AI space — looking at what everyone else was doing — specifically to find what to avoid. The visual clichés were everywhere. My job was to make something that felt human in a category that had forgotten what human looked like.`,
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `My process for new clients in scoped UI engagements follows a deliberate pattern: multiple concept directions before a full build. Rather than designing a complete page in one direction and hoping it lands, I present three to four distinct visual concepts at the hero level — varying the color palette, typographic hierarchy, and spatial feel — to give the client real choices rather than reactions.

This approach does two things. It surfaces preferences the client didn't know they had. And it eliminates the back-and-forth revision cycle that kills timelines and erodes trust.

For Rely Health, the winning direction leaned into warmth and humanity over technology. Softer color temperatures, photography-forward layouts with real people (not interface mockups), generous whitespace, and typography that felt approachable without sacrificing credibility. The AI wasn't hidden — but it was contextualized around the human experience of using it.

Implementing the agency's existing design system meant making judgment calls within established constraints. Token selection, component adaptation, spatial decisions — all of it required intuition, not instruction. That's where the actual design thinking happened.`,
  },
  system: {
    title: 'Design system',
    content: `The design system was pre-established by the agency — my role was implementation, not creation. That's an important distinction, and an honest one.

What I brought was the discipline to use the system correctly and the judgment to know when a system constraint needed to be stretched to serve the design goal. A design system is a tool. Knowing how to use it — and when to push its edges — is the skill.

Every component, color token, and typographic decision I made traced back to the established system. The output was consistent, scalable, and handoff-ready. The agency had no edits.`,
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `The agency accepted every design direction I presented with no revisions requested. In a client-facing context, that's the highest signal available — it means the work was right on the first pass.

I never had direct contact with Rely Health as the end client. The feedback loop ran through the agency, and the signal was clear: take it and run. Whether that means the client loved it or simply didn't engage critically is something I'll never know for certain. What I know is that the work stood up to professional scrutiny without a single round of revision.

The project reinforced something I believe strongly: over-communication at the start of a project is the fastest path to a clean delivery at the end. By providing multiple concepts and more than what was asked for, I eliminated the guesswork that turns short projects into long ones.`,
  },
  reflections: {
    title: 'Reflections',
    content: `The honest limitation of this project is the absence of outcome data. I don't know if the redesign moved the needle for Rely Health — I don't know if it launched, what the conversion rate looked like, or whether the 55+ audience responded the way the design intended. That's a real gap, and it's one I've thought about.

What I'd do differently: push harder for even a lightweight feedback mechanism. Not a full analytics integration — just a way to close the loop. Did the multi-concept approach resonate with the end client? Did the warmth direction land for the target audience? Those answers would have made me a better designer for the next project.

The lesson I carry forward is about the difference between a clean handoff and a successful outcome. They're not the same thing, and conflating them is a trap. This project was a clean handoff. Whether it was a successful outcome, I genuinely don't know — and that's worth sitting with.`,
  },
}

// ── Black Coast Estates ────────────────────────────────────────────────────

const BLACK_COAST_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `Black Coast Estates is a luxury co-ownership property platform — fractional ownership of high-end vacation homes, managed collectively by a group of co-owners. The project came through Design Silk, a Creative-as-a-Service agency I freelance with, where I was brought in as the product designer on a tight timeline.

The ask was to design Ocho — a mobile app that gives co-owners a single place to manage their shared property. Booking visits, tracking shared expenses, coordinating ownership logistics, and a snake draft system (think fantasy football, but for booking weeks at a luxury home) all needed to live in one coherent product.

This was an MVP engagement. The client had a real deadline — a fantasy draft was approaching — and needed a high-fidelity Figma prototype their dev team could build from, fast.`,
  },
  problem: {
    title: 'Problem / challenge',
    content: `The core problem was designing a new product category under time pressure. Co-ownership management doesn't have an established UI playbook — there's no dominant app people already know how to use. That meant every interaction pattern needed to feel immediately intuitive, because there was no time to onboard users to something unfamiliar.

The snake draft feature was the hardest design problem. Fantasy football drafts are familiar to a certain demographic, but the mechanics needed to translate into a luxury real estate context without feeling like a game. Stakes are different when you're booking weeks at a property you co-own versus picking a wide receiver.

Speed was the secondary constraint. Maximum high-fidelity, minimum research. The prototype needed to be good enough for a dev team to build from — not a polished concept, but a real product foundation.`,
  },
  research: {
    title: 'Research & discovery',
    content: `The research brief was minimal by design — the client knew their users and their timeline didn't allow for formal discovery. What I had to work with was a clear reference point: the client wanted an Airbnb feel with a Sleeper vibe.

That shorthand was actually useful. Airbnb and Sleeper are both best-in-class products for their categories — one for intuitive property booking, the other for the draft and scheduling mechanics that would power the co-ownership model. Using them as a compass meant I wasn't designing from scratch. I was designing from proven patterns, adapted for a new context.

I did a focused audit of both apps — screen by screen — mapping which interaction patterns were worth borrowing and which needed to be rethought for the luxury co-ownership context. The result was a design that felt familiar without feeling derivative.`,
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `The guiding principle was cognitive familiarity. When users open Ocho for the first time, they shouldn't need to learn a new mental model — they should feel like they already know how to use it.

The calendar-first layout came from Airbnb. Dates are the primary organizing principle for anyone managing a property, so leading with the calendar wasn't a stylistic choice — it was an information architecture decision. Everything else — expenses, ownership details, draft mechanics — branched from that central timeline.

The draft interface borrowed Sleeper's clarity. Sleeper works because it makes complex draft mechanics feel simple and legible at a glance. I applied that same principle to the week-selection flow: clear visual states for available, claimed, and pending weeks, with the snake draft order surfaced contextually rather than buried in settings.

The premium feel the client wanted came from restraint. Dark surfaces, refined typography, and a minimal color system — enough to signal luxury without competing with the property photography that would populate the real product.`,
  },
  system: {
    title: 'Design system',
    content: `Given the timeline, the design system was intentionally minimal — functional rather than comprehensive. The goal was to eliminate duplicate work across screens, not to build something presentation-ready.

I established a core component library in Figma covering the elements that repeated most often: navigation, cards, calendar states, buttons, and form inputs. Each component had variants for its key states — default, active, disabled, loading — so the prototype could communicate real interactive behavior without needing to design every state from scratch.

The color system was simple: a primary dark surface, a warm neutral for secondary surfaces, and a single accent color for interactive elements and ownership indicators. Typography was a two-weight system — a display weight for headings and a regular weight for body and labels.

It wasn't a full design system. It was enough of a system to build a coherent product and give the dev team a consistent foundation to work from.`,
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `The deliverable was an interactive high-fidelity Figma prototype covering the core ownership flows: property overview, calendar booking, expense tracking, and the snake draft interface.

The client's internal dev team is actively building from it. I didn't have direct contact with the end client — the feedback came through Design Silk — and the signal was positive. No revision requests, no clarifying questions on the prototype flows. The handoff was clean enough that the dev team could start building without needing a design walkthrough.

The prototype hit the deadline. Given the timeline pressure, that was the primary success metric, and we cleared it.`,
  },
  reflections: {
    title: 'Reflections',
    content: `The honest reflection on this project is about bandwidth. The turnaround was tight and I felt it — not in the quality of the prototype, but in the exploration phase. I designed fewer options than I would have liked and moved to execution faster than felt comfortable.

That's sometimes the right call on MVP work. But I would have benefited from even one more round of concept exploration on the draft interface specifically. The solution I landed on works — but I'm not certain it's the best version of that interaction, and I didn't have the time to find out.

On the design system: I'd formalize it earlier next time. The component library I built was functional but thin, and I could feel myself making one-off decisions in later screens that should have been systematized from the start. A tighter system upfront saves time downstream, even on short engagements.

The broader lesson is about scoping. MVP doesn't mean low quality — it means high focus. Next time I'd be more explicit upfront about what the system needs to cover and what it intentionally doesn't, so the client knows exactly what they're getting and what they'll need to build out during development.`,
  },
}

// ── This Portfolio ─────────────────────────────────────────────────────────

const PORTFOLIO_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `This portfolio is a self-initiated product — designed, built, and shipped by one person to solve a problem I kept running into personally.

After years of applying to a mix of brand, web, and UX/product roles, I noticed a pattern: the same portfolio was landing differently depending on who was reading it. Brand studios wanted to see craft and visual systems. Growth teams wanted conversion thinking. Product teams wanted process and rationale. One portfolio trying to speak to all three audiences was serving none of them well.

The insight wasn't complicated: most portfolios are organized around the designer. This one is organized around the viewer. Three segments, each speaking a different language, built on one unified design system underneath.`,
  },
  problem: {
    title: 'Problem / challenge',
    content: `The problem had two sides.

On the applicant side: sending the same portfolio to a brand studio and a SaaS product team means one of them is always seeing irrelevant work. Worse, they're seeing work that actively undermines your positioning — a UX hiring manager looking at logo work might conclude you're not a product thinker. A brand director looking at CRO audits might conclude you're too performance-focused. The portfolio becomes a liability.

On the reviewer side: hiring managers spend an average of a few minutes on a portfolio. If the first thing they see isn't relevant to what they're hiring for, they're gone. There's no mechanism in a traditional portfolio to say "this section is for you specifically."

The design challenge was building something that felt tailored without being fragmented — a portfolio that adapts to its audience while still communicating a coherent design identity.`,
  },
  research: {
    title: 'Research & discovery',
    content: `The research was personal. Seven years of job applications, freelance pitches, and client conversations gave me a clear picture of what different audiences actually respond to.

Brand roles care about the eye — does this person have taste? Can they build a visual system? Web and growth roles care about outcomes — does this person understand conversion? Can they connect design decisions to business results? UX and product roles care about thinking — does this person have a process? Can they articulate why they made a decision?

Those three questions became the brief for three distinct segment experiences. Not three different portfolios — three different editorial registers built on the same design foundation.

I also looked at how other multi-disciplinary designers positioned themselves. The most common approach was a single portfolio with category filters. That solves the content problem but not the framing problem — the visitor still lands in a generic context before finding relevant work. The segment gate solves both: the framing is set before a single project is shown.`,
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `The gate screen was the most important design decision in the project. It had to do something unusual: ask the visitor to self-select before showing them anything. That's friction by design — and friction is usually the enemy of conversion. The bet was that the right visitor would appreciate being asked, and that the resulting experience would be more relevant than any generic first impression.

The three-segment structure maps directly to how I actually work: brand identity as craft foundation, web and digital as performance execution, UX and product as systems thinking. The segments aren't marketing categories — they're real disciplines with real differences in how the work should be presented.

Each segment has a distinct format language. Brand is a craft showcase — dense artifact grid, hover reveals, no case study narrative required. Web is case-study-forward with conversion metrics and outcomes. UX is process-forward — wireframes, decisions, rationale before final screens.

The design system underneath stays constant. Same typography, same spacing, same component patterns. The accent color and editorial register shift per segment. The goal was to demonstrate the skill directly in the portfolio itself: adapting a system to context without losing coherence.

AI was used deliberately throughout the build. Claude helped architect the data model, write and refine case study copy, generate component code, and pressure-test design decisions. That's not a shortcut — it's a workflow. Knowing how to use AI as a design and development collaborator is a skill the industry is actively looking for, and this project is evidence of it.`,
  },
  system: {
    title: 'Design system',
    content: `The design system had to serve three audiences simultaneously — which meant it had to be flexible enough to feel different per segment without requiring three separate codebases.

The solution was a token-based approach in code. A single segments.ts config file drives everything: accent colors, headline copy, intro paragraphs, case study assignments, and page format. Changing a segment's experience means changing one object in one file. That's the kind of scalable thinking that separates a design system from a collection of screens.

The component architecture follows the same principle. The gate screen, segment pages, case study template, and navigation are all built as reusable components that read from the segment config. The visual differentiation happens at the token level — not by maintaining parallel component trees.

Typography is Geist — clean, neutral, system-native. The gate screen uses animated word reveals and a canvas-based background with draggable color blobs that respond to cursor interaction. The rest of the site is deliberately restrained — Notion-inspired whitespace, subtle UI elements, accent color as the primary differentiator.`,
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `The portfolio shipped as a live Next.js application deployed on Vercel. It's the site you're reading right now.

The gate screen routes visitors to one of three segment experiences based on their role. Each segment surfaces relevant case studies, uses appropriate copy and framing, and presents work in the format that audience expects. The floating segment switcher lets visitors explore other disciplines without returning to the gate.

The case study template includes a sticky left navigation, section-by-section content, meta information, and image placeholders ready for real project assets. The entire content layer is driven by a single config file — adding a new case study means adding an object, not rebuilding a page.

This is a living project. The case studies will be updated with real images. New projects will be added as they ship. The system is built to scale.`,
  },
  reflections: {
    title: 'Reflections',
    content: `The most interesting thing about building your own portfolio is that you're the client, the designer, and the user simultaneously. That's a strange position — you have no brief to push back against, no stakeholder to align with, and no external constraint to blame when a decision doesn't land.

What I learned: constraint is generative. The decisions I'm most confident about — the three-segment structure, the gate screen format, the Notion-inspired design system — all came from forcing myself to define the problem precisely before touching a tool.

The AI-assisted workflow was genuinely new for me on this project. Using Claude as a collaborator for architecture decisions, copy drafts, and component generation changed how I think about the design-to-build pipeline. It's not about generating output — it's about having a thinking partner that responds to specifics. The quality of the prompt is the quality of the work.

What I'd do differently: start with real content earlier. The placeholder images and coming-soon case studies are the honest limitation of this project right now. The system is built. The content is the work.`,
  },
}

// ── Maps ───────────────────────────────────────────────────────────────────

const CONTENT_MAP: Record<string, typeof SKYGATE_CONTENT> = {
  'skygate-growth-strategies': SKYGATE_CONTENT,
  'rely-health': RELY_CONTENT,
  'black-coast-estates': BLACK_COAST_CONTENT,
  'portfolio-nav-system': PORTFOLIO_CONTENT,
}

const META_MAP: Record<string, { label: string; value: string }[]> = {
  'skygate-growth-strategies': [
    { label: 'Role', value: 'Lead Designer' },
    { label: 'Scope', value: 'Strategy, Design, Build' },
    { label: 'Timeline', value: 'Delivered 1 month early' },
    { label: 'Platform', value: 'Figma + Webflow' },
  ],
  'rely-health': [
    { label: 'Role', value: 'UI Designer' },
    { label: 'Scope', value: 'UI Design, Concept Direction' },
    { label: 'Client', value: 'Agency subcontract' },
    { label: 'Platform', value: 'Figma' },
  ],
  'black-coast-estates': [
    { label: 'Role', value: 'Product Designer' },
    { label: 'Scope', value: 'UX/UI, Prototype, Design System' },
    { label: 'Client', value: 'Agency subcontract' },
    { label: 'Platform', value: 'Figma' },
  ],
  'portfolio-nav-system': [
    { label: 'Role', value: 'Designer + Developer' },
    { label: 'Scope', value: 'Product thinking, Design, Build' },
    { label: 'Type', value: 'Self-initiated' },
    { label: 'Stack', value: 'Next.js + Vercel' },
  ],
}

// ── Section keys ───────────────────────────────────────────────────────────

const SECTION_KEYS = [
  'overview',
  'problem',
  'research',
  'decisions',
  'system',
  'outcome',
  'reflections',
] as const

type SectionKey = typeof SECTION_KEYS[number]

// ── Page ───────────────────────────────────────────────────────────────────

export default function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const project = CASE_STUDIES.find(c => c.slug === slug)
  const [activeSection, setActiveSection] = useState<SectionKey>('overview')
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionKey)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    SECTION_KEYS.forEach(key => {
      const el = sectionRefs.current[key]
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  if (!project) {
    return (
      <main className="segment-page">
        <p style={{ color: '#999' }}>Project not found.</p>
        <button
          onClick={() => router.back()}
          style={{ marginTop: '16px', fontSize: '14px', color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← Back
        </button>
      </main>
    )
  }

  const segment = SEGMENTS[project.primarySegment]
  const tagBg = project.primarySegment === 'web'
    ? '#e8f5f0'
    : project.primarySegment === 'brand'
    ? '#faece7'
    : '#eeedfe'

  const content = CONTENT_MAP[slug] ?? null
  const meta = META_MAP[slug] ?? [
    { label: 'Role', value: 'Designer' },
    { label: 'Scope', value: 'Design' },
    { label: 'Platform', value: 'Figma' },
    { label: 'Status', value: 'Coming soon' },
  ]

  return (
    <>
      {/* Mobile nav */}
      <div
        className="case-mobile-nav"
        style={{
          display: 'none',
          padding: '12px 20px',
          borderBottom: '1px solid #f0f0f0',
          overflowX: 'auto',
          gap: '4px',
        }}
      >
        {SECTION_KEYS.map(key => (
          <button
            key={key}
            onClick={() => sectionRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            style={{
              flexShrink: 0,
              padding: '5px 10px',
              borderRadius: '5px',
              border: 'none',
              background: activeSection === key ? '#f5f5f2' : 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: activeSection === key ? 600 : 400,
              color: activeSection === key ? segment.accentColor : '#888',
              whiteSpace: 'nowrap',
            }}
          >
            {content ? content[key].title : key}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', minHeight: '100vh' }}>

        {/* Sidebar */}
        <aside
          className="case-sidebar"
          style={{
            width: '220px',
            flexShrink: 0,
            padding: '48px 24px 48px 32px',
            position: 'sticky',
            top: '57px',
            height: 'calc(100vh - 57px)',
            overflowY: 'auto',
            borderRight: '1px solid #f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              fontSize: '12px',
              color: '#999',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              padding: '0',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            ← Back
          </button>

          <p style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ccc',
            marginBottom: '12px',
            paddingLeft: '10px',
          }}>
            On this page
          </p>

          {SECTION_KEYS.map(key => {
            const isActive = activeSection === key
            return (
              <button
                key={key}
                onClick={() => sectionRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: isActive ? '#f5f5f2' : 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? segment.accentColor : '#888',
                  transition: 'all 0.15s ease',
                  borderLeft: `2px solid ${isActive ? segment.accentColor : 'transparent'}`,
                }}
              >
                {content ? content[key].title : key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            )
          })}
        </aside>

        {/* Main content */}
        <main style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          padding: '48px 40px 96px',
        }}>
          <div style={{ width: '100%', maxWidth: '680px' }}>

            {/* Header */}
            <div style={{ marginBottom: '56px' }}>
              <div className="project-tags" style={{ marginBottom: '16px' }}>
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="project-tag"
                    style={{ color: segment.accentColor, background: tagBg }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#1a1a1a',
                marginBottom: '12px',
              }}>
                {project.title}
              </h1>

              <p style={{ fontSize: '16px', color: '#9b9b9b', lineHeight: 1.5, marginBottom: '32px' }}>
                {project.subtitle}
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px 40px',
                padding: '20px 0',
                borderTop: '1px solid #f0f0f0',
                borderBottom: '1px solid #f0f0f0',
              }}>
                {meta.map(item => (
                  <div key={item.label}>
                    <p style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#ccc',
                      marginBottom: '4px',
                    }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a1a' }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero image */}
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              background: '#f7f7f5',
              borderRadius: '8px',
              marginBottom: '72px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #f0f0f0',
            }}>
              <span style={{
                fontSize: '11px',
                color: '#ccc',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}>
                Hero image
              </span>
            </div>

            {/* Sections */}
            {SECTION_KEYS.map((key, i) => {
              const section = content
                ? content[key]
                : { title: key.charAt(0).toUpperCase() + key.slice(1), content: 'Content coming soon.' }

              return (
                <div
                  key={key}
                  id={key}
                  ref={el => { sectionRefs.current[key] = el }}
                  style={{ marginBottom: '80px', scrollMarginTop: '80px' }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '20px',
                  }}>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: segment.accentColor,
                      background: tagBg,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#1a1a1a',
                      letterSpacing: '-0.02em',
                    }}>
                      {section.title}
                    </h2>
                  </div>

                  {section.content.split('\n\n').map((para, j) => (
                    <p key={j} style={{
                      fontSize: '15px',
                      color: '#4a4a4a',
                      lineHeight: 1.85,
                      marginBottom: '16px',
                    }}>
                      {para}
                    </p>
                  ))}

                  {i < SECTION_KEYS.length - 1 && (
                    <div style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      background: '#f7f7f5',
                      borderRadius: '8px',
                      marginTop: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #f0f0f0',
                    }}>
                      <span style={{
                        fontSize: '11px',
                        color: '#ccc',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}>
                        {section.title} — image
                      </span>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Footer */}
            <div style={{
              borderTop: '1px solid #f0f0f0',
              paddingTop: '40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <button
                onClick={() => router.push(`/${project.primarySegment}`)}
                style={{
                  fontSize: '13px',
                  color: segment.accentColor,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ← Back to {segment.label}
              </button>
              <p style={{ fontSize: '12px', color: '#ccc' }}>More projects coming</p>
            </div>

          </div>
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .case-sidebar { display: none !important; }
          .case-mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  )
}