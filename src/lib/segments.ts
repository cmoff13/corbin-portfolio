export type SegmentId = 'brand' | 'web' | 'ux'

export interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  primarySegment: SegmentId
  alsoIn: SegmentId[]
  tags: string[]
}

export interface Segment {
  id: SegmentId
  label: string
  shortLabel: string
  gateTitle: string
  gateSub: string
  headline: string[]
  intro: string
  accentColor: string
  accentColorHover: string
  caseStudies: string[]
  format: 'craft-grid' | 'case-study' | 'process'
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'skygate-growth-strategies',
    title: 'Skygate Growth Strategies',
    subtitle: 'Brand system + Webflow build, 0→1',
    primarySegment: 'brand',
    alsoIn: ['web'],
    tags: ['Brand system', 'Webflow', 'Landing page', 'Design system'],
  },
  {
    slug: 'rely-health',
    title: 'Rely Health',
    subtitle: 'Humanizing healthcare AI with website redesign',
    primarySegment: 'brand',
    alsoIn: ['web'],
    tags: ['Visual identity', 'Website redesign', 'Healthcare'],
  },
  {
    slug: 'black-coast-estates',
    title: 'Black Coast Estates',
    subtitle: 'Co-ownership property management app — Ocho',
    primarySegment: 'ux',
    alsoIn: [],
    tags: ['UX/UI', 'App design', 'IA', 'Figma prototype'],
  },
  {
    slug: 'printscan-cro-audit',
    title: 'PrintScan CRO Audit',
    subtitle: 'Conversion audit for Live Scan Fingerprinting landing page',
    primarySegment: 'web',
    alsoIn: [],
    tags: ['CRO', 'Landing page', 'Conversion', 'Audit'],
  },
  {
    slug: 'portfolio-nav-system',
    title: 'This Portfolio',
    subtitle: 'Book navigation system — a self-initiated UX case study',
    primarySegment: 'ux',
    alsoIn: [],
    tags: ['UX', 'IA', 'Navigation design', 'Self-initiated'],
  },
]

export const SEGMENTS: Record<SegmentId, Segment> = {
  brand: {
    id: 'brand',
    label: 'Brand identity',
    shortLabel: 'Brand',
    gateTitle: 'Brand identity',
    gateSub: 'Logos, systems, craft',
    headline: ['The foundation.', 'Years before the systems.'],
    intro: 'Before landing pages and product flows, there were marks. Logos for businesses being named for the first time. Type systems built from scratch. Illustration and vector work that had to hold up at every scale. This is where the eye came from — years of brand craft across Five18 Designs, Northstar, and freelance work that never made it to a case study but never left the work either.',
    accentColor: '#993C1D',
    accentColorHover: '#712B13',
    caseStudies: ['skygate-growth-strategies', 'rely-health'],
    format: 'craft-grid',
  },
  web: {
    id: 'web',
    label: 'Web & digital',
    shortLabel: 'Web',
    gateTitle: 'Web & digital',
    gateSub: 'Pages, CRO, performance',
    headline: ['Design that earns', 'its keep on the page.'],
    intro: "Most designers stop at how it looks. The work here goes further — landing pages built around message match, conversion audits that diagnose why a page isn't performing, ad creative systems designed to scale. Seven years at the intersection of brand craft and performance marketing, including four years producing and auditing work at Disruptive Advertising across dozens of DTC and ecom brands.",
    accentColor: '#0F6E56',
    accentColorHover: '#085041',
    caseStudies: ['printscan-cro-audit', 'skygate-growth-strategies', 'rely-health'],
    format: 'case-study',
  },
  ux: {
    id: 'ux',
    label: 'UX & product',
    shortLabel: 'UX',
    gateTitle: 'UX & product',
    gateSub: 'Flows, IA, interaction',
    headline: ['Thinking in flows,', 'not just screens.'],
    intro: 'Good UX is invisible. The user never notices the decision hierarchy, the cognitive load trade-offs, or the three flows that got cut before the one that shipped. This section documents the thinking — wireframes, IA maps, interaction decisions, and the rationale behind them. Brand craft informs the output. Systems thinking drives the process.',
    accentColor: '#534AB7',
    accentColorHover: '#3C3489',
    caseStudies: ['black-coast-estates', 'portfolio-nav-system'],
    format: 'process',
  },
}

export const GATE_COPY = {
  eyebrow: 'Corbin Moffitt — Designer',
  headline: 'Seven years of design.\nThree ways to see it.',
  subhead: "Pick the work that's relevant to you. Everything else stays out of the way.",
  skipLabel: 'See everything →',
}

export const ABOUT_COPY = {
  bio: 'Corbin Moffitt is a designer with seven years across brand identity, web, and performance marketing. Based in Hawaii. Currently open to senior design roles and select freelance.',
  contactCta: 'Working on something?',
  contactEmail: 'cmoff13@gmail.com',
}