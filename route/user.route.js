import { Router } from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'
import { loginUserController, logoutUserController, registerUserControllers,verifyEmailController } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.post('/register',registerUserControllers)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginUserController)
userRouter.post('/logout',verifyJWT,logoutUserController)
export default userRouter