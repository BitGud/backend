import express from 'express'
import { userRoute, commitRoute } from './routes/'
import { Request, Response } from 'express'
import cors from 'cors'
import { createGithubCustomToken } from './utils/decodeGithubToken'

const app = express()

app.use(cors())
app.use(express.json())

// define a route handler for the default home page
app.get('/', async (req: Request, res: Response) => {
  return res.status(200).send('A cool API :)')
})

app.post('/code', async (req: Request, res: Response) => {
  try {
    const code = req.body.code
    const customFirebaseToken = await createGithubCustomToken(code)
    return res.status(200).send(customFirebaseToken)
  } catch (err) {
    return res.status(500).json(err.message)
  }
})

app.use('/user', userRoute)
app.use('/commit', commitRoute)

export { app }
