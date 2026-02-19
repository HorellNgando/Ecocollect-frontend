import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: './src/main.jsx',
      output: {
        manualChunks: undefined,
      }
    }
  },
  server: {
    historyApiFallback: true,
  },
  publicDir: 'public'
})
