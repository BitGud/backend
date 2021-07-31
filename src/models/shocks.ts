import { bitgudMongoose } from '../utils/mongoose'
import { Schema } from 'mongoose'
import { ShockType } from '../types'

const shockSchema = new Schema<ShockType>({
  uid: {
    type: String,
    index: true,
    required: true,
  },
  time: {
    type: Schema.Types.Date,
    index: true,
  },
})

const ShockModel = bitgudMongoose.model<ShockType>('shocks', shockSchema)

export { ShockModel }
