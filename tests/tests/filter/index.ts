import { fleti } from '../../fleti'

const greaterThan50 = (x: number) => x > 50

export const testsFilter: TestGroup<number> = {
  title: 'Filter',
  tests: [
    {
      title: '(x) => x > 50',
      functions: {
        'for let i': (dataset) => {
          const length = dataset.length

          const result = []

          for (let i = 0; i < length; i++) {
            const v = dataset[i]

            if (greaterThan50(v)) {
              result.push(v)
            }
          }

          return result
        },
        'for of': (dataset) => {
          const result = []

          for (const v of dataset) {
            if (greaterThan50(v)) {
              result.push(v)
            }
          }

          return result
        },
        chained: (dataset) => dataset.filter((v) => greaterThan50(v)),
        fleti: (dataset) =>
          fleti(dataset)
            .filter((v) => greaterThan50(v))
            .compute(),
      },
    },
  ],
}
