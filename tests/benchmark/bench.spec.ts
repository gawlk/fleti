import { test } from '@playwright/test'
import { writeFileSync } from 'fs'

test('bench', async ({ page, browserName, browser }) => {
  const computations = new Promise((resolve) =>
    page.on('console', (message) => {
      const benchmark: Benchmark = {
        browser: {
          name: browserName,
          version: browser.version(),
        },
        results: JSON.parse(message.text()),
      }

      writeFileSync(
        `./tests/benchmark/results/${browserName}.json`,
        JSON.stringify(benchmark, undefined, 2),
        undefined
      )

      resolve(undefined)
    })
  )

  await page.goto(`file://${process.cwd()}/tests/benchmark/index.html`)

  await computations
})
