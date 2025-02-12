export namespace NumberTool {
  export function getPercentage(start: number, current: number, end: number) {
    if (current <= start) {
      return 0
    } else if (current >= end) {
      return 100
    } else {
      const timeRangeTotal = end - start
      const timeElapsed = current - start
      const percentage = (timeElapsed / timeRangeTotal) * 100
      return Math.round(percentage)
    }
  }

  export function getRandomNumber(min: number = 0, max: number = 1): number {
    const random = Math.random() * (max - min) + min
    return random
  }
}
