// import asyncHandler from "express-async-handler";
// import mongoose from "mongoose";
// import AbstractStatus from "../models/abstractStatusModel.js";
// import User from "../models/userModel.js";
// import { sendMail, templates } from "../utils/email.js";

// export const setAbstractSelected = asyncHandler(async (req, res) => {
//   let { userId } = req.params;

//   // 🧹 Clean the userId
//   userId = (userId || "").trim();

//   // ✅ Validate ObjectId
//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     return res.status(400).json({ message: `Invalid userId: ${userId}` });
//   }

//   const status = await AbstractStatus.findOneAndUpdate(
//     { userId },
//     { abstractSelected: true },
//     { new: true, upsert: true }
//   );

//   const user = await User.findById(userId);
//   if (user) {
//     await sendMail({
//       to: user.email,
//       subject: "Abstract Selected",
//       html: templates.abstractSelected(user.name),
//     });
//   }

//   res.json({ status });
// });

// export const confirmPayment = asyncHandler(async (req, res) => {
//   let { userId } = req.params;

//   // 🧹 Clean and validate
//   userId = (userId || "").trim();
//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     return res.status(400).json({ message: `Invalid userId: ${userId}` });
//   }

//   const status = await AbstractStatus.findOneAndUpdate(
//     { userId },
//     { paymentDone: true },
//     { new: true, upsert: true }
//   );

//   const user = await User.findById(userId);
//   if (user) {
//     await sendMail({
//       to: user.email,
//       subject: "Payment Confirmed",
//       html: templates.paymentConfirmed(user.name),
//     });
//   }

//   res.json({ status });
// });


import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import AbstractStatus from "../models/abstractStatusModel.js";
import User from "../models/userModel.js";
// import { sendMail, templates } from "../utils/email.js";

// ✅ Mark Abstract as Selected
export const setAbstractSelected = asyncHandler(async (req, res) => {
  let { userId } = req.params;
  userId = (userId || "").trim();

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: `Invalid userId: ${userId}` });
  }

  // Update status
  const status = await AbstractStatus.findOneAndUpdate(
    { userId },
    { abstractSelected: true },
    { new: true, upsert: true }
  );

  // Notify user
  const user = await User.findById(userId);
  // if (user) {
  //   await sendMail({
  //     to: user.email,
  //     subject: "Abstract Selected",
  //     html: templates.abstractSelected(user.name),
  //   });
  // }

  res.json({ message: "Abstract marked as selected", status });
});

// ✅ Confirm Payment
export const confirmPayment = asyncHandler(async (req, res) => {
  let { userId } = req.params;
  userId = (userId || "").trim();

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: `Invalid userId: ${userId}` });
  }

  // Update status
  const status = await AbstractStatus.findOneAndUpdate(
    { userId },
    { paymentDone: true },
    { new: true, upsert: true }
  );

  // Notify user
  const user = await User.findById(userId);
  // if (user) {
  //   await sendMail({
  //     to: user.email,
  //     subject: "Payment Confirmed",
  //     html: templates.paymentConfirmed(user.name),
  //   });
  // }

  res.json({ message: "Payment confirmed", status });
});
