import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectImageSchema = z.object({
  src: z.string(),
  caption: z.string().optional(),
  className: z.string().optional(),
  wrapperClassName: z.string().optional(),
  width: z.number(),
  height: z.number(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    href: z.string(),
    image: z.string(),
    wrapperClassName: z.string().optional(),
    imageClassName: z.string().optional(),
    category: z.enum(['featured', 'open-source', 'personal']),
    liveUrl: z.string(),
    sourceUrl: z.string(),
    longDescription: z.string(),
    additionalDescription: z.string(),
    stack: z.array(z.string()),
    images: z.array(projectImageSchema),
    highlights: z.array(z.string()),
    moreProjects: z.array(z.string()),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    date: z.coerce.string(),
    pinned: z.boolean().optional(),
  }),
});

export const collections = { projects, articles };
