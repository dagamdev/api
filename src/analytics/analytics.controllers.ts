import { WebAnalytics } from '../models'
import { ENVIRONMENTS } from '../utils/config'
import { MyBot as client } from '../client'
import { type GuildMember } from 'discord.js'
import axios from 'axios'

async function getAnalytics ({ origin, id, browserID }: {
  origin: string
  id?: string
  browserID?: string
}) {
  const Analytics = await (id !== undefined ? WebAnalytics.findByIdAndUpdate(id, { $inc: { views: 1 } }) : WebAnalytics.findOne({ origin }))
  console.log(Analytics)
  if (Analytics !== null) return Analytics
  const newAnalytics = await WebAnalytics.create({ origin, browserIDs: [browserID] })
  console.log(newAnalytics)
  return newAnalytics
}

async function additionViews (id?: string) {
  const portfolio = await WebAnalytics.findById(id)

  if (portfolio !== null) {
    portfolio.views++
    await portfolio.save()
    return portfolio.views
  }

  return 0
}

async function getLikes (id?: string) {
  const portfolio = await WebAnalytics.findById(id)
  return portfolio?.likes
}

async function additionLike (id?: string) {
  const portfolio = await WebAnalytics.findById(id)

  if (portfolio !== null) {
    portfolio.likes++
    await portfolio.save()
    return portfolio.likes
  }

  return 0
}

async function subtractionLike (id?: string) {
  const portfolio = await WebAnalytics.findById(id)

  if (portfolio !== null) {
    portfolio.likes--
    await portfolio.save()
    return portfolio.likes
  }

  return 0
}

async function getDiscordMe (id: string): Promise<GuildMember | undefined> {
  const server = client.guilds.cache.get('1064289165879025836')
  const member: any = server?.members.cache.get(id)
  const presence = member?.presence
  const activities = member?.presence?.activities.map((m: any) => ({ ...m, emoji: m.emoji?.name }))
  const user = await axios('https://discord.com/api/v10/users/@me', {
    headers: {
      Authorization: `${ENVIRONMENTS.DISCORD}`
    }
  })
  return { ...user.data, presence: { ...presence, activities }, ...member }
}

async function getAbout () {
  const channel = client.channels.cache.get('1090725845427048589')
  if (channel !== undefined && channel.isTextBased()) return (await channel.messages.fetch('1090725868797702307')).content
}

export default {
  getAnalytics,
  additionViews,

  getLikes,
  additionLike,
  subtractionLike,

  getDiscordMe,
  getAbout
}
