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
    content: `This portfolio is a self-initiated product — designed, built, and shipped by one person to solve a problem I kept running into personally.

After years of applying to a mix of brand, web, and UX/product roles, I noticed a pattern: the same portfolio was landing differently depending on who was reading it. Brand studios wanted to see craft and visual systems. Growth teams wanted conversion thinking. Product teams wanted process and rationale. One portfolio trying to speak to all three audiences was serving none of them well.

The insight wasn't complicated: most portfolios are organized around the designer. This one is organized around the viewer. Three segments, each speaking a different language, built on one unified design system underneath.`,
    tldr: 'Self-initiated product solving a real personal problem — one portfolio speaking to brand, web, and UX audiences simultaneously was serving none of them well.',
  },
  problem: {
    title: 'Problem / challenge',
    content: `The problem had two sides.

On the applicant side: sending the same portfolio to a brand studio and a SaaS product team means one of them is always seeing irrelevant work. Worse, they're seeing work that actively undermines your positioning — a UX hiring manager looking at logo work might conclude you're not a product thinker. A brand director looking at CRO audits might conclude you're too performance-focused. The portfolio becomes a liability.

On the reviewer side: hiring managers spend an average of a few minutes on a portfolio. If the first thing they see isn't relevant to what they're hiring for, they're gone. There's no mechanism in a traditional portfolio to say "this section is for you specifically."

The design challenge was building something that felt tailored without being fragmented — a portfolio that adapts to its audience while still communicating a coherent design identity.`,
    tldr: "A generic portfolio actively undermines positioning — a UX manager seeing logo work concludes you're not a product thinker. The design challenge: tailored without being fragmented.",
  },
  research: {
    title: 'Research & discovery',
    content: `The research was personal. Seven years of job applications, freelance pitches, and client conversations gave me a clear picture of what different audiences actually respond to.

Brand roles care about the eye — does this person have taste? Can they build a visual system? Web and growth roles care about outcomes — does this person understand conversion? Can they connect design decisions to business results? UX and product roles care about thinking — does this person have a process? Can they articulate why they made a decision?

Those three questions became the brief for three distinct segment experiences. Not three different portfolios — three different editorial registers built on the same design foundation.

I also looked at how other multi-disciplinary designers positioned themselves. The most common approach was a single portfolio with category filters. That solves the content problem but not the framing problem — the visitor still lands in a generic context before finding relevant work. The segment gate solves both: the framing is set before a single project is shown.`,
    tldr: 'Seven years of applications distilled into three audience questions — brand asks about taste, web asks about outcomes, UX asks about process. Those became the three segments.',
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `The gate screen was the most important design decision in the project. It had to do something unusual: ask the visitor to self-select before showing them anything. That's friction by design — and friction is usually the enemy of conversion. The bet was that the right visitor would appreciate being asked, and that the resulting experience would be more relevant than any generic first impression.

The three-segment structure maps directly to how I actually work: brand identity as craft foundation, web and digital as performance execution, UX and product as systems thinking. The segments aren't marketing categories — they're real disciplines with real differences in how the work should be presented.

Each segment has a distinct format language. Brand is a craft showcase — dense artifact grid, hover reveals, no case study narrative required. Web is case-study-forward with conversion metrics and outcomes. UX is process-forward — wireframes, decisions, rationale before final screens.

The design system underneath stays constant. Same typography, same spacing, same component patterns. The accent color and editorial register shift per segment. The goal was to demonstrate the skill directly in the portfolio itself: adapting a system to context without losing coherence.

AI was used deliberately throughout the build. Claude helped architect the data model, write and refine case study copy, generate component code, and pressure-test design decisions. That's not a shortcut — it's a workflow. Knowing how to use AI as a design and development collaborator is a skill the industry is actively looking for, and this project is evidence of it.`,
    tldr: "The gate screen is friction by design — the bet was that the right visitor would appreciate being asked, and the tailored experience would outperform any generic first impression.",
  },
  system: {
    title: 'Design system',
    content: `The design system had to serve three audiences simultaneously — which meant it had to be flexible enough to feel different per segment without requiring three separate codebases.

The solution was a token-based approach in code. A single segments.ts config file drives everything: accent colors, headline copy, intro paragraphs, case study assignments, and page format. Changing a segment's experience means changing one object in one file. That's the kind of scalable thinking that separates a design system from a collection of screens.

The component architecture follows the same principle. The gate screen, segment pages, case study template, and navigation are all built as reusable components that read from the segment config. The visual differentiation happens at the token level — not by maintaining parallel component trees.

Typography is Outfit + Inter — clean, neutral, system-native. The gate screen uses animated word reveals and a canvas-based background with magnetic color blobs that respond to cursor movement. The rest of the site is deliberately restrained — Notion-inspired whitespace, subtle UI elements, accent color as the primary differentiator.`,
    tldr: 'One segments.ts config file drives everything — accent colors, copy, case study assignments, page format. Three different experiences from a single source of truth.',
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `The portfolio shipped as a live Next.js application deployed on Vercel. It's the site you're reading right now.

The gate screen routes visitors to one of three segment experiences based on their role. Each segment surfaces relevant case studies, uses appropriate copy and framing, and presents work in the format that audience expects. The floating segment switcher lets visitors explore other disciplines without returning to the gate.

The case study template includes a sticky left navigation, section-by-section content, meta information, and real project assets. The entire content layer is driven by a single config file — adding a new case study means adding an object, not rebuilding a page.

This is a living project. New projects will be added as they ship. The system is built to scale.`,
    tldr: "Live Next.js app on Vercel — the site you're reading right now. Built to scale: adding a case study means adding one object to a config file.",
  },
  reflections: {
    title: 'Reflections',
    content: `The most interesting thing about building your own portfolio is that you're the client, the designer, and the user simultaneously. That's a strange position — you have no brief to push back against, no stakeholder to align with, and no external constraint to blame when a decision doesn't land.

What I learned: constraint is generative. The decisions I'm most confident about — the three-segment structure, the gate screen format, the Notion-inspired design system — all came from forcing myself to define the problem precisely before touching a tool.

The AI-assisted workflow was genuinely new for me on this project. Using Claude as a collaborator for architecture decisions, copy drafts, and component generation changed how I think about the design-to-build pipeline. It's not about generating output — it's about having a thinking partner that responds to specifics. The quality of the prompt is the quality of the work.

What I'd do differently: start with real content earlier. The system is solid. The content is the work.`,
    tldr: "Being your own client is strange — constraint is generative. The AI workflow changed how I think about design-to-build. The system is solid; real content is what's left.",
  },
}

