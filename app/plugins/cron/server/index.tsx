import { CronService } from './cron.service'
import type { CronFunction, CronJobOptions, CronJobStatus, CronScheduleValidationError } from './cron.types'

export const service = CronService
export type { CronFunction, CronJobOptions, CronJobStatus, CronScheduleValidationError }

export const initialize = () => service.initialize()
export const shutdown = () => service.shutdown() 
export const listJobs = () => service.listJobs()
