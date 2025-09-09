import { Router } from "express";
import { register, login, me, logout,admin } from "../controllers/authController.js";
import { authRequired } from "../middleware/authtoken.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/admin",admin);
router.get("/me", authRequired, me);
router.post("/logout", authRequired, logout);
export default router;
