export interface UserType {
  uid: string
  displayName: string
  email: string
  photoUrl: string
  githubUsername?: string
  lastCommit: Date
  webhooks: string[]
}
