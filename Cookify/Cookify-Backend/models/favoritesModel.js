import mongoose from "mongoose";

const favoritesSchema= mongoose.Schema({
    name:{type:String,required:true},
    time:{type:String,required:true},
    components:{type:[String],required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},{timestamps:true})

favoritesSchema.index({ user: 1, name: 1 }, { unique: true });

export default mongoose.model("Favorite", favoritesSchema);