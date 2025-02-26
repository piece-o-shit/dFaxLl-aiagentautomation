import NodeCron from 'node-cron'

export type CronFunction = string | ((now: Date | 'manual' | 'init') => void)

class Service {
  private runningJobs: Set<string> = new Set()

  constructor() {}

  registerJob(schedule: string, cronFunction: CronFunction): void {
    // Validate cronFunction type
    if (typeof cronFunction !== 'string' && typeof cronFunction !== 'function') {
      console.error('Invalid cronFunction type - must be string or function')
      throw new Error('Invalid cronFunction type - must be string or function')
    }

    const isValidSchedule = NodeCron.validate(schedule)
    const isJobRegistered = this.isRegistered(cronFunction)

    if (isJobRegistered) {
      console.log(`Job ${cronFunction.toString()} already registered`)
      return
    }

    if (!isValidSchedule) {
      console.error(`Invalid cron schedule ${schedule} for job ${cronFunction.toString()}`)
      throw new Error(
        `Invalid cron schedule ${schedule} for job ${cronFunction.toString()}`
      )
    }

    try {
      const job = NodeCron.schedule(schedule, async () => {
        const jobId = cronFunction.toString()
        this.runningJobs.add(jobId)
        try {
          await cronFunction(new Date())
        } finally {
          this.runningJobs.delete(jobId)
        }
      }, { name: cronFunction.toString() })

      console.log(`Successfully registered job ${cronFunction.toString()}`)
      return job
    } catch (error) {
      console.error(`Failed to schedule job ${cronFunction.toString()}: ${error}`)
      throw error
    }
  }

  private isRegistered(cronFunction: CronFunction): boolean {
    const jobs = NodeCron.getTasks()
    return jobs.has(cronFunction.toString())
  }

  isJobRunning(cronFunction: CronFunction): boolean {
    return this.runningJobs.has(cronFunction.toString())
  }
}

export const CronService = new Service()
