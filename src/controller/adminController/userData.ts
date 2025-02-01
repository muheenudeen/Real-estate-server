import { Request, Response } from "express";
import { User } from "../../model/userModel/userModel";
import AppError from "../../middlewares/AppError";


export const getAllUsers = async(req:Request, res:Response)=>{
   
    const users=await User.find()
    if(!users){
        throw new AppError(`users not founded`)
    }

   return res.status(200).json({success:true, message:users})
}