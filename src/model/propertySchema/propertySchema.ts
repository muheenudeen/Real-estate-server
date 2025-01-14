import mongoose from "mongoose";


const propertySchema =new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    place:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }

})