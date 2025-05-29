import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    cors: true,
    allowedHosts: [
      'c516-49-47-218-225.ngrok-free.app',
    ],
    hmr: {
      protocol: 'wss',
      host: 'c516-49-47-218-225.ngrok-free.app',
    },
  },
});
