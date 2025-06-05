const express = require("express");
const router = express.Router();
const {
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  loginAdmin,
  getMe,
  uploadFotoAdmin,
} = require("../controllers/adminControllers");

const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload"); 

const uploadAdmin = upload({
  folder: "uploads/admin",
  filenameBuilder: (req, ext) => {
    if (!req.params.id) throw new Error("ID pegawai tidak ditemukan");
    return `${req.params.id}${ext}`;
  },
});



router.post("/login", loginAdmin);
router.post("/upload/:id", uploadAdmin.single("foto"), uploadFotoAdmin);
router.get("/me", protect, getMe);
router.get("/", protect, getAdmins);
router.post("/", createAdmin);  
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);

module.exports = router;
