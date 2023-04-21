import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  timeout: 5 * 60 * 1000,
  workers: 1,
  globalTeardown: './tests/markdown/index.ts',
})
