import type { Region } from './types';

export const regions = [
  {
    name: 'Kreis Bergstraße',
    schemaType: 'AdministrativeArea',
    priority: 'primary',
  },
  { name: 'Heppenheim', schemaType: 'City', priority: 'primary' },
  { name: 'Bensheim', schemaType: 'City', priority: 'primary' },
  { name: 'Weinheim', schemaType: 'City', priority: 'primary' },
  { name: 'Mannheim', schemaType: 'City', priority: 'primary' },
  { name: 'Heidelberg', schemaType: 'City', priority: 'primary' },
  {
    name: 'Rhein-Neckar-Region',
    schemaType: 'AdministrativeArea',
    priority: 'primary',
  },
  { name: 'Lorsch', schemaType: 'City', priority: 'secondary' },
  { name: 'Bürstadt', schemaType: 'City', priority: 'secondary' },
  { name: 'Viernheim', schemaType: 'City', priority: 'secondary' },
  {
    name: 'Rhein-Main-Gebiet',
    schemaType: 'AdministrativeArea',
    priority: 'secondary',
  },
  { name: 'Darmstadt', schemaType: 'City', priority: 'secondary' },
  { name: 'Frankfurt am Main', schemaType: 'City', priority: 'secondary' },
] as const satisfies readonly Region[];
