// import jwt from "jsonwebtoken";
// import asyncHandler from "express-async-handler";
// import User from "../models/userModel.js";

// export const authRequired = asyncHandler(async (req, res, next) => {
//   const authHeader = req.headers.authorization || "";
//   const token = authHeader.startsWith("Bearer ")
//     ? authHeader.split(" ")[1]
//     : req.cookies?.token;

//   if (!token) {
//     return res.status(401).json({ message: "No token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded JWT:", decoded);

//     // If you signed with { id: user._id }
//     const userId = decoded.id || decoded._id;

//     const user = await User.findById(userId).select("_id name email role");
//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error("JWT verification failed:", err.message);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// });

// export const adminOnly = (req, res, next) => {
//   if (req.user?.role === "admin") return next();
//   return res.status(403).json({ message: "Admin only" });
// };


import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const authRequired = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found or invalid" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};
