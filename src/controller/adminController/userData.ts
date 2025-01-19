import { Request, Response } from "express";
import { userModel } from "../../model/userModel/userModel";
import AppError from "../../middlewares/AppError";


export const getAllUsers = async(req:Request, res:Response)=>{
   
    const users=await userModel.find()
    if(!users){
        throw new AppError(`users not founded`)
    }

   return res.status(200).json({success:true, message:users})
}