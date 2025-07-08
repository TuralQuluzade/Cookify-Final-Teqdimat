import mongoose from "mongoose";

const dailyTaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dish: String,
    photoUrl: String,
    status: { type: String, enum: ["active", "submitted", "approved", "rejected"], default: "active" },
    expiresAt: Date,
    createdAt: { type: Date, default: Date.now },
});
const DailyTask = mongoose.models.DailyTask || mongoose.model("DailyTask", dailyTaskSchema);
export default DailyTask;