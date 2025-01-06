import express from 'express'
import { signUp } from '../../controller/authController/authController'
import { trycatch } from '../../middlewares/tryCatch'
import { createValidator } from 'express-joi-validation'
import { registerValidation } from '../../middlewares/validtion/authValidation'


export const authRouter =express.Router()
const validator=createValidator({passError:true})

authRouter.post('/signup',validator.body(registerValidation),trycatch(signUp) )