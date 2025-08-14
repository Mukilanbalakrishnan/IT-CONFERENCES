import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = path.join(process.cwd(), "uploads");

// Ensure temp folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const fileFilter = (req, file, cb) => {
  // Accept only .pdf, .doc, .docx (case-insensitive)
  const allowed = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname || "").toLowerCase();
  if (!allowed.includes(ext)) {
    return cb(new Error("Only PDF, DOC, DOCX files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  // optional: protect your server from giant uploads
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
});

export default upload;
