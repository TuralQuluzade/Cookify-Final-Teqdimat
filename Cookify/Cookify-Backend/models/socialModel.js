import mongoose from 'mongoose';

const SocialLinkSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    url:   { type: String, required: true },
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }
});

const socialModel = mongoose.model("social", SocialLinkSchema);
export default socialModel;

