import { bitgudMongoose } from '../utils/mongoose'
import { Schema } from 'mongoose'
import { CommitType } from '../types/commits'

const commitSchema = new Schema<CommitType>({
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
    index: true,
  },
  commitHash: {
    type: String,
    index: true,
  },
  timestamp: {
    type: Schema.Types.Date,
  },
  filesChanged: {
    type: Schema.Types.Number,
  },
  linesChanged: {
    type: Schema.Types.Number,
  },
  branchName: {
    type: String,
  },
  commitMessage: {
    type: String,
  },
  remoteOrigin: {
    type: String,
    index: true,
  },
})

const CommitModel = bitgudMongoose.model<CommitType>('commits', commitSchema)

export { CommitModel }
