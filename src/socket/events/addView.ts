import { WebAnalytics } from '../../models'
import type { SocketData, AnalyticsEventsProps } from '../../types'
import { VISIT_COOLDOWN_TIME } from '../../utils/config'
import { io } from '..'

export async function addViewEvent (socket: SocketData, { id, browserID }: AnalyticsEventsProps) {
  const origin = socket.handshake.headers.origin ?? 'none'

  const byOrigin = id === undefined
  const schemaMethod = byOrigin ? WebAnalytics.findOne({ origin }) : WebAnalytics.findById(id)
  const Analytics = await schemaMethod

  if (Analytics === null) {
    const NewAnalytics = await WebAnalytics.create({
      origin,
      browsers: [
        {
          id: browserID,
          lastVisitAt: Date.now()
        }
      ]
    })
    io.emit('analytics', NewAnalytics)
    return
  }

  const browser = Analytics.browsers.find(b => b.id === browserID)

  if (browser === undefined) {
    Analytics.views++
    Analytics.browsers.push({
      id: browserID,
      liked: false,
      lastVisitAt: Date.now()
    })
    await Analytics.save()
    io.emit('analytics', Analytics)
    return
  }

  if (Date.now() - browser.lastVisitAt >= VISIT_COOLDOWN_TIME) {
    browser.lastVisitAt = Date.now()
    Analytics.views++
    Analytics.save()
  }

  io.emit('analytics', Analytics)
}
