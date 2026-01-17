// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      fallback: '404.html',     // Changed for Vercel 404 handling
      precompress: false,
      trailingSlash: 'always'   // Changed for clean URLs without .html rewrites
    }),

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