import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { authRouter } from './routes/authRoutes/authRoutes'
import errorHandler from './middlewares/errorHadling'
const PORT =process.env.PORT_NO || 4040

dotenv.config()
const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use('/api',authRouter)

app.use(
    errorHandler as (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
      ) => void
    );

app.listen(PORT, ()=>{
    console.log(`server running PORT ${PORT}`)}) 
    
main()
async function main(){
    await mongoose.connect(process.env.DATABASE_URL as string)
} 
