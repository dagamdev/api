import { Router } from 'express'
import services from './analytics.services'

const route = Router()

route.route('/')
.get(services.getAnalytics)

route.put('/views', services.additionView)

route.route('/likes')
.put(services.additionLike)
.delete(services.subtractionLike)

route.get('/user/:id', services.getDiscordMe)

route.get('/about', services.getAbout)

export default route