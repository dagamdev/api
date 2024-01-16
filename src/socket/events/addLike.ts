import { WebAnalytics } from '../../models'
import type { SocketData, AnalyticsEventsProps } from '../../types'

export async function addLikeEvent (socket: SocketData, { id, browserID }: AnalyticsEventsProps) {
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
          liked: true,
          lastVisitAt: Date.now()
        }
      ]
    })
    socket.broadcast.emit('analytics', NewAnalytics)
    return
  }

  const browser = Analytics.browsers.find(b => b.id === browserID)

  if (browser === undefined) {
    Analytics.browsers.push({
      id: browserID,
      liked: true,
      lastVisitAt: Date.now()
    })
    await Analytics.save()
    socket.broadcast.emit('analytics', Analytics)
    return
  }

  if (!browser.liked) {
    browser.liked = true
    Analytics.save()
  }

  socket.broadcast.emit('analytics', Analytics)
}
