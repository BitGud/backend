import express from 'express'
import { config } from './config/config'

const port = config.PORT

const app = express()

// define a route handler for the default home page
app.get('/', (req, res) => {
  // render the index template
  res.render('index')
})

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`)
})

export { app }
