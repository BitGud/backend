import http from 'http'
import { config } from './config/config'
import { app } from './app'

const port = config.PORT

const httpServer = new http.Server(app)

const server = httpServer.listen(port, function () {
  console.log(`Listening on *:${port}`)
})
