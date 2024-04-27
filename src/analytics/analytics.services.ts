import { type Request, type Response } from 'express'
import controllers from './analytics.controllers'

async function getAnalytics (req: Request, res: Response) {
  try {
    const id = req.get('Id')
    const origin = req.get('Origin')
    const browserID = req.get('Browser-id')

    if (origin === undefined || browserID === undefined) {
      return res.status(404).json({
        message: 'Header not provided',
        headers: {
          origin: 'Url of the Web',
          'browser-id': 'Id of the browser'
        }
      })
    }

    const analytics = await controllers.getAnalytics({ id, origin, browserID })
    res.status(200).json(analytics)
  } catch (error: any) {
    res.status(400).json({ message: error?.message })
  }
}

async function additionLike (req: Request, res: Response) {
  try {
    const id = req.get('Id')
    const origin = req.get('Origin') ?? ''

    const likes = await controllers.additionLike({ id, origin })
    res.status(200).json({ likes })
  } catch (error: any) {
    res.status(400).json({ message: error?.message })
  }
}

async function subtractionLike (req: Request, res: Response) {
  try {
    const id = req.get('Id')
    const origin = req.get('Origin') ?? ''

    const likes = await controllers.subtractionLike({ id, origin })
    res.status(200).json({ likes })
  } catch (error: any) {
    res.status(400).json({ message: error?.message })
  }
}

export default {
  getAnalytics,

  additionLike,
  subtractionLike
}
