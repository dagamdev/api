import { WebAnalytics } from '../../models'
import type { SocketData, AnalyticsEventsProps } from '../../types'

export async function addViewEvent (socket: SocketData, { id, browserID }: AnalyticsEventsProps) {
  const origin = socket.handshake.headers.origin ?? 'none'

  const updateConfig = [
    { $inc: { views: 1 } },
    { new: true }
  ]
  const byOrigin = id === undefined
  const schemaMethod = byOrigin ? WebAnalytics.findOneAndUpdate({ origin }, ...updateConfig) : WebAnalytics.findByIdAndUpdate(id, ...updateConfig)
  const Analytics = await schemaMethod

  if (Analytics === null) {
    socket.emit('analytics', undefined)
    return
  }

  const browser = Analytics.browsers.find(b => b.id === browserID)

  if (browser === undefined) {
    Analytics.browsers.push({
      id: browserID,
      lastVisitAt: Date.now()
    })
    Analytics.save()
    return
  }

  browser.lastVisitAt = Date.now()

  socket.emit('analytics', Analytics)
  Analytics.save()
}
