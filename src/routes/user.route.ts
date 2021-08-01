import { Request, Response, Router } from 'express'
import { UserType } from 'user'
import { addUser, getUserDetails } from '../services/user.service'
import moment from 'moment'

const userRoute = Router()

userRoute
  .route('/')
  .get(async (req: Request, res: Response) => {
    try {
      const uid = (req.headers['uid'] || '') as string
      const data = await getUserDetails(uid)
      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json(err.message)
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const uid = req.headers['uid'] as string

      const userObj = req.body as UserType
      const data = await addUser(uid, userObj)
      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json(err.message)
    }
  })

userRoute.route('/dashboard').get(async (req: Request, res: Response) => {
  try {
    const uid = (req.headers['uid'] || '') as string

    const returnData = {
      shocked: 10,
      lastShock: moment().subtract(33, 'minutes'),
      rewards: 0.3,
    }

    // const data = await getUserDetails(uid)
    return res.status(200).json(returnData)
  } catch (err) {
    return res.status(500).json(err.message)
  }
})

export { userRoute }
