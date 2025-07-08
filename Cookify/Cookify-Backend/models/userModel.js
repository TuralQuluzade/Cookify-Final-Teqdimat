import mongoose from "mongoose";
import recepts from "./receptsModel.js";
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
        profileImage: {
            type: String,
            default: "/profile5.png",
        },
        favorites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recepts'
        }],
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        status: {
            type: String,
            enum: ["active", "blocked"],
            default: "active"
        },
},
{timestamps:true}
)
const User=mongoose.model("User",userSchema)
export default User