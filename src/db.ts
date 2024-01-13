import { connect, set } from 'mongoose'
import { ENVIRONMENTS } from './config'
import { GuildMember } from 'discord.js'

set('strictQuery', true)
if(ENVIRONMENTS.CONNECT_MONGO){
  connect(ENVIRONMENTS.CONNECT_MONGO).then(()=> console.log('✅ Connected to database'))
  .catch(err=> console.log(err))
}

export let myMember: GuildMember | undefined = undefined