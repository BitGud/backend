import { CommitModel } from '../models/commit'
import { CommitType } from '../types/commits'
import { updateLastCommit } from './user.service'

export const addCommit = async (data: CommitType): Promise<Boolean> => {
  try {
    await new CommitModel(data).save()
    await updateLastCommit(data.userEmail)
    return Promise.resolve(true)
  } catch (err) {
    return Promise.reject(err)
  }
}
