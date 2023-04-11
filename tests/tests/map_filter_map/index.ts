import { fleti } from '../../fleti'

const greaterThan50 = (x: number) => x > 50
const power3 = (x: number) => x ** 3
const powerRandom = (x: number) => x ** Math.random()

export const testsMapFilterMap: TestGroup<number> = {
  title: 'Map > Filter > Map',
  tests: [
    {
      title: '(x) => round(x) => x > 50 => x * 3',
      functions: {
        'for let i': (dataset) => {
          const length = dataset.length

          const result = []

          for (let i = 0; i < length; i++) {
            const v = dataset[i]

            if (greaterThan50(v)) {
              result.push(power3(Math.round(v)))
            }
          }

          return result
        },
        'for of': (dataset) => {
          const result = []

          for (const v of dataset) {
            if (greaterThan50(v)) {
              result.push(power3(Math.round(v)))
            }
          }

          return result
        },
        chained: (dataset) => {
          return dataset
            .map((v) => Math.round(v))
            .filter((v) => greaterThan50(v))
            .map((v) => power3(v))
        },
        fleti: (dataset) => {
          return fleti(dataset)
            .map((v) => Math.round(v))
            .filter((v) => greaterThan50(v))
            .map((v) => power3(v))
            .compute()
        },
      },
    },
  ],
}
