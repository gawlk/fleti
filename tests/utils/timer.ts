export const createTimer = () => ({
  time: 0,
  start() {
    this.time = performance.now()
  },
  end() {
    const result = performance.now() - this.time
    this.time = 0
    return result
  },
})
