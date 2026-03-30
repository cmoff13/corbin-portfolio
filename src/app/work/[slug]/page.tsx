'use client'

import { use, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CASE_STUDIES, SEGMENTS } from '@/lib/segments'
import ContactCta from '@/components/ContactCta'

// ── Content ────────────────────────────────────────────────────────────────

const SKYGATE_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `Skygate Growth Strategies is a real estate investment platform offering accredited investors access to institutional-grade projects in partnership with JDS Development — one of the most active developers in the US.

They came to me with a clear business problem: their existing web presence didn't reflect the caliber of their deals or their partners. They were asking high-net-worth investors to trust them with significant capital, but their digital touchpoint communicated nothing about who they were, what they did, or why they were credible.

The engagement scope was a single conversion-focused landing page. Timeline was tight. Stakes were real.`,
    tldr: "A high-stakes landing page for a real estate investment platform — their credibility wasn't coming through digitally, and high-net-worth investors were the audience.",
  },
  problem: {
    title: 'Problem / challenge',
    content: `The core tension was trust at first contact. Real estate investment — especially at the institutional level — requires a visitor to feel confident within seconds of landing. The old site failed on every dimension: unclear value proposition, no social proof, weak visual hierarchy, and no path to conversion.

The brief I set for myself: a visitor should know exactly what Skygate does, why they're credible, and what to do next — all within five seconds of landing. Everything else was noise.

Secondary challenge: this was my first time building an intentional design system across Figma and Webflow simultaneously. I had to architect for scalability from day one, not retrofit it later.`,
    tldr: 'The old site failed the five-second test on every dimension — no clear value prop, no trust signals, no conversion path.',
  },
  research: {
    title: 'Research & discovery',
    content: `Before touching a frame in Figma, I spent time mapping the investor decision journey. What does a high-net-worth accredited investor actually need to feel before they fill out a form? The answer isn't features — it's legitimacy, clarity, and momentum.

I audited competitors across institutional real estate, private equity platforms, and high-conversion B2B SaaS landing pages. The pattern was consistent: the best-performing pages led with a specific, credible claim — not a vague tagline — followed immediately by a trust anchor (partner logos, credentials, or a named deal) and a single, low-friction CTA.

I also ran content mapping sessions with the account manager before any wireframes. We defined the message hierarchy together: what needs to be true for someone to scroll, what needs to be true for someone to click. That document became the blueprint for the layout.`,
    tldr: 'Competitive audit revealed a consistent pattern: specific credible claim → immediate trust anchor → single CTA. That became the blueprint.',
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `Every layout decision traced back to the five-second test.

The hero led with a direct value statement — not a welcome message, not a company name, but a specific claim about what Skygate offered and who it was for. Investor-grade language, not marketing fluff.

Trust signals came immediately below the fold: the JDS Development partnership, deal types, and accreditation language. I deliberately avoided the pattern of burying credibility in a footer — that's where trust goes to die on investment platforms.

CTAs were singular throughout. One action per section. The instinct to add secondary options — "learn more," "watch a video," "explore deals" — was resisted at every turn. A confused visitor doesn't convert.

Typography and spacing were used as trust signals themselves. Generous whitespace, a restrained type scale, and a color system anchored in navy and warm neutral communicated stability and institutional credibility without saying a word.`,
    tldr: "Every decision traced back to one rule: a visitor should know what Skygate does, why they're credible, and what to do next — within five seconds.",
  },
  system: {
    title: 'Design system',
    content: `One of the explicit goals was delivering a system Skygate could own and scale — not a one-off page they'd need to come back to me to update.

I built the design system in Figma before writing a single line of Webflow. The system covered: a four-step type scale (display, heading, body, label), a semantic color palette with primary, accent, and neutral ramps, a component library of reusable sections (hero, feature grid, testimonial, CTA), and a spacing framework on a base-8 grid.

Each component was documented with usage notes — when to use it, what to avoid, how to modify it without breaking the visual system. The handoff wasn't a file, it was a system with a manual.

In Webflow, I mapped the Figma system directly to global styles and CMS fields where applicable, so future content updates wouldn't require design decisions.`,
    tldr: 'Built a fully documented Figma design system before touching Webflow — type scale, color ramps, component library, usage notes. The handoff was a manual, not just a file.',
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `The page launched almost a month ahead of the original timeline.

That outcome wasn't luck — it was the direct result of front-loading the strategic work. Because the content map, message hierarchy, and design direction were aligned before any visual work began, the feedback loops were tight and the revisions were minimal. The client wasn't reacting to designs; they were confirming decisions we'd already made together.

The deliverable was a live Webflow site with a fully documented Figma design system. Skygate left the engagement with a page that worked on day one and a system they could build on independently.`,
    tldr: 'Delivered a live Webflow site with a full design system almost a month ahead of schedule — front-loading strategy eliminated revision cycles.',
  },
  reflections: {
    title: 'Reflections',
    content: `The thing I'm most proud of here isn't the visual design — it's the process discipline.

I've seen landing pages built fast and rebuilt six months later because the brief was wrong. This one was built right because we answered the hard questions before anyone opened Figma. What does this page need to do? Who is it for? What does success look like? Those aren't design questions — they're strategy questions. And they're the ones most designers skip.

If I were doing this again, I'd push even harder on quantitative benchmarks upfront. Conversion rate targets, scroll depth goals, form completion benchmarks. Not because the numbers are the point — but because they force alignment on what "working" actually means before you ship.

The scalable design system was the right call. In hindsight, I'd make the component documentation even more thorough — more explicit usage guidelines, more examples of what not to do.`,
    tldr: "Most proud of the process discipline — answering strategy questions before opening Figma is what made a tight timeline feel comfortable.",
  },
}

