import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'



// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    // Simulates a browser environment (required for mounting Vue components)
    environment: 'jsdom',
    // Global setup file for extending matchers (like axe assertions)
    setupFiles: ['./src/test/setup.ts'],
    // Optional: explicit include pattern
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true, // Optional: allows using describe/it without importing
  },
})
