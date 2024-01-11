import { config } from 'dotenv'
config()

export const ENVIRONMENTS = {
  PORT: process.env.PORT,
  CONNECT_MONGO: process.env.MONGO_CONECT,
  SECRET: process.env.SECRET,
  DISCORD: process.env.DISCORD,
  DOMAIN: process.env.DOMAIN || 'http://localhost:246',
  SESSION_SECRET: process.env.DOMAIN || 'HelloQutool',
  BOT_TOKEN: process.env.BOT_TOKEN,
  PAGE_DOMAIN: process.env.PAGE_DOMAIN || 'https://qutool.vercel.app',
  DEVELOPING: process.env.DEVELOPING
}

export const APP_ID = '09012004'

export const PATH_PREFIX = '/api/v1/'

export const ORIGINS = [
  'https://dagamdev.vercel.app',
  ENVIRONMENTS.DEVELOPING ? 'http://localhost:3000' : '',
]