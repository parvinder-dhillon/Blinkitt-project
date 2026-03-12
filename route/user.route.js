import { Router } from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'
import { loginUserController, logoutUserController, registerUserControllers,uploadAvatar,verifyEmailController } from '../controllers/user.controller.js'
import upload from '../middleware/multer.middleware.js'

const userRouter = Router()

userRouter.post('/register',registerUserControllers)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginUserController)
userRouter.post('/logout',verifyJWT,logoutUserController)
userRouter.put('/upload-avatar',verifyJWT,upload.single('avatar'),uploadAvatar)
export default userRouter 