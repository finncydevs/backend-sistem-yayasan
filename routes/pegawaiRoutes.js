const express = require("express");
const router = express.Router();

const {
  getPegawais,
  getPegawaiById,
  createPegawai,
  updatePegawai,
  deletePegawai,
  uploadFotoPegawai,
} = require("../controllers/pegawaiControllers");
const upload = require("../middleware/upload");

const uploadPegawai = upload({
  folder: "uploads/pegawai",
  filenameBuilder: (req, ext) => {
    if (!req.params.id) throw new Error("ID pegawai tidak ditemukan");
    return `${req.params.id}${ext}`;
  },
});


router.post("/upload/:id", uploadPegawai.single("foto"), (req, res) => {
  res.json({
    message: "Foto pegawai berhasil diupload",
    filename: req.file.filename,
  });
});
router.get("/", getPegawais);
router.post("/", createPegawai);
router.get("/:id", getPegawaiById);
router.put("/:id", updatePegawai);
router.delete("/:id", deletePegawai);

module.exports = router;
