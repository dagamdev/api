import { Router } from 'express'
import services from './analytics.services'

const route = Router()

route.route('/')
  .get(services.getAnalytics)

route.route('/likes')
  .put(services.additionLike)
  .delete(services.subtractionLike)

export default route
