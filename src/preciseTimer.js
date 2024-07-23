class PreciseTimer {
  constructor({ startT = 0, tickInterval = 1000 } = {}) {
    this.startT = startT
    this.tickCount = startT
    this.tickInterval = tickInterval
    this.pastTimePerf = 0
    this.startTimePerf = null
    this.isRunning = false
    this.timerId = null
  }

  start() {
    this.startTimePerf = Date.now()
    this.isRunning = true
    this.scheduleNextTick()
  }

  _pastT() {
    return this.tickCount - this.startT
  }

  scheduleNextTick() {
    if (!this.isRunning) return
    let deviationAdjustOfThisTick = 0 // 当前 tick 需要调整的偏差
    const elapsedTime = this.pastTimePerf + (Date.now() - this.startTimePerf) // 已经运行的总时间
    const deviationTime = elapsedTime - (this._pastT() * 1000) // 误差时间


    if (deviationTime > 1000) {
      const averageDeviationTime = deviationTime / this._pastT()
      deviationAdjustOfThisTick = averageDeviationTime
    } else {
      deviationAdjustOfThisTick = deviationTime
    }

    const delay = this.tickInterval - deviationAdjustOfThisTick
    this.timerId = setTimeout(() => {
      this.tickCount++
      this.cb?.(this.tickCount)
      clearTimeout(this.timerId)
      this.scheduleNextTick()
    }, delay)
  }

  stop() {
    clearTimeout(this.timerId)
    this.pastTimePerf = this.pastTimePerf + (Date.now() - this.startTimePerf)
    this.isRunning = false
  }

  reset() {
    // 
  }

  on(cb) {
    if (typeof cb === 'function') {
      this.cb = cb
    }
  }
}

export default PreciseTimer