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
    return Promise.resolve(doc)
  } catch (err) {
    return Promise.reject(err)
  }
}
