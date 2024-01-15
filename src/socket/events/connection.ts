import { addViewEvent } from './addView'
import { addLikeEvent } from './addLike'
import { removeLikeEvent } from './removeLike'
import { MyBot as client } from '../../client'
import { presenceUpdateEvent } from './presenceUpdate'
import type { CustomPresence, SocketData } from '../../types'
import { DISCORD } from '../../utils/consts'
import { type Activity } from 'discord.js'

export const connnectionEvent = (socket: SocketData) => {
  // console.log({ id: socket.id })

  socket.on('addView', (data) => {
    addViewEvent(socket, data)
  })

  socket.on('addLike', (data) => {
    addLikeEvent(socket, data)
  })

  socket.on('removeLike', (data) => {
    removeLikeEvent(socket, data)
  })

  client.on('presenceUpdate', (oldPresence, newPresence) => {
    if (typeof oldPresence?.guild === 'object' && oldPresence.guild?.id !== DISCORD.GUILD_ID) return
    if (oldPresence?.userId !== DISCORD.USER_ID) return

    // console.log({msg: 'Update user', newPresence})

    const activities = newPresence?.activities.map((m: Activity) => ({ ...m, emoji: m.emoji?.name })) as Activity[]
    const updatePresence: CustomPresence = {
      status: newPresence.status,
      activities,
      clientStatus: newPresence.clientStatus
    }

    presenceUpdateEvent(socket, updatePresence)
  })
}
