export const ssr = false;

export function load() {
  try {
    console.log('[Load] root +page.js executed');
  } catch (err) {
    console.error('[Load] error', err);
  }

  return {};
}