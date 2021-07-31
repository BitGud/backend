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