import express from 'express'
import { userRoute, commitRoute, settingRoute } from './routes/'
import { Request, Response } from 'express'
import cors from 'cors'
import { createGithubCustomToken } from './utils/decodeGithubToken'
import { config } from './config/config'
import morgan from 'morgan'
import { checkFirebaseToken } from './middlewares/checkFirebaseToken'
import { initialiseScheduler } from './schedules/scheduler'
// initialiseScheduler()

const app = express()

app.use(cors())
app.use(express.json())

if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// define a route handler for the default home page
app.get('/', async (req: Request, res: Response) => {
  return res.status(200).send('A cool API :)')
})

app.post('/code', async (req: Request, res: Response) => {
  try {
    const code = req.body.code
    const customFirebaseToken = await createGithubCustomToken(code)
    return res.status(200).json({
      code: customFirebaseToken.code,
      uid: customFirebaseToken.uid,
    })
  } catch (err) {
    console.error('error code', err)
    return res.status(500).json(err.message)
  }
})

app.use('/commit', commitRoute)

// Atatch custom middlewares
app.use(checkFirebaseToken)

// Setup routes
app.use('/user', userRoute)
app.use('/setting', settingRoute)

export { app }
