import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import AbstractStatus from "../models/abstractStatusModel.js"; // ✅ your schema file
// import Registration from "../models/registrationModel.js"; // ✅ your schema file
import { generateToken } from "../middleware/authMiddleware.js";
// Admin Signup
export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });
  if (adminExists) return res.status(400).json({ message: "Admin already exists" });

  const admin = await Admin.create({ name, email, password });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400).json({ message: "Invalid admin data" });
  }
});

// Admin Login
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});



// Get a single user by ID (Admin view)
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});



// Update user's approval workflow
// export const updateUserApproval = asyncHandler(async (req, res) => {
//   const { id } = req.params; // User ID
//   const { abstractStatus, finalPaperStatus, paymentStatus } = req.body;

//   const status = await AbstractStatus.findOne({ userId: id }).populate("userId", "name email");
//   if (!status) return res.status(404).json({ message: "Status record not found for this user" });

//   // Step 1: Abstract
//   if (abstractStatus) {
//     status.abstractStatus = abstractStatus;
//     status.abstractApprovedBy = req.user._id; // ✅ track admin
//     if (abstractStatus === "rejected") {
//       status.finalPaperStatus = "pending";
//       status.finalPaperApprovedBy = null;
//       status.paymentStatus = "pending";
//       status.paymentApprovedBy = null;
//     }
//   }

//   // Step 2: Final Paper
//   if (finalPaperStatus) {
//     if (status.abstractStatus !== "approved") {
//       return res.status(400).json({ message: "Final paper cannot be updated before Abstract approval" });
//     }
//     status.finalPaperStatus = finalPaperStatus;
//     status.paperApprovedBy = req.user._id;
//     if (finalPaperStatus === "rejected") {
//       status.paymentStatus = "pending";
//       status.paymentApprovedBy = null;
//     }
//   }

//   // Step 3: Payment
//   if (paymentStatus) {
//     if (status.finalPaperStatus !== "approved") {
//       return res.status(400).json({ message: "Payment cannot be updated before Final Paper approval" });
//     }
//     status.paymentStatus = paymentStatus;
//     status.paymentApprovedBy = req.user._id;
//   }

//   const updatedStatus = await status.save();

//   res.json({
//     userId: updatedStatus.userId._id,
//     userName: updatedStatus.userId.name,
//     email: updatedStatus.userId.email,
//     abstractStatus: updatedStatus.abstractStatus,
//     abstractApprovedBy: updatedStatus.abstractApprovedBy,
//     finalPaperStatus: updatedStatus.finalPaperStatus,
//     paperApprovedBy: updatedStatus.paperApprovedBy,
//     paymentStatus: updatedStatus.paymentStatus,
//     paymentApprovedBy: updatedStatus.paymentApprovedBy,
//   });
// });


// Update user's approval workflow
// export const updateUserApproval = asyncHandler(async (req, res) => {
//   const { id } = req.params; // User ID
//   const { abstractStatus, finalPaperStatus, paymentStatus } = req.body;

//   const status = await AbstractStatus.findOne({ userId: id }).populate("userId", "name email");
//   if (!status) return res.status(404).json({ message: "Status record not found for this user" });

//   // Step 1: Abstract
//   if (abstractStatus) {
//     status.abstractStatus = abstractStatus;
//     status.abstractApprovedBy = req.user._id;

//     // 🔥 sync with User & Registration
//     await User.findByIdAndUpdate(id, { abstractStatus });
//     await Registration.findOneAndUpdate({ userId: id }, { abstractStatus });

//     if (abstractStatus === "rejected") {
//       status.finalPaperStatus = "pending";
//       status.finalPaperApprovedBy = null;
//       status.paymentStatus = "pending";
//       status.paymentApprovedBy = null;

//       await User.findByIdAndUpdate(id, { finalPaperStatus: "pending", paymentStatus: "unpaid" });
//       await Registration.findOneAndUpdate(
//         { userId: id },
//         { finalPaperStatus: "pending", paymentStatus: "unpaid" }
//       );
//     }
//   }

//   // Step 2: Final Paper
//   if (finalPaperStatus) {
//     if (status.abstractStatus !== "approved") {
//       return res.status(400).json({ message: "Final paper cannot be updated before Abstract approval" });
//     }
//     status.finalPaperStatus = finalPaperStatus;
//     status.paperApprovedBy = req.user._id;

