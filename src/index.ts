import { server } from './socket'
import { ENVIRONMENTS } from './utils/config'
import './db'
import './client'

const { PORT, IN_DEVELOPING } = ENVIRONMENTS

server.listen(PORT, () => {
  console.log(`🏃 Server is runing in the port ${PORT} | http${IN_DEVELOPING
    ? ''
    : 's'
  }:${IN_DEVELOPING
    ? 'localhost:' + PORT
    : PORT
  }/api/v1`)
})
