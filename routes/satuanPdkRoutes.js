const express = require("express");
const router = express.Router();
const {
  getSatuanPdks,
  getSatuanPdkById,
  createSatuanPdk,
  updateSatuanPdk,
  deleteSatuanPdk,
} = require("../controllers/satuanPdkControllers");
const { protect } = require("../middleware/auth");

router.get("/",  protect, getSatuanPdks);
router.get("/:id",  protect, getSatuanPdkById);
router.post("/",  protect, createSatuanPdk);
router.put("/:id", protect,  updateSatuanPdk);
router.delete("/:id", protect,  deleteSatuanPdk);

module.exports = router;
