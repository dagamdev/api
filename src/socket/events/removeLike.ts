import { WebAnalytics } from '../../models'
import type { SocketData, AnalyticsEventsProps } from '../../types'
import { io } from '..'

export async function removeLikeEvent (socket: SocketData, { id, browserID }: AnalyticsEventsProps) {
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
    Analytics.likes--
    Analytics.browsers.push({
      id: browserID,
      liked: false,
      lastVisitAt: Date.now()
    })
    await Analytics.save()
    io.emit('analytics', Analytics)
    return
  }

  if (browser.liked) {
    Analytics.likes--
    browser.liked = false
    await Analytics.save()
  }

  io.emit('analytics', Analytics)
}
