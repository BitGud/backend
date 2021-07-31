import { CommitModel, SettingModel, UserModel } from '../models'
import { SettingType } from '../types'

export const getAListOfUsersForScheduler = async (): Promise<SettingType[]> => {
  try {
    // Get a list of settings that are enabled
    const enabled = await SettingModel.find({ enabled: true }).lean().exec()

    return Promise.resolve(enabled)
  } catch (err) {
    return Promise.reject(err)
  }
}
