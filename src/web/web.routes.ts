import { Router } from 'express'
import webControllers from './web.controllers'

const route = Router()

route.get('/icon', webControllers.getWebIcon)

export default route
