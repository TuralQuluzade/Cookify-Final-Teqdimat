import Supporter from "../models/supporterMode.js";

 const postSupporter = async (req, res) => {
    try {
        const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
        const newSupporter = await Supporter.create({ image: imageUrl });
        res.status(201).json(newSupporter);
    } catch (err) {
        res.status(500).json({ error: "Fayl yüklənə bilmədi" });
    }
};

 const getSupporter = async (req, res) => {
    const data = await Supporter.find();
    res.json(data);
};

const deleteSupporter = async(req,res)=>{
    const {id}=req.params
    await Supporter.findByIdAndDelete(id)
    res.json(`${id}-idli Supporter Silindi`)
}
export {getSupporter,postSupporter,deleteSupporter}