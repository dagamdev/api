import { Schema, model } from "mongoose";

export const WebAnalytics = model('web analytics', new Schema({
  _id: {type: String, require: true},
  views: {type: Number, require: true},
  likes: {type: Number, require: true},
  browserIDs: {type: [String], require: true}
}))
