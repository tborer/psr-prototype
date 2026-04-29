import { defineConfig } from 'vite';

export default defineConfig({
  base: '/psr-prototype/', // Use repository name for GitHub Pages
  build: {
    outDir: 'dist',
  }
});
