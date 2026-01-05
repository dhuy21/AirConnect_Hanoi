import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Load .env file from project root (parent directory)
  envDir: resolve(__dirname, '..'),
  envPrefix: 'VITE_', // Only expose variables prefixed with VITE_ to the client
  server: {
    // Allow all hosts for tunneling (Cloudflare, ngrok, etc.)
    allowedHosts: true,
  }
})
