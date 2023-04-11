type Computation = (v: number) => number
type Test = (v: number) => boolean

type TestGroup<T> = {
  title: string
  tests: {
    title: string
    functions: {
      'for let i': (dataset: T[]) => any
      'for of': (dataset: T[]) => any
      chained: (dataset: T[]) => any
      fleti: (dataset: T[]) => any
    }
  }[]
}
