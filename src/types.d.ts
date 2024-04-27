import { type Socket } from 'socket.io'

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
