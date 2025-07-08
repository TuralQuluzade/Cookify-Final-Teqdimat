import receptsModel from "../models/receptsModel.js";
import Component from "../models/componentsModel.js";
const getRecepts= async(req,res)=>{
    const products = await receptsModel.find()
    res.json(products)
}
const postRecepts= async(req,res)=>{

        try {
            const { name, time, category, image, components } = req.body;

            // 1) components arrayinə bax
            for (const comp of components) {
                const found = await Component.findOne({ name: comp });
                if (!found) {
                    await Component.create({ name: comp });
                }
            }


            const newRecept = await receptsModel.create({
                name,
                time,
                category,
                image,
                components
            });

            res.status(201).json(newRecept);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Xəta baş verdi" });
        }

}
const deleteRecepts= async(req,res)=>{
    const {id}=req.params
    await receptsModel.findByIdAndDelete(id)
    res.json("Product Deleted")
}

 const searchRecepts = async (req, res) => {
    const query = req.query.query;
    try {
        const results = await receptsModel.find({
            name: { $regex: query, $options: "i" }  // "i" = case insensitive
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: "Axtarisda Xeta", error: err.message });
    }
};
const updateRecept = async (req, res) => {
    const { id } = req.params;
    const { name, time, components, category, image } = req.body;

    try {
        const updatedRecept = await receptsModel.findByIdAndUpdate(
            id,
            {
                name,
                time,
                components,
                category,
                image,
            },
            { new: true, runValidators: true } // new:true => updated document qaytarır
        );

        if (!updatedRecept) {
            return res.status(404).json({ message: "Recept tapılmadı" });
        }

        res.json(updatedRecept);
    } catch (err) {
        res.status(500).json({ message: "Recept redaktə olunarkən xəta baş verdi", error: err.message });
    }
};


export {getRecepts, postRecepts, deleteRecepts,searchRecepts,updateRecept}