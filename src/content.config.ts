import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(['ko', 'en']),
    publishedAt: z.coerce.date(),
    author: z.string(),
    category: z.string(),
    draft: z.boolean().default(true),
  }),
});
export const collections = { blog };
