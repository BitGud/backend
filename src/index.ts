import http from 'http'
import { config } from './config/config'
import { app } from './app'
import { Server, Socket } from 'socket.io'

const port = config.PORT

const httpServer = new http.Server(app)

const io = new Server(httpServer, {
  path: '/socket.io',
})

io.on('connection', (socket: Socket) => {
  console.log('user connected', socket)
})

const server = httpServer.listen(port, function () {
  console.log(`Listening on *:${port}`)
})
