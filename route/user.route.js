import { Router } from 'express'
import { registerUserControllers,verifyEmailController } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.post('/register',registerUserControllers)
userRouter.post('/verify-email',verifyEmailController)

export default userRouter