const LINEAR_CRO_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `Linear Design is a PPC agency helping small to mid-size businesses grow through paid search. Their landing page was the first thing prospective clients saw after clicking an ad — and it wasn't converting well enough. I was brought in to diagnose the problem and fix it.\n\nThe engagement was focused: one page, one metric, one sprint. No full redesign, no brand refresh. Just figure out where the page was losing people and make it stop.`,
    tldr: "One landing page, one metric, one sprint — figure out where the page was losing people and fix it.",
  },
  problem: {
    title: 'Problem / challenge',
    content: `The page had a 5.5% CVR. Not terrible, but not where it needed to be. Heatmap data told the real story: visitors were dropping off hard right after the first section. Most people never made it to the CTA.\n\nThe second section had generic copy and a stock image. Nothing to stop a skeptical business owner from bouncing. For someone evaluating whether to trust an agency with their ad budget, "nice design" isn't enough. They need a reason to believe.`,
    tldr: "Heatmap data showed a hard drop-off after the first section. Most visitors never reached the CTA — the second section wasn't giving skeptical business owners a reason to stay.",
  },
  research: {
    title: 'Research & discovery',
    content: `The research tool was the heatmap. I didn't need a formal discovery phase — the data showed exactly where the problem was. The question was why.\n\nMy hypothesis: a business owner who clicks a PPC agency ad is already skeptical. They've seen dozens of agency pitches. Generic claims don't move them — proof does. The second section needed to function as a trust accelerator, not a feature list.`,
    tldr: "The heatmap showed where. The hypothesis was why: skeptical business owners need proof, not feature lists. The second section had to become a trust accelerator.",
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `I replaced the second section's generic content with a video case study from a real agency owner — someone in the same position as the visitor. Placed a CTA directly above the scroll break so anyone mildly interested didn't have to hunt for the next step.\n\nThe logic was simple: if someone sees a person like them getting results, they stay. If they stay, they convert. The video did the credibility work that copy couldn't.`,
    tldr: "Replaced generic content with a video case study from a real agency owner and moved the CTA above the scroll break. Social proof does what copy can't.",
  },
  system: {
    title: 'Design system',
    content: `This wasn't a design system engagement — it was a targeted CRO intervention. The constraint was staying within the existing visual system. Every change had to be implementable without a full rebuild.\n\nThe discipline was in knowing what not to touch. Changing too much would invalidate the test. The goal was one clear variable: did the new section drive more conversions?`,
    tldr: "Stayed within the existing system — one clear variable so the results were attributable. Discipline is knowing what not to touch.",
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `CVR went from 5.5% to 9.02% in 30 days. That's a 63% increase. Bounce rate dropped alongside it.\n\nNot a full redesign. One intentional section change, backed by data. The page is still running.`,
    tldr: "63% CVR increase in 30 days. 5.5% to 9.02%. One section change backed by heatmap data.",
  },
  reflections: {
    title: 'Reflections',
    content: `The lesson here is about scope. The instinct in design is to want to fix everything you see. On a CRO engagement, that instinct is wrong — it creates noise that makes results unattributable.\n\nThe 30-day window was a constraint that made the work better. It forced prioritization: what's the single highest-leverage change? Make that. Measure it. Then decide what's next.\n\nI'd approach every performance engagement this way going forward — not because it's faster, but because it produces cleaner evidence.`,
    tldr: "The constraint made the work better — a 30-day window forces you to identify the single highest-leverage change instead of fixing everything you see.",
  },
}

