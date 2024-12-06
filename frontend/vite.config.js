import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    eslint({
      cache: false,
      include: ['src/**/*.js', 'src/**/*.jsx'],
      exclude: ['./node_modules/**'],
    }),
  ],
  server: {
    host: process.env.VITE_FRONTEND_URL,
    port: parseInt(process.env.VITE_FRONTEND_PORT, 10),
  }
});