import express from "express";
import upload from "../middleware/multer.js";
import { registerUser } from "../controllers/registerController.js";

const router = express.Router();

// field name must match your form-data key: "abstractfile"
router.post(
  "/register",
  upload.fields([{ name: "abstractfile", maxCount: 1 }]),
  registerUser
);

export default router;
