import { Server as SocketServer } from 'socket.io'
import http from 'http'
import { app } from '../app'
import { connnectionEvent } from './events/connection'
import type { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '../types'
import { ORIGINS } from '../utils/config'

export const server = http.createServer(app)
export const io = new SocketServer<
ClientToServerEvents,
ServerToClientEvents,
InterServerEvents,
SocketData
>(server, {
  cors: {
    origin: ORIGINS,
    credentials: true
  }
})

io.on('connection', connnectionEvent)
