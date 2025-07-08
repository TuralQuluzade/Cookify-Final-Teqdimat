import mongoose from "mongoose";

const receptsSchema=mongoose.Schema({
    name:{type:String,required:true},
    time:{type:String,required:true},
    components:{type:[String],required:true},
    category:{type:String,required:true},
    image:{type:String,required:true}
},{timestamps:true})

const receptsModel= mongoose.model('recepts',receptsSchema)
export default receptsModel