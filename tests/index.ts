import { testsFilter, testsFilterMap, testsMap } from './tests'
import { testsMapFilterMap } from './tests/map_filter_map'
import { benchmark } from './utils'

// const averageKey = 'Average (ms)'

const testGroups = [testsFilter, testsMap, testsFilterMap, testsMapFilterMap]

const run = () => {
  testGroups.forEach((testGroup) => {
    console.log('\n\n\n', testGroup.title)

    testGroup.tests.forEach((test) => {
      console.log('\n', test.title)

      const results = Object.entries(test.functions)
        // .filter((group) => group[0] === 'fleti')
        .map(([name, f]) => benchmark(name, f))

      console.log(JSON.stringify(results, null, 2))

      // const min = Math.min(...results.map((r) => r[averageKey]))

      // results.forEach((r) => {
      //   r['%'] = Math.round((r[averageKey] / min) * 10000) / 100
      // })
    })
  })

  console.log('over')
}

run()
