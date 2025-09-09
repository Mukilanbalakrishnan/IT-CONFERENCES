import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "7d" });

export const register = asyncHandler(async (req, res) => {
  const { name, email, password,role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already registered" });
  const user = await User.create({ name, email, password,role });
  const token = genToken(user._id);
  res
    .cookie("token", token, { httpOnly: true, sameSite: "lax" })
    .status(201).json({ user: { id: user._id, name: user.name, email: user.email,role:user.role }, token });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: "Invalid credentials" });
  const token = genToken(user._id);
  res.cookie("token", token, { httpOnly: true, sameSite: "lax" }).json({ token,user:{role:user.role,name:user.name,userId:user._id}});
});

export const admin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(email + password, process.env.JWT_SECRET); // it concate the email and password it generate one string the string is copy of password and email
        res.json({ success: true, token });
    } else {
        res.json({ success: false, message: "Invalid Credential" });
    }
});


export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id || req.user.id).select("-password");
  res.json(user);
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});
