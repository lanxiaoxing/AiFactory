import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: false,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  // 生产构建优化
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'map': ['leaflet', 'react-leaflet'],
        },
      },
    },
  },
})
