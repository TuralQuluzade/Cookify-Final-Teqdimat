import mongoose from "mongoose";

const componentsSchema=mongoose.Schema({
    name:{type:String,required:true}
},{timestamps:true})

const componentsModel=mongoose.model("components",componentsSchema)
export default componentsModel