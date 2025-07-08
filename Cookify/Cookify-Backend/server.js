import express from "express"
import cors from "cors"
import router from "./router/router.js";
import {connectDB} from "./config/config.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import {protect} from "./middleware/authMiddleware.js";

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(cookieParser())
app.use("/uploads", express.static("uploads"));
console.log("Node environment:", process.env.NODE_ENV);
app.get('/api/profile', protect, (req, res) => {
    res.json({
        username: req.user.username,
        fullName: req.user.fullName,
        email: req.user.email,
    });
});
connectDB()
app.use("/", router)


app.listen(3000, () => {
    console.log("Backend Started")
})