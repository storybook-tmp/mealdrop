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
      'react-loading-skeleton',
      'react-multi-carousel',
      'react-lottie-player',
      'react-transition-group',
    ],
  },
  server: {
    port: 3000,
  },
})
