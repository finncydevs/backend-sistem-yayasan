const express = require("express");
const router = express.Router();
const {
  getAllTapel,
  createTapel,
  updateTapel,
  getById,
  deleteTapel,
  getTapelAktif,
} = require("../controllers/tapelControllers");
const { protect } = require("../middleware/auth");

router.get("/aktif", protect, getTapelAktif);
router.get("/", protect, getAllTapel);
router.post("/", protect, createTapel);
router.get("/:id", protect, getById);
router.put("/:id", protect, updateTapel);
router.delete("/:id", protect, deleteTapel);

module.exports = router;
