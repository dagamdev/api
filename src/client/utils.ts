import { Client } from 'discord.js'
import type { IARoom, Languages } from '../types'

const messagesIds = {
  'en': '1098281335933632622',
  'es': '1098281253297475694',
  'it': '1098281403587760169'
}

const infoIARoomsChannelId = '1098271613423718442'
export async function getIARoomsInfo(lenguage: Languages, client: Client) {
  const IARoomsInfoCahnnel = client.channels.cache.get(infoIARoomsChannelId)
  if(IARoomsInfoCahnnel?.isTextBased()){
    const IARoomsInfo = (await IARoomsInfoCahnnel.messages.fetch(messagesIds[lenguage])).content
    return IARoomsInfo
  }
}

const IARoomsChannelId = '1098273510276730960'
export async function getRoomsData(client: Client): Promise<IARoom[] | undefined> {
  const IARoomsChannel = client.channels.cache.get(IARoomsChannelId)
  if(IARoomsChannel?.isTextBased()){
    const content = (await IARoomsChannel.messages.fetch('1098308109270782002')).content
    return JSON.parse(content)
  }
}

export async function updateRoomsData(client: Client, roomsData: IARoom[]) {
  const IARoomsChannel = client.channels.cache.get(IARoomsChannelId)
  if(IARoomsChannel?.isTextBased()){
    const roomsMessage = await IARoomsChannel.messages.fetch('1098308109270782002')
    roomsMessage.edit({content: JSON.stringify(roomsData)})
  }
}