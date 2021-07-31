import admin from 'firebase-admin'
import { config } from '../config/config'

admin.initializeApp({
  credential: admin.credential.cert(config.FIREBASE_SERVICE_ACCOUNT),
})

export const generateCustomToken = async (uid: string): Promise<string> => {
  try {
    const customToken = await admin.auth().createCustomToken(uid)
    return Promise.resolve(customToken)
  } catch (err) {
    console.error('error generateCustomToken', err)
    return Promise.reject(err)
  }
}

export { admin }
