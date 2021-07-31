import { Request, Response, Router } from 'express'
import { CommitType } from '../types/commits'
import { addCommit } from '../services/commit.service'

const commitRoute = Router()

commitRoute.route('/add').post(async (req: Request, res: Response) => {
  try {
    const commitData = req.body as CommitType
    await addCommit(commitData)
    return res.status(200).json('Added')
  } catch (err) {
    return res.status(500).json(err.message)
  }
})

export { commitRoute }
