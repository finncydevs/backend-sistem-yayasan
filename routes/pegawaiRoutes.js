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
const { protect } = require("../middleware/auth");

const uploadPegawai = upload({
  folder: "uploads/pegawai",
  filenameBuilder: (req, ext) => {
    if (!req.params.id) throw new Error("ID pegawai tidak ditemukan");
    return `${req.params.id}${ext}`;
  },
});

router.get("/aktif", protect, getPegawaiAktif);
router.get("/tidak-aktif",protect, getPegawaiTidakAktif);

router.post("/upload/:id", uploadPegawai.single("foto"), uploadFotoPegawai);

router.get("/",protect, getPegawais);
router.post("/",protect, createPegawai);
router.get("/:id",protect, getPegawaiById);
router.put("/:id",protect, updatePegawai);
router.delete("/:id",protect, deletePegawai);

module.exports = router;
