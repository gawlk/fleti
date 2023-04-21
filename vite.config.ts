import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { configDefaults } from 'vitest/config'

// @ts-ignore
import packageJSON from './package.json?json'

export default defineConfig({
  build: {
    lib: {
      entry: {
        [packageJSON.name]: resolve(__dirname, 'src/index.ts'),
        test: resolve(__dirname, 'tests/index.ts'),
      },
    },
  },
  test: {
    exclude: [...configDefaults.exclude, '**/*.spec.ts'],
  },
  plugins: [dts()],
})