const RELY_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `Rely Health is a healthcare AI platform built for a generation that didn't grow up with technology. The project came through a design agency I freelanced with — I was brought in as the UI execution layer, working from a brief and design system the agency had already established with the client.

My scope was focused: take the approved design system and translate it into a proposed visual direction for a full website redesign in Figma. No engineering, no copywriting, no strategy — pure UI design with a specific brief and a tight turnaround.

The challenge was deceptively hard. Healthcare AI is a crowded, visually homogeneous space. And the primary audience — adults 55 and older — required a level of warmth and approachability that most AI brands actively avoid.`,
    tldr: 'Subcontracted UI design for a healthcare AI platform targeting adults 55+ — my job was to make AI feel human in a category that had forgotten what human looked like.',
  },
  problem: {
    title: 'Problem / challenge',
    content: `The previous site was outdated and brand-inconsistent. More importantly, it felt like what it was: a tech product built by people who weren't thinking about the person on the other end of the screen.

For a 65-year-old managing a chronic condition, interacting with a healthcare AI isn't exciting — it can be intimidating, confusing, or even frightening. The design needed to lower that barrier without dumbing anything down.

The market problem was equally real. Healthcare AI brands in 2024 all looked the same: dark backgrounds, electric blue gradients, robotic iconography, and interface screenshots that emphasized the technology over the human. Standing out meant going in the opposite direction — warmth, clarity, and a visual language that felt like a trusted healthcare provider, not a Silicon Valley startup.`,
    tldr: 'Healthcare AI all looked the same — dark, robotic, cold. Standing out meant going the opposite direction: warm, human, approachable without being condescending.',
  },
  research: {
    title: 'Research & discovery',
    content: `Formal research wasn't part of my scope — the agency had handled stakeholder interviews and audience analysis upstream. What I worked from was a detailed brief covering the target audience (adults 55+, mixed gender), the brand's tone of voice, and the client's specific preferences around color, imagery, and layout feel.

That brief became my research artifact. I read it closely enough to make design decisions the client hadn't explicitly asked for but would recognize as right when they saw them.

My informal audit was competitive. I spent time in the healthcare AI space — looking at what everyone else was doing — specifically to find what to avoid. The visual clichés were everywhere. My job was to make something that felt human in a category that had forgotten what human looked like.`,
    tldr: "Worked from a detailed agency brief — read it deeply enough to make decisions the client hadn't asked for but recognized as right when they saw them.",
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `My process for new clients in scoped UI engagements follows a deliberate pattern: multiple concept directions before a full build. Rather than designing a complete page in one direction and hoping it lands, I present three to four distinct visual concepts at the hero level — varying the color palette, typographic hierarchy, and spatial feel — to give the client real choices rather than reactions.

This approach does two things. It surfaces preferences the client didn't know they had. And it eliminates the back-and-forth revision cycle that kills timelines and erodes trust.

For Rely Health, the winning direction leaned into warmth and humanity over technology. Softer color temperatures, photography-forward layouts with real people (not interface mockups), generous whitespace, and typography that felt approachable without sacrificing credibility. The AI wasn't hidden — but it was contextualized around the human experience of using it.

Implementing the agency's existing design system meant making judgment calls within established constraints. Token selection, component adaptation, spatial decisions — all of it required intuition, not instruction. That's where the actual design thinking happened.`,
    tldr: "Presented multiple concept directions upfront — surfaces preferences the client didn't know they had and eliminates revision cycles. Winning direction: warm, human, photography-forward.",
  },
  system: {
    title: 'Design system',
    content: `The design system was pre-established by the agency — my role was implementation, not creation. That's an important distinction, and an honest one.

What I brought was the discipline to use the system correctly and the judgment to know when a system constraint needed to be stretched to serve the design goal. A design system is a tool. Knowing how to use it — and when to push its edges — is the skill.

Every component, color token, and typographic decision I made traced back to the established system. The output was consistent, scalable, and handoff-ready. The agency had no edits.`,
    tldr: 'Agency-established system — my value was using it correctly and knowing when to push its edges. The output was consistent enough that the agency had zero edits.',
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `The agency accepted every design direction I presented with no revisions requested. In a client-facing context, that's the highest signal available — it means the work was right on the first pass.

I never had direct contact with Rely Health as the end client. The feedback loop ran through the agency, and the signal was clear: take it and run. Whether that means the client loved it or simply didn't engage critically is something I'll never know for certain. What I know is that the work stood up to professional scrutiny without a single round of revision.

The project reinforced something I believe strongly: over-communication at the start of a project is the fastest path to a clean delivery at the end. By providing multiple concepts and more than what was asked for, I eliminated the guesswork that turns short projects into long ones.`,
    tldr: 'Zero revision requests — every concept accepted on the first pass. Over-delivering at the start eliminated the guesswork that drags projects out.',
  },
  reflections: {
    title: 'Reflections',
    content: `The honest limitation of this project is the absence of outcome data. I don't know if the redesign moved the needle for Rely Health — I don't know if it launched, what the conversion rate looked like, or whether the 55+ audience responded the way the design intended. That's a real gap, and it's one I've thought about.

What I'd do differently: push harder for even a lightweight feedback mechanism. Not a full analytics integration — just a way to close the loop. Did the multi-concept approach resonate with the end client? Did the warmth direction land for the target audience? Those answers would have made me a better designer for the next project.

The lesson I carry forward is about the difference between a clean handoff and a successful outcome. They're not the same thing, and conflating them is a trap. This project was a clean handoff. Whether it was a successful outcome, I genuinely don't know — and that's worth sitting with.`,
    tldr: "Clean handoff, unknown outcome — and that distinction matters. I'd push harder for a feedback loop next time, even a lightweight one.",
  },
}

