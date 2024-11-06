import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: import.meta.env.VITE_FRONTENDURL,
    port: import.meta.env.VITE_FRONTEND_PORT,
  },
});
