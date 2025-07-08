
import Favorite from "../models/favoritesModel.js";


export const getFavorites = async (req, res) => {
    const products = await Favorite.find({ user: req.user._id });
    res.json(products);
};


export const postFavorites = async (req, res) => {
    const { name, time, components, category, image } = req.body;


    const exists = await Favorite.findOne({ user: req.user._id, name });
    if (exists) return res.status(409).json({ message: "Already in favorites" });

    const product = await Favorite.create({
        name,
        time,
        components,
        category,
        image,
        user: req.user._id,       // 🔑
    });

    res.status(201).json(product);
};


export const deleteFavorites = async (req, res) => {
    const { id } = req.params;

    const deleted = await Favorite.findOneAndDelete({
        _id: id,
        user: req.user._id,       // 🔑
    });

    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Product deleted" });
};
