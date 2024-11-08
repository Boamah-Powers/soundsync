import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.VITE_FRONTEND_URL,  // Access the host from .env
    port: parseInt(process.env.VITE_FRONTEND_PORT, 10), // Convert port to a number
  },
});
