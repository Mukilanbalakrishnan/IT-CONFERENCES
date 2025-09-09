import asyncHandler from "express-async-handler";
import AbstractStatus from "../models/abstractStatusModel.js";

export const getMyStatus = asyncHandler(async (req, res) => {
  const status = await AbstractStatus.findOne({ userId: req.user.id });
  res.json({ status });
});
