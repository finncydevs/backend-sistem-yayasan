const express = require("express");
const router = express.Router();

const {
  getPegawais,
  getPegawaiById,
  createPegawai,
  updatePegawai,
  deletePegawai,
} = require("../controllers/pegawaiControllers");

router.get("/", getPegawais);
router.post("/", createPegawai);
router.get("/:id", getPegawaiById);
router.put("/:id", updatePegawai);
router.delete("/:id", deletePegawai);

module.exports = router;
