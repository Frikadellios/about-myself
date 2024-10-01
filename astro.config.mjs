import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

import lightningcss from 'vite-plugin-lightningcss'
import postCssOklabPolyfill from '@csstools/postcss-oklab-function'
import tailwindcss from '@tailwindcss/vite'
import cssDiscardComments from 'postcss-discard-comments'
import rehypeExternalLinks from 'rehype-external-links'
import { remarkReadingTime } from './src/lib/readTime.ts'

// https://astro.build/config
export default defineConfig({
  site: 'https://about-myself.pages.dev',
  vite: {
    build: {
      minify: true,
      cssMinify: 'lightningcss',
      chunkSizeWarningLimit: 2000
    },
    ssr: {
      external: ['node:buffer', 'three']
    },
    plugins: [
      lightningcss({
        browserslist: ['>= 0.25%', 'last 2 versions', 'maintained node versions',  'Firefox ESR', 'not dead'] // Correctly set browser queries
      }),
      tailwindcss()
    ],
    css: {
      postcss: {
        plugins: [postCssOklabPolyfill({ preserve: true }), cssDiscardComments({ removeAll: true })]
      }
    }
  },
  output: 'server',

  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  prefetch: {
    prefetchAll: true
  },
  integrations: [react(), mdx(), partytown(), sitemap()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: ' 🔗' },
          target: '_blank',
          rel: ['nofollow', 'noreferrer']
        }
      ]
    ],
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true
    },
    gfm: true
  }
})
