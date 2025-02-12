import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export namespace DateTool {
  export function nowTimestamp(): number {
    return new Date().getTime()
  }

  export function now(): Date {
    return new Date()
  }

  export function toHuman(date: Date): string {
    if (!isDefined(date)) {
      return ''
    }

    if (!isDefined(date)) {
      console.error(
        'Invalid date. Please ensure you are providing the correct value.',
      )
      return 'Invalid Date'
    }

    const dateHuman = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    const timeHuman = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    return `${dateHuman}, ${timeHuman}`
  }

  export function isDefined(date: Date): boolean {
    return !isNaN(date.getTime())
  }

  export function isBefore(dateBefore: Date, dateAfter: Date): boolean {
    return dateBefore < dateAfter
  }

  export function timeAgo(
    date: Date,
    options?: {
      threshold?: {
        amount: number
        unit: 'days' | 'weeks' | 'months' | 'years'
      }
    },
  ): string {
    dayjs.extend(relativeTime)

    const dateDayJs = dayjs(date)
    const nowDayJs = dayjs()

    if (options?.threshold) {
      const dateThresholdDayJs = nowDayJs.subtract(
        options.threshold.amount,
        options.threshold.unit,
      )

      if (dateDayJs.isBefore(dateThresholdDayJs)) {
        return toHuman(date)
      }
    }

    return dateDayJs.fromNow()
  }

  export function addMinutes(date: Date, minutes: number): Date {
    const dateUpdated = new Date(date.getTime())
    const seconds = minutes * 60
    const milliseconds = seconds * 1000

    dateUpdated.setTime(dateUpdated.getTime() + milliseconds)

    return dateUpdated
  }

  export function getTimestamp(date?: Date): number {
    return date ? date.getTime() : nowTimestamp()
  }

  export function getDifferenceInMinutes(dateOne: Date, dateTwo: Date): number {
    const differenceInMilliseconds = Math.abs(
      dateTwo.getTime() - dateOne.getTime(),
    )

    const differenceInMinutes = differenceInMilliseconds / (1000 * 60)

    return Math.floor(differenceInMinutes)
  }

  export function getTimeRemainingInSeconds(date: Date) {
    try {
      const endDate = new Date(date)

      const currentDate = new Date()

      const timeDifference = endDate.getTime() - currentDate.getTime()

      if (timeDifference <= 0) {
        return 0
      }

      const secondsRemaining = Math.floor(timeDifference / 1000)

      return secondsRemaining
    } catch (error) {
      console.error('Error:', error.message)
      return 0
    }
  }

  export function addDays(date: Date, days: number): Date {
    const dateUpdated = new Date(date.getTime())

    dateUpdated.setDate(dateUpdated.getDate() - days)

    return dateUpdated
  }

  export function getDifferenceInSeconds(dateOne: Date, dateTwo: Date): number {
    const differenceInMilliseconds = Math.abs(
      dateTwo.getTime() - dateOne.getTime(),
    )

    const differenceInSeconds = differenceInMilliseconds / 1000

    return Math.floor(differenceInSeconds)
  }

  export function getDifferenceInDays(dateOne: Date, dateTwo: Date): number {
    const differenceInMinutes = getDifferenceInMinutes(dateOne, dateTwo)

    const differenceInDays = differenceInMinutes / 60 / 24

    return Math.floor(differenceInDays)
  }

  export function timestampToDateString(timestamp: number): string {
    const isTimestampSeconds = timestamp < 1e12

    if (isTimestampSeconds) {
      timestamp *= 1000
    }

    const date = new Date(timestamp)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

    return dateString
  }
}
