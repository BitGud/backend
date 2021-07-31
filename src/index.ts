import http from 'http'
import { config } from './config/config'
import { app } from './app'
import { Server, Socket } from 'socket.io'

const port = config.PORT

const httpServer = new http.Server(app)

const io = new Server(httpServer, {
  cors: {
    allowedHeaders: '*',
    methods: '*',
    origin: '*',
  },
})

io.on('connection', (socket: Socket) => {
  socket.send('Connection success!')
})

const server = httpServer.listen(port, function () {
  console.log(`Listening on *:${port}`)
})
