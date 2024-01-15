import express from 'express'
import { ENVIRONMENTS, PATH_PREFIX, ORIGINS } from './utils/config'
import cors from 'cors'

import analyticsRoutes from './analytics/analytics.routes'

export const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(cors({
  origin: ENVIRONMENTS.DEVELOPING === undefined ? ORIGINS : '*',
  credentials: true
}))

app.use(PATH_PREFIX + 'analytics', analyticsRoutes)

app.get(PATH_PREFIX, (req, res) => {
  res.json({ response: 'Hello, how are you?' })
})

app.get(PATH_PREFIX + 'ping', (req, res) => {
  res.json({ message: 'pong' })
})

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'This route does not exist'
  })
})
