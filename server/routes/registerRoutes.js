import { Router } from "express";
import { submitRegistration, uploadFinalPaper } from "../controllers/registerController.js";
import { authRequired } from "../middleware/authtoken.js";
import upload from "../middleware/multer.js";

const router = Router();

// Abstract submission (requires valid user)
router.post("/", authRequired, submitRegistration);

// Final paper upload (requires valid user)
router.post("/paper", authRequired, upload.single("file"), uploadFinalPaper);

export default router;
