import { average, createTimer } from '.'

const tries = 10
const datasetSize = 10_000_000

export const benchmark = (
  title: string,
  callback: (dataset: number[]) => void
) => {
  const timer = createTimer()

  const result: Record<string, string | number> = {
    title,
  }

  const time = average(
    new Array(tries).fill(0).map((_, index) => {
      const dataset = new Array(datasetSize)
        .fill(0)
        .map(() => Math.random() * 100)

      timer.start()

      callback(dataset)

      const time = timer.end()

      result[`Try ${index + 1}`] = time

      return time
    })
  )

  result['Average'] = time

  return result
}
