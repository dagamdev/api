import { type Message } from 'discord.js'
import { roomsTextCommand } from '../commands/text/rooms'
import { MyBot as client } from '..'

const prefix = 'c!'

export function messageCreateEvent (msg: Message<boolean>) {
  if (msg.author.bot) return
  if (!msg.content.toLocaleLowerCase().startsWith(prefix)) return

  const args = msg.content.slice(prefix.length).trim().split(/ +/g)
  const commandName = args.shift()?.toLocaleLowerCase()

  if (commandName === 'rooms') roomsTextCommand(msg, client)
}
