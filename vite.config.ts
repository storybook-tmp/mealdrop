import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@hookform/resolvers',
      'react-hook-form',
      'react-loading-skeleton',
      'react-lottie-player',
      'react-multi-carousel',
      'react-transition-group',
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
