import mongoose from "mongoose";

const abstractStatusSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    abstractSubmitted: { type: Boolean, default: false },
    abstractApproved: { type: Boolean, default: false }, // ✅ Admin will toggle this
    paperSubmitted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("AbstractStatus", abstractStatusSchema);
