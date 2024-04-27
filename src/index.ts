import { server } from './socket'
import { ENVIRONMENTS } from './utils/config'
import './db'

const { PORT, IN_DEVELOPING } = ENVIRONMENTS

console.log(`Node.js ${process.version}`)

server.listen(PORT, () => {
  console.log(`🏃 Server is runing in the port ${PORT} | http${IN_DEVELOPING
    ? ''
    : 's'
  }:${IN_DEVELOPING
    ? 'localhost:' + PORT
    : PORT
  }/api/v1`)
})
