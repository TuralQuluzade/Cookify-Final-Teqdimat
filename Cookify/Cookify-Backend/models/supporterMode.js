import mongoose from "mongoose";

const supporterSchema= mongoose.Schema({
    image:{
        type:String,
        required:true,
    }
},{timestamps:true});
const supporterModel= mongoose.model('supporters',supporterSchema);
export  default supporterModel;