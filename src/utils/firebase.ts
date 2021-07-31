import admin from 'firebase-admin'
import { config } from '../config/config'

admin.initializeApp({
  credential: admin.credential.cert(config.FIREBASE_SERVICE_ACCOUNT),
})

export { admin }
