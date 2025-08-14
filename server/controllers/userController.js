// import bcrypt from "bcryptjs";
// import User from "../models/userModel.js";



// // 📌 Email Validation
// const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// // 📌 Password Strength Validation
// const validatePassword = (password) => {
//   return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
// };

// // 📌 Signup Controller
// const signup = async (req, res) => {
//   try {
//     let { username, email, password, mobilenumber } = req.body;

//     if (!username || !email || !password) {
//       return res.json({ success: false, message: "All required fields must be filled" });
//     }

//     if (!validateEmail(email)) {
//       return res.json({ success: false, message: "Invalid email format" });
//     }

//     if (!validatePassword(password)) {
//       return res.json({ success: false, message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character" });
//     }


//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.json({ success: false, message: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       username,
//       email,
//       password: hashedPassword,
//       mobilenumber,
//     });

//     await user.save();

//     // ✅ Generate JWT Token
//     // const token = generateToken(user._id, user.email);

//     res.json({ success: true, message: "User registered successfully" });

//   } catch (error) {
//     res.json({ success: false, message: "Error", error: error.message });
//   }
// };

// export { signup };


import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../middleware/jwttoken.js"; // ✅ your JWT helper

// 📌 Email Validation
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// 📌 Password Strength Validation
const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

// 📌 Signup Controller
const signup = async (req, res) => {
  try {
    let { username, email, password, mobilenumber } = req.body;

    if (!username || !email || !password) {
      return res.json({ success: false, message: "All required fields must be filled" });
    }

    // Convert email to lowercase for consistency
    email = email.toLowerCase().trim();

    if (!validateEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    if (!validatePassword(password)) {
      return res.json({ success: false, message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      mobilenumber,
    });

    await user.save();

    res.json({ success: true, message: "User registered successfully" });

  } catch (error) {
    res.json({ success: false, message: "Error", error: error.message });
  }
};

// 📌 Login Controller
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Email and password are required" });
    }


    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.email);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobilenumber: user.mobilenumber,
      }
    });

  } catch (error) {
    res.json({ success: false, message: "Error", error: error.message });
  }
};
export const registerDelegate = async (req, res) => {
  try {
    const { username, delegateType, attendeeType, presentingAuthor, abstractTitle, track } = req.body;

    if (!username || !delegateType || !attendeeType || !presentingAuthor || !abstractTitle || !track) {
      return res.json({ success: false, message: "All fields are required" });
    }

    let uploadedFileUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "delegates_uploads"
      });
      uploadedFileUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // Remove local temp file
    }

    const newDelegate = new Delegate({
      username,
      delegateType,
      attendeeType,
      presentingAuthor,
      abstractTitle,
      track,
      fileUrl: uploadedFileUrl
    });

    await newDelegate.save();

    res.json({ success: true, message: "Delegate registered successfully", data: newDelegate });
  } catch (error) {
    res.json({ success: false, message: "Error registering delegate", error: error.message });
  }
};
export { signup, login };