const KIRRIN_FINCH_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `Kirrin Finch makes clothing for people who don't fit the traditional mold — gender-neutral, thoughtfully designed, built for a community that had been underserved by mainstream fashion. By the time I joined the account, they had traction. Revenue was around $700K. The goal was growth.\n\nI was the designer and producer on the account, working alongside an account manager and a lifecycle marketing rep. My job was the creative — static social ads and email campaigns. Strategy came from the team. Execution came from me.`,
    tldr: "Gender-neutral DTC brand with traction but stalled growth. I was the designer and producer — static social ads and email campaigns, built to convert.",
  },
  problem: {
    title: 'Problem / challenge',
    content: `Growth had plateaued. The creative wasn't converting at the rate the brand needed to scale past $700K.\n\nThe harder problem was maintaining brand integrity while pushing for performance. Kirrin Finch has a strong visual identity — specific, intentional, built around a community. Creative that pushed too hard on conversion signals risked feeling off-brand. Creative that stayed too safe wouldn't move the needle.`,
    tldr: "Growth plateaued at $700K. The challenge was building creative that converted without compromising a strong, specific brand identity.",
  },
  research: {
    title: 'Research & discovery',
    content: `The research was iterative. I looked at what creative was already performing in account and what wasn't. The patterns were clear enough: the audience responded to authenticity — real people, real clothes, real context. Overly polished creative felt out of place for the brand and its community.\n\nI also paid close attention to the audience. Kirrin Finch's customers know who they are. The creative needed to reflect that back, not perform for them.`,
    tldr: "Iterative research from existing creative performance. The audience responded to authenticity — real people, real context. Polished creative felt wrong for this community.",
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `I focused on clean, on-brand static creative that matched the brand's visual identity while being structured to convert. Copy hierarchy, visual contrast, CTA placement — all of it was deliberate.\n\nFor email, I worked with the lifecycle rep on sequencing and timing. My job was to make sure the creative matched the intent at every touchpoint — welcome series, promotional campaigns, re-engagement. The design system across email and social stayed consistent so the brand felt cohesive regardless of where someone encountered it.`,
    tldr: "Clean, on-brand static creative structured to convert — deliberate copy hierarchy, visual contrast, CTA placement. Consistent design language across email and social.",
  },
  system: {
    title: 'Design system',
    content: `The brand system was established — my job was to work within it and push it where it needed to go. I built templates for both social and email that could be adapted across campaigns without rebuilding from scratch each time.\n\nThe goal was consistency at scale. When you're producing creative across multiple campaigns and channels simultaneously, a loose system creates visual drift. A tight system lets you move fast without losing the brand.`,
    tldr: "Built production templates for social and email — consistency at scale so the brand didn't drift across campaigns and channels.",
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `Revenue crossed $1M. The account team credited the creative conversion rates as a meaningful contributor to the growth.\n\nFor me, the win was proving that brand-quality creative and performance outcomes aren't mutually exclusive. You don't have to sacrifice the brand to make creative that converts.`,
    tldr: "Revenue scaled from $700K to $1M+. Brand-quality creative and performance outcomes aren't mutually exclusive — this proved it.",
  },
  reflections: {
    title: 'Reflections',
    content: `The thing I think about most from this account is the relationship between brand and performance. The instinct in performance marketing is to optimize everything — test more hooks, more formats, more offers. That instinct is right in general and wrong for a brand like Kirrin Finch specifically.\n\nThe brand's strength is its specificity. That specificity is what makes the community loyal. Creative that dilutes that specificity might lift a short-term metric while eroding the thing that makes the brand worth buying from. Holding that tension thoughtfully is one of the harder things in performance creative work.`,
    tldr: "Brand specificity is a performance asset, not a constraint — creative that dilutes it might lift a short-term metric while eroding long-term loyalty.",
  },
}

