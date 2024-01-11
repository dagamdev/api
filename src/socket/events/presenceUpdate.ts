import { Socket } from "socket.io"

export const presenceUpdateEvent = async (socket: Socket, presence: any) => {
   
  socket.emit('presenceUpdate', presence)
}