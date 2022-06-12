import express from 'express'
import { info } from '../controllers/index.js'

export const infoRouter = express.Router()

infoRouter.get('/', info)