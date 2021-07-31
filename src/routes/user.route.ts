import { Request, Response, Router } from 'express'
import { UserType } from 'user'
import { addUser, getUserDetails } from '../services/user.service'

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
      const uid = (req.headers['uid'] || '') as string

      const userObj = req.body as UserType
      const data = await addUser(uid, userObj)
      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json(err.message)
    }
  })

export { userRoute }
