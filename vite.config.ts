import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: '.',
  resolve: {
    alias: {
      assets: '/src/assets',
      components: '/src/components',
      models: '/src/models',
      pages: '/src/pages',
      store: '/src/store',
      utils: '/src/utils',
    },
  },
});
