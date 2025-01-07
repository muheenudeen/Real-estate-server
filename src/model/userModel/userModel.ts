import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    usertype:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    phone:{
        type:String,
        require:true,
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    
})

export const userModel=mongoose.model('user',userSchema)