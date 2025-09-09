// import asyncHandler from "express-async-handler";
// import cloudinary from "../config/cloudinary.js";
// import Registration from "../models/registerModel.js";
// import AbstractStatus from "../models/abstractStatusModel.js";
// import User from "../models/userModel.js";
// import { sendMail, templates } from "../utils/email.js";

// const bufferToDataUri = (file) => {
//   const base64 = file.buffer.toString("base64");
//   const dataUri = `data:${file.mimetype};base64,${base64}`;
//   return dataUri;
// };

// export const submitRegistration = asyncHandler(async (req, res) => {
//   const userId = req.user.id;
//   const user = await User.findById(userId);

//   const { fullName, college, category, affiliation, phone, abstractTitle, abstractContent } = req.body;
//   // // ✅ Check if empty
//   if (!abstractContent || abstractContent.trim().length === 0) {
//     return res.status(400).json({ 
//       message: "Abstract content is required" 
//     });
//   }

//   // // ✅ Check if too short
//   if (abstractContent.length >= 300) {
//     return res.status(400).json({ 
//       message: "Abstract content must be greater than 300 characters" 
//     });
//   }

//   const update = {
//     fullName,
//     college,
//     category,
//     affiliation,
//     phone,
//     abstractTitle,
//     abstractContent // store content directly instead of file
//   };

//   // update status
//   await AbstractStatus.findOneAndUpdate(
//     { userId },
//     { abstractSubmitted: true },
//     { new: true, upsert: true }
//   );

//   // update registration
//   const reg = await Registration.findOneAndUpdate(
//     { userId },
//     update,
//     { new: true, upsert: true }
//   );

//   try {
//     await sendMail({
//       to: user.email,
//       subject: "Abstract Received",
//       html: templates.abstractReceived(user.name || fullName || "Author"),
//     });
//   } catch (e) {
//     console.error("Email send failed:", e.message);
//   }

//   res.status(201).json({
//     message: "Registration saved",
//     registration: reg,
//   });
// });



// // export const uploadAbstract = asyncHandler(async (req, res) => {
// //   const { content } = req.body; // abstract text or base64 string
// //   if (!content) {
// //     return res.status(400).json({ message: "No abstract content provided" });
// //   }

// //   const userId = req.user.id;
// //   const user = await User.findById(userId);

// //   // Store abstract content directly (instead of uploading file)
// //   const reg = await Registration.findOneAndUpdate(
// //     { userId },
// //     { abstractUrl: null, abstractContent: content },  // save content
// //     { new: true, upsert: true }
// //   );

// //   await AbstractStatus.findOneAndUpdate(
// //     { userId },
// //     { abstractSubmitted: true },
// //     { new: true, upsert: true }
// //   );

// //   try {
// //     await sendMail({
// //       to: user.email,
// //       subject: "Abstract Received",
// //       html: templates.abstractReceived(user.name)
// //     });
// //   } catch {}

// //   res.json({
// //     message: "Abstract submitted as text content",
// //     registration: reg
// //   });
// // });

// export const uploadFinalPaper = asyncHandler(async (req, res) => {
//   if (!req.file) return res.status(400).json({ message: "No file uploaded" });
//   const userId = req.user.id;
//   const user = await User.findById(userId);
//   const result = await cloudinary.uploader.upload(bufferToDataUri(req.file), {
//     resource_type: "auto",
//     folder: "conference/papers",
//     public_id: `paper_${userId}`
//   });
//   const reg = await Registration.findOneAndUpdate({ userId }, { paperUrl: result.secure_url }, { new: true, upsert: true });
//   await AbstractStatus.findOneAndUpdate({ userId }, { paperSubmitted: true }, { new: true, upsert: true });
//   try { await sendMail({ to: user.email, subject: "Final Paper Received", html: templates.finalConfirmed(user.name) }); } catch {}
//   res.json({ message: "Final paper uploaded", url: result.secure_url, registration: reg });
// });


import asyncHandler from "express-async-handler";
import cloudinary from "../config/cloudinary.js";
import Registration from "../models/registerModel.js";
import AbstractStatus from "../models/abstractStatusModel.js";
import User from "../models/userModel.js";
// import { sendMail, templates } from "../utils/email.js";

const bufferToDataUri = (file) => {
  const base64 = file.buffer.toString("base64");
  return `data:${file.mimetype};base64,${base64}`;
};

// 📌 Submit full registration + abstract
// 📌 Submit full registration + abstract
export const submitRegistration = asyncHandler(async (req, res) => {
  const userId = req.user?.id; // comes from authRequired middleware
  if (!userId) {
    return res.status(401).json({ message: "Not authorized. Please log in." });
  }

  const user = await User.findById(userId);
  const uniqueId = user?.userId || "Unknown";
  
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

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
  // ✅ Save registration
  const reg = await Registration.findOneAndUpdate(
    { userId},
    {  uniqueId: user.userId,
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

  res.status(201).json({
    message: "Registration saved",
    registration: reg,
  });
});


// 📌 Upload final paper (file)
export const uploadFinalPaper = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const userId = req.user.id;
  const user = await User.findById(userId);

  const result = await cloudinary.uploader.upload(bufferToDataUri(req.file), {
    resource_type: "auto",
    folder: "conference/papers",
    public_id: `paper_${userId}`,
  });

  const reg = await Registration.findOneAndUpdate(
    { userId },
    { paperUrl: result.secure_url },
    { new: true, upsert: true }
  );

  await AbstractStatus.findOneAndUpdate(
    { userId },
    { paperSubmitted: true },
    { new: true, upsert: true }
  );

  // try {
  //   await sendMail({
  //     to: user.email,
  //     subject: "Final Paper Received",
  //     html: templates.finalConfirmed(user.name),
  //   });
  // } catch {}

  res.json({
    message: "Final paper uploaded",
    url: result.secure_url,
    registration: reg,
  });
});
