import { connect, set } from 'mongoose'
import { ENVIRONMENTS } from './config'
import { type GuildMember } from 'discord.js'

set('strictQuery', true)
if (ENVIRONMENTS.CONNECT_MONGO !== undefined) {
  connect(ENVIRONMENTS.CONNECT_MONGO).then(() => { console.log('✅ Connected to database') })
    .catch(err => { console.log(err) })
}

export const myMember: GuildMember | undefined = undefined
