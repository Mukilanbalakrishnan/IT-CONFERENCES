import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../middleware/authMiddleware.js";

// -----------------------------
// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
// -----------------------------
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email already exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Create user
  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userId: user.userId, // generated in model
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

// -----------------------------
// @desc    Login user (email or userId)
// @route   POST /api/users/signin
// @access  Public
// -----------------------------
export const loginUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body; // login = email OR userId

  // Find user by email or userId
  const user = await User.findOne({
    $or: [{ email: login }, { userId: login }],
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid email/userId" });
  }

  // Check password
  if (!(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.json({
    _id: user._id,
    userId: user.userId,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

// -----------------------------
// @desc    Get logged-in user profile
// @route   GET /api/users/me
// @access  Private
// -----------------------------
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    _id: user._id,
    userId: user.userId,
    name: user.name,
    email: user.email,
    abstractStatus: user.abstractStatus || "pending",     // default if not set
    finalPaperStatus: user.finalPaperStatus || "pending", // default if not set
    paymentStatus: user.paymentStatus || "unpaid",        // default if not set
  });
});

// -----------------------------
// @desc    Logout user
// @route   POST /api/users/logout
// @access  Public
// -----------------------------
export const logoutUser = asyncHandler(async (req, res) => {
  res.json({ message: "User logged out successfully" });
});
