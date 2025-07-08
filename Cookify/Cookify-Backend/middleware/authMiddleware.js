import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  console.log("Token:", req.cookies);
  const token = req.cookies.jwt; //

  if (!token) {
    return res.status(401).json({ message: "Token yoxdur (cookie tapılmadı)" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: "İstifadəçi tapılmadı" });
    }

    next();
  } catch (error) {
    console.error("Token yoxlanılarkən xəta:", error.message);
    res.status(401).json({ message: "Token etibarsızdır" });
  }
};




