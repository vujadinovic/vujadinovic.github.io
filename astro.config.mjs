import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkFigures from './src/lib/remark-figures.mjs';

export default defineConfig({
  site: 'https://vujadinovic.github.io',
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkFigures],
      rehypePlugins: [rehypeKatex],
    }),
  },
});
