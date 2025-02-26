import { ScheduleOptions } from 'node-cron'

// Re-export CronFunction type from service
export type { CronFunction } from './cron.service'

// Job configuration options interface
export interface CronJobOptions extends ScheduleOptions {
  name?: string
  timezone?: string
  runOnInit?: boolean
}

// Job status type
export type CronJobStatus = 'running' | 'stopped'

// Schedule validation error type
export type CronScheduleValidationError = {
  message: string
  schedule: string
  isValid: boolean
}