//     await User.findByIdAndUpdate(id, { finalPaperStatus });
//     await Registration.findOneAndUpdate({ userId: id }, { finalPaperStatus });

//     if (finalPaperStatus === "rejected") {
//       status.paymentStatus = "pending";
//       status.paymentApprovedBy = null;

//       await User.findByIdAndUpdate(id, { paymentStatus: "unpaid" });
//       await Registration.findOneAndUpdate({ userId: id }, { paymentStatus: "unpaid" });
//     }
//   }

//   // Step 3: Payment
//   if (paymentStatus) {
//     if (status.finalPaperStatus !== "approved") {
//       return res.status(400).json({ message: "Payment cannot be updated before Final Paper approval" });
//     }
//     status.paymentStatus = paymentStatus;
//     status.paymentApprovedBy = req.user._id;

//     // 🔥 sync User & Registration
//     await User.findByIdAndUpdate(id, { paymentStatus });
//     await Registration.findOneAndUpdate({ userId: id }, { paymentStatus });
//   }

//   const updatedStatus = await status.save();

//   res.json({
//     userId: updatedStatus.userId._id,
//     userName: updatedStatus.userId.name,
//     email: updatedStatus.userId.email,
//     abstractStatus: updatedStatus.abstractStatus,
//     abstractApprovedBy: updatedStatus.abstractApprovedBy,
//     finalPaperStatus: updatedStatus.finalPaperStatus,
//     paperApprovedBy: updatedStatus.paperApprovedBy,
//     paymentStatus: updatedStatus.paymentStatus,
//     paymentApprovedBy: updatedStatus.paymentApprovedBy,
//   });
// });

export const updateUserApproval = asyncHandler(async (req, res) => {
  const { id } = req.params; // User ID
  const { abstractStatus, finalPaperStatus, paymentStatus } = req.body;

  const status = await AbstractStatus.findOne({ userId: id }).populate("userId", "name email");
  if (!status) return res.status(404).json({ message: "Status record not found" });

  // Step 1: Abstract
  if (abstractStatus) {
    status.abstractStatus = abstractStatus;
    status.abstractApprovedBy = req.user._id;

    await User.findByIdAndUpdate(id, { abstractStatus });
    await Registration.findOneAndUpdate({ userId: id }, { abstractStatus });

    if (abstractStatus === "rejected") {
      status.finalPaperStatus = "pending";
      status.finalPaperApprovedBy = null;
      status.paymentStatus = "pending";
      status.paymentApprovedBy = null;

      await User.findByIdAndUpdate(id, { finalPaperStatus: "pending", paymentStatus: "unpaid" });
      await Registration.findOneAndUpdate({ userId: id }, { finalPaperStatus: "pending", paymentStatus: "unpaid" });
    }
  }

  // Step 2: Final Paper
  if (finalPaperStatus) {
    if (status.abstractStatus !== "approved") return res.status(400).json({ message: "Final paper cannot be updated before Abstract approval" });
    status.finalPaperStatus = finalPaperStatus;
    status.paperApprovedBy = req.user._id;

    await User.findByIdAndUpdate(id, { finalPaperStatus });
    await Registration.findOneAndUpdate({ userId: id }, { finalPaperStatus });

    if (finalPaperStatus === "rejected") {
      status.paymentStatus = "pending";
      status.paymentApprovedBy = null;
      await User.findByIdAndUpdate(id, { paymentStatus: "unpaid" });
      await Registration.findOneAndUpdate({ userId: id }, { paymentStatus: "unpaid" });
    }
  }

  // Step 3: Payment
  if (paymentStatus) {
    if (status.finalPaperStatus !== "approved") return res.status(400).json({ message: "Payment cannot be updated before Final Paper approval" });
    status.paymentStatus = paymentStatus;
    status.paymentApprovedBy = req.user._id;

    await User.findByIdAndUpdate(id, { paymentStatus });
    await Registration.findOneAndUpdate({ userId: id }, { paymentStatus });
  }

  const updatedStatus = await status.save();
  res.json(updatedStatus);
});
// Get all users (Admin Dashboard)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});
