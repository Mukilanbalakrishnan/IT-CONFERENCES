import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import AbstractStatus from "../models/abstractStatusModel.js"; // ✅ your schema file
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
export const updateUserApproval = asyncHandler(async (req, res) => {
  const { id } = req.params; // now expecting User._id
  const { abstractApproved, paperSubmitted, paymentDone } = req.body;

  // find status record by userId instead of status _id
  const status = await AbstractStatus.findOne({ userId: id })
    .populate("userId", "name email userId");

  if (!status) {
    return res.status(404).json({ message: "Status record not found for this user" });
  }

  // Step 1: Abstract
  if (abstractApproved !== undefined) {
    status.abstractApproved = abstractApproved;
    if (!abstractApproved) {
      status.paperSubmitted = false;
      status.paymentDone = false;
    }
  }

  // Step 2: Paper
  if (paperSubmitted !== undefined) {
    if (!status.abstractApproved) {
      return res.status(400).json({
        message: "Paper cannot be marked before Abstract approval",
      });
    }
    status.paperSubmitted = paperSubmitted;
    if (!paperSubmitted) {
      status.paymentDone = false;
    }
  }

  // Step 3: Payment
  if (paymentDone !== undefined) {
    if (!status.paperSubmitted) {
      return res.status(400).json({
        message: "Payment cannot be processed before Paper submission",
      });
    }
    status.paymentDone = paymentDone;
  }

  const updatedStatus = await status.save();

  res.json({
    _id: updatedStatus._id,
    userId: updatedStatus.userId._id,
    userName: updatedStatus.userId.name,
    email: updatedStatus.userId.email,
    abstractSubmitted: updatedStatus.abstractSubmitted,
    abstractApproved: updatedStatus.abstractApproved,
    paperSubmitted: updatedStatus.paperSubmitted,
    paymentDone: updatedStatus.paymentDone,
  });
});

// export const updateUserApproval = asyncHandler(async (req, res) => {
//   const { id } = req.params; // expecting User._id
//   const { abstractApproved, paperSubmitted, paymentDone } = req.body;

//   // find status by userId
//   const status = await AbstractStatus.findOne({ userId: id })
//     .populate("userId", "name email userId")
//     .populate("abstractApprovedBy", "name email")
//     .populate("paperApprovedBy", "name email")
//     .populate("paymentApprovedBy", "name email");

//   if (!status) {
//     return res.status(404).json({ message: "Status record not found for this user" });
//   }

//   // Step 1: Abstract
// if (abstractApproved !== undefined) {
//   status.abstractApproved = abstractApproved;
//   status.abstractApprovedBy = req.admin._id; // ✅ track admin

//   if (!abstractApproved) {
//     // reset later stages if rejected
//     status.paperSubmitted = false;
//     status.paperApprovedBy = null;
//     status.paymentDone = false;
//     status.paymentApprovedBy = null;
//   }
// }

//   // Step 2: Paper
//   if (paperSubmitted !== undefined) {
//     if (!status.abstractApproved) {
//       return res.status(400).json({ message: "Paper cannot be marked before Abstract approval" });
//     }
//     status.paperSubmitted = paperSubmitted;
//     status.paperApprovedBy = req.admin._id; // ✅ track admin
//     if (!paperSubmitted) {
//       status.paymentDone = false;
//       status.paymentApprovedBy = null;
//     }
//   }

//   // Step 3: Payment
//   if (paymentDone !== undefined) {
//     if (!status.paperSubmitted) {
//       return res.status(400).json({ message: "Payment cannot be processed before Paper submission" });
//     }
//     status.paymentDone = paymentDone;
//     status.paymentApprovedBy = req.admin._id; // ✅ track admin
//   }

//   const updatedStatus = await status.save();

//   res.json({
//     _id: updatedStatus._id,
//     userId: updatedStatus.userId._id,
//     userName: updatedStatus.userId.name,
//     email: updatedStatus.userId.email,
//     abstractSubmitted: updatedStatus.abstractSubmitted,
//     abstractApproved: updatedStatus.abstractApproved,
//     abstractApprovedBy: updatedStatus.abstractApprovedBy,
//     paperSubmitted: updatedStatus.paperSubmitted,
//     paperApprovedBy: updatedStatus.paperApprovedBy,
//     paymentDone: updatedStatus.paymentDone,
//     paymentApprovedBy: updatedStatus.paymentApprovedBy,
//   });
// });


// Get all users (Admin Dashboard)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});
