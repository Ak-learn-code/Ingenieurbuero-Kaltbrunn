export const contactConstraints = {
  name: { min: 2, max: 120 },
  phone: { min: 6, max: 60 },
  email: { min: 3, max: 190 },
  vehicle: { min: 1, max: 160 },
  message: { min: 10, max: 5000 },
} as const;
