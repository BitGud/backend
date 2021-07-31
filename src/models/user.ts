import { bitgudMongoose } from '../utils/mongoose'
import { Schema } from 'mongoose'
import { UserType } from '../types/user'

const userSchema = new Schema<UserType>({
  uid: {
    type: String,
    index: true,
    required: true,
  },
  displayName: {
    type: String,
    index: true,
  },
  email: {
    type: String,
    index: true,
    required: true,
  },
  photoUrl: {
    type: String,
  },
  githubUsername: {
    type: String,
    index: true,
  },
  lastCommit: {
    type: Schema.Types.Date,
    index: true,
  },
  webhooks: {
    type: Schema.Types.String,
  },
})

const UserModel = bitgudMongoose.model<UserType>('users', userSchema)

export { UserModel }
