import type { Qualification } from './types';

export const qualifications = [
  {
    id: 'beng-maschinenbau',
    title: 'B. Eng. Maschinenbau',
    source: 'legacy-current',
    sourceReference: 'index.html#ueber',
  },
  {
    id: 'vda-6-3',
    title: 'VDA 6.3 Prozessauditor',
    source: 'legacy-current',
    sourceReference: 'index.html#ueber',
  },
  {
    id: 'dgq-qualitaetsmanager',
    title: 'DGQ-Qualitätsmanager',
    source: 'legacy-current',
    sourceReference: 'index.html#ueber',
  },
  {
    id: 'elektrofachkraft-hv',
    title: 'Elektrofachkraft für HV-Komponenten',
    source: 'legacy-current',
    sourceReference: 'index.html#ueber',
  },
] as const satisfies readonly Qualification[];

export const education = [
  'Nutzfahrzeug-Mechatroniker',
  'B. Eng. Maschinenbau',
] as const;

export const languages = [
  'Deutsch',
  'Türkisch',
  'Kurdisch',
  'Englisch',
] as const;

export const qualificationDocuments = {
  status: 'missing',
  note: '[INFORMATION FEHLT] Echte Zertifikatsdateien wurden nicht bereitgestellt.',
} as const;
