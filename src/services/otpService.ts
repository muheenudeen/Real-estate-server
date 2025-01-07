
const otpStorage: Map<string, string> =new Map();

export const generateOTP = (): string =>{
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const saveOTP = (email:string, otp:string):void =>{
    otpStorage.set(email, otp)
    setTimeout(() =>otpStorage.delete(email), 5*60*1000)
        
}


export const verifyOTP= (email:string, otp:string):boolean =>{
    const storedOtp = otpStorage.get(email)
    return storedOtp===otp
}