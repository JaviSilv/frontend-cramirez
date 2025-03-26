import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  preview: {
    host: true,
    port: 10000,
    allowedHosts: [
      '104.248.115.32:8080',
      'localhost'
    ]
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})