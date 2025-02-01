import { Request, Response } from "express";
import { User } from "../../model/userModel/userModel";
import AppError from "../../middlewares/AppError";
import { Property } from "../../model/propertySchema/propertySchema";
import mongoose from "mongoose";

export const addProperty = async (req: Request, res: Response) => {
    
        const { title, description, location, bathrooms, bedrooms, price, image, userId } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID format" });
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new AppError('User not found, please login', 404);
        }

        const newProperty = new Property({ 
            title, description, location, bathrooms, bedrooms, price, image, userId: userId
        });

        await newProperty.save();

        return res.status(201).json({ 
            success: true, 
            message: "Property added successfully", 
            property: newProperty 
        });
  
};


export const getUserProperty=async(req:Request, res:Response) =>{

    const {id} =req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid user ID format" });
      }

    const isValid=await User.findById(id)
    if(!isValid) {
        throw new AppError("user not found, please login")
    }

    const userProperty=await Property.find({ userId:id })
console.log({woner:id});
console.log({userId:id});

    return res.status(201).json({success:true, message:"user property fetch successful",userProperty})
}


