import { Router } from "express";
import { getMyStatus } from "../controllers/statusController.js";
import { authRequest } from "../middleware/constants.js";

const router = Router();
router.get("/", authRequest, getMyStatus);
export default router;