const BLACK_COAST_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `In plain terms: multiple co-owners share one high-end vacation home and need a single place to book weeks, track shared costs, and settle who gets peak dates — not a patchwork of chats and spreadsheets.

Black Coast Estates is a luxury co-ownership property platform — fractional ownership of high-end vacation homes, managed collectively by a group of co-owners. The project came through Design Silk, a Creative-as-a-Service agency I freelance with, where I was brought in as the product designer on a tight timeline.

The ask was to design Ocho — a mobile app that gives co-owners a single place to manage their shared property. Booking visits, tracking shared expenses, coordinating ownership logistics, and a snake draft system (think fantasy football, but for booking weeks at a luxury home) all needed to live in one coherent product.

This was an MVP engagement. The client had a real deadline — a fantasy draft was approaching — and needed a high-fidelity Figma prototype their dev team could build from, fast.`,
    tldr: 'Co-owners, one home: Ocho is the app for bookings, expenses, and a fair peak-weeks draft — shipped as a high-fi MVP under a real deadline.',
  },
  problem: {
    title: 'Problem / challenge',
    content: `The core problem was designing a new product category under time pressure. Co-ownership management doesn't have an established UI playbook — there's no dominant app people already know how to use. That meant every interaction pattern needed to feel immediately intuitive, because there was no time to onboard users to something unfamiliar.

The snake draft feature was the hardest design problem. Fantasy football drafts are familiar to a certain demographic, but the mechanics needed to translate into a luxury real estate context without feeling like a game. Stakes are different when you're booking weeks at a property you co-own versus picking a wide receiver.

Speed was the secondary constraint. Maximum high-fidelity, minimum research. The prototype needed to be good enough for a dev team to build from — not a polished concept, but a real product foundation.`,
    tldr: 'No established UI playbook for co-ownership management — every pattern needed to feel instantly intuitive because there was no time to onboard users to something unfamiliar.',
  },
  research: {
    title: 'Research & discovery',
    content: `The research brief was minimal by design — the client knew their users and their timeline didn't allow for formal discovery. What I had to work with was a clear reference point: the client wanted an Airbnb feel with a Sleeper vibe.

That shorthand was actually useful. Airbnb and Sleeper are both best-in-class products for their categories — one for intuitive property booking, the other for the draft and scheduling mechanics that would power the co-ownership model. Using them as a compass meant I wasn't designing from scratch. I was designing from proven patterns, adapted for a new context.

I did a focused audit of both apps — screen by screen — mapping which interaction patterns were worth borrowing and which needed to be rethought for the luxury co-ownership context. The result was a design that felt familiar without feeling derivative.`,
    tldr: '"Airbnb feel, Sleeper vibe" — I audited both apps screen by screen and mapped which patterns to borrow and which to rethink for a luxury context.',
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `The guiding principle was cognitive familiarity. When users open Ocho for the first time, they shouldn't need to learn a new mental model — they should feel like they already know how to use it.

The calendar-first layout came from Airbnb. Dates are the primary organizing principle for anyone managing a property, so leading with the calendar wasn't a stylistic choice — it was an information architecture decision. Everything else — expenses, ownership details, draft mechanics — branched from that central timeline.

The draft interface borrowed Sleeper's clarity. Sleeper works because it makes complex draft mechanics feel simple and legible at a glance. I applied that same principle to the week-selection flow: clear visual states for available, claimed, and pending weeks, with the snake draft order surfaced contextually rather than buried in settings.

The premium feel the client wanted came from restraint. Dark surfaces, refined typography, and a minimal color system — enough to signal luxury without competing with the property photography that would populate the real product.`,
    tldr: 'Calendar-first IA from Airbnb, draft clarity from Sleeper — cognitive familiarity was the north star so users felt like they already knew the app on first open.',
  },
  system: {
    title: 'Design system',
    content: `Given the timeline, the design system was intentionally minimal — functional rather than comprehensive. The goal was to eliminate duplicate work across screens, not to build something presentation-ready.

I established a core component library in Figma covering the elements that repeated most often: navigation, cards, calendar states, buttons, and form inputs. Each component had variants for its key states — default, active, disabled, loading — so the prototype could communicate real interactive behavior without needing to design every state from scratch.

The color system was simple: a primary dark surface, a warm neutral for secondary surfaces, and a single accent color for interactive elements and ownership indicators. Typography was a two-weight system — a display weight for headings and a regular weight for body and labels.

It wasn't a full design system. It was enough of a system to build a coherent product and give the dev team a consistent foundation to work from.`,
    tldr: 'Intentionally minimal system — just enough components and variants to eliminate duplicate work and give the dev team a consistent foundation to build from.',
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `The deliverable was an interactive high-fidelity Figma prototype covering the core ownership flows: property overview, calendar booking, expense tracking, and the snake draft interface.

The client's internal dev team is actively building from it. I didn't have direct contact with the end client — the feedback came through Design Silk — and the signal was positive. No revision requests, no clarifying questions on the prototype flows. The handoff was clean enough that the dev team could start building without needing a design walkthrough.

The prototype hit the deadline. Given the timeline pressure, that was the primary success metric, and we cleared it.`,
    tldr: 'Interactive high-fi prototype delivered on deadline — dev team started building immediately with no clarifying questions needed.',
  },
  reflections: {
    title: 'Reflections',
    content: `The honest reflection on this project is about bandwidth. The turnaround was tight and I felt it — not in the quality of the prototype, but in the exploration phase. I designed fewer options than I would have liked and moved to execution faster than felt comfortable.

That's sometimes the right call on MVP work. But I would have benefited from even one more round of concept exploration on the draft interface specifically. The solution I landed on works — but I'm not certain it's the best version of that interaction, and I didn't have the time to find out.

On the design system: I'd formalize it earlier next time. The component library I built was functional but thin, and I could feel myself making one-off decisions in later screens that should have been systematized from the start. A tighter system upfront saves time downstream, even on short engagements.

The broader lesson is about scoping. MVP doesn't mean low quality — it means high focus. Next time I'd be more explicit upfront about what the system needs to cover and what it intentionally doesn't, so the client knows exactly what they're getting and what they'll need to build out during development.`,
    tldr: "Moved to execution faster than felt comfortable — I'd push for one more exploration round on the draft interface and formalize the system earlier next time.",
  },
}

const PORTFOLIO_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `This portfolio is a product. Not a PDF, not a scrolling list of projects — a segmented web application designed to solve a real problem I kept running into as a multi-disciplinary designer applying to different kinds of roles.\n\nI built it using Claude, Cursor, GitHub, and Vercel. My coding ability was limited before this project. What I had was a clear problem, a structured design process, and enough determination to figure out the tools as I went. The result is a live Next.js application deployed at cmoffitt.com — and this case study documents the thinking behind it.`,
    tldr: 'A portfolio built as a product — segmented by audience, designed to solve a real positioning problem for a multi-disciplinary designer.',
  },
  problem: {
    title: 'Problem / challenge',
    content: `The problem was specific: I was applying to brand studios, growth marketing teams, and product design roles simultaneously. Each audience cares about completely different things. Brand directors want to see craft and taste. Performance marketers want conversion outcomes. Product teams want process and systems thinking.\n\nSending the same portfolio to all three meant one audience always saw irrelevant work — and worse, work that actively undermined my positioning. A UX hiring manager scrolling through logo work might conclude I wasn't a product thinker. A brand director seeing CRO audits might think I was too performance-focused to care about craft.\n\nThe portfolio itself was creating the wrong impression. That's a product problem, not a content problem.`,
    tldr: 'One portfolio trying to speak to three different audiences was undermining my positioning with each of them.',
  },
  research: {
    title: 'Research & discovery',
    content: `I followed Google's UX design process — empathize, define, ideate, prototype, test. I documented my research in FigJam: competitive audit of other designer portfolios, empathy mapping for the three hiring audiences, and a clear problem statement.\n\nThe core insight from the empathy work: hiring managers spend very little time on portfolios. They're not reading — they're scanning for relevance. If the first thing they see isn't relevant to what they're hiring for, they leave. A traditional portfolio with filters doesn't solve this because the framing is already wrong before they filter anything.\n\nI wrote a series of How Might We statements to push my thinking: How might we help a hiring manager immediately understand which work is relevant to them? How might we let the portfolio adapt to the viewer rather than the viewer adapting to the portfolio? That second question became the brief.`,
    tldr: 'Empathy mapping revealed that hiring managers scan, not read — the framing needed to be right before they saw a single project.',
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `The gate screen is the central design decision. Asking a visitor to self-identify before seeing any work is deliberate friction — and friction is usually the enemy of conversion. The bet was that the right visitor would appreciate being asked, and that the resulting experience would be more relevant than any generic first impression.\n\nThree segments map directly to how I actually work: Brand identity as craft foundation, Web and digital as performance execution, UX and product as systems thinking. Each segment has a distinct editorial register — Brand is a craft showcase, Web is case-study-forward with metrics, UX is process-forward with rationale.\n\nThe design system underneath stays constant across all three. Same typography, same spacing, same component patterns. The accent color and tone shift per segment. This was intentional — I wanted to demonstrate the skill directly in the portfolio itself: adapting a system to context without losing coherence.\n\nI was severely limited in coding ability before this project. Using Claude as a thinking and execution partner, Cursor for targeted code edits, and Vercel for deployment, I built something I couldn't have built alone. That workflow — knowing how to use AI as a collaborator rather than a shortcut — is itself a relevant skill for the roles I'm targeting.`,
    tldr: 'The gate screen is deliberate friction — asking visitors to self-identify creates a more relevant experience than any generic first impression.',
  },
  system: {
    title: 'Design system',
    content: `The system is driven by a single config file — segments.ts — that controls accent colors, headline copy, intro paragraphs, case study assignments, and page format per segment. Changing a segment's experience means changing one object in one file.\n\nTypography: Outfit for display, Inter for body. The gate screen uses animated word reveals and a canvas-based background with color blobs that respond to cursor movement. Segment pages use an ambient scroll-driven blob in the segment's accent color — contained to the page as a personality element rather than a UI component.\n\nThe component architecture follows the same principle as the config: reusable components that read from segment data, with visual differentiation happening at the token level rather than through parallel component trees.`,
    tldr: 'One config file drives everything — three different experiences from a single source of truth.',
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `The portfolio is live at cmoffitt.com. The gate routes visitors to one of three segment experiences based on their role. Each segment surfaces relevant case studies with appropriate framing and format. A floating segment switcher lets visitors explore other disciplines without returning to the gate.\n\nMore importantly: I shipped a real product with limited coding experience by knowing how to define the problem clearly, structure the work, and use the right tools. That process is replicable. This case study is evidence of it.`,
    tldr: 'Live at cmoffitt.com — shipped with limited coding experience by defining the problem clearly and using AI as a genuine collaborator.',
  },
  reflections: {
    title: 'Reflections',
    content: `The thing I'm most aware of looking back is how much the process discipline mattered. I knew what I was building before I touched a tool. The problem statement was clear. The audience was defined. The HMW questions pushed me toward a solution that actually addressed the root problem rather than just making a nicer-looking version of what I already had.\n\nI also learned that constraint is generative. Not knowing how to code pushed me to think more carefully about what I actually needed to build. Every technical decision had to be justified because every technical decision cost time I didn't have to waste.\n\nThis portfolio will keep evolving. The system is built to scale — adding a case study means adding one object to a config file. The design work to fill it is ongoing.`,
    tldr: 'Process discipline before tools — knowing the problem clearly made every subsequent decision faster and more defensible.',
  },
}

