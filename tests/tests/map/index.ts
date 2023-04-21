import { fleti } from '../../fleti'

const power3 = (x: number) => x ** 3

export const testsMap: TestGroup<number> = {
  title: 'Map',
  tests: [
    {
      title: '(x) => x ** 3',
      functions: {
        'for let i': (dataset) => {
          const length = dataset.length
          const result = []
          for (let i = 0; i < length; i++) {
            const v = dataset[i]
            result.push(power3(v))
          }
          return result
        },
        'for of': (dataset) => {
          const result = []
          for (const v of dataset) {
            result.push(power3(v))
          }
          return result
        },
        chained: (dataset) => dataset.map((v) => power3(v)),
        fleti: (dataset) =>
          fleti(dataset)
            .map((v) => power3(v))
            .compute(),
      },
    },
  ],
}
