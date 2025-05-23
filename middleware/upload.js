// middlewares/upload.js
const multer = require("multer");
const path = require("path");

const upload = ({ folder = "uploads", filenameBuilder }) => {
  const storage = multer.diskStorage({
    destination: folder,
    filename: (req, file, cb) => {
      if (!filenameBuilder || typeof filenameBuilder !== "function") {
        return cb(new Error("Filename builder not provided or invalid"), null);
      }

      try {
        const ext = path.extname(file.originalname);
        const filename = filenameBuilder(req, ext);

        if (!filename) {
          return cb(new Error("Filename could not be generated"), null);
        }

        cb(null, filename);
      } catch (err) {
        cb(err, null);
      }
    },
  });

  return multer({ storage });
};

module.exports = upload;
