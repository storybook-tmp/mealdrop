import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  optimizeDeps: {
    include: [
      'axios',
      'react-lottie-player',
      'react-loading-skeleton',
      'react-multi-carousel',
      'react-redux',
      'react-router-dom',
      'react-transition-group',
      'styled-components',
      'use-dark-mode',
    ],
  },
  server: {
    port: 3000,
  },
})
