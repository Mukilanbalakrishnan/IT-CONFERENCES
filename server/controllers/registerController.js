// // import asyncHandler from "express-async-handler";
// // import cloudinary from "../config/cloudinary.js";
// // import Registration from "../models/registerModel.js";
// // import AbstractStatus from "../models/abstractStatusModel.js";
// // import User from "../models/userModel.js";
// // // import { sendMail, templates } from "../utils/email.js";

// // const bufferToDataUri = (file) => {
// //   const base64 = file.buffer.toString("base64");
// //   return `data:${file.mimetype};base64,${base64}`;
// // };

// // // 📌 Submit full registration + abstract
// // // 📌 Submit full registration + abstract
// // export const submitRegistration = asyncHandler(async (req, res) => {
// //   const userId = req.user?.id; // comes from authRequired middleware
// //   if (!userId) {
// //     return res.status(401).json({ message: "Not authorized. Please log in." });
// //   }

// //   const user = await User.findById(userId);
// //   const uniqueId = user?.userId || "Unknown";
  
// //   if (!user) {
// //     return res.status(401).json({ message: "User not found" });
// //   }

// //   const {
// //     participants,
// //     address,
// //     country,
// //     pincode,
// //     track,
// //     abstractTitle,
// //     abstractContent,
// //     abstractExpression,
// //   } = req.body;
// //   // ✅ Save registration
// //   const reg = await Registration.findOneAndUpdate(
// //     { userId},
// //     {  uniqueId: user.userId,
// //       participants,
// //       address,
// //       country,
// //       pincode,
// //       track,
// //       abstractTitle,
// //       abstractContent,
// //       abstractExpression,
// //     },
// //     { new: true, upsert: true, runValidators: true }
// //   );

// //   res.status(201).json({
// //     message: "Registration saved",
// //     registration: reg,
// //   });
// // });


// // // 📌 Upload final paper (file)
// // export const uploadFinalPaper = asyncHandler(async (req, res) => {
// //   if (!req.file) return res.status(400).json({ message: "No file uploaded" });

// //   const userId = req.user.id;
// //   const user = await User.findById(userId);

// //   const result = await cloudinary.uploader.upload(bufferToDataUri(req.file), {
// //     resource_type: "auto",
// //     folder: "conference/papers",
// //     public_id: `paper_${userId}`,
// //   });

// //   const reg = await Registration.findOneAndUpdate(
// //     { userId },
// //     { paperUrl: result.secure_url },
// //     { new: true, upsert: true }
// //   );

// //   await AbstractStatus.findOneAndUpdate(
// //     { userId },
// //     { paperSubmitted: true },
// //     { new: true, upsert: true }
// //   );

// //   // try {
// //   //   await sendMail({
// //   //     to: user.email,
// //   //     subject: "Final Paper Received",
// //   //     html: templates.finalConfirmed(user.name),
// //   //   });
// //   // } catch {}

// //   res.json({
// //     message: "Final paper uploaded",
// //     url: result.secure_url,
// //     registration: reg,
// //   });
// // });


// import asyncHandler from "express-async-handler";
// import cloudinary from "../config/cloudinary.js";
// import Registration from "../models/registerModel.js";
// import AbstractStatus from "../models/abstractStatusModel.js";
// import User from "../models/userModel.js";

// const bufferToDataUri = (file) => {
//   const base64 = file.buffer.toString("base64");
//   return `data:${file.mimetype};base64,${base64}`;
// };

// // 📌 Submit registration + abstract
// export const submitRegistration = asyncHandler(async (req, res) => {
//   const userId = req.user?.id;
//   if (!userId) return res.status(401).json({ message: "Not authorized" });

//   const user = await User.findById(userId);
//   if (!user) return res.status(404).json({ message: "User not found" });

//   const {
//     participants,
//     address,
//     country,
//     pincode,
//     track,
//     abstractTitle,
//     abstractContent,
//     abstractExpression,
//   } = req.body;

//   const reg = await Registration.findOneAndUpdate(
//     { userId },
//     {
//       uniqueId: user.userId,
//       participants,
//       address,
//       country,
//       pincode,
//       track,
//       abstractTitle,
//       abstractContent,
//       abstractExpression,
//     },
//     { new: true, upsert: true, runValidators: true }
//   );

//   // Create / update abstract status
//   await AbstractStatus.findOneAndUpdate(
//     { userId },
//     { abstractSubmitted: true, abstractApproved: false }, // Default: pending admin approval
//     { new: true, upsert: true }
//   );

