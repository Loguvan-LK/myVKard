import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
   alias: 
    [
      {find: '@', replacement: path.resolve(__dirname, 'src')},
      {find: 'components', replacement: path.resolve(__dirname, 'src/components')},
      {find: 'assets', replacement: path.resolve(__dirname, 'src/assets')},
      {find: 'pages', replacement: path.resolve(__dirname, 'src/pages')},
      {find: 'utils', replacement: path.resolve(__dirname, 'src/utils')},
      {find: 'hooks', replacement: path.resolve(__dirname, 'src/hooks')},
      {find: 'context', replacement: path.resolve(__dirname, 'src/context')},
    ]
  }

  ,
  server: {
    host: true,
    port: 5173,
    cors: true,
    allowedHosts: [
      'localhost:5173',
    ],
    hmr: {
      protocol: 'wss',
      host: 'localhost:5173',
    },
  },
});