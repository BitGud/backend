import { SettingModel } from '../models/settings'
import { SettingType } from '../types/settings'

export const getSetting = async (uid: string): Promise<SettingType> => {
  try {
    const doc = await SettingModel.findOne({ uid: uid }).lean().exec()
    return Promise.resolve(doc)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateSetting = async (uid: string, payload: SettingType): Promise<SettingType> => {
  try {
    const doc = await SettingModel.findOneAndUpdate({ uid: uid }, payload).lean().exec()
    return Promise.resolve(doc)
  } catch (err) {
    return Promise.reject(err)
  }
}
