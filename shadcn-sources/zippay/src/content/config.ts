import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z
    .object({
      title: z.string(),
      published: z.date(),
      tagline: z.string().optional(),
      intro: z.string().optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
      coverImage: z.string().optional(),
      image: z.string().optional(),
      featured: z.boolean().optional(),
    })
    .transform((data) => ({
      ...data,
      coverImage: data.coverImage ?? data.image,
    })),
});

export const collections = { blog };
