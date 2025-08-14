import cloudinary from "../config/cloudinary.js";
import Register from "../models/registerModel.js";
import fs from "fs";

export const registerUser = async (req, res) => {
  try {
    const {
      username,
      delegateType,
      attendeeType,
      presentingAuthor,
      abstractTitle,
      track,
    } = req.body;

    if (!username) {
      return res.status(400).json({ success: false, message: "Username is required" });
    }

    const file = req?.files?.abstractfile?.[0];
    if (!file) {
      return res.status(400).json({ success: false, message: "Abstract file is required" });
    }

    // Upload as RAW to Cloudinary using your preset (enforces formats on Cloudinary side too)
    const uploadRes = await cloudinary.uploader.upload(file.path, {
      resource_type: "raw",
      folder: "registerdetail",
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      allowed_formats: ["pdf", "doc", "docx"],
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });

    // Remove local temp file
    try { fs.unlinkSync(file.path); } catch (_) {}

    const newRegistration = new Register({
      username,
      delegateType,
      attendeeType,
      presentingAuthor,
      abstractTitle,
      track,
      uploadedFileUrl: uploadRes.secure_url,
    });

    await newRegistration.save();

    res.json({
      success: true,
      message: "Registration successful",
      data: newRegistration,
    });
  } catch (err) {
    // Clean temp file on error too
    const file = req?.files?.abstractfile?.[0];
    if (file) { try { fs.unlinkSync(file.path); } catch (_) {} }

    // Multer "LIMIT_FILE_SIZE" -> 413
    if (err?.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ success: false, message: "File too large" });
    }

    console.error("Registration error:", err);
    return res.status(500).json({
      success: false,
      message: "Error in registration",
      error: err?.message || "Unknown error",
    });
  }
};
