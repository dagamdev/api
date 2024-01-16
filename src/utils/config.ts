import { config } from 'dotenv'
config()

export const ENVIRONMENTS = {
  PORT: process.env.PORT,
  CONNECT_MONGO: process.env.MONGO_CONECT,
  SECRET: process.env.SECRET,
  DISCORD: process.env.DISCORD,
  DOMAIN: process.env.DOMAIN ?? 'http://localhost:246',
  SESSION_SECRET: process.env.DOMAIN ?? 'HelloQutool',
  BOT_TOKEN: process.env.BOT_TOKEN,
  PAGE_DOMAIN: process.env.PAGE_DOMAIN ?? 'https://qutool.vercel.app',
  DEVELOPING: process.env.DEVELOPING
}

export const PATH_PREFIX = '/api/v1/'

export const ORIGINS = ENVIRONMENTS.DEVELOPING === undefined
  ? [
      'https://dagamdev.vercel.app'
    ]
  : '*'

export const VISIT_COOLDOWN_TIME = 10 * 60 * 1000
