export interface CaseStudy {
  slug: string
  title: string
  client: string
  discipline: string
  tags: string[]
  metric: string
  metricLabel: string
  what: string
  outcomes: string[]
  bg: string
  overview: string
  problem: string
  solution: string
  results: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'linear-cro',
    title: 'From 5.5% to 9.02% in 30 days',
    client: 'Linear Design',
    discipline: 'CRO / Landing Page',
    tags: ['CRO', 'Landing page', 'Heatmaps', 'A/B testing'],
    metric: '63%',
    metricLabel: 'CVR increase in 30 days',
    what: 'Redesind a video case study and an earlier CTA.',
    outcomes: [
      'CVR jumped from 5.5% to 9.02% — a 63% lift',
      'Bounce rate dropped significantly within the first two weeks',
      'Changes deployed and measured within a single 30-day sprint',
    ],
    bg: '#F0F4FF',
    overview: 'Linear Design is a PPC agency helping small to mid-size businesses grow through paid search. Their landing page was the first thing prospective clients saw after clicking an ad — and it wasn\'t converting. I was brought in to diagnose the problem and fix it.',
    problem: 'The page had a 5.5% CVR — not terrible, but not where it needed to be. Heatmap data told the real story. Visitors were dropping off hard right after the first section. Most people never made it to the CTA. The second section had copy and a generic stock image. Nothing to stop a skeptical business owner from bouncing.',
    solution: 'The second section needed to earn its place. I replaced the generic content with a video case study from a real aowner — someone in the same position as the visitor. Added a CTA directly above the scroll break so anyone who was even mildly interested didn\'t have to hunt for the next step. The hypothesis was simple: if someone sees a person like them getting results, they stay. If they stay, they convert.',
    results: 'CVR went from 5.5% to 9.02% in 30 days. That\'s a 63% increase. The bounce rate dropped alongside it. Not a full redesign — one intentional section change, backed by data.',
  },
  {
    slug: 'kirrin-finch',
    title: 'Scaling a DTC brand past $1M',
    client: 'Kirrin Finch',
    discipline: 'Social Advertising + Email',
    tags: ['Social ads', 'Email marketing', 'DTC', 'Creative production'],
    metric: '$1M+',
    metricLabel: 'Revenue from $700K baseline',
    what: 'Designed and produced static social ads and email campaigns for a gender-neutral clothing brand. Worked alongside an account manager and lifecycle rep as the sole designer on the account.',
    outcomes: [
      'Revenue scaleom $700K to over $1M',
      'Creative conversion rates cited as a key growth driver',
      'Consistent brand voice maintained across email and paid social',
    ],
    bg: '#F0F2F5',
    overview: 'Kirrin Finch makes clothing for people who don\'t fit the traditional mold. Gender-neutral, thoughtfully designed, built for a community that had been underserved by mainstream fashion. By the time I joined the account, they had traction — but growth had plateaued.',
    problem: 'The creative wasn\'t keeping up with the brand\'s ambition. Static ads and emails were functional but not converting at the rate needed to push past the plateau. The brand had a strong identity — the challenge was translating that into performance creative that actually moved product.',
    solution: 'I designed and produced static social ads and email campaigns that stayed true to the brand\'s voice while being built to convert. Clean layouts, intentional copy treatment, imagery that reflected the audience. No gimmicks. I worked ely with the account manager on strategy and the lifecycle rep on email sequencing — my job was to make sure the creative matched the intent at every touchpoint.',
    results: 'Revenue crossed $1M. The account team credited the creative conversion rates as a meaningful contributor to the growth. For me, the win was proving that brand-quality creative and performance outcomes aren\'t mutually exclusive.',
  },
  {
    slug: 'heybud-skincare',
    title: 'UGC-led creative that actually performed',
    client: 'Heybud Skincare',
    discipline: 'Art Direction / Paid Social',
    tags: ['Art direction', 'Meta ads', 'Pinterest', 'UGC', 'Creative strategy'],
    metric: 'Meta + Pinterest',
    metricLabel: 'Channel performance lift',
    what: 'Led art direction for paid social on Meta and Pinterest. Tested polished product creative against UGC-style ads and used results to shift the entire creative strategy.',
    outcomes: [
      'UGC-style creative outperformed polished product shots',
      'Meta emerged  the stronger performing channel',
      'Established a repeatable creative approach for the brand',
    ],
    bg: '#F0F2F5',
    overview: 'Heybud is a skincare brand trying to cut through a very crowded market. Good product, solid brand. But the paid social creative wasn\'t pulling its weight. I was brought in to lead art direction across Meta and Pinterest and figure out what actually resonated with their audience.',
    problem: 'The existing creative was polished — maybe too polished. Skincare buyers on Meta aren\'t looking for a photoshoot. They\'re looking for something that feels real, relatable, like a friend recommending a product. The brand\'s assets looked good but didn\'t convert.',
    solution: 'We tested UGC-style creative alongside the traditional product shots. Real people, natural lighting, honest framing. I directed the visual approach — making sure the UGC felt elevated, not sloppy. There\'s a difference between authentic and cheap. The goal was authentic. On Pinterest we focused ofestyle imagery that fit the platform\'s search-heavy behavior.',
    results: 'UGC-style creative won. Not close. Meta was the stronger channel for performance. The learnings gave the brand a repeatable playbook for creative production going forward — lean into real over polished.',
  },
  {
    slug: 'issa',
    title: 'Standing out in a saturated fitness market',
    client: 'ISSA',
    discipline: 'Brand + Web',
    tags: ['Brand identity', 'Web design', 'Fitness', 'Competitive market'],
    metric: 'Brand presence',
    metricLabel: 'Elevated in saturated market',
    what: 'Helped the International Sports Sciences Association strengthen their brand image and digital presence against well-funded competitors like ACE, NASM, and NSCA.',
    outcomes: [
      'Stronger visual identity across digital touchpoints',
      'More consistent brand expression in a noisy market',
      'Clearer differentiation from category leaders',
    ],
    bg: '#F0FFF4',
    overview: 'ISSA is one of the largest fitness ceification organizations in the world. But being large doesn\'t mean being loud — in a market dominated by ACE, NASM, and NSCA, standing out takes deliberate brand work. I worked on elevating their image across brand and digital touchpoints.',
    problem: 'The fitness certification market is noisy and commoditized. Every brand is saying the same things — accredited programs, flexible learning, career outcomes. ISSA had the product to back up the claims. What they needed was a visual identity and digital presence that communicated authority without losing approachability.',
    solution: 'Focused on tightening the visual language across digital — more intentional use of imagery, cleaner layouts, a brand that felt premium without feeling inaccessible. The goal was to make ISSA look like the obvious choice, not just another option.',
    results: 'Stronger brand presence across the digital channels we touched. In a market where the product differences are subtle, the brand does a lot of the heavy lifting.',
  },
  {
    slug: 'better-business-bureau',
    title: 'Drip campaigns that taught us the audience',
    client: 'Better Business Bureau',
    discipline: 'Email Marketing',
    tags: ['Email marketing', 'Drip campaigns', 'A/B testing', 'Re-engagement'],
    metric: 'A/B tested',
    metricLabel: 'Audience insights from 0',
    what: 'Built drip campaigns and re-engagement sequences for BBB\'s accreditation push. Used A/B testing on subject lines, send times, and CTAs to understand what actually moved business owners.',
    outcomes: [
      'Clearer picture of what messaging drove accreditation conversions',
      'Re-engagement sequences that revived lapsed business owner interest',
      'Data-driven iteration framework established for ongoing campaigns',
    ],
    bg: '#F0F2F5',
    overview: 'The Better Business Bureau has one of the most recognizable brands in business — but recognition doesn\'t automatically translate to accreditation signups. I worked on email campaigns targeting business owners tget accredited, including drip sequences and re-engagement flows for people who had gone cold.',
    problem: 'Business owners are busy and skeptical. Generic email blasts weren\'t cutting through. The re-engagement problem was particularly real — people who had shown interest and gone quiet were sitting in the database, and nobody had a clear read on what would bring them back.',
    solution: 'Built structured drip campaigns for new leads and re-engagement sequences for lapsed contacts. The real work was in the A/B testing — subject line variations, send time optimization, CTA framing. Every test was a question about the audience. We let the data answer.',
    results: 'The testing gave us a much clearer picture of what drove business owners to take action. That audience intelligence is the kind of thing that compounds — every future campaign starts from a smarter baseline.',
  },
  {
    slug: 'skygate-growth-strategies',
    title: 'Zero to one — brand system and Webflow launch',
    client: 'Skowth Strategies',
    discipline: 'Brand + Webflow',
    tags: ['Brand system', 'Webflow', 'Landing page', 'Design system'],
    metric: '0→1',
    metricLabel: 'Brand system to live site',
    what: 'Built the complete brand system and Webflow site for a real estate investment platform. Logo, color, type, design system, and full Webflow build — from nothing to live.',
    outcomes: [
      'Complete brand identity delivered from scratch',
      'Webflow site launched with a full design system',
      'One cohesive visual language from logo to landing page',
    ],
    bg: '#F0F2F5',
    overview: 'Skygate Growth Strategies helps investors access high-value real estate opportunities. When they came to me they had a business — but no brand, no website, and no visual language. Everything needed to be built from the ground up.',
    problem: 'Starting from zero is both the hardest and most interesting brief. There are no constraints from an existing system, but there\'s also no foundation to build on. Evcision matters more when you\'re setting the first stone.',
    solution: 'Started with the brand — logo, color system, typography, and usage rules. Built everything to work together as a system, not just a collection of assets. Then built the Webflow site using that system as the foundation. Every component on the site traces back to a decision made in the brand.',
    results: 'Skygate launched with a complete brand and digital presence. One designer, one cohesive vision, zero to live.',
  },
]
