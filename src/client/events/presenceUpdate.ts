import { DISCORD } from '@/utils/consts'
import { type Presence } from 'discord.js'

export function presenceUpdateEvent (oldPresence: Presence | null, newPresence: Presence) {
  if (typeof oldPresence?.guild === 'object' && oldPresence.guild?.id !== DISCORD.GUILD_ID) return
  if (oldPresence?.userId !== DISCORD.USER_ID) return
  console.log('Update user', { user: { ...newPresence.user, status: newPresence.status, guild: newPresence.guild } })
  // const activities = newPresence?.activities.map((m: any) => ({ ...m, emoji: m.emoji?.name }))
}
