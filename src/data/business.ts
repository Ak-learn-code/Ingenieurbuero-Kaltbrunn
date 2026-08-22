export const business = {
  name: 'Ingenieurbüro Kaltbrunn',
  owner: 'Nurettin Sogukcesme',
  claim: 'Kfz-Gutachten mit Sachverstand',
  address: {
    street: 'Mannheimer Straße 1',
    postalCode: '64646',
    city: 'Heppenheim',
    region: 'Hessen',
    countryCode: 'DE',
  },
  phone: {
    display: '+49 176 37998836',
    e164: '+4917637998836',
    href: 'tel:+4917637998836',
    whatsapp: 'https://wa.me/4917637998836',
  },
  email: {
    address: 'info@ing-nuri.de',
    href: 'mailto:info@ing-nuri.de',
  },
  openingHours: {
    display: 'Mo–Fr 8:00–18:00 Uhr',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  geo: {
    latitude: 49.6415,
    longitude: 8.6374,
  },
  urls: {
    legacyCanonicalBase: 'https://www.ing-nuri.de',
    finalSiteUrl: null,
  },
} as const;

export const person = {
  name: business.owner,
  jobTitle: 'Ingenieur und Kfz-Sachverständiger',
  roleDisplay: 'Ingenieur · Kfz-Sachverständiger',
} as const;
