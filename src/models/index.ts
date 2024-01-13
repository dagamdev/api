import { Schema, model } from 'mongoose'

export const WebAnalytics = model('web analytics', new Schema({
  views: { type: Number, default: 1 },
  likes: { type: Number, default: 0 },
  origin: { type: String, require: true },
  browserIDs: { type: [String], require: true }
}))
