import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Serve files from client/public as static assets at root (/)
  // Move your images/ folder into client/public/images/ so /images/blog 1.webp works
  publicDir: 'public',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
