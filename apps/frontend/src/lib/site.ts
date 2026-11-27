/** Shared contact address of the team, shown on the legal pages (DEC-119, DEC-156). */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '';

/** Off unless explicitly enabled: the online demonstrator limits forms to test accounts (NFR-001). */
export const CONTACT_FORM_ENABLED = process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === 'true';

export const DEMONSTRATOR_NOTICE = 'Demonstrator — sample content, forms limited to test accounts';

export const LEGAL_PAGES = [
  { href: '/legal/privacy', label: 'Privacy notice' },
  { href: '/legal/terms', label: 'Terms of use' },
  { href: '/legal/community-standards', label: 'Community standards' },
  { href: '/legal/data-sources', label: 'Data sources' },
  { href: '/legal/about', label: 'About and disclaimer' },
  { href: '/legal/accessibility', label: 'Accessibility' },
] as const;
