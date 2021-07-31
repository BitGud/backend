export interface CommitType {
  userName: string
  userEmail: string
  commitHash: string
  timestamp: Date
  filesChanged: Number
  linesChanged: Number
  branchName: string
  commitMessage: string
  remoteOrigin: string
}
