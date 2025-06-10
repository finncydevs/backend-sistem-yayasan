const express = require("express");
const router = express.Router();
const {
  getNomorSurats,
  getNomorSuratById,
  createNomorSurat,
  updateNomorSurat,
  deleteNomorSurat,
  getNomorSuratByTapel,
} = require("../controllers/nomorSuratControllers");
const { protect } = require("../middleware/auth");

router.get("/", protect, getNomorSurats);
router.get("/tapel/:id_tapel", protect, getNomorSuratByTapel);
router.get("/:id", protect, getNomorSuratById);
router.post("/", protect, createNomorSurat);
router.put("/:id", protect, updateNomorSurat);
router.delete("/:id", protect, deleteNomorSurat);

module.exports = router;
