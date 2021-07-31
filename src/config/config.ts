import dotenv from 'dotenv'

dotenv.config()

const config = {
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI,
  FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT || './config/serviceAccount.json',
  GITHUB_VSCODE_CLIENT_ID: process.env.GITHUB_VSCODE_CLIENT_ID,
  GITHUB_VSCODE_CLIENT_SECRET: process.env.GITHUB_VSCODE_CLIENT_SECRET,
}

export { config }
