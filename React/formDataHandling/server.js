const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

// Enable CORS (very important for React + Axios)
app.use(cors());

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

app.post("/upload", upload.single("photo"), (req, res) => {
  const username = req.body.username;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  if (!file.mimetype.startsWith("image/")) {
    return res.status(415).json({ error: "Only images allowed" });
  }

  res.json({
    message: "Upload successful",
    user: username,
    filename: file.originalname,
    size: file.size
  });
});

// Global error handler
app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "File too large" });
  }
  res.status(500).json({ error: "Server crashed" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
