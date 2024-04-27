import { connect, set } from 'mongoose'
import { ENVIRONMENTS } from './utils/config'

set('strictQuery', true)
if (ENVIRONMENTS.CONNECT_MONGO !== undefined) {
  connect(ENVIRONMENTS.CONNECT_MONGO).then(() => { console.log('✅ Connected to database') })
    .catch(err => { console.log(err) })
}
