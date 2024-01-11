import { server } from "./socket"
import { ENVIRONMENTS } from "./config"
import './db'
import './client'

server.listen(ENVIRONMENTS.PORT, () => {
  console.log('🏃 Server is runing in the port '+ENVIRONMENTS.PORT)
})