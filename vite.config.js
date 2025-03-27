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
        target: 'https://backendcramirez.onrender.com', // Backend en Render
        changeOrigin: true,
        secure: true // Render usa HTTPS, por lo que debe ser `true`
      }
    }
  },
  preview: {
    host: true,
    port: 10000,
    allowedHosts: ['localhost']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
