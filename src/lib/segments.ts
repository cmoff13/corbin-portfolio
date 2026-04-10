export type SegmentId = 'brand' | 'web' | 'ux'

export interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  primarySegment: SegmentId
  alsoIn: SegmentId[]
  tags: string[]
  hidden?: boolean
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
  gradient: string
  gradientSubtle: string
  icon: string
  caseStudies: string[]
  format: 'craft-grid' | 'case-study' | 'process'
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'swift-powerwashing',
    title: 'Swift Powerwashing',
    subtitle: 'Primary mark for a residential and commercial powerwashing business.',
    primarySegment: 'brand',
    alsoIn: [],
    tags: ['Logo mark', 'Brand identity'],
  },
  {
    slug: 'mypetdx',
    title: 'MyPetDx — Color system',
    subtitle: 'Brand color palette for a pet lab diagnostics platform.',
    primarySegment: 'brand',
    alsoIn: [],
    tags: ['Color palette', 'Brand identity'],
    hidden: true,
  },
  {
    slug: 'p-mobile-notary',
    title: 'Poppy Mobile Notary',
    subtitle: 'Color system and type scale for a mobile notary service.',
    primarySegment: 'brand',
    alsoIn: [],
    tags: ['Color palette', 'Type system'],
    hidden: true,
  },
  {
    slug: 'skygate-growth-strategies',
    title: 'Skygate Growth Strategies',
    subtitle: 'Brand system + Webflow build, 0→1',
    primarySegment: 'web',
    alsoIn: [],
    tags: ['Brand system', 'Webflow', 'Landing page', 'Design system'],
  },
  {
    slug: 'rely-health',
    title: 'Rely Health',
    subtitle: 'Humanizing healthcare AI with website redesign',
    primarySegment: 'web',
    alsoIn: [],
    tags: ['Visual identity', 'Website redesign', 'Healthcare'],
    hidden: true,
  },
  {
    slug: 'black-coast-estates',
    title: 'Black Coast Estates',
    subtitle:
      'Shared luxury vacation homes — bookings, shared expenses, and a peak-weeks draft. Product: Ocho.',
    primarySegment: 'ux',
    alsoIn: [],
    tags: ['UX/UI', 'App design', 'IA', 'Figma prototype'],
  },
  {
    slug: 'portfolio-nav-system',
    title: 'This Portfolio',
    subtitle: 'Book navigation system — a self-initiated UX case study',
    primarySegment: 'ux',
    alsoIn: [],
    tags: ['UX', 'IA', 'Navigation design', 'Self-initiated'],
  },
  {
    slug: 'linear-cro',
    title: 'From 5.5% to 9.02% in 30 days',
    subtitle: 'CRO sprint — heatmap-driven landing page optimization',
    primarySegment: 'web',
    alsoIn: [],
    tags: ['CRO', 'Landing page', 'Heatmaps', 'A/B testing'],
  },
  {
    slug: 'kirrin-finch',
    title: 'Scaling a DTC brand past $1M',
    subtitle: 'Social advertising and email creative — $700K to $1M+',
    primarySegment: 'web',
    alsoIn: [],
    tags: ['Social ads', 'Email marketing', 'DTC', 'Creative production'],
  },
  {
    slug: 'heybud-skincare',
    title: 'UGC-led creative that actually performed',
    subtitle: 'Art direction for paid social on Meta and Pinterest',
    primarySegment: 'web',
    alsoIn: [],
    tags: ['Art direction', 'Meta ads', 'Pinterest', 'UGC'],
  },
  {
    slug: 'issa',
    title: 'Standing out in a saturated fitness market',
    subtitle: 'Brand and digital presence for ISSA',
    primarySegment: 'web',
    alsoIn: [],
    tags: ['Brand identity', 'Web design', 'Fitness'],
    hidden: true,
  },
  {
    slug: 'better-business-bureau',
    title: 'Drip campaigns that taught us the audience',
    subtitle: 'Email marketing and A/B testing for BBB accreditation',
    primarySegment: 'web',
    alsoIn: [],
    tags: ['Email marketing', 'Drip campaigns', 'A/B testing'],
    hidden: true,
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
    accentColor: '#3B0764',
    accentColorHover: '#2D0550',
    gradient: 'linear-gradient(135deg, #3B0764, #6D28D9)',
    gradientSubtle: 'linear-gradient(135deg, rgba(59,7,100,0.06), rgba(109,40,217,0.06))',
    icon: 'brush',
    caseStudies: [],
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
    accentColor: '#DC2626',
    accentColorHover: '#B91C1C',
    gradient: 'linear-gradient(135deg, #DC2626, #F87171)',
    gradientSubtle: 'linear-gradient(135deg, rgba(220,38,38,0.06), rgba(248,113,113,0.06))',
    icon: 'cursor',
    caseStudies: ['skygate-growth-strategies'],
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
    accentColor: '#1D4ED8',
    accentColorHover: '#1E40AF',
    gradient: 'linear-gradient(135deg, #1D4ED8, #60A5FA)',
    gradientSubtle: 'linear-gradient(135deg, rgba(29,78,216,0.06), rgba(96,165,250,0.06))',
    icon: 'grid',
    caseStudies: ['black-coast-estates'],
    format: 'process',
  },
}

