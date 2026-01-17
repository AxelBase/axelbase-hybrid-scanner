// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      fallback: '200.html',     // good choice for SPA-style fallback
      precompress: false,
      trailingSlash: 'never'
    }),

    // Remove or comment out this entire block
    // paths: {
    //   base: '/axelbase-hybrid-scanner'
    // },

    prerender: {
      entries: ['*'],
      handleHttpError: 'warn'
    }
  }
};

export default config;