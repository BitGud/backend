import express from 'express'
import { config } from './config/config'
import { userRoute, commitRoute } from './routes/'
import { Request, Response } from 'express'

const port = config.PORT

const app = express()

// define a route handler for the default home page
app.get('/', async (req: Request, res: Response) => {
  return res.status(200).json('test')
})

app.use('/user', userRoute)
app.use('/commit', commitRoute)

// start the express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
