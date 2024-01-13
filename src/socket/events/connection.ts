import { type Socket } from 'socket.io'
import { addLikesEvent } from './addLike'
import { addViewEvent } from './addView'
import { removeLikeEvent } from './removeLike'
import { MyBot as client } from '../../client'
import { presenceUpdateEvent } from './presenceUpdate'
import type { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '@/types'
import { DISCORD } from '@/utils/consts'

export let socket: any

export const connnectionEvent = (socket: Socket<ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData>) => {
  console.log({ id: socket.id })

  socket.on('addLike', () => {
    addLikesEvent(socket)
  })

  socket.on('removeLike', () => {
    removeLikeEvent(socket)
  })

  socket.on('addView', () => {
    addViewEvent(socket)
  })

  client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (typeof oldPresence?.guild === 'object' && oldPresence.guild?.id !== DISCORD.GUILD_ID) return
    if (oldPresence?.userId !== DISCORD.USER_ID) return

    // console.log({msg: 'Update user', newPresence})

    const activities = newPresence?.activities.map((m: any) => ({ ...m, emoji: m.emoji?.name }))
    const updatePresence = {
      activities,
      status: newPresence.status,
      clientStatus: newPresence.clientStatus
    }

    presenceUpdateEvent(socket, updatePresence)
  })
}
