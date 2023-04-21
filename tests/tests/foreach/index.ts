import { fleti } from '../../fleti'

export const testsForEach: TestGroup<number> = {
  title: 'For each',
  tests: [
    {
      title: '(x) => x + 1',
      functions: {
        'for let i': (dataset) => {
          const length = dataset.length
          for (let i = 0; i < length; i++) {
            dataset[i] += 1
          }
          return dataset
        },
        'for of': (dataset) => {
          for (const i of Array.from(dataset.keys())) {
            dataset[i] += 1
          }
          return dataset
        },
        chained: (dataset) => {
          dataset.forEach((_, i) => (dataset[i] += 1))
          return dataset
        },
        fleti: (dataset) => {
          fleti(dataset)
            .forEach((_, i) => (dataset[i] += 1))
            .compute()
          return dataset
        },
      },
    },
  ],
}
