import { Request, Response } from "express";
import { userModel } from "../../model/userModel/userModel";
import { bcryptData } from "../../utils/bcrypt";
import generateToken from "../../utils/jwt";
import AppError from "../../middlewares/AppError";
import { generateOTP, saveOTP, verifyOTP } from "../../services/otpService";
import { sendEmail } from "../../services/emailService";



export const signUp = async (req: Request, res: Response) => {
    const { name, usertype, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {throw new AppError(`email already exist`,401)}
    const hashedPassword = await bcryptData.hashPassword(password);
    const newUser = new userModel({ name, usertype, email, password: hashedPassword, isVerified:false});
    await newUser.save();
    const otp=generateOTP()
    saveOTP(email, otp)
    await sendEmail(email, "verify your email", `your OTP is: ${otp}`)
    return res.status(200).json({ success: true, message: "Signup successful", newUser });
};


export const verifyEmail = async (req:Request, res:Response) =>{
  const {email, otp} = req.body
  if(!verifyOTP(email, otp)) {throw new AppError("invalid or expired OTP", 400)}
  const user=await userModel.findOneAndUpdate({email}, {isVerified:true})
  if(!user) {throw new AppError("user not founded",404)}
  return res.status(200).json({success:true, message: "email verified successful"})
}



export const sendLoginOtp = async (req:Request, res:Response)=>{
  const {email} =req.body
  const user = await userModel.findOne({email})
  if(!user){throw new AppError("email not founded",404)}
  if(!user.isVerified) {throw new AppError("email not verifyed. please verify your email first", 401)}
  const otp = generateOTP()
  saveOTP(email,otp)
  await sendEmail(email, "login otp",`your otp for login is: ${otp}`)
  return res.status(200).json({
  success:true,
  message:"otp send to your email address. please verify"})
}


export const verifyLoginOtp = async(req:Request, res:Response) =>{
  const {email, otp} =req.body
  if(!verifyOTP(email, otp)){throw new AppError("invalid or expired OTP", 400)}
  const user = await userModel.findOne({email})
  if(!user){throw new AppError("user not founded", 404)}
  const token = generateToken(user._id.toString())
  return res.status(200).json({success:true, message:"login successful",token})
 }