const LINEAR_CRO_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `Linear Design is a PPC agency helping small to mid-size businesses grow through paid search. Their landing page was the primary conversion surface for prospective clients — the first thing someone saw after clicking one of their ads. It wasn't converting at the rate it needed to.\n\nI was brought in to diagnose the problem and fix it. The scope was focused: one page, one metric, one sprint. No full redesign. No brand refresh. Just find where the page was losing people and stop it.`,
    tldr: "One page, one metric, one sprint — diagnose where a PPC agency's landing page was losing prospective clients and fix it.",
  },
  problem: {
    title: 'Problem / challenge',
    content: `The page had a 5.5% CVR. Functional, but not where it needed to be for the volume of traffic they were driving.\n\nHeatmap data told the real story: visitors were dropping off hard right after the first section. Most people never made it to the CTA. The second section had generic copy and a stock image — nothing to stop a skeptical business owner from bouncing.\n\nThe audience is the hardest possible audience for this kind of page: small business owners who have almost certainly been burned by an agency before. They're not looking for features. They're looking for a reason to believe this time will be different.`,
    tldr: "Heatmap data showed a hard drop-off after section one. The second section wasn't giving skeptical business owners a reason to stay.",
  },
  research: {
    title: 'Research & discovery',
    content: `The research tool was the heatmap. Scroll depth data showed exactly where the page was losing people. Click maps showed what they were engaging with before they left.\n\nMy hypothesis: a small business owner who clicks a PPC agency ad is already skeptical. They've seen agency pitches. Generic claims about "proven results" and "dedicated account managers" don't move them — proof does. Specifically, proof from someone who looks like them.\n\nThe second section needed to answer the question every skeptical business owner is asking: "Has this actually worked for someone in my situation?"`,
    tldr: 'The hypothesis: skeptical business owners need proof from someone like them, not generic agency claims. The second section had to answer that question.',
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `I replaced the generic second section content with a video case study from a real agency owner — someone who matched the profile of the target visitor. Placed a CTA directly above the scroll break so anyone who was mildly interested didn't have to hunt for the next step.\n\nTwo changes. That's it.\n\nThe logic: if someone sees a person like them getting results, they stay. If they stay, they convert. The video did the credibility work that copy alone couldn't. The early CTA captured intent before the visitor lost momentum.\n\nThe discipline was in not touching everything else. Changing too much would invalidate the test and make the result unattributable. One variable, measured cleanly.`,
    tldr: 'Two changes: a video case study from a real agency owner, and a CTA above the scroll break. One variable, measured cleanly.',
  },
  system: {
    title: 'Design system',
    content: `This was a CRO intervention, not a design system engagement. The constraint was staying within the existing visual system — every change had to be implementable without a full rebuild.\n\nThe discipline was knowing what not to touch. The visual design wasn't the problem. The information architecture was. Fixing the architecture within the existing visual system is a different skill than redesigning from scratch — and in many ways a harder one.`,
    tldr: "Stayed within the existing system — fixing the architecture, not the aesthetic. Knowing what not to touch is the skill.",
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `CVR from 5.5% to 9.02% in 30 days. That's a 63% increase.\n\nBounce rate dropped alongside it. The changes held — the page is still running the updated version.\n\nNot a full redesign. Two intentional changes, backed by data, executed within a 30-day sprint.`,
    tldr: '63% CVR increase in 30 days. 5.5% to 9.02%. Two changes, one sprint, still running.',
  },
  reflections: {
    title: 'Reflections',
    content: `The lesson I carry from this project is about scope as a feature, not a constraint. The instinct in design is to want to fix everything you see that isn't working. On a CRO engagement, that instinct is wrong — it creates noise that makes results unattributable and timelines unmanageable.\n\nThe 30-day window forced prioritization: what is the single highest-leverage change? Make that. Measure it. Decide what's next based on evidence rather than assumption.\n\nI'd approach every performance engagement this way going forward. Not because it's faster — though it often is — but because it produces evidence that actually teaches you something about the audience.`,
    tldr: 'Scope as a feature — a 30-day window forces you to find the single highest-leverage change instead of fixing everything you see.',
  },
}

