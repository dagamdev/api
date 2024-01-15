import { Schema, model } from 'mongoose'

const Browser = new Schema({
  id: { type: String, require: true, default: '' },
  liked: { type: Boolean, require: true, default: false },
  lastVisitAt: { type: Number, require: true, default: 0 }
})

export const WebAnalytics = model('web analytics', new Schema({
  views: { type: Number, default: 1 },
  likes: { type: Number, default: 0 },
  origin: { type: String, require: true },
  browsers: { type: [Browser], require: true }
}))
