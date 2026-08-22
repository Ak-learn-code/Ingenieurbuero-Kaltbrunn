import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const references = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/references' }),
  schema: z.object({
    vehicle: z.string(),
    damage: z.string(),
    dateLabel: z.string(),
    image: z.string(),
    thumbnail: z.string(),
    alt: z.string(),
    sourceReference: z.string(),
    order: z.number().int().positive(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    sourceReference: z.string(),
    legalReviewRequired: z.boolean(),
  }),
});

export const collections = { legal, references };
