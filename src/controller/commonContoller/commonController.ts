import { Request, Response } from "express";
import { User } from "../../model/userModel/userModel";
import AppError from "../../middlewares/AppError";
import { Property } from "../../model/propertySchema/propertySchema";
import mongoose from "mongoose";



export const addProperty = async (req: Request, res: Response) => {
  console.log(req.body)
        const {
            title, description, location, bathrooms, bedrooms, price, image, userId,
            ownershipStatus, availabilityStatus, ageOfProperty, preferredTo, balconies,
            furnishingStatus, powerBackup, roadAccessibility, totalFloors, floorNo, 
            propertyFacing, reservedParking, openParking, coveredParking, waterSource
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID format" });
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new AppError("User not found, please login", 404);
        }

        const newProperty = new Property({
            title: title.toLowerCase().trim(),
            description: description.trim(),
            location: {
                state: location.state,
                district: location.district,
                city: location.city,
                locality: location.locality,
                zipCode: location.zipCode,
                landmark: location.landmark || "",
                fullAddress: location.fullAddress
            },
            bathrooms: String(bathrooms),
            bedrooms: String(bedrooms),
            price: String(price),
            image,
            userId,
            ownershipStatus,
            availabilityStatus,
            ageOfProperty,
            preferredTo,
            balconies: String(balconies),
            furnishingStatus,
            powerBackup,
            roadAccessibility,
            totalFloors: String(totalFloors),
            floorNo: String(floorNo),
            propertyFacing: propertyFacing || "",
            reservedParking: reservedParking || false,
            openParking: openParking || false,
            coveredParking: coveredParking || false,
            waterSource: Array.isArray(waterSource) ? waterSource : []
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

    const propertes=await Property.find({ userId:id })
console.log({woner:id});
console.log({userId:id});

    return res.status(201).json({success:true, message:"user property fetch successful",propertes})
}


