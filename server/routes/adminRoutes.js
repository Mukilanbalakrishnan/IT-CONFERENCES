// import { Router } from "express";
// import { adminOnly, authRequired } from "../middleware/authtoken.js";
// import { setAbstractSelected, confirmPayment } from "../controllers/adminController.js";

// const router = Router();
// router.patch("/abstract/:userId/select", authRequired, adminOnly, setAbstractSelected);
// router.patch("/payment/:userId/confirm", authRequired, adminOnly, confirmPayment);
// export default router;


import { Router } from "express";
import { adminOnly, authRequired } from "../middleware/authtoken.js";
import { setAbstractSelected, confirmPayment } from "../controllers/adminController.js";

const router = Router();

// ✅ Only authenticated admins can hit these
router.patch("/abstract/:userId/select", authRequired, adminOnly, setAbstractSelected);
router.patch("/payment/:userId/confirm", authRequired, adminOnly, confirmPayment);

export default router;
