export interface ServerToClientEvents {

}

export interface ClientToServerEvents {
  addLike: () => void
  removeLike: () => void
  addView: () => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  name: string
  age: number
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
