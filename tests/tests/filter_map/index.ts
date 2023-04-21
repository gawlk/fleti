import { fleti } from '../../fleti'

const greaterThan50 = (x: number) => x > 50
const power3 = (x: number) => x ** 3
const powerRandom = (x: number) => x ** Math.random()

export const testsFilterMap: TestGroup<number> = {
  title: 'Filter > Map',
  tests: [
    {
      title: '(x) => x > 50 => x ** 3',
      functions: {
        'for let i': (dataset) => {
          const length = dataset.length

          const result = []

          for (let i = 0; i < length; i++) {
            const v = dataset[i]

            if (greaterThan50(v)) {
              result.push(power3(v))
            }
          }

          return result
        },
        'for of': (dataset) => {
          const result = []

          for (const v of dataset) {
            if (greaterThan50(v)) {
              result.push(power3(v))
            }
          }

          return result
        },
        chained: (dataset) =>
          dataset.filter((v) => greaterThan50(v)).map((v) => power3(v)),
        fleti: (dataset) =>
          fleti(dataset)
            .filter((v) => greaterThan50(v))
            .map((v) => power3(v))
            .compute(),
      },
    },
    {
      title: '(x) => x > 50 => x ** Math.random()',
      functions: {
        'for let i': (dataset) => {
          const length = dataset.length

          const result = []

          for (let i = 0; i < length; i++) {
            const v = dataset[i]
            if (greaterThan50(v)) {
              result.push(powerRandom(v))
            }
          }

          return result
        },
        'for of': (dataset) => {
          const result = []

          for (const v of dataset) {
            if (greaterThan50(v)) {
              result.push(powerRandom(v))
            }
          }

          return result
        },
        chained: (dataset) =>
          dataset.filter((v) => greaterThan50(v)).map((v) => powerRandom(v)),
        fleti: (dataset) =>
          fleti(dataset)
            .filter((v) => greaterThan50(v))
            .map((v) => powerRandom(v))
            .compute(),
      },
    },
  ],
}
