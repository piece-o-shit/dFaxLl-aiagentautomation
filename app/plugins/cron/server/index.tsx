import { CronService } from './cron.service'

export namespace CronServer {
  export const service = CronService
  export type {
    CronFunction,
    CronJobOptions,
    CronJobStatus,
    CronScheduleValidationError,
  }

  export const initialize = () => {
    return service.initialize()
  }

  export const shutdown = () => {
    return service.shutdown()
  }

  export const listJobs = () => {
    return service.listJobs()
  }
}
