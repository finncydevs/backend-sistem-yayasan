// middlewares/upload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    if (!req.params.id) {
      return cb(new Error("ID pegawai tidak ditemukan"), null);
    }
    const ext = path.extname(file.originalname);
    cb(null, `${req.params.id}${ext}`); // Rename file: 5.png / 7.jpg
  },
});

const upload = multer({ storage });

module.exports = upload;