const KIRRIN_FINCH_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `Kirrin Finch makes clothing for people who don't fit the traditional mold — gender-neutral, thoughtfully designed, with a loyal community built around authenticity. By the time I joined the account at Disruptive Advertising, they had traction and a real brand. The goal was growth past a revenue plateau.\n\nI was the designer and producer on the account, working alongside an account manager and a lifecycle marketing rep. My responsibility was the creative — static social ads and email campaigns across their paid and owned channels. I wasn't setting the business strategy, but I was directing the creative that executed it.`,
    tldr: 'Designer and producer on a gender-neutral DTC brand account — responsible for all paid social and email creative as they pushed past a revenue plateau.',
  },
  problem: {
    title: 'Problem / challenge',
    content: `Growth had stalled around $700K in revenue. The creative was functional but not converting at the rate needed to push past the plateau. The harder problem was that Kirrin Finch has a strong, specific brand identity — one that exists for a community that had been underserved by mainstream fashion. Creative that pushed too hard on conversion signals would feel off-brand. Creative that played it too safe wouldn't move the needle.\n\nThe channel mix also needed rethinking. The brand was primarily running on a narrow set of placements and hadn't seriously explored Pinterest, which turned out to be a significant missed opportunity for an apparel brand with strong lifestyle imagery.`,
    tldr: 'Revenue plateau at $700K — the challenge was building creative that converted without compromising a specific, community-driven brand identity.',
  },
  research: {
    title: 'Research & discovery',
    content: `The research was iterative and performance-driven. I looked closely at what was already running in the account — what creative was converting, what wasn't, and what patterns emerged across the pieces that worked.\n\nThe clearest signal: lifestyle photography outperformed product-only creative consistently. Both studio lifestyle and real-world contextual shots — images that showed the clothes being lived in rather than displayed — were driving stronger engagement and conversion. That became the creative direction I advocated for.\n\nFor Pinterest, the audience behavior was different. Pinterest users are actively searching, not passively scrolling. Lifestyle imagery with strong visual identity and clear product context performed well there — and the platform was underexplored by the brand, which meant lower competition for their audience.`,
    tldr: 'Lifestyle imagery consistently outperformed product-only. Pinterest was an untapped channel with strong potential for an apparel brand.',
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `My creative direction focused on three things: staying true to the brand's visual identity, leading with lifestyle over product, and testing systematically rather than guessing.\n\nFor social ads, I designed static creative that reflected the brand's community — real people, genuine contexts, the clothes worn rather than displayed. I worked with the account manager to advocate for product shoots that would give us the lifestyle assets we needed, which meant influencing the client's production decisions upstream of the design work.\n\nFor email, I partnered with the lifecycle rep on strategy and handled all design execution. I ran A/B tests constantly — safe on-brand assets vs elevated custom designs, short vs long form, different heading and CTA treatments. The testing discipline was as important as the creative quality. Every send was a question about the audience.`,
    tldr: 'Lifestyle-first creative direction, Pinterest channel expansion, and systematic A/B testing — the combination drove the revenue growth.',
  },
  system: {
    title: 'Design system',
    content: `I built production templates for both social and email that could be adapted across campaigns without rebuilding from scratch. The goal was consistency at scale — when you're producing creative across multiple campaigns and channels simultaneously, a loose system creates visual drift.\n\nThe templates stayed close to Kirrin Finch's established brand: their typography, color palette, and visual tone. My job was to push the application of the system into contexts that converted, not to redesign the brand.`,
    tldr: "Production templates for social and email — consistency at scale so the brand didn't drift across campaigns.",
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `Revenue crossed $1M. The account team credited the creative approach as a meaningful contributor to the growth.\n\nBeyond the revenue number: the lifestyle creative direction became the client's standard going forward. I was able to inform their future product shoots based on what we learned was working — which meant the creative insights had upstream impact on how they approached production, not just how they ran ads.\n\nPinterest became a meaningful channel for the brand where it previously hadn't been explored seriously.`,
    tldr: "Revenue from $700K to $1M+. Lifestyle creative became the client's standard. Pinterest unlocked as a new performing channel.",
  },
  reflections: {
    title: 'Reflections',
    content: `What I keep coming back to on this account is the relationship between brand integrity and performance. The temptation in performance marketing is to optimize everything — more hooks, more offers, more formats. That instinct is right in general and wrong for Kirrin Finch specifically.\n\nThe brand's strength is its specificity. Its community is loyal because the brand reflects them accurately. Creative that chases short-term conversion metrics at the cost of that authenticity might lift a number this quarter while eroding the thing that makes the brand worth buying from long-term.\n\nHolding that tension — being rigorous about performance while being protective of brand — is one of the harder things in this kind of work. I got better at it on this account.`,
    tldr: 'Brand specificity is a performance asset. Creative that protects the brand identity while pushing for conversion is harder than optimizing either one alone.',
  },
}

const HEYBUD_SKINCARE_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `Heybud is a skincare brand that brought me on for a three-month freelance contract to establish a creative direction for their paid social channels. My scope was specific: strategy and production of static ad creative for Meta and Pinterest.\n\nI wasn't involved in video UGC or motion production. My job was to figure out what static creative approach would perform, build it, and give them a benchmark they could take and scale.`,
    tldr: 'Three-month freelance contract — strategy and production of static paid social creative for Meta and Pinterest.',
  },
  problem: {
    title: 'Problem / challenge',
    content: `The existing creative looked like it came from a brand. That's a problem on social.\n\nSkincare buyers on Meta and Pinterest aren't in brand-discovery mode — they're scrolling. Polished product photography with clean layouts and branded text overlays signals "advertisement" immediately, which triggers the skip response before the message lands. The brand needed creative that felt like it came from a person, not a business.\n\nThe strategic question was: how do you make paid creative feel trustworthy and real without looking cheap or off-brand?`,
    tldr: "Polished brand creative was signaling 'advertisement' too early. The challenge was making paid creative feel like it came from a real person.",
  },
  research: {
    title: 'Research & discovery',
    content: `I looked at what was performing in the skincare category on both platforms. The pattern was consistent: content that looked user-created — natural lighting, real contexts, honest product use — was outperforming studio creative across the category.\n\nThe insight wasn't just "UGC performs better." It was more specific: trust is the conversion lever for skincare. A customer buying a skincare product is asking "will this actually work for someone like me?" A friend's recommendation answers that question. A brand advertisement doesn't.\n\nStatic UGC-style creative is an attempt to simulate the friend's recommendation in a paid format. The craft challenge is making it feel genuine without feeling sloppy.`,
    tldr: "Trust is the conversion lever for skincare. UGC-style creative simulates a friend's recommendation — the craft is making it feel genuine, not cheap.",
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `I directed and produced static creative that was deliberately designed to look user-made rather than brand-made. Natural lighting, real product contexts, copy that sounded like a person talking rather than a brand announcing.\n\nThe key design decision was restraint. Every instinct toward polish — cleaner layouts, branded color treatments, professional typography — worked against the goal. The creative needed to earn trust through authenticity, not impress through execution.\n\nFor Pinterest, the approach shifted slightly. Pinterest users are actively searching for solutions, so the creative could be more editorial — lifestyle framing, product in context, visual storytelling that matched the search intent rather than interrupting a scroll.`,
    tldr: 'Deliberate restraint — every move toward polish worked against the trust goal. Different approach for Pinterest to match its search-driven behavior.',
  },
  system: {
    title: 'Design system',
    content: `The deliverable wasn't just a set of ads — it was a creative framework the brand could take and replicate. I established a hierarchy: UGC-style static as the primary format for Meta, lifestyle editorial for Pinterest, polished brand creative reserved for retargeting where some trust was already established.\n\nThat framework gave Heybud a repeatable production approach. Not "make more content" but "make the right content for the right context and audience temperature."`,
    tldr: 'A creative framework by channel and audience temperature — not just ads, but a repeatable production approach they could scale.',
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `I delivered a creative benchmark across both channels — a defined visual approach and format system the brand could use to brief future production and evaluate new creative against.\n\nThe client didn't share performance metrics with me as a freelance contractor, which is common. What I know is that they had a clear creative direction they could scale coming out of the engagement, where they hadn't had one going in.\n\nFor a three-month contract with a defined scope, that's the outcome — not a revenue number, but a strategic creative foundation.`,
    tldr: 'Delivered a creative benchmark and framework the brand could scale — a strategic foundation, not just a campaign.',
  },
  reflections: {
    title: 'Reflections',
    content: `The honest limitation of this project is the absence of performance data. I don't have conversion numbers or ROAS figures. That's a real gap in the story and I won't pretend otherwise.\n\nWhat I can speak to is the strategic thinking: identifying trust as the conversion lever, building creative that addressed that insight, and establishing a framework that was bigger than any individual ad. That thinking is transferable regardless of the specific metrics.\n\nIf I were doing it again, I'd push harder for even directional performance feedback — not detailed analytics, just enough to close the loop. A three-month engagement with no feedback on outcomes is a missed learning opportunity for both sides.`,
    tldr: 'No performance data — honest limitation. The strategic thinking is the transferable value: trust as conversion lever, framework over one-off creative.',
  },
}

