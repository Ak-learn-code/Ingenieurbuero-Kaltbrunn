export const referencesContent = {
  heading: 'Aufnahmen aus meinen Gutachten',
  introduction:
    'Alle Bilder stammen aus abgeschlossenen Aufträgen. Kennzeichen sind unkenntlich gemacht, Namen und Anschriften der Auftraggeber nenne ich nicht. Zum Vergrößern anklicken.',
  cases: [
    {
      id: 'bmw-x1-streifschaden',
      image: '01-bmw-x1-streifschaden-klein.webp',
      vehicle: 'BMW X1',
      damage: 'Streifschaden über beide Türen',
      date: 'Februar 2026',
      description:
        'Langgezogener Streifschaden über hintere Tür, Schweller und Seitenwand. Der Maßstab im Bild hält die Höhe über der Fahrbahn fest – daraus lässt sich ableiten, welche Fahrzeughöhe zum Schadenbild passt.',
    },
    {
      id: 'toyota-corolla-lenkachse',
      image: '02-toyota-corolla-heck-links-klein.webp',
      vehicle: 'Toyota Corolla Hybrid',
      damage: 'Lenkachse gebrochen',
      date: 'Januar 2025',
      description:
        'Beim Aufprall ist die Lenkachse gebrochen. Von außen sieht man Stoßfänger und Radlauf – dass die Achse hin ist, zeigt sich erst darunter. Genau solche verdeckten Schäden entscheiden über die Reparaturkosten.',
    },
    {
      id: 'toyota-corolla-heckdetail',
      image: '03-toyota-corolla-heck-detail-klein.webp',
      vehicle: 'Toyota Corolla Hybrid',
      damage: 'Heckstoßfänger, Detailaufnahme',
      date: 'August 2024',
      description:
        'Stoßfänger großflächig eingedrückt und aufgerissen. Kunststoff federt zurück – ohne Aufnahme im unbelasteten Zustand lässt sich die Tiefe später nicht mehr belegen.',
    },
    {
      id: 'mercedes-e-front',
      image: '04-mercedes-e-front-links-klein.webp',
      vehicle: 'Mercedes-Benz E-Klasse',
      damage: 'Front rechts',
      date: 'Juli 2025',
      description:
        'Der Maßstab hält die Höhe über der Fahrbahn fest, bevor das Fahrzeug bewegt wird – danach lässt sie sich nicht mehr sauber ermitteln.',
    },
    {
      id: 'bmw-dellensegel',
      image: '05-bmw-lack-detail-klein.webp',
      vehicle: 'BMW',
      damage: 'Detailaufnahme mit Dellensegel',
      date: 'Mai 2025',
      description:
        'Eine flache Delle sieht man auf dunklem Lack mit bloßem Auge kaum. Im Dellensegel – dem gespiegelten Streifenmuster – verzieht sie sich zum Wirbel und ist damit belegt. Dieselbe Technik prüft in der Fertigung Oberflächen.',
    },
    {
      id: 'audi-a5-front',
      image: '06-audi-a5-front-klein.webp',
      vehicle: 'Audi A5',
      damage: 'Front, Aufnahme mit Maßstab',
      date: 'Juli 2024',
      description:
        'Dokumentation der Fahrzeugfront mit Maßstab. Auch ohne sichtbare Verformung gehört die Aufnahme dazu: Sie belegt den Zustand zum Zeitpunkt der Besichtigung.',
    },
    {
      id: 'audi-a6-heck',
      image: '07-audi-a6-heck-rechts-klein.webp',
      vehicle: 'Audi A6',
      damage: 'Heckschaden mit starker Deformation',
      date: 'Juni 2024',
      description:
        'Die Streifspuren und Dellen im Heckbereich sind nur das, was von außen zu sehen ist. Wir sehen uns das Auto auch im zerlegten Zustand an – erst dort zeigt sich der ganze Schaden.',
    },
  ],
  evidenceNote: {
    heading: 'Warum so viele Bilder?',
    text: 'Eine Versicherung, die kürzen will, sucht die Lücke in der Dokumentation. Was nicht fotografiert ist, hat es im Streitfall nicht gegeben – deshalb lieber dreißig Aufnahmen zu viel als eine zu wenig. Der Maßstab im Bild ist kein Schmuck: Er hält die Höhe über der Fahrbahn fest und ist oft das Einzige, womit sich eine Schadendarstellung der Gegenseite widerlegen lässt.',
  },
} as const;
