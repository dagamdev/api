import type { SocketData, CustomPresence } from '../../types'

export async function presenceUpdateEvent (socket: SocketData, presence: CustomPresence) {
  socket.emit('presenceUpdate', presence)
}