const HEYBUD_SKINCARE_CONTENT = {
  overview: {
    title: 'Overview & context',
    content: `Heybud is a skincare brand testing paid social channels — Meta and Pinterest — to find where their audience lived and what kind of creative they responded to. I led art direction across both channels.\n\nThe brief was open enough to be interesting: figure out what works. That meant testing different creative approaches, reading the results, and adjusting.`,
    tldr: "Skincare brand testing paid social on Meta and Pinterest. I led art direction — the brief was open: figure out what works.",
  },
  problem: {
    title: 'Problem / challenge',
    content: `The existing creative was polished. Too polished. High-end product photography, clean layouts, aspirational imagery — the kind of creative that looks great in a brand deck and underperforms in a feed.\n\nSkincare buyers on Meta and Pinterest aren't looking for a photoshoot. They're looking for something that feels real. The brand's assets communicated premium but not relatable, and relatable is what converts on social.`,
    tldr: "Polished product photography underperformed in social feeds. The brand communicated premium but not relatable — and relatable is what converts.",
  },
  research: {
    title: 'Research & discovery',
    content: `I looked at what was performing in the skincare category on both platforms. The pattern was consistent: UGC-style content — real people, natural lighting, honest framing — was outperforming studio creative across the category.\n\nPinterest and Meta behave differently. Pinterest is search-driven — people are looking for solutions, not just scrolling. The creative strategy needed to reflect that: more context, more lifestyle framing, more "here's why this works" energy. Meta rewards the thumb-stop — the first frame has to earn the watch.`,
    tldr: "Category research confirmed UGC outperformed studio creative. Pinterest needed solution-framing; Meta needed a thumb-stop first frame. Different platforms, different strategies.",
  },
  decisions: {
    title: 'Design decisions & rationale',
    content: `We shifted to UGC-style creative across Meta — real people, natural lighting, honest product use. I directed the visual approach: the goal was authentic, not cheap. There's a meaningful difference between lo-fi that feels genuine and lo-fi that feels sloppy. The craft was in making it look effortless.\n\nOn Pinterest, I focused on lifestyle imagery that fit the platform's search-heavy behavior — more context around the product, more visual storytelling, less direct-response energy.`,
    tldr: "UGC-style on Meta — authentic not cheap, effortless not sloppy. Pinterest got lifestyle framing to match its search-driven behavior.",
  },
  system: {
    title: 'Design system',
    content: `The creative system that emerged from this work was a hierarchy: UGC-style as the primary format for Meta, lifestyle for Pinterest, with polished brand creative reserved for retargeting where trust was already partially established.\n\nThat framework gave the brand a repeatable production approach — not "make more content" but "make the right content for the right context."`,
    tldr: "Built a channel-specific creative hierarchy — UGC for Meta, lifestyle for Pinterest, polished for retargeting. Right content for the right context.",
  },
  outcome: {
    title: 'Final outcome & delivery',
    content: `UGC-style creative outperformed polished product shots. Not close. Meta was the stronger performing channel for the brand.\n\nThe learnings gave Heybud a repeatable creative playbook — a framework for production that didn't require starting from scratch every campaign.`,
    tldr: "UGC won decisively. Meta was the stronger channel. The brand left with a repeatable creative playbook instead of a one-off campaign.",
  },
  reflections: {
    title: 'Reflections',
    content: `The lesson I keep coming back to from this account is that "elevated" means different things in different contexts. Elevated for a skincare brand in a paid social feed doesn't mean studio photography — it means UGC that's been thoughtfully directed. The authenticity is the elevation.\n\nI'd push even harder on the Pinterest strategy next time. The platform has a different creative language than Meta and I think there was more to explore there — longer-form content, more editorial framing, leaning into the search intent more explicitly.`,
    tldr: '"Elevated" is context-dependent — in paid social, elevated UGC beats polished studio. Pinterest had more to explore and I\'d go deeper there next time.',
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
    { label: 'Scope', value: 'Product thinking, Design, Build' },
    { label: 'Type', value: 'Self-initiated' },
    { label: 'Stack', value: 'Next.js + Vercel' },
  ],
  'linear-cro': [
    { label: 'Role', value: 'Designer / CRO' },
    { label: 'Scope', value: 'Landing page optimization' },
    { label: 'Timeline', value: '30-day sprint' },
    { label: 'Tools', value: 'Figma + Heatmaps' },
  ],
  'kirrin-finch': [
    { label: 'Role', value: 'Designer / Producer' },
    { label: 'Scope', value: 'Social ads + email' },
    { label: 'Client type', value: 'DTC ecommerce' },
    { label: 'Channels', value: 'Meta + Email' },
  ],
  'heybud-skincare': [
    { label: 'Role', value: 'Art Director' },
    { label: 'Scope', value: 'Paid social creative' },
    { label: 'Channels', value: 'Meta + Pinterest' },
    { label: 'Approach', value: 'UGC + lifestyle' },
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
      background: '#f7f7f5',
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
  const [tldr, setTldr] = useState(true)
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

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
                  background: isActive ? '#f5f5f2' : 'none',
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
              background: !tldr ? '#f5f5f2' : 'transparent',
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