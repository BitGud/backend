import express from 'express'
import { userRoute, commitRoute } from './routes/'
import { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

// define a route handler for the default home page
app.get('/', async (req: Request, res: Response) => {
  return res.status(200).json('A cool API :)')
})

app.post('/code', async (req: Request, res: Response) => {
  return res.status(200).send(`${req.body.code} OK`)
})

app.use('/user', userRoute)
app.use('/commit', commitRoute)

export { app }
