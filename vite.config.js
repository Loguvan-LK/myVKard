import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: 'components', replacement: path.resolve(__dirname, 'src/components') },
      { find: 'assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: 'pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: 'utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: 'hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: 'context', replacement: path.resolve(__dirname, 'src/context') },
    ]
  },
  server: {
    host: true,
    port: 5173,
    cors: true,
    allowedHosts: [
      'localhost:5173',
      '0107-2405-201-e040-e0e5-a9d5-fae4-f072-a2a1.ngrok-free.app'
    ],
    hmr: {
      protocol: 'wss',
      host: '0107-2405-201-e040-e0e5-a9d5-fae4-f072-a2a1.ngrok-free.app',
    },
  },
});
