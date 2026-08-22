import type { Service } from './types';

export const services = [
  {
    id: 'schadengutachten',
    title: 'Schadengutachten',
    description:
      'Haftpflicht- und Kaskoschäden. Ich halte den Schaden vollständig und neutral fest, damit Sie bekommen, was Ihnen zusteht. War der Unfall unverschuldet, zahlt das Gutachten in aller Regel die gegnerische Versicherung – für Sie bleibt es kostenlos.',
    source: 'legacy-current',
    sourceReference: 'index.html#leistungen',
  },
  {
    id: 'wertgutachten',
    title: 'Wertgutachten',
    description:
      'Für Kauf, Verkauf oder Versicherung. Ein belastbarer Wert, den Sie einem Käufer, einem Verkäufer oder Ihrer Versicherung vorlegen können.',
    source: 'legacy-current',
    sourceReference: 'index.html#leistungen',
  },
  {
    id: 'nutzfahrzeuge-fuhrpark',
    title: 'Nutzfahrzeuge & Fuhrpark',
    description:
      'LKW, Transporter, Busse und Anhänger. Angefangen habe ich als Nutzfahrzeug-Mechatroniker – hier bin ich zu Hause. Dazu die technische Betreuung ganzer Flotten, planbar und mit einem Auge auf die Kosten.',
    source: 'git-history',
    sourceReference:
      'f4940c78f076227a3c7ac960397427a98a5e79ce:index.html#leistungen',
  },
  {
    id: 'pruefung-gegengutachten',
    title: 'Prüfung und Gegengutachten',
    description:
      'Bei strittigen Fällen. Liegt bereits ein Gutachten vor, das Ihnen nicht schlüssig erscheint, prüfe ich es und halte dagegen, wo es nötig ist.',
    source: 'legacy-current',
    sourceReference: 'index.html#leistungen',
  },
  {
    id: 'technische-analysen',
    title: 'Technische Analysen',
    description:
      'Bei komplexen Fehlerbildern. Wenn nicht klar ist, was die Ursache war, gehe ich der Sache technisch auf den Grund und leite die Bewertung nachvollziehbar her.',
    source: 'legacy-current',
    sourceReference: 'index.html#leistungen',
  },
  {
    id: 'karosserievermessung',
    title: 'Karosserievermessung',
    description:
      'Millimetergenaue Vermessung der Karosserie: Unfallschäden nachweisen, verdeckte Vorschäden finden, Reparaturen kontrollieren.',
    source: 'git-history',
    sourceReference:
      'f4940c78f076227a3c7ac960397427a98a5e79ce:index.html#leistungen',
  },
  {
    id: 'wohnmobil-wohnwagen',
    title: 'Wohnmobil & Wohnwagen',
    description:
      'Ein eigenes Kapitel: Schaden bewerten, Wert ermitteln, Technik beurteilen.',
    source: 'git-history',
    sourceReference:
      'f4940c78f076227a3c7ac960397427a98a5e79ce:index.html#leistungen',
  },
] as const satisfies readonly Service[];

export const vehicleCategories = [
  'PKW',
  'Wohnwagen & Wohnmobil',
  'Motorrad',
  'LKW, Bus & Transporter',
] as const;
