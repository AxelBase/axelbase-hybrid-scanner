import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      fallback: 'index.html' // 🔴 THIS IS CRITICAL
    }),
    prerender: {
      handleHttpError: 'warn'
    }
  }
};
