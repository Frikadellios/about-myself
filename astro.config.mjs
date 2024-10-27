import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import partytown from '@astrojs/partytown'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import pagefind from 'astro-pagefind'
import robotsTxt from 'astro-robots-txt'

import { SITE } from '@/config'
import postCssOklabPolyfill from '@csstools/postcss-oklab-function'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'
import autoprefixer from 'autoprefixer'
import cssDiscardComments from 'postcss-discard-comments'
import rehypeExternalLinks from 'rehype-external-links'
import Inspect from 'vite-plugin-inspect'
import lightningcss from 'vite-plugin-lightningcss'
import { remarkReadingTime } from './src/lib/readTime.ts'

import { defineConfig, passthroughImageService } from 'astro/config'
import AutoImport from 'unplugin-auto-import/astro'

import { Locales, baseLocale } from './src/config.ts'
const sitemapLocales = Object.fromEntries(Locales.map((_, i) => [Locales[i], Locales[i]]))

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentCollectionCache: true
  },
  site: SITE || 'localhost:4321',
  i18n: {
    defaultLocale: baseLocale,
    locales: Locales,
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true
    }
  },
  vite: {
    build: {
      minify: true,
      cssMinify: 'lightningcss',
      chunkSizeWarningLimit: 3000 // Increase the limit to 3000 kB
    },
    css: {
      postcss: {
        plugins: [postCssOklabPolyfill({ preserve: true }), autoprefixer(), cssDiscardComments({ removeAll: true })]
      }
    },
    server: {
      fs: {
        allow: ['../..']
      }
    },
    ssr: {
      external: ['node:buffer', 'three']
    },
    plugins: [
      lightningcss({
        browserslist: ['>= 0.25%', 'last 2 versions', 'maintained node versions', 'Firefox ESR', 'not dead'] // Correctly set browser queries
      }),
      tailwindcss(),
      legacy({
        targets: ['>= 0.25%', 'last 2 versions', 'maintained node versions', 'Firefox ESR', 'not dead']
      }),
      Inspect({
        build: false,
        outputDir: '.vite-inspect'
      })
    ]
  },
  output: 'server',
  image: { service: passthroughImageService() },
  adapter: cloudflare({
    imageService: 'cloudflare',
    mode: 'directory',
    functionPerRoute: true,
    routes: {
      strategy: 'auto'
    },
    platformProxy: {
      enabled: true
    }
  }),
  prefetch: {
    prefetchAll: true
  },
  integrations: [
    AutoImport({
      defaultExportByFilename: false,
      include: [/\.[tj]sx?$/, /\.md$/],
      packagePresets: ['detect-browser-es'],
      imports: ['react', 'react-router', 'react-i18next', 'react-router-dom'],
      viteOptimizeDeps: true,
      injectAtEnd: true,
      dirs: ['./src/utils/*.ts', './src/hooks'],
      dts: 'src/types/auto-imports.d.ts'
    }),
    pagefind(),
    icon({
      include: {
        tabler: ['*']
      }
    }),
    react(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'github-dark-dimmed',
        wrap: true
      },
      gfm: true,
      drafts: true
    }),
    robotsTxt({
      sitemap: 'https://www.devopsick.com/sitemap-0.xml',
      host: 'devopsick.com'
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
        debug: false
      }
    }),
    sitemap({
      entryLimit: 10000,
      i18n: {
        filter: (page) => page.secret !== true,
        defaultLocale: baseLocale,
        locales: sitemapLocales
      }
    })
  ],
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
