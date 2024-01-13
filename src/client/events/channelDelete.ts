import { type DMChannel, type NonThreadGuildBasedChannel, ChannelType } from 'discord.js'
import { getRoomsData, updateRoomsData } from '../utils'
import { MyBot as client } from '..'

export async function channelDeleteEvent (channel: DMChannel | NonThreadGuildBasedChannel) {
  if (channel.type !== ChannelType.GuildText) return
  const { guild } = channel

  const roomsData = await getRoomsData(client)
  if (roomsData === undefined) return
  const room = roomsData?.find(f => f.channelId === channel.id)

  if (room !== undefined) {
    if (guild.members.cache.has(room.userId)) {
      room.channelId = undefined
      updateRoomsData(client, roomsData)
    } else {
      roomsData?.splice(roomsData.findIndex(f => f.channelId === room.channelId), 1)
      updateRoomsData(client, roomsData)
    }
  }
}
