import { Router } from "express";
import services from './portfolio.services'

const route = Router()

route.route('/views')
.get(services.getViews)
.put(services.additionViews)

route.route('/likes')
.get(services.getLikes)
.put(services.additionLike)
.delete(services.subtractionLike)

route.route('/skills')
.get(services.getAllSkills)
.post(services.createSkill)
.delete(services.deleteSkill)

route.get('/user/:id', services.getDiscordMe)

route.get('/about', services.getAbout)

export default route