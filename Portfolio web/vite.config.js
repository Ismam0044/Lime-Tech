import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { copyFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';

// Vercel serves dist/404.html with a real 404 status for any URL that vercel.json doesn't rewrite.
// It is a copy of the app shell, which then renders the "Page not found" route.
const notFoundPage = {
  name: 'not-found-page',
  apply: 'build',
  writeBundle({ dir }) {
    copyFileSync(dir + '/index.html', dir + '/404.html');
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), notFoundPage],
  // The largest chunk is three.js, which is lazy-loaded only when the LimeOS orb scrolls into view.
  build: { chunkSizeWarningLimit: 600 },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
