import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Forward form submissions to the mail backend during dev.
    proxy: {
      '/api': 'http://localhost:3015',
    },
  },
})
