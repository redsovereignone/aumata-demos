// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://scalar-astro-template.vercel.app',
  integrations: [
    starlight({
      title: 'Scalar Docs',
      description: 'Modern Astro Template Documentation',
      favicon: '/favicon/favicon.svg', 
      logo: {
        light: './public/layout/logo-light.svg',
        dark: './public/layout/logo-dark.svg',
        replacesTitle: true,
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Overview', slug: 'docs' },
            { label: 'Installation', slug: 'installation' },
            { label: 'Configuration', slug: 'configuration' },
          ],
        },
        {
          label: 'Guides & Tutorials',
          items: [
            { label: 'Guides', slug: 'guides' },
            { label: 'Tutorials', slug: 'tutorials' },
            { label: 'Examples', slug: 'examples' },
          ],
        },
        {
          label: 'API & Integration',
          items: [
            { label: 'API Reference', slug: 'api-reference' },
            { label: 'Authentication', slug: 'authentication' },
            { label: 'Webhooks', slug: 'webhooks' },
          ],
        },
        {
          label: 'Advanced',
          items: [
            { label: 'Performance', slug: 'performance' },
            { label: 'Deployment', slug: 'deployment' },
          ],
        },
      ],
      expressiveCode: {
        themes: ['github-light', 'github-dark'],
      },
    }),
    mdx(),
    sitemap(),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
