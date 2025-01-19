import express from 'express'
import { trycatch } from '../../middlewares/tryCatch'
import { getAllUsers } from '../../controller/adminController/userData'

export const adminRouter= express.Router()

adminRouter.get('/users',trycatch(getAllUsers))