const ISSA_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `ISSA — the International Sports Sciences Association — is one of the largest fitness certification organizations in the world. They train and certify personal trainers, nutritionists, and strength coaches, and compete directly with ACE, NASM, and NSCA for market share in an increasingly crowded space.\n\nMy work focused on strengthening their brand image and digital presence — elevating how they showed up across digital touchpoints to better reflect the quality of their programs and the size of their organization.`,
    tldr: "One of the largest fitness certification organizations competing in a crowded market. My work focused on elevating their brand image and digital presence.",
  },
  problem: {
    title: 'Problem / challenge',
    content: `The fitness certification market is saturated and commoditized. Every brand is making similar claims — accredited programs, flexible learning, career outcomes. The actual product differences are often subtle. In that environment, brand does most of the differentiation work.\n\nISSA had the product. What they needed was a visual identity and digital presence that communicated the authority of their organization without feeling corporate or inaccessible. The challenge was premium without cold, authoritative without stiff.`,
    tldr: "In a commoditized market, brand does the differentiation work. ISSA needed to feel authoritative and premium without becoming cold or corporate.",
  },
  research: {
    title: 'Research & discovery',
    content: `I audited the category — NASM, ACE, NSCA, and several smaller players. The visual language was remarkably consistent: stock photography of muscular athletes, blue or orange color palettes, and a general aesthetic that communicated fitness rather than expertise.\n\nThe opportunity was clear: ISSA could own "intelligent fitness professional" — a visual register that communicated depth and authority rather than just athletic aspiration. That became the strategic lens for every visual decision.`,
    tldr: 'Category audit revealed a consistent visual cliché — athletic aspiration, not expertise. The opportunity was to own "intelligent fitness professional" instead.',
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `I focused on tightening the visual language across digital — more intentional use of imagery, cleaner layouts, a brand presence that felt premium without losing approachability.\n\nImagery choices were deliberate: real instructors and students over stock athletes, expertise contexts over gym floor photography, moments that communicated learning and mastery rather than just physical achievement. The goal was to make ISSA look like the obvious choice for a serious fitness professional, not just another certification option.`,
    tldr: "Deliberate imagery choices — real instructors, expertise contexts, mastery over athletic aspiration. Premium that felt earned, not imposed.",
  },
  system: {
    title: 'Design system',
    content: `The work was executed within ISSA's existing brand framework — my role was elevating the application of the system, not rebuilding it. Consistent component usage, refined spacing, more intentional typography hierarchy across digital touchpoints.\n\nThe system improvement was in the application layer: making decisions that had previously been made casually more intentional, and documenting the reasoning so future work would maintain the elevated standard.`,
    tldr: "Elevated the application of an existing system — more intentional decisions, documented reasoning so future work maintains the standard.",
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `Stronger brand presence across the digital channels we touched. In a market where product differences are subtle, brand differentiation is the competitive lever — and ISSA's digital presence better reflected the quality and scale of their organization after the engagement.\n\nNo hard conversion metrics on this one — the outcome was brand equity, which is harder to measure and easier to feel.`,
    tldr: "Stronger digital brand presence. No hard conversion metrics — the outcome was brand equity, which is harder to measure and easier to feel.",
  },
  reflections: {
    title: 'Reflections',
    content: `The honest reflection is that brand work without metrics is uncomfortable for me. I believe in the strategic rationale here — brand differentiation matters in commoditized markets — but "it looks better" is a weaker story than "it converted X% more."\n\nWhat I'd do differently: push harder upfront for agreed-upon success metrics, even qualitative ones. Brand perception surveys, NPS data, traffic-to-conversion comparisons. Something that closes the loop. Brand work deserves evidence as much as performance work does.`,
    tldr: "Brand work without metrics is uncomfortable — I'd push harder for agreed-upon success criteria upfront, even qualitative ones. Brand work deserves evidence.",
  },
}

const BBB_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `The Better Business Bureau has one of the most recognizable brands in American business — but brand recognition doesn't automatically translate to transactions. My work focused on email marketing campaigns for their accreditation push: getting business owners to apply for BBB accreditation.\n\nThe specific challenge was re-engagement. A significant portion of their database consisted of business owners who had shown interest in accreditation at some point and gone quiet. Those warm leads were sitting unused. My job was to build campaigns that brought them back.`,
    tldr: "Email marketing for BBB's accreditation push — drip campaigns and re-engagement sequences for business owners who had gone cold.",
  },
  problem: {
    title: 'Problem / challenge',
    content: `Business owners are busy, skeptical, and bombarded with email. Generic blasts weren't cutting through. The re-engagement problem was real: people who had shown interest had gone quiet, and nobody had a clear read on what would bring them back or why they had left in the first place.\n\nThe absence of audience intelligence was the root problem. Without knowing what messaging resonated with different segments, every campaign was a guess. The goal was to build campaigns that generated that intelligence while also driving conversions.`,
    tldr: "No audience intelligence — every campaign was a guess. The goal was to build campaigns that generated insight while also driving accreditation signups.",
  },
  research: {
    title: 'Research & discovery',
    content: `The research methodology was the campaigns themselves. Rather than front-loading a formal discovery phase, I designed the email sequences as structured tests — every variable a question about the audience.\n\nWhat subject line framing got opens from business owners? Was it credibility-forward ("Trusted by 400,000 businesses") or benefit-forward ("What BBB accreditation gets you")? What send times hit business owners when they were actually reading email rather than clearing their inbox? What CTA language felt low-friction versus high-commitment?`,
    tldr: "The campaigns were the research — structured A/B tests designed to answer audience questions while also driving conversions.",
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `I built two parallel tracks: a drip sequence for new leads moving through the accreditation consideration process, and a re-engagement sequence for lapsed contacts.\n\nThe drip was progressive — each email earned the next. The first email was low-commitment: here's what accreditation means. The second introduced social proof: here's who has it. The third created urgency without being pushy: here's what you're missing. The re-engagement sequence started with acknowledgment — we know it's been a while — and rebuilt from there.`,
    tldr: "Two parallel tracks: drip for new leads (progressive, each email earns the next) and re-engagement for lapsed contacts (starts with acknowledgment).",
  },
  system: {
    title: 'Design system',
    content: `Email design for an organization like BBB requires a system that can be maintained and adapted by a team without design resources for every send. I built templates that were modular — header, body blocks, CTA, footer — so the team could assemble new emails without rebuilding from scratch.\n\nThe visual system stayed close to BBB's established brand: clean, credible, conservative. Email isn't the place to experiment with the brand — it's the place to be reliable. Trust is the product.`,
    tldr: "Modular email templates the team could maintain without design resources — reliable over experimental, because trust is the product.",
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `A clearer picture of what messaging drove business owners to take action on accreditation. The A/B testing generated audience intelligence that hadn't existed before — not just for the campaigns I built, but as a foundation for future email strategy.\n\nRe-engagement sequences revived interest from lapsed contacts who had been dormant in the database. The campaigns are still running.`,
    tldr: "Generated audience intelligence that didn't exist before — a foundation for future email strategy, not just a one-time campaign result.",
  },
  reflections: {
    title: 'Reflections',
    content: `The most valuable thing I built on this engagement wasn't a campaign — it was a testing framework. A methodology for asking questions about an audience through email and reading the answers in the data.\n\nThat framework is reusable. Any organization doing email marketing to a skeptical, low-frequency audience can apply the same approach: treat every send as a hypothesis, design for learning as much as for conversion, and let the audience tell you what they actually respond to rather than guessing.\n\nI'd bring that framework to every email engagement going forward.`,
    tldr: "The most valuable output was a testing framework, not a campaign — a reusable methodology for any organization doing email to a skeptical, low-frequency audience.",
  },
}

