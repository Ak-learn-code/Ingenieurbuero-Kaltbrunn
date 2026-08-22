import { business } from './business';

export const seo = {
  legacySiteUrl: business.urls.legacyCanonicalBase,
  finalSiteUrl: business.urls.finalSiteUrl,
  locale: 'de_DE',
  language: 'de',
  siteName: business.name,
  defaultTitle:
    'Ingenieurbüro Kaltbrunn – Kfz-Gutachten mit Sachverstand | Heppenheim',
  defaultDescription:
    'Unabhängige Kfz-Gutachten aus Heppenheim: Unfall- und Wertgutachten im Kreis Bergstraße. Gerichtsverwertbar, kurzfristige Termine, Erstberatung kostenfrei.',
  referenceTitle:
    'Referenzen – Ingenieurbüro Kaltbrunn | Kfz-Gutachten Heppenheim',
  referenceDescription:
    'Aufnahmen aus meiner Gutachtertätigkeit: Unfall- und Lackschäden an PKW im Kreis Bergstraße, dokumentiert mit Maßstab und in gerichtsverwertbarer Form.',
  localSearchTargets: [
    'Kfz Gutachter Heppenheim',
    'Kfz Sachverständiger Heppenheim',
    'Unfallgutachten Heppenheim',
    'Kfz Gutachter Bergstraße',
    'Kfz Sachverständiger Bergstraße',
  ],
  schemaTypes: ['ProfessionalService', 'AutomotiveBusiness'],
} as const;
