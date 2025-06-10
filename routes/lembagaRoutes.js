const express = require("express");
const router = express.Router();
const lembagaController = require("../controllers/lembagaControllers");
const upload = require("../middleware/upload");
const { protect } = require("../middleware/auth");

const uploadLembaga = upload({
  folder: "uploads/lembaga",
  filenameBuilder: (req, ext) => {
    if (!req.params.id) throw new Error("ID lembaga tidak ditemukan");
    return `${req.params.id}${ext}`;
  },
});

router.post(
  "/upload/:id",
  uploadLembaga.single("foto"),
  lembagaController.uploadFotoLembaga
);

router.get("/logo", lembagaController.getLogo);
router.get("/", protect, lembagaController.getLembagas);
router.post("/", protect, lembagaController.createLembaga);
router.get("/:id", protect, lembagaController.getLembagaById);
router.put("/:id", protect, lembagaController.updateLembaga);

module.exports = router;
