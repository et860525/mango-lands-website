import { defineCollection, z } from "astro:content";

export const collections = {
  posts: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      category: z
        .enum(["programming", "photography", "essays"])
        .optional()
        .default("programming"),
      tags: z.array(z.string()).optional(),
    }),
  }),
};
