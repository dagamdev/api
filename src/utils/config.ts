import { config } from 'dotenv'
config()

export const ENVIRONMENTS = {
  PORT: process.env.PORT,
  CONNECT_MONGO: process.env.MONGO_CONECT,
  IN_DEVELOPING: process.env.DEVELOPING !== undefined
}

export const PATH_PREFIX = '/api/'

export const ORIGINS = process.env.ORIGINS?.split(/ +/g) ?? '*'

export const VISIT_COOLDOWN_TIME = 10 * 60 * 1000
