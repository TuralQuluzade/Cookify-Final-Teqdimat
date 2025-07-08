import socialModel from "../models/socialModel.js";


export const getLinks = async (req, res) => {
    const links = await socialModel.find({ user: req.user.id }).sort("name");
    res.json(links);
};


export const addLink = async (req, res) => {
    const { name, url } = req.body;
    if (!name || !url)
        return res.status(400).json({ msg: "Bütün xanalar tələb olunur" });

    const link = await socialModel.create({ name, url, user: req.user.id });
    res.status(201).json(link);
};


export const deleteLink = async (req, res) => {
    const link = await socialModel.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id,
    });
    if (!link)
        return res.status(404).json({ msg: "Belə link tapılmadı və ya səlahiyyət yoxdur" });

    res.json({ msg: "Silindi", id: link._id });
};
