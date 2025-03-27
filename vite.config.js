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
  server: {
    proxy: {
      '/api': {
        target: 'http://104.248.115.32:8080', // URL de tu backend
        changeOrigin: true,
        secure: false // Desactiva SSL si el backend está en HTTP
      }
    }
  },
  preview: {
    host: true,
    port: 10000,
    allowedHosts: [
      'cramirezsac.onrender.com',
      'localhost'
    ]
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
