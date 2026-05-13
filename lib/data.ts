import type { Service, Stat, Testimonial, BlogPost } from '@/types';

export const services: Service[] = [
  {
    title: 'Volunteer Recruitment',
    description:
      'We connect organizations with reliable and passionate volunteers ready to make meaningful impact.',
    icon: 'HeartHandshake',
  },
  {
    title: 'Training & Development',
    description:
      'Structured onboarding and capacity-building programs for volunteers and nonprofits.',
    icon: 'GraduationCap',
  },
  {
    title: 'Community Programs',
    description:
      'Supporting community-driven initiatives through strategic volunteer engagement.',
    icon: 'Globe2',
  },
];

export const stats: Stat[] = [
  { value: '100+', label: 'Volunteers Mobilized' },
  { value: '10+',  label: 'Programs Supported'  },
  { value: '10K+', label: 'Lives Impacted'       },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'NGO Program Director',
    quote:
      'The Volunteer Nations helped us recruit and manage volunteers professionally across multiple projects.',
  },
  {
    name: 'Amina Ibrahim',
    role: 'Community Leader',
    quote:
      'Their structured volunteer system transformed how we run our outreach programs.',
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'the-power-of-community-impact',
    title: 'The Power of Community Impact',
    category: 'Impact',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    excerpt:
      'Discover how small acts of volunteering ripple outward to transform entire communities.',
    body: `When individuals come together with a shared purpose, the results can be extraordinary. Community impact is not measured solely in numbers — it lives in the stories of families supported, children educated, and neighborhoods revitalized.

At The Volunteer Nations, we have witnessed firsthand how a single motivated volunteer can spark a chain reaction of positive change. From tutoring sessions that reignite a student's confidence to weekend clean-up drives that restore pride in a neighborhood, every contribution matters.

Our programs are designed to channel that energy strategically. By matching volunteers with organizations that align with their skills and passions, we ensure that effort translates into lasting outcomes rather than one-off gestures.

The data backs this up. Communities with structured volunteer programs report higher civic engagement, stronger social cohesion, and measurably better outcomes across education, health, and economic indicators. But beyond the statistics, the real power of community impact is the sense of belonging it creates — for volunteers and recipients alike.

Join us in building a world where every community has access to the support it needs to thrive.`,
  },
  {
    slug: 'how-volunteers-create-change',
    title: 'How Volunteers Create Change',
    category: 'Community',
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
    excerpt:
      'A look at the mechanisms behind volunteer-driven change and why structured programs outperform ad-hoc efforts.',
    body: `Volunteering is one of the most direct ways an individual can contribute to societal progress. But not all volunteering is created equal. Research consistently shows that structured, skills-based volunteering produces significantly greater impact than uncoordinated efforts.

The difference lies in alignment. When a volunteer's expertise matches an organization's need, the value delivered multiplies. A software engineer helping a nonprofit digitize its records, a nurse training community health workers, or a teacher developing literacy curricula — these are not just acts of goodwill, they are strategic investments in human capital.

The Volunteer Nations was founded on this principle. Our matching process goes beyond availability and interest; we assess skills, experience, and organizational fit to ensure every placement is purposeful.

We also invest in the volunteers themselves. Through our Training & Development programs, volunteers receive orientation, ongoing support, and recognition that keeps them engaged over the long term. Retention is as important as recruitment — a volunteer who stays for two years delivers exponentially more value than ten volunteers who each stay for a month.

Change is not accidental. It is designed, supported, and sustained. That is the TVN approach.`,
  },
  {
    slug: 'building-sustainable-programs',
    title: 'Building Sustainable Programs',
    category: 'Programs',
    image:
      'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1200&auto=format&fit=crop',
    excerpt:
      'Sustainability in volunteer programs requires more than good intentions — here is what it actually takes.',
    body: `Many volunteer programs launch with enthusiasm and fade within a year. The culprit is almost always the same: a lack of systems. Good intentions are necessary but not sufficient. Sustainable programs are built on clear processes, consistent communication, and a culture of accountability.

At TVN, we help partner organizations build the infrastructure that keeps volunteer programs alive and growing. This starts with a clear volunteer value proposition — answering the question every potential volunteer asks: "What will I get out of this?" Recognition, skill development, community, and purpose are the four pillars of volunteer motivation, and programs that address all four retain volunteers far longer.

Equally important is organizational readiness. A nonprofit that cannot onboard, deploy, and support volunteers effectively will burn through goodwill quickly. We work with partners to develop onboarding materials, role descriptions, supervision structures, and feedback loops before the first volunteer ever walks through the door.

Finally, sustainability requires measurement. Programs that track outcomes — not just outputs — can demonstrate value to funders, attract new volunteers, and continuously improve. We help organizations define meaningful metrics and build simple reporting systems that do not overwhelm small teams.

Sustainable programs do not happen by accident. They are engineered with care, and we are here to help every step of the way.`,
  },
];
