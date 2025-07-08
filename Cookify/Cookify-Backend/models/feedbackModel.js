import mongoose from "mongoose";

const  feedbackSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    surname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    textMessage:{
        type:String,
        required:true,
    }
},{timestamps:true});

const feedbackModel = mongoose.model("feedback",feedbackSchema);
export default feedbackModel;