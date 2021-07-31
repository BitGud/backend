import scheduler from 'node-schedule'
import moment, { Moment } from 'moment'
import { getAListOfUsersForScheduler } from '../services/combined.service'
import { SettingType } from 'settings'
import { CommitModel } from '../models'
import { getUserDetails } from '../services/user.service'

export const scheduleMap: { [uid: string]: scheduler.Job } = {}
export const settingMap: { [uid: string]: SettingType } = {}

export const scheduleAJob = (uid: string, date: Moment, task: any) => {
  const currentJob = scheduler.scheduleJob(date.toDate(), task)
  scheduleMap[uid] = currentJob
}

const shockFunction = async (uid: string) => {
  console.log('⚡')
}

export const checkCommit = async (setting: SettingType, startTime: Moment) => {
  try {
    let getShock = false

    console.log('startTime', startTime.toDate().toISOString())
    console.log('endTime', new Date().toISOString())
    const endTime = moment()

    // User lookup
    let userEmail = ''
    const query: Record<string, any> = {}
    const userObj = await getUserDetails(setting.uid.valueOf())
    if (userObj !== null) {
      query['userEmail'] = userObj.email
    }
    query['timestamp'] = {
      $gte: startTime.toDate(),
      $lte: endTime.toDate(),
    }

    console.log('query', query)

    // Check number of commits from start time to now

    const commits = (await CommitModel.find(query).countDocuments().exec()) ?? 0

    if (setting.monitorMode === 'commit-less') {
      // Should not commit more than commit frequence
      if (commits > setting.commitAmount) {
        getShock = true
      }
    } else if (setting.monitorMode === 'commit-more') {
      // Should commit more than commit frequence
      if (commits <= setting.commitAmount) {
        getShock = true
      }
    }

    console.log('getShock', getShock)
    console.log('commits', commits)
    console.log('Checking setting now', setting)

    if (getShock) {
      // Trigger webhooks for this user
      // Increment the shocked counter
      // Set the last chocked Date/time
      await shockFunction(setting.uid.valueOf())
    }
  } catch (err) {
    console.error('error checkCommit', err)
  }
}

const calcualteScheduleDate = (setting: SettingType) => {
  return moment().add(setting.commitFrequency.valueOf(), 'minutes')
}

export const initialiseScheduler = async () => {
  try {
    const settings = await getAListOfUsersForScheduler()
    for (const setting of settings) {
      const startTime = moment()
      settingMap[setting.uid.valueOf()] = setting
      scheduleAJob(setting.uid.valueOf(), calcualteScheduleDate(setting), function () {
        checkCommit(setting, startTime)
      })
    }
  } catch (err) {
    console.error('error initialiseScheduler', err)
  }
}
