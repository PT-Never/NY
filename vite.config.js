import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    allowedHosts: ['.netlify.app'] // hoặc cụ thể: ['devserver-main--quatang16.netlify.app']
  }
})
