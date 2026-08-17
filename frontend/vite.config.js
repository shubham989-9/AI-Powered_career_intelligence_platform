import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    API_BASE_URL: JSON.stringify(
      process.env.VITE_API_URL || (process.env.NODE_ENV === 'production'
        ? 'https://career-api-4nux.onrender.com'
        : 'http://127.0.0.1:8000')
    ),
  },
})