export type MonitorMode = 'commit-less' | 'commit-more'

export interface SettingType {
  monitorMode: MonitorMode
  commitFrequency: Number
  commitAmount: Number
  uid: String
  enabled: Boolean
}
