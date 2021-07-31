import { admin } from '../utils/firebase'
import { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models'

// middleware to check that the given token is correct
const checkFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  let _firebaseToken = req.headers['Authorization'] as string
  _firebaseToken = _firebaseToken.replace('Bearer', '').trim()
  if (_firebaseToken == null) {
    return res.status(401).send('Unauthorized.')
  }

  let tokenData
  try {
    tokenData = await admin.auth().verifyIdToken(_firebaseToken)
    const uid = tokenData.uid || ''

    req.headers['uid'] = uid

    const userData = await UserModel.findOne({ uid: uid }).lean().exec()
    let displayName = ''
    if (userData !== null) {
      displayName = userData.displayName
    }
    req.headers['displayName'] = displayName

    return next()
  } catch (err) {
    return res.status(401).json({ status: 'error', error: err.message })
  }
}

export { checkFirebaseToken }
