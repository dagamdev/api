import { WebAnalytics } from '../models'

async function getAnalytics ({ id, origin, browserID }: {
  id?: string
  origin: string
  browserID: string
}) {
  const Analytics = await (id === undefined ? WebAnalytics.findOne({ origin }) : WebAnalytics.findById(id))

  if (Analytics === null) {
    return await WebAnalytics.create({
      origin,
      browsers: [{
        id: browserID,
        lastVisitAt: Date.now()
      }]
    })
  }

  const browser = Analytics.browsers.find(b => b.id === browserID)
  if (browser === undefined) {
    Analytics.browsers.push({
      id: browserID,
      liked: false,
      lastVisitAt: Date.now()
    })
    Analytics.save()
  }

  return Analytics
}

async function additionLike ({ id, origin }: {
  id?: string
  origin: string
}) {
  const updateOptions = [
    { $inc: { likes: 1 } },
    { new: true }
  ]
  const Schema = id === undefined ? WebAnalytics.findByIdAndUpdate(id, ...updateOptions) : WebAnalytics.findOneAndUpdate({ origin }, ...updateOptions)
  const Analytics = await Schema

  if (Analytics === null) return 0

  return Analytics.likes
}

async function subtractionLike ({ id, origin }: {
  id?: string
  origin: string
}) {
  const updateOptions = [
    { $inc: { likes: -1 } },
    { new: true }
  ]
  const Schema = id === undefined ? WebAnalytics.findByIdAndUpdate(id, ...updateOptions) : WebAnalytics.findOneAndUpdate({ origin }, ...updateOptions)
  const Analytics = await Schema

  if (Analytics === null) return 0

  return Analytics.likes
}

export default {
  getAnalytics,

  additionLike,
  subtractionLike
}
