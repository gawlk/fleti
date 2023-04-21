export const createDataset = (datasetSize: number) =>
  new Array(datasetSize).fill(0).map(() => Math.random() * 100)
