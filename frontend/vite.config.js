import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.VITE_FRONTEND_URL,
    port: parseInt(process.env.VITE_FRONTEND_PORT, 10),
  }
});