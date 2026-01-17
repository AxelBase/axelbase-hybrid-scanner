// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

console.log('[SvelteKit] Loading svelte.config.js');

const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '200.html',
      precompress: false,
      trailingSlash: 'never'
    }),

    prerender: {
      entries: ['*'],
      handleHttpError: ({ status, path }) => {
        console.warn('[Prerender warning]', status, path);
        return 'warn';
      }
    }
  }
};

export default config;
