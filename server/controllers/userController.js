import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { sendMail } from "../utils/email.js"; // your email utility

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // ✅ Check if email already exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // ✅ Create user (userId like IC4284 is generated in userModel pre-save hook)
  const user = await User.create({ name, email, password });

  if (user) {
    // 📧 Send email with their User ID
    try {
      await sendMail({
        to: user.email,
        subject: "Welcome to Conference Portal 🎉",
        html: `
          <h2>Hi ${user.name},</h2>
          <p>Thank you for registering!</p>
          <p>Your unique Conference User ID is: <b>${user.userId}</b></p>
          <p>Use this ID or your email to log in.</p>
          <br/>
          <p>Best regards,<br/>Conference Team</p>
        `,
      });
    } catch (error) {
      console.error("❌ Email send failed:", error.message);
    }

    res.status(201).json({
      _id: user._id,
      userId: user.userId, // ✅ Custom ID like IC4284
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});


// @desc    Login User (with email OR userId)
// @route   POST /api/users/signin
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: login }, { userId: login }],
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid email/userId" });
  }

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

// @desc    Logout User
// @route   POST /api/users/logout
// @access  Private (or simple public logout)
export const logoutUser = asyncHandler(async (req, res) => {
  // Since JWT is stateless, just tell frontend to delete token
  
  res.json({ message: "User logged out successfully" });
});
