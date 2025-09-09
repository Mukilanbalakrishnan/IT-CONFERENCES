// import { Router } from "express";
// import { submitRegistration, uploadFinalPaper } from "../controllers/registerController.js";
// import { authRequired } from "../middleware/authtoken.js";
// import upload from "../middleware/multer.js";

// const router = Router();

// // Abstract submission (requires valid user)
// router.post("/", authRequired, submitRegistration);

// // Final paper upload (requires valid user)
// // router.post("/paper", authRequired, upload.single("file"), uploadFinalPaper);

// export default router;


import { Router } from "express";
import { submitRegistration, uploadFinalPaper, processPayment } from "../controllers/registerController.js";
import { authRequest } from "../middleware/constants.js";
import upload from "../middleware/multer.js";

const router = Router();

// Step 1: Abstract submission
router.post("/", authRequest, submitRegistration);

// Step 2: Final paper upload (after admin approval)
router.post("/paper", authRequest, upload.single("file"), uploadFinalPaper);

// Step 3: Payment (after final paper approved)
router.post("/payment", authRequest, processPayment);

export default router;

