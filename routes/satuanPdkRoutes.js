const express = require("express");
const router = express.Router();
const {
  getSatuanPdks,
  getSatuanPdkById,
  createSatuanPdk,
  updateSatuanPdk,
  deleteSatuanPdk,
} = require("../controllers/satuanPdkControllers");

router.get("/", getSatuanPdks);
router.get("/:id", getSatuanPdkById);
router.post("/", createSatuanPdk);
router.put("/:id", updateSatuanPdk);
router.delete("/:id", deleteSatuanPdk);

module.exports = router;
