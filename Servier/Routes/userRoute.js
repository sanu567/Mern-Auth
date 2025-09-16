import express from 'express'
import UserAuth from '../MiddleWare/UserAuth.js'
import { getUserData } from '../Controller/usercontrller.js';

const userRouter= express.Router();

userRouter.get('/data',UserAuth,getUserData)
export default userRouter;