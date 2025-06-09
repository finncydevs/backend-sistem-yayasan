const express = require('express');
const router = express.Router();
const {
  getAllTapel,
  createTapel,
  updateTapel,
  getById,
  deleteTapel,
  getTapelAktif,
} = require("../controllers/tapelControllers");
const { protect } = require("../middleware/auth");

router.get('/aktif', getTapelAktif);
router.get('/', getAllTapel);
router.post('/', createTapel);
router.get('/:id', getById)
router.put('/:id', updateTapel);
router.delete('/:id', deleteTapel)

module.exports = router;