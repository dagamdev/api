import { Client } from 'discord.js'
import { ENVIRONMENTS } from '../utils/config'
import { readyEvent } from './events/ready'
import { interactionCreateEvent } from './events/interactionCreate'
import { memberRemoveEvent } from './events/memberRemove'
import { messageCreateEvent } from './events/messageCreate'
import { channelDeleteEvent } from './events/channelDelete'
import { memberAddEvent } from './events/memberAdd'

export const MyBot = new Client({ intents: 131071 })

MyBot.once('ready', readyEvent)

MyBot.on('interactionCreate', interactionCreateEvent)

MyBot.on('messageCreate', messageCreateEvent)

MyBot.on('channelDelete', channelDeleteEvent)

MyBot.on('guildMemberAdd', memberAddEvent)

MyBot.on('guildMemberRemove', memberRemoveEvent)

// MyBot.on('presenceUpdate', presenceUpdateEvent)

//! Errors events
MyBot.on('shardError', async err => {
  console.log(err)
})

process.on('unhandledRejection', async err => {
  console.log(err)
})

MyBot.login(ENVIRONMENTS.SECRET)
