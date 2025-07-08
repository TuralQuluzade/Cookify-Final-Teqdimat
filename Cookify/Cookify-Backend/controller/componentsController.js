import componentsModel from "../models/componentsModel.js"

const getComp =async(req,res)=>{
    const products=await componentsModel.find()
    res.json(products)
}
const postComp=async(req,res)=>{
    const {name}=req.body
    const products={name}
    await componentsModel.create(products)
    res.json(products)
}
const deleteComp=async(req,res)=>{
    const {id}=req.params
    await componentsModel.findByIdAndDelete(id)
    res.json(`${id}-idli data silindi`)
}
export {getComp,postComp,deleteComp}