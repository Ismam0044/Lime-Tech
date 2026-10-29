import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // The largest chunk is three.js, which is lazy-loaded only when the LimeOS orb scrolls into view.
  build: { chunkSizeWarningLimit: 600 },
  // Bundle every dependency into the pre-render server build so it runs under plain Node.
  ssr: { noExternal: true },
});