export interface BrandCollection {
  slug: string
  title: string
  description: string
  tags: string[]
  thumbnail: string
  imageDir: string
}

export const BRAND_COLLECTIONS: BrandCollection[] = [
  {
    slug: 'northstar',
    title: 'Northstar',
    description: 'Print and digital art direction across a full creative engagement.',
    tags: ['Art direction', 'Print', 'Digital'],
    thumbnail: '/images/brand/northstar/thumbnail.png',
    imageDir: '/images/brand/northstar',
  },
  {
    slug: 'five18-designs',
    title: 'Five18 Designs',
    description: 'Logo marks and identity systems at a design and print company.',
    tags: ['Logo marks', 'Brand identity', 'Identity systems'],
    thumbnail: '/images/brand/five18/thumbnail.png',
    imageDir: '/images/brand/five18',
  },
  {
    slug: 'graphic-design',
    title: 'Graphic design',
    description: 'Ads, emails, social creative, and brand application work.',
    tags: ['Advertising', 'Social', 'Email', 'Brand application'],
    thumbnail: '/images/brand/graphic-design/thumbnail.jpg',
    imageDir: '/images/brand/graphic-design',
  },
  {
    slug: 'personal',
    title: 'Personal work',
    description: 'Passion projects, vehicle wraps, and designs created for fun.',
    tags: ['Personal', 'Passion projects', 'Self-initiated'],
    thumbnail: '/images/brand/personal/thumbnail.jpg',
    imageDir: '/images/brand/personal',
  },
]

export interface GalleryImage {
  src: string
  alt: string
  label: string
  category: string
}

export const COLLECTION_IMAGES: Record<string, GalleryImage[]> = {
  'northstar': [
    { src: '/images/brand/northstar/northstar-01.png', alt: 'Northstar 01', label: 'Northstar 01', category: 'Brand' },
    { src: '/images/brand/northstar/northstar-02.png', alt: 'Northstar 02', label: 'Northstar 02', category: 'Brand' },
    { src: '/images/brand/northstar/northstar-03.png', alt: 'Northstar 03', label: 'Northstar 03', category: 'Brand' },
    { src: '/images/brand/northstar/northstar-04.png', alt: 'Northstar 04', label: 'Northstar 04', category: 'Brand' },
    { src: '/images/brand/northstar/northstar-05.png', alt: 'Northstar 05', label: 'Northstar 05', category: 'Brand' },
    { src: '/images/brand/northstar/northstar-06.png', alt: 'Northstar 06', label: 'Northstar 06', category: 'Brand' },
    { src: '/images/brand/northstar/northstar-07.png', alt: 'Northstar 07', label: 'Northstar 07', category: 'Brand' },
    { src: '/images/brand/northstar/northstar-08.png', alt: 'Northstar 08', label: 'Northstar 08', category: 'Brand' },
  ],
  'five18-designs': [
    { src: '/images/brand/five18/five18-01.png', alt: 'Five18 01', label: 'Five18 01', category: 'Brand' },
    { src: '/images/brand/five18/five18-02.png', alt: 'Five18 02', label: 'Five18 02', category: 'Brand' },
    { src: '/images/brand/five18/five18-03.png', alt: 'Five18 03', label: 'Five18 03', category: 'Brand' },
    { src: '/images/brand/five18/five18-04.png', alt: 'Five18 04', label: 'Five18 04', category: 'Brand' },
    { src: '/images/brand/five18/five18-05.png', alt: 'Five18 05', label: 'Five18 05', category: 'Brand' },
    { src: '/images/brand/five18/five18-06.png', alt: 'Five18 06', label: 'Five18 06', category: 'Brand' },
    { src: '/images/brand/five18/five18-07.png', alt: 'Five18 07', label: 'Five18 07', category: 'Brand' },
    { src: '/images/brand/five18/five18-08.png', alt: 'Five18 08', label: 'Five18 08', category: 'Brand' },
  ],
  'graphic-design': [],
  'personal': [],
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