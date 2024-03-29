import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwind from "@astrojs/tailwind";
import million from "million/compiler";
import svelte from "@astrojs/svelte";
import tailwindcss from '@tailwindcss/vite';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), million.vite({
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
  }), svelte()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});