import scheduler from 'node-schedule'
import moment, { Moment } from 'moment'

export const scheduleMap: { [uid: string]: scheduler.Job } = {}

export const scheduleAJob = (uid: string, date: Moment, task: () => {}) => {
  const currentJob = scheduler.scheduleJob(date.toDate(), task)
  scheduleMap[uid] = currentJob
}

export const initialiseScheduler = async () => {}
