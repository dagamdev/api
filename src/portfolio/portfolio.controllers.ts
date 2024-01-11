import { portfolioModel } from "../models";
import { APP_ID, ENVIRONMENTS } from "../config";
import { MyBot as client } from "../client";
import { GuildMember } from 'discord.js'
import axios from 'axios'
import { myMember } from "../db";

const getViews = async () => {
  const portfolio = await portfolioModel.findById(APP_ID)
  return portfolio?.views
}

const additionViews = async () => {
  const portfolio = await portfolioModel.findById(APP_ID)
  
  if(portfolio && portfolio.views) {
    portfolio.views++
    await portfolio.save()
    return portfolio.views
  }

  return 0
}

const getLikes = async () => {
  const portfolio = await portfolioModel.findById(APP_ID)
  return portfolio?.likes
}

const additionLike = async () => {
  const portfolio = await portfolioModel.findById(APP_ID)

  if(portfolio && portfolio.likes){
    portfolio.likes++
    await portfolio.save()
    return portfolio?.likes
  }

  return 0
}

const subtractionLike = async () => {
  const portfolio = await portfolioModel.findById(APP_ID)

  if(portfolio?.likes) {
    portfolio
    portfolio.likes--
    await portfolio.save()
    return portfolio.likes
  }

  return 0
}

const getAllSkills = async () => {
  const portfolio = await portfolioModel.findById(APP_ID)
  return portfolio?.skills
}

const createSkill = async (data: {name: string, percent: number, iconClass: string}) => {
  const portfolio = await portfolioModel.findById(APP_ID)
  portfolio?.skills.push(data)
  await portfolio?.save()
  return portfolio?.skills
}

const deleteSkill = async (index: number) => {
  const portfolio = await portfolioModel.findById(APP_ID)
  portfolio?.skills.splice(index, 1)
  portfolio?.save()
  return portfolio?.skills
}

const getDiscordMe = async (id: string): Promise<GuildMember | undefined> => {
  const server = client.guilds.cache.get('1064289165879025836')
  const member: any = server?.members.cache.get(id)
  const presence = member?.presence
  const activities = member?.presence?.activities.map((m: any)=> ({...m, emoji: m.emoji?.name}))
  const user = await axios('https://discord.com/api/v10/users/@me', {
    headers: {
      'Authorization': `${ENVIRONMENTS.DISCORD}`
    }
  })
  return {...user.data, presence: {...presence, activities}, ...member}
}

const getAbout = async () => {
  const channel = client.channels.cache.get('1090725845427048589')
  if(channel?.isTextBased()) return (await channel.messages.fetch('1090725868797702307')).content
}

export default {
  getViews,
  additionViews,

  getLikes,
  additionLike,
  subtractionLike,

  getAllSkills,
  createSkill,
  deleteSkill,

  getDiscordMe,
  getAbout
}