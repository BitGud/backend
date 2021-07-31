import { Request, Response, Router } from 'express'
import { SettingType } from 'settings'
import { getSetting, updateSetting } from '../services/setting.service'

const settingRoute = Router()

settingRoute
  .route('/')
  .get(async (req: Request, res: Response) => {
    try {
      const uid = req.headers['uid'] as string
      const data = await getSetting(uid)
      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json(err.message)
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const uid = req.headers['uid'] as string

      const settingObj = req.body as SettingType
      const data = await updateSetting(uid, settingObj)
      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json(err.message)
    }
  })

export { settingRoute }
