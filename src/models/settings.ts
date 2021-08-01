import { bitgudMongoose } from '../utils/mongoose'
import { Schema } from 'mongoose'
import { SettingType } from '../types/settings'

const settingSchema = new Schema<SettingType>({
  monitorMode: {
    type: String,
  },
  commitFrequency: {
    type: Schema.Types.Number,
  },
  commitAmount: {
    type: Schema.Types.Number,
  },
  uid: {
    type: Schema.Types.String,
    index: true,
  },
  enabled: {
    type: Schema.Types.Boolean,
  },
})

const SettingModel = bitgudMongoose.model<SettingType>('settings', settingSchema)

export { SettingModel }
