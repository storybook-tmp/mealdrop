import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-loading-skeleton', 'react-transition-group', 'use-dark-mode'],
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
})
