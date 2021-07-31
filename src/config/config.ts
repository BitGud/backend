import dotenv from 'dotenv'

dotenv.config()

const firebaseServiceAccountIsPath = process.env.FIREBASE_SERVICE_ACCOUNT_IS_PATH

let FIREBASE_SERVICE_ACCOUNT = './config/serviceAccount.json'

const encodeToBase64 = (data: string): string => {
  const base64 = Buffer.from(data).toString('base64')
  return base64
}

const decodeFromBase64 = (base64: string): string => {
  const text = Buffer.from(base64, 'base64').toString('ascii')
  return text
}

if (firebaseServiceAccountIsPath === 'true') {
  FIREBASE_SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT
} else {
  // It is JSON stringified
  const decoded = decodeFromBase64(process.env.FIREBASE_SERVICE_ACCOUNT)
  FIREBASE_SERVICE_ACCOUNT = JSON.parse(decoded)
}

const config = {
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI,
  FIREBASE_SERVICE_ACCOUNT: FIREBASE_SERVICE_ACCOUNT,
  GITHUB_VSCODE_CLIENT_ID: process.env.GITHUB_VSCODE_CLIENT_ID,
  GITHUB_VSCODE_CLIENT_SECRET: process.env.GITHUB_VSCODE_CLIENT_SECRET,
  FIREBASE_SERVICE_ACCOUNT_IS_PATH: process.env.FIREBASE_SERVICE_ACCOUNT_IS_PATH,
  NODE_ENV: process.env.NODE_ENV || 'development',
}

export { config }
