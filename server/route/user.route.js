import { Router } from 'express'
import { verifyJWT } from '../middleware/auth.middleware.js'
import {resetPasswordController,refreshTokenController,verifyForgotPassworOtpController,forgotPasswordController,updateUserDetailsController, loginUserController, logoutUserController, registerUserControllers,uploadAvatar,verifyEmailController } from '../controllers/user.controller.js'
import upload from '../middleware/multer.middleware.js'

const userRouter = Router()

userRouter.post('/register',registerUserControllers)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginUserController)
userRouter.post('/logout',verifyJWT,logoutUserController)
userRouter.put('/upload-avatar',verifyJWT,upload.single('avatar'),uploadAvatar)
userRouter.put('/update-user',verifyJWT,updateUserDetailsController)
userRouter.put('/forgot-password',forgotPasswordController)
userRouter.put('/verify-forgot-password-otp',verifyForgotPassworOtpController)
userRouter.put('/reset-password',resetPasswordController)
userRouter.post('/refresh-token',refreshTokenController)

export default userRouter 