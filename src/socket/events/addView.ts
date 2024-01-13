import { Socket } from 'socket.io'
import { APP_ID } from '../../config'
import { WebAnalytics } from '../../models'


export const addViewEvent = async (socket: Socket) => {
  const portfolio = await WebAnalytics.findById(APP_ID)
  if(portfolio?.views){
    portfolio.views++
    socket.broadcast.emit('view', portfolio.views)
    await portfolio.save()
  }else socket.broadcast.emit('view', 0)
}