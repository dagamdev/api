import { GuildMember } from "discord.js";

export async function memberAddEvent(member: GuildMember) {
  if(member.guild.id != '1082083606727508008') return

  member.roles.add('1097551334644912148')
} 