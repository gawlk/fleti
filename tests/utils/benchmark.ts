import { createDataset, createTimer } from '.'

export const benchmark = (
  callback: (dataset: number[]) => any,
  datasetSize: number,
  tries: number
) => {
  const timer = createTimer()

  return new Array(tries).fill(0).map(() => {
    const dataset = createDataset(datasetSize)

    timer.start()

    callback(dataset)

    return timer.end()
  })
}
