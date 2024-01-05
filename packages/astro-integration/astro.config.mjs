import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import solidJs from '@astrojs/solid-js';
import vue from '@astrojs/vue';
import svelte from '@astrojs/svelte';
import lit from '@astrojs/lit';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    react({
      include: ['**/react/*']
    }), 
    solidJs({
      include: ['**/solid/*', '**/solid-project/**']
    }), 
    vue(), 
    svelte(), 
    lit({
      include: ['**/lit/*', '**/lit-project/**']
    }), 
    preact({
      include: ['**/preact/*', '**/preact-project/**']
    })]
});