import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0', // 允许外部访问
    open: false, // 不自动打开浏览器
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
})