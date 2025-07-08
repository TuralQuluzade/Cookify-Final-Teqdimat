import DailyTask from "../models/DailyTask.js";
import path from "path";
import fs from "fs";

import Receipt from "../models/receptsModel.js"; // sənin resept modelin

export const startTask = async (req, res) => {
    try {
        const userId = req.user._id;

        // Cari tapşırığı tap: statusu active, submitted və ya approved ola bilər
        const activeTask = await DailyTask.findOne({
            user: userId,
            status: { $in: ["active", "submitted", "approved"] },
            expiresAt: { $gt: new Date() },
        });

        if (activeTask) {
            // İstifadəçinin artıq tapşırığı var, ona status və mesaj qaytar
            return res.status(200).json({
                message: "You have already submitted or have an active task.",
                task: activeTask,
            });
        }

        // Random yemək seçmək üçün receipts kolleksiyasından 1 random sənəd seç
        const count = await Receipt.countDocuments();
        if (count === 0) {
            return res.status(400).json({ message: "Reseptlər tapılmadı" });
        }

        // Random skip sayını hesabla
        const random = Math.floor(Math.random() * count);

        // 1 sənəd random çəkmək üçün skip və limit istifadə et
        const randomReceipt = await Receipt.findOne().skip(random);

        // Yeni tapşırıq yarat
        const newTask = new DailyTask({
            user: userId,
            dish: randomReceipt.title || randomReceipt.name || "Yemək",
            status: "active",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 saat sonra
        });

        await newTask.save();

        res.status(201).json(newTask);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server xətası" });
    }
};


export const submitTask = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "Photo required" });
        console.log("Şəkil faylı:", req.file);

        const photoUrl = `/uploads/${req.file.filename}`;

        const task = await DailyTask.findOne({
            user: req.user.id,
            expiresAt: { $gt: new Date() },
        });

        if (!task) return res.status(404).json({ message: "No active task" });

        task.photoUrl = photoUrl;
        task.submittedAt = new Date();
        await task.save();

        res.status(200).json({ message: "Task submitted", task });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPendingTasks = async (req, res) => {
    try {
        const tasks = await DailyTask.find({ photoUrl: { $ne: null }, approved: false }).populate("user", "username");
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const approveTask = async (req, res) => {
    try {
        const task = await DailyTask.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        task.status = "approved";
        task.approved = true;
        await task.save();

        res.status(200).json({ message: "Task approved" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};