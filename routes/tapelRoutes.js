const express = require('express');
const router = express.Router();
const {
  getAllTapel,
  createTapel,
  updateTapel,
} = require('../controllers/tapelControllers');

router.get('/', getAllTapel);
router.post('/', createTapel);
router.put('/:id', updateTapel);

module.exports = router;