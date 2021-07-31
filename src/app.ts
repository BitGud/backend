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
  console.log(`Server started at http://localhost:${port}`)
})
