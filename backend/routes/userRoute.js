import express from 'express';
import { loginUser,registerUser,adminLogin, getUserData, generateOtp, forgotPassword } from '../controllers/userController.js';
import authUser from '../middleware/auth.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/forgot-password',forgotPassword)
userRouter.post('/admin',adminLogin)

userRouter.post('/generate-otp',generateOtp)

userRouter.get('/user-data', authUser, getUserData)


export default userRouter;