import { testsToRun } from './tests'
import { benchmark, datasetSize, tries } from './utils'

const run = (datasetSize: number, tries: number) => {
  const resultsAll: Record<string, any> = {}

  testsToRun.forEach((testGroup) => {
    const resultsGroup: Record<string, any> = {}

    testGroup.tests.forEach((test) => {
      const resultsTest: Record<string, any> = {}

      Object.entries(test.functions).forEach(([name, f]) => {
        resultsTest[name] = benchmark(f, datasetSize, tries)
      })

      resultsGroup[test.title] = resultsTest
    })

    resultsAll[testGroup.title] = resultsGroup
  })

  console.log(JSON.stringify(resultsAll, null, 2))
}

run(datasetSize, tries)
