import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react-loading-skeleton',
      'react-lottie-player',
      'react-multi-carousel',
      'react-transition-group',
    ],
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
})
