import { Property } from "../../model/propertySchema/propertySchema"
import { Response, Request } from "express"


export const getAllProperty =async(req:Request, res:Response) =>{

    const propertes= await Property.find()

    return res.status(200).json({successs:true, message:"fetch all property", propertes})

}