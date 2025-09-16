import express from 'express'
import { isAuthenticated, login, logout, Register, resetpassword, sendOtp, sendRestOtp, verifyEmail } from '../Controller/authcontrller.js';
import UserAuth from '../MiddleWare/UserAuth.js';

const authRoute = express.Router();

authRoute.post('/register',Register);
authRoute.post('/login',login);
authRoute.post('/logout',logout); 
authRoute.post('/send-verify-otp', UserAuth,sendOtp);
authRoute.post('/verify-account', UserAuth,verifyEmail);   
authRoute.get('/isAuth', UserAuth,isAuthenticated); 
authRoute.post('/rest-otp',sendRestOtp); 
authRoute.post('/rest-password',resetpassword); 
export default authRoute