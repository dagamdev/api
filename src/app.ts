import express from 'express'
import { PATH_PREFIX, ORIGINS } from './utils/config'
import cors from 'cors'

import analyticsRoutes from './analytics/analytics.routes'

export const app = express()

app.use(express.json())
app.use(cors({
  origin: ORIGINS,
  credentials: true
}))

app.use(PATH_PREFIX + 'analytics', analyticsRoutes)

app.get(PATH_PREFIX, (req, res) => {
  res.json({ response: 'Hello, how are you?' })
})

app.get(PATH_PREFIX + 'ping', (req, res) => {
  res.json({ message: 'pong' })
})
