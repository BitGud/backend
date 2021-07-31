import { CommitModel } from '../models/commit'
import { CommitType } from '../types/commits'

export const addCommit = async (data: CommitType): Promise<Boolean> => {
  try {
    await new CommitModel(data).save()
    return Promise.resolve(true)
  } catch (err) {
    return Promise.reject(err)
  }
}
