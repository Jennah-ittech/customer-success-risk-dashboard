import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/customer-success-risk-dashboard/',
  plugins: [react()],
})
