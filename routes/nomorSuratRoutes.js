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

router.get("/", getNomorSurats);
router.get("/tapel/:id_tapel", getNomorSuratByTapel);
router.get("/:id", getNomorSuratById);
router.post("/", createNomorSurat);
router.put("/:id", updateNomorSurat);
router.delete("/:id", deleteNomorSurat);

module.exports = router;
