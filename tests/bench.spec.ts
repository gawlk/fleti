import { test } from '@playwright/test'

test('bench', async ({ page }) => {
  const computations = new Promise((resolve) =>
    page.on('console', async (message) => {
      if (message.text() === 'over') {
        resolve(undefined)
      } else {
        console[message.type()](message)
      }
    })
  )

  await page.goto(`file://${process.cwd()}/tests/bench.html`)

  await computations
})
