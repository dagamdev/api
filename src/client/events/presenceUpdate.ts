import { Presence } from "discord.js"
import { io } from "../../socket"

export function presenceUpdateEvent(oldPresence: Presence | null, newPresence: Presence) {
  if(oldPresence?.guild && oldPresence.guild.id != '1064289165879025836') return
  if(oldPresence?.userId != '717420870267830382') return
  console.log('Update user', {user: {...newPresence.user, status: newPresence.status, guild: newPresence.guild}})
  const activities = newPresence?.activities.map((m: any)=> ({...m, emoji: m.emoji?.name}))

}