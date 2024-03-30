import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import million from "million/compiler";
import svelte from "@astrojs/svelte";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://about-myself.pages.dev',
  i18n: {
    defaultLocale: "en",
    fallback: {
      ru: "en"
    },
    locales: ["en", "ru", {
        path: "uk", // no slashes included
        codes: ["uk", "uk-UA", "ru-UA"]
    }],
    routing: {
        prefixDefaultLocale: true
    }
  },
  vite: {
    plugins: [million.vite({
      mode: "react",
      server: true,
      auto: {
        threshold: 0.05,
        skip: ["useBadHook", /badVariable/g]
      }
    })]
  },
  integrations: [react(), vue(), tailwind({
    applyBaseStyles: false
  }), svelte(), sitemap()]
});