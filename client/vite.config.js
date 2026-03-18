import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({server: {
  host: true,
  port: 5173,
  strictPort: true,
  watch: {
    usePolling: true,
  },
  hmr: {
    host: 'localhost',
    protocol: 'ws',
    Port: 5173,
    
  },
},
  plugins: [react(),tailwindcss()],
  
}) 
