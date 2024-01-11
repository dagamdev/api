import { GuildMember, type PartialGuildMember } from 'discord.js'
import { getRoomsData } from '../utils'
import { MyBot as client } from '..'

export async function memberRemoveEvent(mr: GuildMember | PartialGuildMember) {
  if(mr.guild.id != '1082083606727508008') return  

  const roomsData = await getRoomsData(client)
  const room = roomsData?.find(f=> f.userId == mr.id)
  if(room && room.channelId) {
    mr.guild.channels.delete(room.channelId)
  }
}