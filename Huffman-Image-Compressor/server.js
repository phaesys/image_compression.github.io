const express = require("express");
const multer = require("multer");
const path = require("path");
const { compressImage } = require("./compressor"); // Adjust to repository's logic

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static("public"));
app.use(express.json());

// File storage setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const compressedPath = `uploads/compressed-${req.file.filename}`;

    // Call the compression function from the repository
    await compressImage(filePath, compressedPath);

    res.status(200).json({
      message: "File compressed successfully",
      compressedPath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error compressing file" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
