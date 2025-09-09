import { Router } from "express";
import { getMyStatus } from "../controllers/statusController.js";
import { authRequired } from "../middleware/authtoken.js";

const router = Router();
router.get("/", authRequired, getMyStatus);
export default router;
