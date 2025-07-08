// routes/dailyTaskRoutes.js
import express from "express";
import multer from "multer";
import path from "path";


import {approveTask, getPendingTasks, startTask, submitTask} from "../controller/dailyTaskController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Sizə icazə verilmir" });
    }
};
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb("Only images are allowed (jpg, jpeg, png)");
        }
    },
});

// Routes
router.post("/start", protect, startTask);
router.post("/submit", protect, upload.single("photo"), submitTask);

// Admin panel üçün
router.get("/admin", protect, isAdmin, getPendingTasks);
router.put("/admin/:id/approve", protect, isAdmin, approveTask);

export default router;