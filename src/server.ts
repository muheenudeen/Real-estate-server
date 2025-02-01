import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { authRouter } from './routes/authRoutes/authRoutes'
import errorHandler from './middlewares/errorHadling'
import { adminRouter } from './routes/adminRouter/adminRouter';
const PORT =process.env.PORT_NO || 5000

dotenv.config()
const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use('/api',authRouter)
app.use('/api/admin',adminRouter)

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
