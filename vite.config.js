import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Make sure output formats are configured correctly
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        format: 'es' // or 'esm'
      }
    }
  }
})
