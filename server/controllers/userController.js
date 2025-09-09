// import asyncHandler from "express-async-handler";
// import User from "../models/userModel.js";
// import { generateToken } from "../middleware/authMiddleware.js";

// // Register
// export const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   const emailExists = await User.findOne({ email });
//   if (emailExists) {
//     return res.status(400).json({ message: "Email already exists" });
//   }

//   const user = await User.create({ name, email, password });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       userId: user.userId,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400).json({ message: "Invalid user data" });
//   }
// });

// // Login (email or userId)
// export const loginUser = asyncHandler(async (req, res) => {
//   const { login, password } = req.body;

//   const user = await User.findOne({
//     $or: [{ email: login }, { userId: login }],
//   });

//   if (!user) {
//     return res.status(400).json({ message: "Invalid email/userId" });
//   }

//   if (!(await user.matchPassword(password))) {
//     return res.status(401).json({ message: "Invalid password" });
//   }

//   res.json({
//     _id: user._id,
//     userId: user.userId,
//     name: user.name,
//     email: user.email,
//     token: generateToken(user._id),
//   });
// });

// // Get profile
// // Get profile with admin approval fields
// export const getMe = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.id).select("-password");

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.json({
//     _id: user._id,
//     userId: user.userId,
//     name: user.name,
//     email: user.email,
//     abstractStatus: user.abstractStatus || "pending",     // default if not set
//     finalPaperStatus: user.finalPaperStatus || "pending", // default if not set
//     paymentStatus: user.paymentStatus || "unpaid",        // default if not set
//     token: req.user.token, // optional
//   });
// });


// // Logout
// export const logoutUser = asyncHandler(async (req, res) => {
//   res.json({ message: "User logged out successfully" });
// });

import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../middleware/authMiddleware.js";
import AbstractStatus from "../models/abstractStatusModel.js";
// Register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userId: user.userId,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

// Login
export const loginUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: login }, { userId: login }],
  });

  if (!user) return res.status(400).json({ message: "Invalid email/userId" });

  if (!(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid password" });

  res.json({
    _id: user._id,
    userId: user.userId,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

// Get profile
// export const getMe = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.id).select("-password");

//   if (!user) return res.status(404).json({ message: "User not found" });

//   res.json({
//     _id: user._id,
//     userId: user.userId,
//     name: user.name,
//     email: user.email,
//     abstractStatus: abstractstatuses.abstractStatus,
//     finalPaperStatus: user.finalPaperStatus,
//     paymentStatus: user.paymentStatus,
//   });
// });
export const getMe = asyncHandler(async (req, res) => {
  // Fetch user
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  // Fetch status
  const abstractStatus = await AbstractStatus.findOne({ userId: user._id });

  res.json({
    _id: user._id,
    userId: user.userId,
    name: user.name,
    email: user.email,

    // Workflow comes from AbstractStatus collection
    abstractStatus: abstractStatus ? abstractStatus.abstractStatus : "pending",
    finalPaperStatus: abstractStatus ? abstractStatus.finalPaperStatus : "pending",
    paymentStatus: abstractStatus ? abstractStatus.paymentStatus : "pending",
  });
});
// Logout
export const logoutUser = asyncHandler(async (req, res) => {
  res.json({ message: "User logged out successfully" });
});