// ── Maps ───────────────────────────────────────────────────────────────────

const CONTENT_MAP: Record<string, typeof SKYGATE_CONTENT> = {
  'skygate-growth-strategies': SKYGATE_CONTENT,
  'rely-health': RELY_CONTENT,
  'black-coast-estates': BLACK_COAST_CONTENT,
  'portfolio-nav-system': PORTFOLIO_CONTENT,
  'linear-cro': LINEAR_CRO_CONTENT,
  'kirrin-finch': KIRRIN_FINCH_CONTENT,
  'heybud-skincare': HEYBUD_SKINCARE_CONTENT,
  'issa': ISSA_CONTENT,
  'better-business-bureau': BBB_CONTENT,
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
    { label: 'Scope', value: 'UX, Design, Build' },
    { label: 'Type', value: 'Self-initiated' },
    { label: 'Stack', value: 'Next.js + Vercel' },
  ],
  'linear-cro': [
    { label: 'Role', value: 'CRO Designer' },
    { label: 'Scope', value: 'Landing page optimization' },
    { label: 'Timeline', value: '30-day sprint' },
    { label: 'Result', value: '63% CVR increase' },
  ],
  'kirrin-finch': [
    { label: 'Role', value: 'Designer / Producer' },
    { label: 'Scope', value: 'Social ads + email' },
    { label: 'Channels', value: 'Meta, Pinterest, Email' },
    { label: 'Context', value: 'Disruptive Advertising' },
  ],
  'heybud-skincare': [
    { label: 'Role', value: 'Art Director' },
    { label: 'Scope', value: 'Static paid social creative' },
    { label: 'Channels', value: 'Meta + Pinterest' },
    { label: 'Contract', value: '3-month freelance' },
  ],
  'issa': [
    { label: 'Role', value: 'Designer' },
    { label: 'Scope', value: 'Brand + digital presence' },
    { label: 'Market', value: 'Fitness certification' },
    { label: 'Platform', value: 'Figma' },
  ],
  'better-business-bureau': [
    { label: 'Role', value: 'Designer' },
    { label: 'Scope', value: 'Email marketing' },
    { label: 'Type', value: 'Drip + re-engagement' },
    { label: 'Method', value: 'A/B testing' },
  ],
}

const IMAGE_MAP: Record<string, Record<string, string>> = {
    'skygate-growth-strategies': {
      hero: '/images/skygate/hero.jpg',
      overview: '/images/skygate/overview.jpg',
      problem: '/images/skygate/problem.jpg',
      research: '/images/skygate/research.jpg',
      decisions: '/images/skygate/decisions.jpg',
      system: '/images/skygate/system.jpg',
      outcome: '/images/skygate/outcome.jpg',
    },
    'black-coast-estates': {
      hero: '/images/black-coast/hero.jpg',
      overview: '/images/black-coast/overview.jpg',
      problem: '/images/black-coast/problem.jpg',
      research: '/images/black-coast/research.jpg',
      decisions: '/images/black-coast/decisions.jpg',
      system: '/images/black-coast/system.jpg',
      outcome: '/images/black-coast/outcome.jpg',
    },
    'portfolio-nav-system': {
      hero: '/images/portfolio/hero.jpg',
      overview: '/images/portfolio/overview.jpg',
      problem: '/images/portfolio/problem.jpg',
      research: '/images/portfolio/research.jpg',
      decisions: '/images/portfolio/decisions.jpg',
      system: '/images/portfolio/system.jpg',
      outcome: '/images/portfolio/outcome.jpg',
    },
    'linear-cro': {
      hero: '/images/linear/hero.jpg',
      overview: '/images/linear/overview.jpg',
      problem: '/images/linear/problem.jpg',
      research: '/images/linear/research.jpg',
      decisions: '/images/linear/decisions.jpg',
      system: '/images/linear/system.jpg',
      outcome: '/images/linear/outcome.jpg',
    },
    'kirrin-finch': {
      hero: '/images/kirrin/hero.jpg',
      overview: '/images/kirrin/overview.jpg',
      problem: '/images/kirrin/problem.jpg',
      research: '/images/kirrin/research.jpg',
      decisions: '/images/kirrin/decisions.jpg',
      system: '/images/kirrin/system.jpg',
      outcome: '/images/kirrin/outcome.jpg',
    },
    'heybud-skincare': {
      hero: '/images/heybud/hero.jpg',
      overview: '/images/heybud/overview.jpg',
      problem: '/images/heybud/problem.jpg',
      research: '/images/heybud/research.jpg',
      decisions: '/images/heybud/decisions.jpg',
      system: '/images/heybud/system.jpg',
      outcome: '/images/heybud/outcome.jpg',
    },
  }

const SECTION_KEYS = [
  'overview', 'problem', 'research', 'decisions', 'system', 'outcome', 'reflections',
] as const

type SectionKey = typeof SECTION_KEYS[number]

// ── Lightbox ───────────────────────────────────────────────────────────────

function Lightbox({ src, alt, onClose }: {
  src: string
  alt: string
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        cursor: 'zoom-out',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <button
        ref={closeRef}
        aria-label="Close image"
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          cursor: 'pointer',
          color: '#fff',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
      >
        <span aria-hidden="true">×</span>
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          borderRadius: '8px',
          objectFit: 'contain',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          animation: 'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </div>
  )
}

// ── Image or placeholder ───────────────────────────────────────────────────

