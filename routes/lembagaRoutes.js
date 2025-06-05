const express = require("express");
const router = express.Router();
const lembagaController = require("../controllers/lembagaControllers");
const upload = require("../middleware/upload");

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

router.get("/", lembagaController.getLembagas);
router.post("/", lembagaController.createLembaga);
router.get("/:id", lembagaController.getLembagaById);
router.put("/:id", lembagaController.updateLembaga);

module.exports = router;
