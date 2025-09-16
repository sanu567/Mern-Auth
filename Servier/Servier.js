import express  from "express";
import cors from"cors";
import'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./Confilg/mongodb.js";
import authRoute from "./Routes/AuthRoute.js";
import userRouter from "./Routes/userRoute.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins=['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials:true}));

//API endpoint
app.get("/",(req,resp)=>resp.send("Api is working "));
app.use('/api/auth',authRoute);
app.use('/api/user',userRouter);

app.listen(port,()=>console.log(`Seriver started on port :${port}`));