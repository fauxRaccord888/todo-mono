/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,md,mdx,svelte,ts,tsx,vue,astro}',
    './node_modules/@todo-mono/**/src/**/*.{html,js,jsx,md,mdx,svelte,ts,tsx,vue,astro}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
