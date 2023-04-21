type Computation = (v: number) => number
type Test = (v: number) => boolean

type TestGroup<T> = {
  title: string
  tests: {
    title: string
    functions: Functions<T>
  }[]
}

type Functions<T> = {
  'for let i': (dataset: T[]) => any
  'for of': (dataset: T[]) => any
  chained: (dataset: T[]) => any
  fleti: (dataset: T[]) => any
}

type FunctionName = keyof Functions<any>

type Results = {
  [groupName: string]: {
    [testName: string]: Record<FunctionName, number[]>
  }
}

interface Benchmark {
  browser: {
    name: string
    version: string
  }
  results: Results
}
