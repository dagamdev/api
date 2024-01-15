import { type Socket } from 'socket.io'
import type { Activity, ClientPresenceStatusData, PresenceStatus } from 'discord.js'

export interface ServerToClientEvents {
  analytics: (analytics: any) => void
  presenceUpdate: (presence: CustomPresence) => void
}

export interface ClientToServerEvents {
  addLike: ({ id, browserID }: AnalyticsEventsProps) => void
  removeLike: ({ id, browserID }: AnalyticsEventsProps) => void
  addView: ({ id, browserID }: AnalyticsEventsProps) => void
}

export type SocketData = Socket<ClientToServerEvents, ServerToClientEvents>

export interface AnalyticsEventsProps {
  id?: string
  browserID: string
}

export interface IARoom {
  userId: string
  channelId?: string
}

export type Languages = 'en' | 'es' | 'it'

export interface User {
  _id: string
  userId: string
  accessToken: string
  refreshToken: string
  __v: number
}

export interface Guild {
  id: string
  name: string
  icon: string | null
  owner: boolean
  permissions: string
  features: string[]
}

export interface CustomPresence {
  status: PresenceStatus
  activities: Activity[]
  clientStatus: ClientPresenceStatusData | null
}
