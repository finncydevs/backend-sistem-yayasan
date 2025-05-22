const express = require("express");
const router = express.Router();
const {
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  loginAdmin
} = require("../controllers/adminControllers");

router.post("/login", loginAdmin);
router.get("/", getAdmins);
router.post("/", createAdmin);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);

module.exports = router;
