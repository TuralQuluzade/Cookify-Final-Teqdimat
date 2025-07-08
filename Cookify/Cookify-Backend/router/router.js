import express from "express"
import multer from "multer";
import {deleteRecepts, getRecepts, postRecepts, searchRecepts, updateRecept} from "../controller/receptsController.js"
// import {deleteFavorites, getFavorites, postFavorites} from "../controller/favoritesController.js"
import { deleteComp, getComp, postComp } from "../controller/componentsController.js"
import {getFavorites, login, logout, signup, toggleFavorite, updateProfileImage} from "../controller/userController.js"
import {
    addComment,
    createBlog,
    deleteBlog,
    deleteComment,
    getAllBlogs,
    getBlogById,
    getLikedBlogsByUser,
    toggleLike
} from "../controller/blogController.js"
import { protect } from "../middleware/authMiddleware.js"
import {deleteFeedback, getFeedback, postFeedback} from "../controller/feedbackController.js";
import {deleteSupporter, getSupporter, postSupporter} from "../controller/supporterController.js";
import upload from "../utils/upload.js";
import {
    addLink,
    deleteLink,
    getLinks,
} from "../controller/socialController.js";
import {isAdmin} from "../middleware/isAdmin.js";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import dailyTaskRoutes from "./dailyTaskRoutes.js";
import DailyTask from "../models/dailyTask.js";
const router = express.Router()
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const send = multer({ storage });

router
.post("/social", protect, addLink)
.get("/social", protect, getLinks)
    .delete("/social/:id",protect ,deleteLink)
.post("/blog", protect, upload.single("image"), createBlog)
.get("/blog",getAllBlogs)
.get("/blog/:id",getBlogById)
.put("/blog/:id/like",protect,toggleLike)
.post("/blog/:id/comment",protect,addComment)
    .get("/liked-by-user", protect, getLikedBlogsByUser)
.delete('/blog/:blogId/comment/:commentId',protect,deleteComment)
    .delete("/blog/:id", protect, deleteBlog)
.post("/auth/logout",logout)
.post("/auth/signup",signup)
.post("/auth/login",login)
.put("/auth/profile-image", protect, send.single("file"), updateProfileImage)
    .get("/recepts/search",searchRecepts)
.get("/recepts",getRecepts)
    .post('/addfavorite', protect, toggleFavorite)
    .get('/favorite', protect, getFavorites)
    .get("/admin", protect, isAdmin, (req, res) => {
        res.json({ message: "Admin panelinə xoş gəldiniz" });
    })
.post("/recepts",postRecepts)
.delete("/recepts/:id",deleteRecepts)
    .put("/recepts/:id", updateRecept)
.get("/components",getComp)
.post("/components",postComp)
.delete("/components/:id",deleteComp)
    .get("/feedback",getFeedback)
    .post("/feedback",postFeedback)
    .delete("/feedback/:id",deleteFeedback)
    .get("/supporter",getSupporter)
    .post("/supporter", send.single("file"),postSupporter)
    .delete("/supporter/:id",deleteSupporter)
    .get("/me", protect, async (req, res) => {
        try {
            const approvedTaskExists = await DailyTask.exists({
                user: req.user._id,
                status: "approved",
            });

            res.status(200).json({
                id: req.user._id,
                username: req.user.username,
                email: req.user.email,
                fullName: req.user.fullName,
                profileImage: req.user.profileImage,
                role: req.user.role,
                hasApprovedTask: !!approvedTaskExists,
            });
        } catch (err) {
            console.error("Profil məlumatı alınarkən xəta:", err);
            res.status(500).json({ message: "Server xətası" });
        }
    })
    .get("/api/users", protect, async (req, res) => {
        try {
            const users = await User.find({}, "-password");
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: "Server xətası" });
        }
    })
    .delete("/api/users/:id", protect, async (req, res) => {
        try {
            const { id } = req.params;
            await User.findByIdAndDelete(id);
            res.json({ message: "İstifadəçi silindi" });
        } catch (err) {
            res.status(500).json({ error: "Server xətası" });
        }
    })
.put("/api/users/:id/status", protect, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["active", "blocked"].includes(status)) {
            return res.status(400).json({ error: "Yanlış status dəyəri" });
        }

        const user = await User.findByIdAndUpdate(id, { status }, { new: true });

        if (!user) {
            return res.status(404).json({ error: "İstifadəçi tapılmadı" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Server xətası" });
    }
})

    .put("/admin/users/:id/block", isAdmin, async (req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json("User tapılmadı");
        user.status = user.status === "active" ? "blocked" : "active";
        await user.save();
        res.json(user);
    })
    .post("/feedback/reply", async (req, res) => {
        const { to, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.MY_EMAIL,
            to,
            subject: "Sizin feedbackinizə cavab",
            text: message,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Cavab göndərildi" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Email göndərilmədi" });
        }
    })
.use("/daily-task", dailyTaskRoutes);
export  default router