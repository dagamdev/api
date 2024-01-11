import { MyBot as client } from '..'

export function readyEvent() {
  console.log(`🟢 ${client.user?.username}: I'm ready`)
 
}