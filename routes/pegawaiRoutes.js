const express = require("express");
const router = express.Router();

const {
  getPegawais,
  getPegawaiById,
  createPegawai,
  updatePegawai,
  deletePegawai,
  uploadFotoPegawai,
  getPegawaiAktif,
  getPegawaiTidakAktif,
} = require("../controllers/pegawaiControllers");
const upload = require("../middleware/upload");

const uploadPegawai = upload({
  folder: "uploads/pegawai",
  filenameBuilder: (req, ext) => {
    if (!req.params.id) throw new Error("ID pegawai tidak ditemukan");
    return `${req.params.id}${ext}`;
  },
});
router.get("/aktif", getPegawaiAktif);
router.get("/tidak-aktif", getPegawaiTidakAktif);

router.post("/upload/:id", uploadPegawai.single("foto"), uploadFotoPegawai);

router.get("/", getPegawais);
router.post("/", createPegawai);
router.get("/:id", getPegawaiById);
router.put("/:id", updatePegawai);
router.delete("/:id", deletePegawai);

module.exports = router;
