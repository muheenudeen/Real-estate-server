import { Request, Response } from "express";
import { userModel } from "../../model/userSchema/userSchema";
import { bcryptData } from "../../utils/bcrypt";
import generateToken from "../../utils/jwt";
import AppError from "../../middlewares/AppError";



export const signUp = async (req: Request, res: Response) => {
    const { name, usertype, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new AppError(`email already exist`,401);    }

    const hashedPassword = await bcryptData.hashPassword(password);

    // Create a new user instance
    const newData = new userModel({
      name,
      usertype,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newData.save();

    return res.status(200).json({ success: true, message: "Signup successful", newData });
};



 export const login = async (req: Request, res: Response)=> {
     const { email, password } = req.body;

     const user = await userModel.findOne({ email });
     if (!user) {
       return res.status(404).json({ success: false, message: "User not found" });
     }

     const isPasswordCorrect = await bcryptData.comparePassword(password, user.password as string);
     if (!isPasswordCorrect) {
throw AppError      }

     const token = generateToken(user._id.toString())

     const roleMessage = user.role === "admin" ? "Admin login successful" : "User login successful";

     return res.status(200).json({
       success: true,
       message: roleMessage,
       data: user,
       token,
     });
  
 };
