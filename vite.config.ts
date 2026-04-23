import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'axios',
      'react-loading-skeleton',
      'react-lottie-player',
      'react-multi-carousel',
      'react-redux',
      'react-router-dom',
      'react-transition-group',
      'styled-components',
      'use-dark-mode',
    ],
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
})
