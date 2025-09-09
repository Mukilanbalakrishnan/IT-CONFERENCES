import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js";

const router = Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/logout", logoutUser);

export default router;
