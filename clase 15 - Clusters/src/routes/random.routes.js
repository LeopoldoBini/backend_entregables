import express from 'express'
import { randomN } from '../controllers/index.js'

export const randomRouter = express.Router()

randomRouter.get('/', randomN)