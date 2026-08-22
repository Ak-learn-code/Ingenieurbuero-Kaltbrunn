export const heroContent = {
  heading: 'Vom Premium-Hersteller zum unabhängigen Gutachter in Heppenheim.',
  legacyHeading:
    'Ihr Unfall. Ihr Recht. Mein unabhängiges Gutachten schützt Ihr Geld.',
  subheading:
    'Ihr freier Kfz-Sachverständiger im Kreis Bergstraße sowie im Rhein-Main- und Rhein-Neckar-Gebiet. Absolut weisungsfrei, fachlich kompromisslos und direkt für Sie erreichbar.',
  primaryCta: 'Jetzt anrufen',
  secondaryCta: 'Online-Anfrage senden',
} as const;

export const trustFacts = [
  { value: '15+', label: 'Jahre Branchenerfahrung' },
  { value: '100%', label: 'Unabhängige Gutachten' },
  { value: '24h', label: 'Erstkontakt' },
] as const;

export const accidentStory = {
  title: 'Wie aus einem Unfall ein Gutachten wird',
  statements: [
    'Es dauert eine Sekunde.',
    'Danach schickt die Versicherung des anderen ihren Gutachter.',
    'Sie dürfen Ihren eigenen wählen.',
    'Und der bin ich.',
  ],
  conclusion: 'Freie Gutachterwahl. Für Sie entstehen keine Kosten.',
} as const;

export const aboutContent = {
  name: 'Nurettin Sogukcesme',
  role: 'Ingenieur · Kfz-Sachverständiger',
  heading: 'Meisterhafter Blick. Akademische Präzision.',
  paragraphs: [
    'Vom Blaumann im Nutzfahrzeug-Betrieb über das Maschinenbaustudium bis hin zum Qualitätsingenieur bei einem Premium-Automobilhersteller: Mein Weg zeichnet sich durch pure Begeisterung für Fahrzeugtechnik aus.',
    'Als Ihr unabhängiger Kfz-Sachverständiger bringe ich diese gebündelte Expertise direkt zu Ihnen. Ob nach einem Unfall, für eine Wertermittlung oder bei technischen Unklarheiten – ich sichere Ihre Ansprüche mit absoluter Präzision.',
  ],
} as const;

export const whyReasons = [
  {
    id: 'echte-unabhaengigkeit',
    title: 'Echte Unabhängigkeit',
    description:
      'Ich arbeite ausschließlich für Sie als Fahrzeughalter, für Anwälte oder Gerichte – niemals im Auftrag von Versicherungen.',
    sourceReference:
      'f4940c78f076227a3c7ac960397427a98a5e79ce:index.html#warum',
  },
  {
    id: 'premium-qualitaetsstandard',
    title: 'Premium-Qualitätsstandard',
    description:
      'Durch meine Tätigkeit als Qualitätsingenieur und Auditor kenne ich die strengsten Standards der Automobilindustrie.',
    sourceReference:
      'f4940c78f076227a3c7ac960397427a98a5e79ce:index.html#warum',
  },
  {
    id: 'fundierte-beweissicherung',
    title: 'Fundierte Beweissicherung',
    description:
      'Ich ermittle Schadensursachen lückenlos, leite Bewertungen logisch her und dokumentiere alles rechtssicher.',
    sourceReference:
      'f4940c78f076227a3c7ac960397427a98a5e79ce:index.html#warum',
  },
  {
    id: 'direkter-draht',
    title: 'Direkter Draht',
    description:
      'Bei mir gibt es kein Callcenter. Wenn Sie anrufen, sprechen Sie direkt mit mir – Ihrem Experten.',
    sourceReference:
      'f4940c78f076227a3c7ac960397427a98a5e79ce:index.html#warum',
  },
] as const;

export const rightsContent = {
  heading: 'Ihr gutes Recht bei einem Unfallschaden',
  introduction:
    'Ein Unfall bringt ohnehin schon genug Ärger mit sich. Umso wichtiger ist ein Partner, dem Sie blind vertrauen können. Da ich vollkommen weisungsfrei und unabhängig von Versicherungsgesellschaften agiere, steht allein Ihr Recht im Fokus.',
  items: [
    {
      title: 'Freie Gutachterwahl',
      text: 'Bei einem unverschuldeten Unfall (Haftpflichtschaden) haben Sie das gesetzliche Recht, Ihren Gutachter selbst zu wählen.',
    },
    {
      title: 'Kostenübernahme',
      text: 'Die Kosten für mein unabhängiges Gutachten müssen in diesem Fall von der Versicherung des Unfallverursachers getragen werden.',
    },
    {
      title: 'Schutz vor Kürzungen',
      text: 'Versicherungen versuchen oft, den Schaden eigenmächtig herunterzurechnen – mein Gutachten schützt Sie vor finanziellen Verlusten.',
    },
  ],
} as const;

export const contactContent = {
  heading: 'Schnelle Hilfe im Schadensfall',
  introduction:
    'Verlieren Sie nach einem Schaden keine wertvolle Zeit. Rufen Sie mich direkt an oder nutzen Sie das Formular – die Erstanfrage ist kostenlos.',
  formHeading: 'Kostenlose Erstanfrage',
  fields: [
    { id: 'name', label: 'Name', required: true },
    { id: 'phone', label: 'Telefonnummer', required: true },
    { id: 'email', label: 'E-Mail-Adresse', required: true },
    { id: 'vehicle', label: 'Kennzeichen / Fahrzeug', required: false },
    { id: 'message', label: 'Ihre Nachricht', required: true },
  ],
  upload: {
    status: 'missing-backend-decision',
    note: '[INFORMATION FEHLT] Upload-Backend, Limits, Speicherung und Datenschutzfreigabe.',
  },
} as const;

export const missingContent = {
  reviews: '[INFORMATION FEHLT] Keine echten Google-Bewertungen im Repository.',
  locationPhoto:
    '[INFORMATION FEHLT] Kein freigegebenes Standortfoto aus Heppenheim oder der Region.',
  map: '[INFORMATION FEHLT] Keine freigegebene Kartenlösung.',
  heroProductionImage:
    '[INFORMATION FEHLT] Kein finales Motiv Nurettin + Fahrzeug.',
} as const;
