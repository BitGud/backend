import { ShockModel } from '../models/shocks'
import { ShockType } from '../types'

export const addShock = async (uid: string, date: Date): Promise<ShockType> => {
  try {
    const doc = await new ShockModel({
      uid: uid,
      time: date,
    }).save()
    return Promise.resolve(doc)
  } catch (err) {
    return Promise.reject(err)
  }
}
