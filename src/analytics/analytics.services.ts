import { Request, Response } from 'express'
import controllers from './analytics.controllers'

async function getAnalytics(req: Request, res: Response) {
  try {
    const id = req.get('Id')
    const origin = req.get('Origin')
    console.log(req.ip, req.ips)

    if (!origin) return res.status(404).json({message: 'Not found'})

    const analytics = await controllers.getAnalytics({id, origin})
    res.status(200).json(analytics)

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

async function additionView(req: Request, res: Response) {
  try {
    const { id } = req.params

    const views = await controllers.additionViews(id)
    res.status(200).json({views})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

async function getLikes(req: Request, res: Response) {
  try {
    const likes = await controllers.getLikes()
    res.status(200).json({likes})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

async function additionLike(req: Request, res: Response) {
  try {
    const likes = await controllers.additionLike()
    res.status(200).json({likes})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

async function subtractionLike(req: Request, res: Response) {
  try {
    const likes = await controllers.subtractionLike()
    res.status(200).json({likes})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

async function getDiscordMe(req: Request, res: Response) {
  try {
    const { id } = req.params
    const data = await controllers.getDiscordMe(id)
    res.status(200).json({presence: data?.presence, ...data})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

async function getAbout(req: Request, res: Response) {
  try {
    const data = await controllers.getAbout()
    res.status(200).json(data)

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}


export default {
  getAnalytics,
  
  additionView,
  additionLike,
  subtractionLike,


  getDiscordMe,
  getAbout
}