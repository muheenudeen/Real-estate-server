import nodemailer from 'nodemailer'
import dotenv, { config } from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    },
})

console.log(process.env.EMAIL_USER,process.env.EMAIL_PASS);

export const sendEmail = async (to: string, subject: string, text:string)=> {

    await transporter.sendMail({
        from:process.env.EMAIL_USER,
        to,
        subject,
        text,
    })
}