//   res.status(201).json({
//     message: "Registration & abstract submitted. Await admin approval.",
//     registration: reg,
//   });
// });

// // 📌 Upload final paper (only if abstract is approved by admin)
// export const uploadFinalPaper = asyncHandler(async (req, res) => {
//   if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//   const userId = req.user.id;
//   const user = await User.findById(userId);

//   if (!user) return res.status(404).json({ message: "User not found" });

//   // ✅ Check if abstract is approved by admin
//   const status = await AbstractStatus.findOne({ userId });
//   if (!status || !status.abstractApproved) {
//     return res.status(403).json({
//       message: "Abstract not approved yet. Admin approval required before uploading final paper.",
//     });
//   }

//   // ✅ Upload to Cloudinary
//   const result = await cloudinary.uploader.upload(bufferToDataUri(req.file), {
//     resource_type: "auto",
//     folder: "conference/papers",
//     public_id: `paper_${userId}`,
//   });

//   // ✅ Save paper URL in Registration
//   const reg = await Registration.findOneAndUpdate(
//     { userId },
//     { paperUrl: result.secure_url },
//     { new: true, upsert: true }
//   );

//   // ✅ Update abstract status → paper submitted
//   await AbstractStatus.findOneAndUpdate(
//     { userId },
//     { paperSubmitted: true },
//     { new: true, upsert: true }
//   );

//   res.json({
//     message: "Final paper uploaded successfully",
//     url: result.secure_url,
//     registration: reg,
//   });
// });



import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary.js";
import Registration from "../models/registerModel.js";
import AbstractStatus from "../models/abstractStatusModel.js";
import User from "../models/userModel.js";

const bufferToDataUri = (file) => {
  const base64 = file.buffer.toString("base64");
  return `data:${file.mimetype};base64,${base64}`;
};

// ----------------------------
// Submit registration + abstract
// ----------------------------
export const submitRegistration = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Not authorized" });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const {
    participants,
    address,
    country,
    pincode,
    track,
    abstractTitle,
    abstractContent,
    abstractExpression,
  } = req.body;

  // Save or update registration
  const registration = await Registration.findOneAndUpdate(
    { userId },
    {
      uniqueId: user.userId,
      participants,
      address,
      country,
      pincode,
      track,
      abstractTitle,
      abstractContent,
      abstractExpression,
    },
    { new: true, upsert: true, runValidators: true }
  );

  // Initialize abstract status for admin approval
  await AbstractStatus.findOneAndUpdate(
    { userId },
    {
      abstractSubmitted: true,
      abstractApproved: false, // pending admin approval
      finalPaperSubmitted: false,
      finalPaperApproved: false,
      paymentProcessed: false,
    },
    { new: true, upsert: true }
  );

  res.status(201).json({
    message: "Registration & abstract submitted. Await admin approval.",
    registration,
  });
});

// ----------------------------
// Upload final paper (only if abstract approved)
// ----------------------------
export const uploadFinalPaper = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const userId = req.user.id;

  const registration = await Registration.findOne({ userId });
  if (!registration) return res.status(404).json({ message: "Registration not found" });

  const status = await AbstractStatus.findOne({ userId });
  if (!status || !status.abstractApproved) {
    return res.status(403).json({
      message: "Abstract not approved yet. Admin approval required before uploading final paper.",
    });
  }

  // Upload file to Cloudinary
  const result = await cloudinary.uploader.upload(bufferToDataUri(req.file), {
    resource_type: "auto",
    folder: "conference/papers",
    public_id: `paper_${userId}`,
  });

  // Save paper URL and update status
  registration.paperUrl = result.secure_url;
  await registration.save();

  status.finalPaperSubmitted = true;
  status.finalPaperApproved = false; // pending admin approval
  await status.save();

  res.json({
    message: "Final paper uploaded successfully. Await admin approval.",
    url: result.secure_url,
    registration,
  });
});

// ----------------------------
// Process payment (only if final paper approved)
// ----------------------------
export const processPayment = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const status = await AbstractStatus.findOne({ userId });

  if (!status || !status.finalPaperApproved) {
    return res.status(403).json({
      message: "Final paper not approved yet. Cannot process payment.",
    });
  }

  // Here you would integrate your payment gateway logic
  // For now, just mark as paid
  status.paymentProcessed = true;
  await status.save();

  res.json({
    message: "Payment processed successfully",
    paymentStatus: status.paymentProcessed,
  });
});
