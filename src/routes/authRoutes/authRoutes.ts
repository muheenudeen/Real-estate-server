import express from 'express'
import { sendLoginOtp, signUp, verifyEmail, verifyLoginOtp } from '../../controller/authController/authController'
import { trycatch } from '../../middlewares/tryCatch'
import { createValidator } from 'express-joi-validation'
import { registerValidation } from '../../middlewares/validtion/authValidation'
import { addProperty, getUserProperty } from '../../controller/commonContoller/commonController'
import { getAllProperty } from '../../controller/adminController/property'


export const authRouter =express.Router()
const validator=createValidator({passError:true})

authRouter.post('/signup',validator.body(registerValidation),trycatch(signUp) )
authRouter.post('/verify-email',trycatch(verifyEmail))
authRouter.post('/sendlogin',trycatch(sendLoginOtp))
authRouter.post('/verify-login-otp',trycatch(verifyLoginOtp))

authRouter.post('/property',trycatch(addProperty))
authRouter.get('/property',trycatch(getAllProperty))
authRouter.get('/property/:id',trycatch(getUserProperty))