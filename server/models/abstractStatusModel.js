import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  abstractSubmitted: { type: Boolean, default: false },
  abstractSelected: { type: Boolean, default: false },
  paymentDone: { type: Boolean, default: false },
  paperSubmitted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("AbstractStatus", statusSchema);
