import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/customer-success-risk-dashboard/',
  plugins: [react()],
})
