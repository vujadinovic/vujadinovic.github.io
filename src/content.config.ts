import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const site = defineCollection({
  loader: glob({ pattern: 'site.yaml', base: './src/content' }),
  schema: z.strictObject({
    name: z.string(),
    location: z.string(),
    email: z.string(),
    github: z.url(),
    linkedin: z.string(),
    cv: z.string(),
    site_url: z.url(),
    description: z.string(),
    show_talks: z.boolean(),
  }),
});

const entry = z.strictObject({
  role: z.string(),
  org: z.string(),
  when: z.string(),
  text: z.string().optional(),
});

const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: './src/content' }),
  schema: z.strictObject({
    title: z.string(),
    subtitle: z.string(),
    photo: z.string(),
    photo_alt: z.string(),
    metadata: z.strictObject({
      name: z.string(),
      based_in: z.string(),
      interested_in: z.array(z.string()),
      currently: z.string(),
    }),
    lead: z.string(),
    experience: z.array(entry).default([]),
    education: z.array(entry).default([]),
    activities: z.array(entry).default([]),
    talks: z.array(entry).default([]),
    tools: z.array(z.string()).default([]),
    outside_work: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.strictObject({
    title: z.string(),
    subtitle: z.string(),
    empty: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.strictObject({
    title: z.string(),
    group: z.enum(['research', 'projects']),
    order: z.number(),
    cover: z.string(),
    hidden: z.boolean().default(false),
    talk: z.boolean().default(false),
    metadata: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
    links: z
      .array(z.strictObject({ label: z.string(), url: z.string() }))
      .default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/blog' }),
  schema: z.strictObject({
    title: z.string(),
    description: z.string(),
    lead: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    cover: z.string(),
    code: z.url().optional(),
  }),
});

export const collections = { site, about, pages, projects, blog };
