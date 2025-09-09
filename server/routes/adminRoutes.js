// import { Router } from "express";
// import { adminOnly, authRequired } from "../middleware/authtoken.js";
// import { setAbstractSelected, confirmPayment } from "../controllers/adminController.js";

// const router = Router();
// router.patch("/abstract/:userId/select", authRequired, adminOnly, setAbstractSelected);
// router.patch("/payment/:userId/confirm", authRequired, adminOnly, confirmPayment);
// export default router;


// import { Router } from "express";
// import {  authRequest } from "../middleware/constants.js";
// import { setAbstractSelected, confirmPayment } from "../controllers/adminController.js";

// const router = Router();

// // ✅ Only authenticated admins can hit these
// router.patch("/abstract/:userId/select", authRequest, setAbstractSelected);
// router.patch("/payment/:userId/confirm", authRequest, confirmPayment);

// export default router;


import express from "express";
import { getAllUsers, getUserById, updateUserApproval,registerAdmin,loginAdmin } from "../controllers/adminController.js";
import { protectAdmin, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

// Admin access only
router.get("/users", protectAdmin, admin, getAllUsers);        // list all users
router.get("/users/:id", protectAdmin, admin, getUserById);   // get user details
router.put("/users/:id", protectAdmin, admin, updateUserApproval); // update workflow

// Signup
router.post("/signup", registerAdmin);
// Login
router.post("/login", loginAdmin);
export default router;

