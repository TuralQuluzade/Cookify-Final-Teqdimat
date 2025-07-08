import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import User from "../models/userModel.js";

export const signup =async(req,res)=>{
    try{
        const {fullName,username,password,email}=req.body
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Yanlış Mail Formatı." });
        }
        const existingUser=await User.findOne({username})
        if(existingUser){
            return res.status(400).json("Başqa Bir Username Əlavə Edin.")
        }
        const existingEmail= await User.findOne({email})
        if(existingEmail){
            return res.status(400).json("Siz Artıq Qeydiyyatdan Kecmisiz.")
        }
        if(password.length < 6){
            return res
            .status(400)
            .json("Şifrə ən azı 6 simvoldan ibarət olmalıdır.")
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser= new User({
            fullName,
            username,
            email,
            password:hashedPassword,
        })
        await newUser.save()
        generateTokenAndSetCookie(newUser._id,res)
        res.status(201).json({
            fullName:newUser.fullName,
            username:newUser.username,
            email:newUser.email,
        })
    }catch(error){
        res.json(error)
    }
}
export const getFavorites = async (req, res) => {
    try {
        console.log("REQ.USER:", req.user);

        const user = await User.findById(req.user.id).populate("favorites");

        if (!user) {
            return res.status(404).json({ message: "İstifadəçi tapılmadı" });
        }

        res.status(200).json(user.favorites);
    } catch (err) {
        console.error("getFavorites xətası:", err);
        res.status(500).json({ message: "Xəta baş verdi", error: err.message });
    }
};
export const updateProfileImage = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json("İstifadəçi tapılmadı.");
        }

        user.profileImage = "/" + req.file.path;
        await user.save();

        res.status(200).json({
            message: "Profil şəkli uğurla yeniləndi",
            profileImage: user.profileImage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Server xətası baş verdi.");
    }
};
export const toggleFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const { recipeId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "İstifadəçi tapılmadı" });

        const index = user.favorites.indexOf(recipeId);

        if (index === -1) {
            user.favorites.push(recipeId);
        } else {
            user.favorites.splice(index, 1);
        }

        await user.save();
        res.status(200).json({ favorites: user.favorites });
    } catch (err) {
        res.status(500).json({ message: "Xəta baş verdi", error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }],
        });

        if (user && user.status === "blocked") {
            return res.status(403).json("Bu istifadəçi bloklanıb.");
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password || ""
        );
        if (!user || !isPasswordCorrect) {
            return res.status(400).json("Mail və ya Şifrədə xəta var.");
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            message: "Uğurla Giriş Etdiniz.",
            user: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                role: user.role,
                status: user.status,
            },
        });
    } catch (error) {
        console.log("Login Error:", error);
        res.status(500).json("Server xətası baş verdi.");
    }
};


export const logout=async(req,res)=>{
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 0,
        });
        res.status(200).json("Uğurla Çıxış Etdiniz.")
    } catch (error) {
        res.json(error)
    }
}