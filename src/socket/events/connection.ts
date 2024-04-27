import { addViewEvent } from './addView'
import { addLikeEvent } from './addLike'
import { removeLikeEvent } from './removeLike'
import type { SocketData } from '../../types'

export const connnectionEvent = (socket: SocketData) => {
  socket.on('addView', (data) => {
    addViewEvent(socket, data)
  })

  socket.on('addLike', (data) => {
    addLikeEvent(socket, data)
  })

  socket.on('removeLike', (data) => {
    removeLikeEvent(socket, data)
  })
}
