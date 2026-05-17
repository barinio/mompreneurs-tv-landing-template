import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    env: {
      GITHUB_OWNER: 'test-owner',
      GITHUB_REPO: 'test-repo',
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
