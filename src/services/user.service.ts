import { SettingModel } from '../models/settings'
import { UserModel } from '../models/user'
import { UserType } from '../types/user'

export const getUserDetails = async (uid: string): Promise<UserType> => {
  try {
    const userObj = await UserModel.findOne({ uid: uid }).lean().exec()
    return Promise.resolve(userObj)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getUserDetailsByEmail = async (email: string): Promise<UserType> => {
  try {
    const userObj = await UserModel.findOne({ email: email }).lean().exec()
    return Promise.resolve(userObj)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getUserWebhooks = async (uid: string): Promise<string[]> => {
  try {
    const userObj = await UserModel.findOne({ uid: uid }).select('webhooks').lean().exec()
    return Promise.resolve(userObj?.webhooks ?? [])
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getUserDetailsByGithub = async (username: string): Promise<UserType> => {
  try {
    const userObj = await UserModel.findOne({ githubUsername: username }).lean().exec()
    return Promise.resolve(userObj)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const addUser = async (uid: string, userObj: UserType): Promise<UserType> => {
  try {
    // Check if the user already exist
    const check = await UserModel.findOne({ uid: uid }).lean()
    if (check !== null) {
      return Promise.resolve(null)
    }

    const doc = await new UserModel({ ...userObj, uid: uid }).save()

    // Add default setting
    await new SettingModel({
      monitorMode: 'commit-less',
      commitFrequency: 20,
      commitAmount: 30,
      uid: uid,
      enabled: true,
    }).save()
    return Promise.resolve(doc)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateLastCommit = async (email: string): Promise<UserType> => {
  try {
    const userObj = await UserModel.findOne(
      { email: email },
      {
        lastCommit: new Date(),
      }
    )
      .lean()
      .exec()

    return Promise.resolve(userObj)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updateLastShock = async (uid: string, date: Date): Promise<UserType> => {
  try {
    const userObj = await UserModel.findOne(
      { uid: uid },
      {
        lastShock: date,
      }
    )
      .lean()
      .exec()

    return Promise.resolve(userObj)
  } catch (err) {
    return Promise.reject(err)
  }
}
