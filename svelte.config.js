import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html' // 🔴 THIS IS CRITICAL
    }),
    prerender: {
      handleHttpError: 'warn'
    }
  }
};
