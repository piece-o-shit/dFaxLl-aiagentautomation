import NodeCron from 'node-cron'

export type CronFunction = (now: Date | 'manual' | 'init') => void

class Service {
  private runningJobs: Set<string> = new Set()
  private scheduledTasks: Map<string, NodeCron.ScheduledTask> = new Map()

  constructor() {}

  initialize(): void {
    // Initialize the service
    console.log('CronService initialized')
  }

  shutdown(): void {
    // Stop all scheduled tasks
    this.scheduledTasks.forEach(task => task.stop())
    this.scheduledTasks.clear()
    this.runningJobs.clear()
    console.log('CronService shutdown complete')
  }

  listJobs(): string[] {
    return Array.from(this.scheduledTasks.keys())
  }

  registerJob(schedule: string, cronFunction: CronFunction): NodeCron.ScheduledTask {
    // Validate cronFunction type
    if (typeof cronFunction !== 'function') {
      throw new Error('String type cronFunctions are not supported')
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
          if (typeof cronFunction === 'function') {
            await cronFunction(new Date())
          } else {
            throw new Error('String type cronFunctions are not supported')
          }
        } finally {
          this.runningJobs.delete(jobId)
        }
      }, { name: cronFunction.toString() })

      console.log(`Successfully registered job ${cronFunction.toString()}`)
      this.scheduledTasks.set(cronFunction.toString(), job)
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
