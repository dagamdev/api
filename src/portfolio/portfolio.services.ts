import { Request, Response } from "express"
import controllers from "./portfolio.controllers"

const getViews = async (req: Request, res: Response) => {
  try {
    const views = await controllers.getViews()
    res.status(200).json({views})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

const additionViews = async (req: Request, res: Response) => {
  try {
    const views = await controllers.additionViews()
    res.status(200).json({views})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

const getLikes = async (req: Request, res: Response) => {
  try {
    const likes = await controllers.getLikes()
    res.status(200).json({likes})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

const additionLike = async (req: Request, res: Response) => {
  try {
    const likes = await controllers.additionLike()
    res.status(200).json({likes})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

const subtractionLike = async (req: Request, res: Response) => {
  try {
    const likes = await controllers.subtractionLike()
    res.status(200).json({likes})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

const getAllSkills = async (req: Request, res: Response) => {
  try {
    const skills = await controllers.getAllSkills()
    res.status(200).json({skills})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

const createSkill = async (req: Request, res: Response) => {
  try {
    const { name, percent, iconClass } = req.body
    if(!name || !percent || !iconClass) return res.status(404).json({
      message: 'field not found',
      fields: {
        name: 'String', 
        percent: 'Number', 
        iconClass: 'String'
      }
    })

    const skills = await controllers.createSkill({name, percent, iconClass})
    res.status(200).json({maessage: 'Success full', skills})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { index } = req.params
    const skills = await controllers.deleteSkill(parseInt(index))
    res.status(201).json({messaje: 'Deleted skill', skills}) 

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

const getDiscordMe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = await controllers.getDiscordMe(id)
    res.status(200).json({presence: data?.presence, ...data})

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}

const getAbout = async (req: Request, res: Response) => {
  try {
    const data = await controllers.getAbout()
    res.status(200).json(data)

  } catch (error: any) {
    res.status(400).json({message: error?.message})
  }
}


export default {
  getViews,
  additionViews,

  getLikes,
  additionLike,
  subtractionLike,

  getAllSkills,
  createSkill,
  deleteSkill,

  getDiscordMe,
  getAbout
}