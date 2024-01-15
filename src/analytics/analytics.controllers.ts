import { WebAnalytics } from '../models'
import { ENVIRONMENTS } from '../utils/config'
import { MyBot as client } from '../client'
import { type GuildMember } from 'discord.js'
import axios from 'axios'

async function getAnalytics ({ id, origin, browserID }: {
  id?: string
  origin: string
  browserID: string
}) {
  const Analytics = await (id === undefined ? WebAnalytics.findOne({ origin }) : WebAnalytics.findById(id))

  if (Analytics === null) {
    return await WebAnalytics.create({
      origin,
      browsers: [{
        id: browserID,
        lastVisitAt: Date.now()
      }]
    })
  }

  const browser = Analytics.browsers.find(b => b.id === browserID)
  if (browser === undefined) return Analytics

  if (Date.now() - browser.lastVisitAt >= 10 * 60 * 1000) {
    browser.lastVisitAt = Date.now()
    Analytics.views++
    Analytics.save()
  }

  return Analytics
}

async function additionLike ({ id, origin }: {
  id?: string
  origin: string
}) {
  const updateOptions = [
    { $inc: { likes: 1 } },
    { new: true }
  ]
  const Schema = id === undefined ? WebAnalytics.findByIdAndUpdate(id, ...updateOptions) : WebAnalytics.findOneAndUpdate({ origin }, ...updateOptions)
  const Analytics = await Schema

  if (Analytics === null) return 0

  return Analytics.likes
}

async function subtractionLike ({ id, origin }: {
  id?: string
  origin: string
}) {
  const updateOptions = [
    { $inc: { likes: -1 } },
    { new: true }
  ]
  const Schema = id === undefined ? WebAnalytics.findByIdAndUpdate(id, ...updateOptions) : WebAnalytics.findOneAndUpdate({ origin }, ...updateOptions)
  const Analytics = await Schema

  if (Analytics === null) return 0

  return Analytics.likes
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

  additionLike,
  subtractionLike,

  getDiscordMe,
  getAbout
}
