import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@reduxjs/toolkit',
      'react-loading-skeleton',
      'react-redux',
      'react-router-dom',
      'react-transition-group',
      'styled-components',
    ],
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
})
