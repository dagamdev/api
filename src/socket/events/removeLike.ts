import { Socket } from "socket.io";
import { APP_ID } from "../../config";
import { portfolioModel } from "../../models";


export const removeLikeEvent = async (socket: Socket) => {
  const portfolio = await portfolioModel.findById(APP_ID)
  
  if(portfolio?.likes){
    portfolio.likes--
    socket.broadcast.emit('like', portfolio.likes)
    await portfolio.save()
  }else socket.broadcast.emit('like', 0)
}