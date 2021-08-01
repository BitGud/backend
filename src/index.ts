import http from 'http'
import { config } from './config/config'
import { app } from './app'
import { Server, Socket } from 'socket.io'

const port = config.PORT

process.on('uncaughtException', (err) => {
  console.error('error happened', err)
})

process.on('unhandledRejection', (err) => {
  console.error('error happened', err)
})

const httpServer = new http.Server(app)

const io = new Server(httpServer, {
  cors: {
    allowedHeaders: '*',
    methods: '*',
    origin: '*',
  },
})

export const sendShock = async (uid: string) => {
  console.log('shock user', uid)
  io.to(uid).emit('shock', {})
}

io.on('connection', (socket: Socket) => {
  const uid = socket.handshake.auth.token
  socket.join(uid)
  sendShock(uid)
  socket.send(`Connection success! Got UID: ${uid}`)
})

const server = httpServer.listen(port, function () {
  console.log(`Listening on *:${port}`)
})
