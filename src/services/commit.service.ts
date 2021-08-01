import { CommitModel } from '../models/commit'
import { CommitType } from '../types/commits'
import { getUserDetailsByEmail, updateLastCommit } from './user.service'
import { sendShock } from '../index'

export const addCommit = async (data: CommitType): Promise<Boolean> => {
  try {
    await new CommitModel(data).save()
    await updateLastCommit(data.userEmail)

    const user = await getUserDetailsByEmail(data.userEmail)
    await sendShock(user.uid)
    return Promise.resolve(true)
  } catch (err) {
    return Promise.reject(err)
  }
}
