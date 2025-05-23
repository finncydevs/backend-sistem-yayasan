const express = require("express");
const router = express.Router();
const lembagaController = require("../controllers/lembagaControllers");
const upload = require("../middleware/upload");

const uploadLembaga = upload({
  folder: "uploads/lembaga",
  filenameBuilder: (req, ext) => {
    if (!req.params.id) throw new Error("ID lembaga tidak ditemukan");
    return `logo_${req.params.id}${ext}`;
  },
});

router.post("/upload/:id", uploadLembaga.single("logo"), (req, res) => {
  res.json({ message: "Logo berhasil diupload!" });
});

router.get("/", lembagaController.getLembagas);
router.get("/:id", lembagaController.getLembagaById);
router.post("/", lembagaController.createLembaga);
router.put("/:id", lembagaController.updateLembaga);

module.exports = router;
