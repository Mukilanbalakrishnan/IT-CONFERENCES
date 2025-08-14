import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
   
    mobilenumber: {
      type: String,
    },
  },
  { timestamps: true }
);
const delegateSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    delegateType: { type: String, required: true },
    attendeeType: { type: String, required: true },
    presentingAuthor: { type: String, required: true },
    abstractTitle: { type: String, required: true },
    track: { type: String, required: true },
    fileUrl: { type: String } // Store Cloudinary file URL
  },
  { timestamps: true }
);
export default mongoose.model("User", UserSchema);