function ImageOrPlaceholder({ src, alt, style, label, clickable = false }: {
  src?: string
  alt: string
  style?: React.CSSProperties
  label: string
  clickable?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (src) {
    return (
      <>
        <div
          role={clickable ? 'button' : undefined}
          tabIndex={clickable ? 0 : undefined}
          onMouseEnter={() => clickable && setHovered(true)}
          onMouseLeave={() => clickable && setHovered(false)}
          onClick={() => clickable && setLightboxOpen(true)}
          onKeyDown={clickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxOpen(true) } } : undefined}
          aria-label={clickable ? `View full size: ${alt}` : undefined}
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: clickable ? 'zoom-in' : 'default',
            border: '1px solid #e0e0de',
            ...style,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          {clickable && hovered && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                background: 'rgba(0,0,0,0.7)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
            </div>
          )}
        </div>
        {lightboxOpen && (
          <Lightbox src={src} alt={alt} onClose={() => setLightboxOpen(false)} />
        )}
      </>
    )
  }

  return (
    <div style={{
      width: '100%',
      aspectRatio: '16/9',
      background: '#f0f2f5',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #f0f0f0',
      ...style,
    }}>
      <span style={{
        fontSize: '11px',
        color: '#ccc',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        fontWeight: 600,
      }}>
        {label}
      </span>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const project = CASE_STUDIES.find(c => c.slug === slug)
  const [activeSection, setActiveSection] = useState<SectionKey>('overview')
  const [tldr, setTldr] = useState(false)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    if (!project || project.hidden) {
      router.replace('/')
    }
  }, [project, router])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id as SectionKey)
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

  if (!project || project.hidden) return null

  const segment = SEGMENTS[project.primarySegment]
  const tagBg = project.primarySegment === 'web'
    ? '#FEF0EE'
    : project.primarySegment === 'brand'
    ? '#F3EEF8'
    : '#EFF6FF'
  const content = CONTENT_MAP[slug] ?? null
  const meta = META_MAP[slug] ?? [
    { label: 'Role', value: 'Designer' },
    { label: 'Scope', value: 'Design' },
    { label: 'Platform', value: 'Figma' },
    { label: 'Status', value: 'Coming soon' },
  ]
  const images = IMAGE_MAP[slug] ?? {}

  return (
    <>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { transform: scale(0.94); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        @media (max-width: 768px) {
          .case-sidebar { display: none !important; }
          .case-mobile-nav { display: flex !important; }
          .case-main { padding: 32px 20px 120px !important; }
        }
        @media (max-width: 600px) {
          .tldr-grid { grid-template-columns: 1fr !important; }
          .tldr-image { max-width: 240px; margin: 8px auto 0; }
        }
      `}</style>

      {/* Mobile nav — sticky */}
      <div
        className="case-mobile-nav"
        style={{
          display: 'none',
          padding: '12px 20px',
          borderBottom: '1px solid #f0f0f0',
          overflowX: 'auto',
          gap: '4px',
          position: 'sticky',
          top: '57px',
          zIndex: 30,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        {SECTION_KEYS.map(key => (
          <button
            key={key}
            onClick={() => sectionRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            style={{
              flexShrink: 0,
              padding: '12px 10px',
              minHeight: '44px',
              borderRadius: '5px',
              border: 'none',
              background: activeSection === key ? '#f0f2f5' : 'none',
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
            <span aria-hidden="true">← </span>Back
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 10px',
                  minHeight: '44px',
                  borderRadius: '6px',
                  border: 'none',
                  background: isActive ? '#f0f2f5' : 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? segment.accentColor : '#888',
                  transition: 'all 0.15s ease',
                  borderLeft: `2px solid ${isActive ? segment.accentColor : 'transparent'}`,
                }}
              >
                {isActive && (
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: segment.gradient,
                    flexShrink: 0,
                    display: 'inline-block',
                  }} />
                )}
                {content ? content[key].title : key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            )
          })}
        </aside>

        {/* Main content */}
        <main
          className="case-main"
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            padding: '48px 40px 120px',
          }}
        >
          <div style={{ width: '100%', maxWidth: '720px' }}>

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
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#1a1a1a',
                marginBottom: '12px',
                fontFamily: "'Outfit', sans-serif",
              }}>
                {project.title}
              </h1>

              <p style={{
                fontSize: '16px',
                color: '#9b9b9b',
                lineHeight: 1.5,
                marginBottom: '32px',
              }}>
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
            <ImageOrPlaceholder
              src={images.hero}
              alt={`${project.title} hero`}
              label="Hero image"
              style={{ marginBottom: '72px' }}
            />

            {/* Sections */}
            {SECTION_KEYS.map((key, i) => {
              const section = content
                ? content[key]
                : { title: key.charAt(0).toUpperCase() + key.slice(1), content: 'Content coming soon.', tldr: 'Content coming soon.' }
              const hasImage = i < SECTION_KEYS.length - 1

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
                      fontWeight: 400,
                      color: '#1a1a1a',
                      letterSpacing: '-0.02em',
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      {section.title}
                    </h2>
                  </div>

                  {tldr ? (
                    <div
                      className="tldr-grid"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: hasImage ? '1fr 180px' : '1fr',
                        gap: '24px',
                        alignItems: 'center',
                      }}
                    >
                      <p style={{
                        fontSize: '16px',
                        color: '#1a1a1a',
                        lineHeight: 1.75,
                        fontWeight: 500,
                        borderLeft: `3px solid ${segment.accentColor}`,
                        paddingLeft: '16px',
                        margin: 0,
                      }}>
                        {section.tldr}
                      </p>
                      {hasImage && (
                        <div className="tldr-image">
                          <ImageOrPlaceholder
                            src={images[key]}
                            alt={`${project.title} — ${section.title}`}
                            label={section.title}
                            style={{ borderRadius: '6px' }}
                            clickable
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
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
                      {hasImage && (
                        <ImageOrPlaceholder
                          src={images[key]}
                          alt={`${project.title} — ${section.title}`}
                          label={`${section.title} — image`}
                          style={{ marginTop: '32px' }}
                        />
                      )}
                    </>
                  )}
                </div>
              )
            })}

            {/* Footer */}
            <div style={{
              marginTop: '48px',
              paddingTop: '40px',
              borderTop: '1px solid #f0f0f0',
            }}>
              <ContactCta variant="compact" accentColor={segment.accentColor} />
            </div>
            <div style={{
              marginTop: '32px',
              paddingTop: '32px',
              borderTop: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
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
                <span aria-hidden="true">← </span>Back to {segment.label}
              </button>
              <p style={{ fontSize: '12px', color: '#ccc' }}>More projects coming</p>
            </div>

          </div>
        </main>
      </div>

      {/* Floating read mode toggle */}
      {content && (
        <div
          role="group"
          aria-label="Reading mode"
          style={{
            position: 'fixed',
            bottom: 'max(32px, env(safe-area-inset-bottom, 32px))',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            display: 'flex',
            background: '#ffffff',
            borderRadius: '999px',
            padding: '4px',
            gap: '2px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
          }}
        >
          <button
            onClick={() => setTldr(false)}
            aria-pressed={!tldr}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              background: !tldr ? '#f0f2f5' : 'transparent',
              color: !tldr ? '#1a1a1a' : '#aaa',
              transition: 'all 0.2s ease',
              letterSpacing: '0.01em',
            }}
          >
            <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Full read
          </button>
          <button
            onClick={() => setTldr(true)}
            aria-pressed={tldr}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              background: tldr ? segment.accentColor : 'transparent',
              color: tldr ? '#fff' : '#aaa',
              transition: 'all 0.2s ease',
              letterSpacing: '0.01em',
            }}
          >
            <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Key points
          </button>
        </div>
      )}

    </>
  )
}