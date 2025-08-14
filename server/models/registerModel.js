import mongoose from "mongoose";

const RegisterSchema = new mongoose.Schema({
  username: { type: String, required: true },
  delegateType: { type: String },
  attendeeType: { type: String },
  presentingAuthor: { type: String },
  abstractTitle: { type: String },
  track: { type: String },
  uploadedFileUrl: { type: String }, // Cloudinary URL (raw)
}, { timestamps: true });

export default mongoose.model("Register", RegisterSchema);
