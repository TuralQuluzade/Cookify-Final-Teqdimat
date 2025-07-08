import feedbackModel from "../models/feedbackModel.js";

const getFeedback =async (req,res)=>{
   const product=await feedbackModel.find()
    res.json(product)
}
const postFeedback = async (req,res)=>{
    const {name,surname,email,phoneNumber,textMessage}=req.body;
    const product={name,surname,email,phoneNumber,textMessage}
    await feedbackModel.create(product)
    res.json(product)
}
const deleteFeedback = async (req,res)=>{
    const {id}=req.params
    const product=await feedbackModel.findByIdAndDelete(id)
    res.json(`${id}-li feedback silindi`)
}
export  {getFeedback,postFeedback,deleteFeedback}