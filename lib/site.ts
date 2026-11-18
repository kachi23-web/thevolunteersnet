/**
 * Single source of truth for brand and contact details used across the
 * public site. Change a value here and it updates everywhere.
 */
export const site = {
  name: 'The Volunteers Nation',
  shortName: 'TVN',
  tagline: 'Skilled volunteers for the organizations doing the work.',
  email: 'hello@thevolunteernations.org',
  phoneDisplay: '0907 763 1264',
  phoneHref: 'tel:+2349077631264',
  location: 'Lagos & Abuja, Nigeria',
  social: [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/share/p/18bvVDcaVM/?mibextid=wwXIfr',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/the-volunteers-nation',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/thevolunteersnation?igsh=MWlydjg0OGdkaDlrNQ%3D%3D&utm_source=qr',
    },
  ],
} as const;

export const partners = [
  { name: 'The Young Bookworms', logo: '/bookworms.png' },
  { name: 'Impact Investors Foundation', logo: '/impact.png' },
  { name: 'Woven Impact Network', logo: '/woven.png' },
  { name: 'PlanenTekad Programme', logo: '/planen.png' },
  { name: 'Karis & Eleos Hand of Hope Foundation', logo: '/kairos.png' },
] as const;
