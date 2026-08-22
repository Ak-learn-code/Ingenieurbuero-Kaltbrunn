export const brandAssets = {
  monogram: {
    path: '@assets/brand/legacy/k.svg',
    sourceReference: 'marke/k.svg',
    status: 'legacy-candidate',
  },
  logoReference: {
    path: '@assets/brand/source/logo_nurettin.webp',
    sourceReference: 'marke/vorlage/logo_nurettin.webp',
    status: 'source-reference-only',
  },
} as const;

export const portraitAssets = {
  square: {
    path: '@assets/images/portraits/nurettin-square.webp',
    sourceReference: 'index.html (eingebettetes WebP, 256 × 256 px)',
    status: 'available',
  },
  portrait: {
    path: '@assets/images/portraits/nurettin-portrait.webp',
    sourceReference: 'index.html (eingebettetes WebP, 570 × 760 px)',
    status: 'available',
  },
} as const;

export const heroAssetCandidates = {
  desktop: {
    path: '@assets/images/hero/anriss-hintergrund.webp',
    sourceReference: 'fotos/anriss-hintergrund.webp',
    status: 'candidate-not-approved',
  },
  mobile: {
    path: '@assets/images/hero/anriss-hintergrund-handy.webp',
    sourceReference: 'fotos/anriss-hintergrund-handy.webp',
    status: 'candidate-not-approved',
  },
} as const;

export const referenceAssetDirectory = '@assets/images/references' as const;
