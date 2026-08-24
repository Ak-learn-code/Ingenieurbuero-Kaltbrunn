import type { NavigationItem } from './types';

export const primaryNavigation = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Warum ich?', href: '#warum-ich' },
  { label: 'Ihr Recht', href: '#ihr-recht' },
  { label: 'Referenzen', href: '#referenzen' },
  { label: 'Kontakt', href: '#kontakt' },
] as const satisfies readonly NavigationItem[];

export const legalNavigation = [
  { label: 'Impressum', href: '/impressum/' },
  { label: 'Datenschutz', href: '/datenschutz/' },
] as const satisfies readonly NavigationItem[];

export const primaryNavigationCta = {
  label: 'Gutachten anfragen',
  href: '#kontakt',
} as const;
