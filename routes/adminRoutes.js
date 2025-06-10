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
  changePassword,
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
router.get("/me", protect, getMe);
router.put("/change-password/:id", protect, changePassword);

router.post("/upload/:id",protect, uploadAdmin.single("foto"), uploadFotoAdmin);
router.get("/",protect, getAdmins);
router.post("/", createAdmin);
router.get("/:id",protect, getAdminById);
router.put("/:id",protect, updateAdmin);

module.exports = router;
