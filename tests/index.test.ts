import { describe, it, expect } from 'vitest'

import { testsToRun } from './tests'
import { createDataset } from './utils'

const dataset = createDataset(100)

describe('suite', () => {
  it('serial test', () => {
    testsToRun.forEach((testGroup) => {
      console.log('Group:', testGroup.title)

      testGroup.tests
        .filter((test) => !test.title.includes('random'))
        .forEach((test) => {
          console.log('Testing:', test.title)

          const [relativeName, relativeF] = Object.entries(
            test.functions
          ).shift()
          const relativeResults = relativeF(dataset) as any[]

          Object.entries(test.functions)
            .slice(1)
            .forEach(([name, f]) => {
              console.log(relativeName, 'vs', name)
              expect(relativeResults).toEqual(f(dataset))
            })
        })
    })
  })
})
